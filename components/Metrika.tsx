"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { YM_ID } from "@/lib/metrika";

/**
 * Код счётчика Метрики. Сайт статический, но переходы между страницами —
 * клиентские, без перезагрузки, поэтому просмотр отправляем сами на смене
 * адреса. Вебвизор выключен: он записывает поля формы заказа с телефоном
 * и адресом.
 */
export default function Metrika() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!YM_ID) return;
    if (first.current) {
      first.current = false; // первый просмотр отправляет init
      return;
    }
    const ym = (window as unknown as { ym?: (...a: unknown[]) => void }).ym;
    ym?.(YM_ID, "hit", window.location.href, { referer: document.referrer });
  }, [pathname]);

  if (!YM_ID) return null;

  const code = `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: code }} />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
