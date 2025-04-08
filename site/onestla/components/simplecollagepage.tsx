"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

const COLLAGE_WIDTH = 1000;
const COLLAGE_HEIGHT = 850;
const SCALE = 3;

export default function SimpleCollagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: -650, y: -860 });

  const getBoundaries = () => {
    if (!containerRef.current) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const scaledWidth = COLLAGE_WIDTH * SCALE;
    const scaledHeight = COLLAGE_HEIGHT * SCALE;

    const minX = -(scaledWidth - containerWidth);
    const minY = -(scaledHeight - containerHeight);

    return {
      minX,
      maxX: 0,
      minY,
      maxY: 0,
    };
  };

  const constrainPosition = useCallback((x: number, y: number) => {
    const { minX, maxX, minY, maxY } = getBoundaries();
    return {
      x: Math.min(maxX, Math.max(minX, x)),
      y: Math.min(maxY, Math.max(minY, y)),
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const newX = clientX - startPos.x;
    const newY = clientY - startPos.y;

    const constrainedPosition = constrainPosition(newX, newY);
    setPosition(constrainedPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const constrained = constrainPosition(position.x, position.y);
    if (constrained.x !== position.x || constrained.y !== position.y) {
      setPosition(constrained);
    }
  }, [constrainPosition, position.x, position.y]);

  useEffect(() => {
    const handleMouseMoveEvent = (e: MouseEvent | TouchEvent) =>
      handleMouseMove(e);
    const handleMouseUpEvent = () => handleMouseUp();
    const currentRef = containerRef.current;

    window.addEventListener("mousemove", handleMouseMoveEvent, {
      passive: false,
    });
    window.addEventListener("mouseup", handleMouseUpEvent);
    window.addEventListener("touchmove", handleMouseMoveEvent, {
      passive: false,
    });
    window.addEventListener("touchend", handleMouseUpEvent);

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    currentRef?.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveEvent);
      window.removeEventListener("mouseup", handleMouseUpEvent);
      window.removeEventListener("touchmove", handleMouseMoveEvent);
      window.removeEventListener("touchend", handleMouseUpEvent);
      currentRef?.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-transparent">
      <div
        ref={containerRef}
        className="w-full h-full cursor-move select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        <div
          style={{
            width: COLLAGE_WIDTH,
            height: COLLAGE_HEIGHT,
            transform: `translate(${position.x}px, ${position.y}px) scale(${SCALE})`,
            transformOrigin: "0 0",
            pointerEvents: "none",
          }}
        >
          <Image
            src="https://cdn.sanity.io/images/3r2xt54q/production/eccf10fd31d3a437a79076762f0f704df34dccb1-2879x2151.png"
            alt="Large collage of images"
            width={COLLAGE_WIDTH}
            height={COLLAGE_HEIGHT}
            priority
            unoptimized={true}
            className="pointer-events-none"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
