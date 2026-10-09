"""
Убрать фон с кадров вещей из бота и поставить коричневый, как у жилетов.

    python scripts/cutout.py public/crm

Запускается в сборке (deploy.yml) после pull-crm-items.mjs: тот кладёт
кадры в public/crm/<slug>/<n>.jpg (3:4, 1200×1600), этот скрипт заменяет
их на месте. Нейросеть — BiRefNet через rembg, работает на процессоре
GitHub, бесплатно. Чтобы перейти на платный сервис (Photoroom,
remove.bg), достаточно заменить функцию cut() — остальное не трогать.

Кэш: готовый кадр кладётся в .cutout-cache/<хеш исходника и настроек>.jpg,
и при следующей сборке нейросеть его не трогает — сборка идёт каждые
15 минут. Папку кэша сохраняет actions/cache.

Вещь, у которой в data/crm-items.json стоит "keepBackground": true
(кнопка «Оставить фон» в боте), не обрабатывается. Если нейросеть упала
на кадре, остаётся исходник — сборка не падает.
"""

import hashlib
import json
import os
import sys
import time
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

MODEL = os.environ.get("CUTOUT_MODEL", "birefnet-general")

# Фон жилетов (переснятых 22.09.2026): сверху светлее, к низу темнее.
# Сняты замером по краям девяти кадров public/items/zhilet-*/1.jpg.
BG_TOP = (103, 84, 66)  # #675442
BG_BOTTOM = (84, 67, 52)  # #544334
VIGNETTE = 0.10  # насколько темнее углы, чем середина
SHADOW_OPACITY = 0.38
SHADOW_BLUR = 28  # px на кадре 1200×1600
SHADOW_OFFSET = (0, 14)
GRAIN = 2.2  # лёгкое зерно, чтобы ровный фон не выглядел нарисованным

# Меняется любая настройка выше — меняется хеш, и кэш пересчитается
SETTINGS = f"{MODEL}|{BG_TOP}|{BG_BOTTOM}|{VIGNETTE}|{SHADOW_OPACITY}|{SHADOW_BLUR}|{SHADOW_OFFSET}|{GRAIN}|v1"
CACHE = Path(".cutout-cache")

_session = None


def cut(img: Image.Image) -> Image.Image:
    """Вещь на прозрачном фоне (RGBA). Единственное место, где живёт нейросеть."""
    global _session
    from rembg import new_session, remove

    if _session is None:
        _session = new_session(MODEL)
    return remove(img, session=_session).convert("RGBA")


def backdrop(size: tuple[int, int]) -> Image.Image:
    w, h = size
    y = np.linspace(0, 1, h)[:, None]
    x = np.linspace(-1, 1, w)[None, :]
    yy = np.linspace(-1, 1, h)[:, None]
    top, bottom = np.array(BG_TOP, float), np.array(BG_BOTTOM, float)
    base = top[None, None, :] * (1 - y[..., None]) + bottom[None, None, :] * y[..., None]
    dist = np.clip(np.sqrt(x**2 * 0.8 + yy**2 * 0.6), 0, 1.4)
    shade = 1 - VIGNETTE * (dist / 1.4) ** 1.6
    rgb = base * shade[..., None]
    rng = np.random.default_rng(42)
    rgb += rng.normal(0, GRAIN, rgb.shape)
    return Image.fromarray(np.clip(rgb, 0, 255).astype("uint8"), "RGB")


def compose(subject: Image.Image) -> Image.Image:
    bg = backdrop(subject.size)
    alpha = subject.getchannel("A")
    shadow = Image.new("L", subject.size, 0)
    shadow.paste(alpha, SHADOW_OFFSET)
    shadow = shadow.filter(ImageFilter.GaussianBlur(SHADOW_BLUR))
    shadow = shadow.point(lambda v: int(v * SHADOW_OPACITY))
    dark = Image.new("RGB", subject.size, (20, 14, 10))
    bg = Image.composite(dark, bg, shadow)
    bg.paste(subject, (0, 0), subject)
    return bg


def keep_background_slugs() -> set[str]:
    path = Path("data/crm-items.json")
    if not path.exists():
        return set()
    items = json.loads(path.read_text(encoding="utf-8"))
    return {i["slug"] for i in items if i.get("keepBackground")}


def main(root: str) -> None:
    files = sorted(Path(root).glob("*/*.jpg"))
    if not files:
        print("Кадров нет — обрабатывать нечего")
        return
    keep = keep_background_slugs()
    CACHE.mkdir(exist_ok=True)
    done = cached = skipped = failed = 0
    for f in files:
        if f.parent.name in keep:
            skipped += 1
            continue
        key = hashlib.sha256(f.read_bytes() + SETTINGS.encode()).hexdigest()[:32]
        hit = CACHE / f"{key}.jpg"
        if hit.exists():
            f.write_bytes(hit.read_bytes())
            cached += 1
            continue
        t = time.time()
        try:
            src = Image.open(f).convert("RGB")
            out = compose(cut(src))
            out.save(hit, "JPEG", quality=84, optimize=True, progressive=True)
            f.write_bytes(hit.read_bytes())
            done += 1
            print(f"  {f} — фон заменён за {time.time() - t:.1f} с")
        except Exception as e:  # кадр остаётся как был
            failed += 1
            print(f"  {f} — не получилось ({e}), оставлен исходник")
    print(f"Фон: заменён {done}, из кэша {cached}, оставлен по просьбе {skipped}, ошибок {failed}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "public/crm")
