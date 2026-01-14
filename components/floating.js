"use client";
import { useEffect, useRef, useState } from "react";

export default function FloatingBox() {
  const [visible, setVisible] = useState(false);
  const [closedForever, setClosedForever] = useState(false);
  const boxRef = useRef(null);

  // position
  const pos = useRef({ x: 24, y: 24 });
  const drag = useRef({ active: false, x: 0, y: 0 });

  // scroll
  const lastScrollY = useRef(0);

  /* ---------- localStorage check ---------- */
  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) setVisible(true);
    else setClosedForever(true);
  }, []);

  /* ---------- scroll hide / show ---------- */
  useEffect(() => {
    if (closedForever) return;

    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY.current + 10) {
        setVisible(false); // scroll down → hide
      } else if (current < lastScrollY.current - 5) {
        setVisible(true); // scroll up → show
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [closedForever]);

  /* ---------- drag logic ---------- */
  const onMouseDown = (e) => {
    drag.current = {
      active: true,
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    };
  };

  const onMouseMove = (e) => {
    if (!drag.current.active) return;
    pos.current = {
      x: e.clientX - drag.current.x,
      y: e.clientY - drag.current.y,
    };
    boxRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
  };

  const onMouseUp = () => {
    drag.current.active = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  /* ---------- accept cookies ---------- */
  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
    setClosedForever(true);
  };

  if (!visible || closedForever) return null;

  return (
    <div
      ref={boxRef}
      onMouseDown={onMouseDown}
      className="fixed bottom-6 right-6 z-50 w-80 cursor-move rounded-xl border border-slate-200 bg-white p-4 shadow-xl transition-opacity"
      style={{ transform: `translate(${pos.current.x}px, ${pos.current.y}px)` }}
    >
      <h3 className="text-sm font-semibold text-slate-900">
        We use cookies 🍪
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        We use cookies to improve your experience, analyze traffic, and personalize content.
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={acceptCookies}
          className="flex-1 rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-slate-800"
        >
          Accept
        </button>

        <button
          onClick={acceptCookies}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}
