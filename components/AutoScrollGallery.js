"use client";
import { useEffect, useRef, useState } from "react";

export default function AutoScrollGallery({
  images = [],
  height = "100vh",
  mobileBreakpoint = 768,
  imageWidth = "32rem",
}) {
  const contentRef = useRef(null);
  const pos = useRef(0);
  const index = useRef(0);
  const timer = useRef(null);

  const [mobile, setMobile] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState(0);
  const [active, setActive] = useState(0);

  // Detect mobile
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < mobileBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mobileBreakpoint]);

  // Auto-scroll step
  const autoStep = () => {
    if (!contentRef.current || dragging) return;
    const items = contentRef.current.children;
    if (!items.length) return;

    const container = contentRef.current.parentElement;
    const viewportCenter = mobile
      ? container.offsetWidth / 2
      : container.offsetHeight / 2;
    const itemSize = mobile
      ? items[0].offsetWidth + 24
      : items[0].offsetHeight + 24;

    index.current += 1;
    setActive(index.current % images.length);

    const itemCenter = index.current * itemSize + itemSize / 2;
    pos.current = viewportCenter - itemCenter;

    contentRef.current.style.transition =
      "transform 0.45s cubic-bezier(.22,.61,.36,1)";
    contentRef.current.style.transform = mobile
      ? `translateX(${pos.current}px)`
      : `translateY(${pos.current}px)`;

    // Seamless loop
    if (index.current === images.length) {
      setTimeout(() => {
        contentRef.current.style.transition = "none";
        index.current = 0;
        pos.current = viewportCenter - itemSize / 2;
        contentRef.current.style.transform = mobile
          ? `translateX(${pos.current}px)`
          : `translateY(${pos.current}px)`;
      }, 460);
    }

    timer.current = setTimeout(autoStep, 3000);
  };

  // Start auto-scroll
  useEffect(() => {
    timer.current = setTimeout(autoStep, 3000);
    return () => clearTimeout(timer.current);
  }, [mobile, dragging, images.length]);

  // Drag
  const startDrag = (v) => {
    setDragging(true);
    setStart(v);
    clearTimeout(timer.current);
    contentRef.current.style.transition = "none";
  };

  const moveDrag = (v) => {
    if (!dragging || !contentRef.current) return;
    const d = v - start;
    pos.current += d;
    setStart(v);
    contentRef.current.style.transform = mobile
      ? `translateX(${pos.current}px)`
      : `translateY(${pos.current}px)`;
  };

  const endDrag = () => {
    if (!contentRef.current) return;
    const items = contentRef.current.children;
    if (!items.length) return;

    const container = contentRef.current.parentElement;
    const viewportCenter = mobile
      ? container.offsetWidth / 2
      : container.offsetHeight / 2;

    // Snap to closest image
    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < items.length; i++) {
      const rect = items[i].getBoundingClientRect();
      const itemCenter = mobile
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;
      const containerCenter = mobile
        ? container.getBoundingClientRect().left + viewportCenter
        : container.getBoundingClientRect().top + viewportCenter;
      const dist = Math.abs(itemCenter - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }

    const itemSize = mobile
      ? items[0].offsetWidth + 24
      : items[0].offsetHeight + 24;
    pos.current = viewportCenter - (closest * itemSize + itemSize / 2);
    index.current = closest % images.length;
    setActive(index.current);

    contentRef.current.style.transition =
      "transform 0.35s cubic-bezier(.22,.61,.36,1)";
    contentRef.current.style.transform = mobile
      ? `translateX(${pos.current}px)`
      : `translateY(${pos.current}px)`;

    setDragging(false);

    // Restart auto-scroll after drag
    clearTimeout(timer.current);
    timer.current = setTimeout(autoStep, 3000);
  };

  return (
    <div style={{ height }} className="relative w-fit overflow-hidden">
      <div
        className="md:h-full h-fit w-full cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={(e) => startDrag(mobile ? e.clientX : e.clientY)}
        onMouseMove={(e) => moveDrag(mobile ? e.clientX : e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={dragging ? endDrag : undefined}
        onTouchStart={(e) =>
          startDrag(mobile ? e.touches[0].clientX : e.touches[0].clientY)
        }
        onTouchMove={(e) =>
          moveDrag(mobile ? e.touches[0].clientX : e.touches[0].clientY)
        }
        onTouchEnd={endDrag}
      >
        <div
          ref={contentRef}
          className={`flex gap-6 ${mobile ? "flex-row" : "flex-col"}`}
        >
          {[...images, ...images].map((src, i) => {
            const isActive = i % images.length === active;
            return (
              <img
                key={i}
                src={src}
                draggable={false}
                className={`rounded-xl object-cover transition-all duration-300
                  ${isActive ? "blur-0 scale-100" : "blur-[2px] scale-95"}`}
                style={{
                  width: mobile ? "70vw" : imageWidth,
                  willChange: "transform",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
