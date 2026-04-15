"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Letter from "./Letter";

export default function InvitationExperience() {
  const [stage, setStage] = useState<"sealed" | "zoomed" | "opened">("sealed");
  const containerRef = useRef<HTMLDivElement>(null);

  const ZOOM_SCALE = 1.05;

  const handleSealClick = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault(); // Prevents duplicate events on mobile
    }
    if (stage === "sealed") {
      setStage("zoomed");
      // After zooming, automatically proceed to open after a delay
      setTimeout(() => {
        setStage("opened");
      }, 1500);
    }
  };

  return (
    <>
      <div
        className="relative w-full h-dvh overflow-hidden bg-stone-900 select-none flex items-end justify-center"
        ref={containerRef}
      >
        {/* SCENIC FULL SCREEN BACKGROUND */}
        <div
          className="absolute inset-0 pointer-events-none origin-bottom overflow-hidden shadow-2xl transition-transform duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `scale(${stage === "sealed" ? 1 : ZOOM_SCALE}) translateY(${stage === "opened" ? "2%" : "0%"})`
          }}
        >
          {/* GOLD GRADIENT BORDER BASE */}
          <div className="absolute inset-0 bg-linear-to-br from-[#BF953F] via-[#FCF6BA] to-[#AA771C]" />

          {/* INNER CREAM GRADIENT LAYER */}
          <div className="absolute inset-[6px] md:inset-3 bg-linear-to-b from-[#F1EEE5] via-[#E5DDCC] to-[#bfa375] shadow-inner overflow-hidden">
            {/* PAPER TEXTURE OVERLAY */}
            <Image
              src="/assets/images/paper-texture.png"
              alt="Paper Texture"
              fill
              sizes="100vw"
              className="object-cover opacity-40 mix-blend-multiply pointer-events-none"
              priority
            />

            {/* HEADER TEXT ABOVE ENVELOPE */}
            <div className="absolute top-[38dvh] left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-4 text-center z-10 pointer-events-none">
              <div
                className="flex flex-col items-center gap-3 transition-opacity duration-1000 ease-out"
              >
                <span className="font-script text-2xl md:text-3xl text-stone-600/80 italic">Save the Date</span>
                <div className="w-[680px] md:w-[720px] h-20 md:h-32 relative">
                  <Image
                    src="/assets/images/ring-text.svg"
                    alt="ring ceremony"
                    fill
                    sizes="(max-width: 768px) 680px, 720px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* TOP ORNAMENT */}
            <div className="absolute top-0 left-0 w-full aspect-200/60 text-stone-300 pointer-events-none">
              <Image
                src="/assets/images/top-ornament.svg"
                alt="Top Ornament"
                fill
                sizes="100vw"
                className="object-contain object-top opacity-80"
                priority
              />
            </div>

            {/* BOTTOM ORNAMENT */}
            <div className="absolute bottom-0 left-0 w-full aspect-200/60 text-stone-300 rotate-180 pointer-events-none">
              <Image
                src="/assets/images/bottom-ornament.svg"
                alt="Bottom Ornament"
                fill
                sizes="100vw"
                className="object-contain object-top opacity-80"
              />
            </div>
          </div>
        </div>

        {/* ENVELOPE / SCENE CONTAINER */}
        <div
          className="relative z-10 w-full max-w-2xl px-4 pb-12 flex flex-col items-center justify-end origin-bottom transition-transform duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `scale(${stage === "sealed" ? 1 : ZOOM_SCALE}) translateY(${stage === "sealed" ? "0%" : "15%"})`
          }}
        >
          {/* The Envelope */}
          <div className="relative w-full aspect-4/3 max-h-[60vh] mx-auto mt-auto perspective-1000">

            {/* Inner Envelope BG (Darker) */}
            <div
              className="absolute inset-x-0 bottom-0 top-[20%] bg-[#d1cbbd] drop-shadow-inner border border-black/10 rounded-b-md transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateY(${stage === "opened" ? "50vh" : "0%"})`,
                opacity: stage === "opened" ? 0 : 1,
                transitionDelay: stage === "opened" ? '1500ms' : '0ms'
              }}
            />

            {/* THE LETTER CLIP WRAPPER */}
            <div
              className="absolute inset-x-0 top-[20%] bottom-0 z-10 pointer-events-none"
              style={{ clipPath: "polygon(-50% -500%, 150% -500%, 150% 100%, -50% 100%)" }}
            >
              <Letter
                isOpen={stage === "opened"}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            </div>

            {/* LOWER ENVELOPE FOLDS (Front) -> Covers letter */}
            <div
              className="absolute inset-x-0 bottom-0 top-[20%] z-20 pointer-events-none transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateY(${stage === "opened" ? "50vh" : "0%"})`,
                opacity: stage === "opened" ? 0 : 1,
                transitionDelay: stage === "opened" ? '1500ms' : '0ms'
              }}
            >
              <svg viewBox="0 0 800 500" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <filter id="drop-shadow">
                  <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15" />
                </filter>
                <filter id="inner-shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.1" />
                </filter>
                {/* Left Flap */}
                <path d="M 0 0 L 380 260 L 0 500 Z" fill="#e8dfcd" stroke="#d5ccba" strokeWidth="2" />
                {/* Right Flap */}
                <path d="M 800 0 L 420 260 L 800 500 Z" fill="#e8dfcd" stroke="#d5ccba" strokeWidth="2" />
                {/* Bottom Flap */}
                <path d="M 0 500 L 400 230 L 800 500 Z" fill="#f4ece1" stroke="#d5ccba" strokeWidth="1.5" filter="url(#drop-shadow)" />
              </svg>

              {/* Stamp Detail */}
              {/* <div className="absolute right-6 top-16 opacity-90 scale-90 md:scale-100 -rotate-3">
                <div className="w-16 h-20 bg-[#f9f9f9] border-[3px] border-dotted border-[#cfc8b9] p-1 shadow-sm flex flex-col items-center justify-center">
                  <span className="font-serif text-[10px] uppercase text-stone-500 tracking-wider text-center leading-tight">You Are<br />Invited</span>
                  <div className="w-8 h-8 mt-2 opacity-50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-700">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                      <path d="M12 22C14.7614 22 17 17.5228 17 12C17 6.47715 14.7614 2 12 2C9.23858 2 7 6.47715 7 12C7 17.5228 9.23858 22 12 22Z" />
                      <path d="M22 12C22 14.7614 17.5228 17 12 17C6.47715 17 2 14.7614 2 12C2 9.23858 6.47715 7 12 7C17.5228 7 22 9.23858 22 12Z" />
                    </svg>
                  </div>
                </div>
              </div> */}
            </div>

            {/* TOP FLAP Z-INDEX LAYER - Switches slowly behind letter when open */}
            <div
              className="absolute inset-x-0 top-[20%] bottom-[20%] pointer-events-none"
              style={{
                zIndex: stage === "opened" ? 5 : 30, // 30 is above folds, 5 is below letter layer
              }}
            >
              {/* TOP FLAP Y-TRANSLATOR - Slides down after delay */}
              <div
                className="w-full h-full transition-all duration-1500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translateY(${stage === "opened" ? "50vh" : "0%"})`,
                  opacity: stage === "opened" ? 0 : 1,
                  transitionDelay: stage === "opened" ? '1500ms' : '0ms'
                }}
              >
                {/* TOP FLAP ROTATOR - Flips open immediately */}
                <div
                  className="w-full h-full origin-top transition-transform duration-1200 ease-in-out"
                  style={{
                    transform: `rotateX(${stage === "opened" ? 180 : 0}deg)`
                  }}
                >
                  <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
                    <path d="M 0 0 L 400 320 L 800 0 Z" fill="#f0e9dd" stroke="#d5ccba" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* SEAL AND CALL TO ACTION OVERLAY */}
            <div
              className={`absolute left-1/2 top-[60%] z-40 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 ease-out ${stage === "opened" ? "opacity-0 scale-75 blur-sm pointer-events-none" : "opacity-100 scale-100 blur-none"
                }`}
            >
              <button
                onClick={handleSealClick}
                onTouchEnd={handleSealClick}
                className="relative flex items-center justify-center cursor-pointer pointer-events-auto w-35 h-35 md:w-40 md:h-40 rounded-full group outline-none focus-visible:ring-4 focus-visible:ring-[#BF953F]/20"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {/* Minimal Royal Aura */}
                {stage === "sealed" && (
                  <div className="absolute inset-x-[-15%] inset-y-[-15%] -z-10 bg-[#BF953F] rounded-full mix-blend-screen animate-royal-glow" />
                )}

                {/* Wax Seal Image Container */}
                <div className="w-full h-full relative z-10 overflow-hidden rounded-full transition-all duration-700 ease-out group-hover:scale-[1.03] group-active:scale-95 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <Image
                    src="/assets/images/seal.png"
                    alt="Wax Seal"
                    fill
                    sizes="(max-width: 768px) 120px, 144px"
                    className="object-contain drop-shadow-md pointer-events-none"
                    priority
                  />

                  {/* Ghostly Glint Effect */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent w-[50%] animate-glint" />
                  </div>
                </div>

                {/* Subtle outer gold ring */}
                {stage === "sealed" && (
                  <div className="absolute inset-0 -z-5 rounded-full border border-[#BF953F]/10 scale-105" />
                )}
              </button>

              {/* Circular Instruction Text */}
              <div
                className={`absolute inset-[-10px] z-0 pointer-events-none transition-opacity duration-1000 ${stage === "sealed" ? "opacity-100 delay-1000" : "opacity-0"
                  }`}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow origin-center">
                  <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    fill="none"
                  />
                  <text className="fill-stone-500/60 text-[10px] font-bold uppercase tracking-[0.25em]">
                    <textPath href="#circlePath" startOffset="5%">
                      • Tap to open the envelope •
                    </textPath>
                    <textPath href="#circlePath" startOffset="55%">
                      • Tap to open the envelope •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

