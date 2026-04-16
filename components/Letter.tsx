import React, { useRef, useState, useEffect } from "react";
import { MapPin, Calendar, Clock, ArrowRight, ChevronDown, GlassWater, Music } from "lucide-react";
import RSVPForm from "./features/RSVPForm";

const FlowerAnimations = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes sway {
            0%, 100% { transform: rotate(-3deg) translateY(0); }
            50% { transform: rotate(3deg) translateY(-5px); }
        }
        @keyframes sway-reverse {
            0%, 100% { transform: rotate(3deg) translateY(-5px); }
            50% { transform: rotate(-3deg) translateY(0); }
        }
        @keyframes gentle-pulse {
            0%, 100% { transform: scale(1) translateY(0); opacity: 0.7; }
            50% { transform: scale(1.02) translateY(-10px); opacity: 1; }
        }
        .anim-sway { animation: sway 8s ease-in-out infinite; transform-origin: bottom center; }
        .anim-sway-reverse { animation: sway-reverse 9s ease-in-out infinite; transform-origin: top right; }
        .anim-gentle { animation: gentle-pulse 12s ease-in-out infinite; transform-origin: center; }
    `}} />
);

const RoseOne = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* Main Stem/Branch */}
        <path d="M 50 190 Q 35 140 45 90 Q 50 70 45 50" />

        {/* Prominent side branch */}
        <path d="M 42 120 Q 15 110 5 80" />
        <path d="M 47 95 Q 75 80 85 50" />

        {/* Leaves on left branch */}
        <path d="M 30 115 Q 20 100 15 110 Q 25 125 30 115 Z" />
        <path d="M 18 97 Q 5 95 10 105 Q 20 105 18 97 Z" />
        <path d="M 8 83 Q -5 70 0 85 Q 10 90 8 83 Z" />

        {/* Leaves on right branch */}
        <path d="M 60 88 Q 75 90 70 100 Q 55 98 60 88 Z" />
        <path d="M 75 65 Q 90 60 85 75 Q 70 78 75 65 Z" />
        <path d="M 82 55 Q 95 45 95 60 Q 85 70 82 55 Z" />

        {/* Mid Leaves on main stem */}
        <path d="M 48 150 Q 65 140 60 155 Q 45 160 48 150 Z" />
        <path d="M 40 170 Q 25 180 30 165 Q 45 155 40 170 Z" />

        {/* Flower Base Structure */}
        <path d="M 35 45 C 35 60 55 60 55 45 C 45 55 45 55 35 45" />

        {/* Elegant Rose Head (Profile View) */}
        <path d="M 45 50 C 20 40 30 10 45 20 C 60 10 70 40 45 50 Z" />
        <path d="M 45 45 C 30 35 35 15 45 25 C 55 15 60 35 45 45 Z" />
        <path d="M 45 40 C 35 35 40 20 45 30 C 50 20 55 35 45 40 Z" />
    </svg>
);

const RoseTwo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 150 150" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
        <g transform="translate(75, 75)">
            {/* Outer Petals */}
            <path d="M -20 -60 C -50 -50 -60 -20 -40 0 C -60 20 -50 50 -20 60 C 0 70 20 70 40 40 C 60 20 50 -20 20 -40 C 0 -60 -10 -60 -20 -60 Z" />
            <path d="M -40 0 C -30 -30 10 -50 20 -40" />
            <path d="M 40 40 C 30 60 -10 60 -20 60" />
            <path d="M -20 60 C -50 40 -40 0 -40 0" />
            <path d="M 20 -40 C 60 -20 50 20 40 40" />

            {/* Mid Petals */}
            <path d="M -10 -35 C -30 -25 -35 -5 -25 15 C -30 35 -10 45 10 35 C 30 30 35 10 25 -10 C 20 -30 0 -40 -10 -35 Z" />
            <path d="M -25 15 C -20 -15 0 -25 10 -35" />
            <path d="M 10 35 C 30 15 20 -10 25 -10" />
            <path d="M 10 35 C -10 50 -30 30 -25 15" />

            {/* Inner Petals */}
            <path d="M -5 -20 C -20 -10 -20 5 -10 15 C -15 25 0 25 10 15 C 20 5 15 -10 5 -15 C 0 -20 -5 -20 -5 -20 Z" />
            <path d="M -10 15 C -10 0 5 -10 5 -15" />
            <path d="M 10 15 C 20 0 10 -15 5 -15" />

            {/* Core Petals */}
            <path d="M -5 -5 C -10 5 0 10 5 5 C 10 0 0 -10 -5 -5 Z" />

            {/* Small center curl */}
            <path d="M 2 2 C -2 5 -5 0 0 -2 C 3 -2 2 2 2 2 Z" />
        </g>
    </svg>
);


const ScallopedFrame = ({
    insetClass,
    borderColor,
    bgColor,
    wClass, hClass,
    xClass, yClass
}: {
    insetClass: string, borderColor: string, bgColor: string,
    wClass: string, hClass: string, xClass: string, yClass: string
}) => (
    <div className={`absolute ${insetClass} pointer-events-none z-0`}>
        {/* Top line */}
        <div className={`absolute top-0 ${xClass} h-px ${bgColor}`} />
        {/* Bottom line */}
        <div className={`absolute bottom-0 ${xClass} h-px ${bgColor}`} />
        {/* Left line */}
        <div className={`absolute ${yClass} left-0 w-px ${bgColor}`} />
        {/* Right line */}
        <div className={`absolute ${yClass} right-0 w-px ${bgColor}`} />

        {/* Corner TL */}
        <div className={`absolute top-0 left-0 ${wClass} ${hClass} border-r border-b rounded-br-full ${borderColor}`} />
        {/* Corner TR */}
        <div className={`absolute top-0 right-0 ${wClass} ${hClass} border-l border-b rounded-bl-full ${borderColor}`} />
        {/* Corner BL */}
        <div className={`absolute bottom-0 left-0 ${wClass} ${hClass} border-r border-t rounded-tr-full ${borderColor}`} />
        {/* Corner BR */}
        <div className={`absolute bottom-0 right-0 ${wClass} ${hClass} border-l border-t rounded-tl-full ${borderColor}`} />
    </div>
);

export default function Letter({ isOpen, onClose, className, weddingData }: { isOpen: boolean, onClose?: () => void, className?: string, weddingData?: any }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isUnfolded, setIsUnfolded] = useState(false);

    const totalSections = 4;

    // Toggle this variable to instantly switch between 'light' and 'dark' themes
    const themeConfig: string = 'dark';

    const t = {
        bg: themeConfig === 'light' ? 'bg-[#FFFDF9]' : 'bg-[#6B0D1E]',
        textMain: themeConfig === 'light' ? 'text-stone-800' : 'text-[#E6C27A]',
        textMuted: themeConfig === 'light' ? 'text-stone-600' : 'text-[#E6C27A]/80',
        textLight: themeConfig === 'light' ? 'text-stone-500' : 'text-[#E6C27A]/60',
        textAccent: themeConfig === 'light' ? 'text-stone-400' : 'text-[#E6C27A]',
        border: themeConfig === 'light' ? 'border-stone-200/60' : 'border-[#E6C27A]/30',
        btnSolid: themeConfig === 'light' ? 'bg-stone-900 text-stone-100 hover:bg-stone-800' : 'bg-[#E6C27A] text-[#6B0D1E] hover:bg-[#FCEBAE]',
        btnOutline: themeConfig === 'light' ? 'border-stone-300 bg-transparent text-stone-700 hover:bg-stone-100' : 'border-[#E6C27A]/50 bg-transparent text-[#E6C27A] hover:bg-[#E6C27A]/10',
        card: themeConfig === 'light' ? 'border-stone-300/50 bg-stone-50/50' : 'border-[#E6C27A]/20 bg-[#E6C27A]/10',
        lineBreak: themeConfig === 'light' ? 'opacity-60 invert-0' : 'opacity-80 invert brightness-200 sepia hue-rotate-[-30deg] saturate-200',
        sealOrbit: themeConfig === 'light' ? 'fill-stone-600/80' : 'fill-[#E6C27A]/90',
        navBtnBg: themeConfig === 'light' ? 'bg-white/80 border-stone-200/50 hover:bg-white' : 'bg-[#6B0D1E]/80 border-[#E6C27A]/30 hover:bg-[#6B0D1E]',
        navBtnText: themeConfig === 'light' ? 'text-stone-600' : 'text-[#E6C27A]',
        navBtnIcon: themeConfig === 'light' ? 'text-stone-500' : 'text-[#E6C27A]',
    };

    const groomFirstName = weddingData?.couple?.groom?.name?.split(' ')[0] || 'William';
    const brideFirstName = weddingData?.couple?.bride?.name?.split(' ')[0] || 'Josephine';

    // Wait for the envelope to physically open before showing the first text
    useEffect(() => {
        if (isOpen) {
            // Reset physical scroll position while out of sight before sliding up
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
            // 1200ms matches the envelope opening transition
            const timer = setTimeout(() => setIsUnfolded(true), 1200);
            return () => clearTimeout(timer);
        } else {
            setIsUnfolded(false);
            setActiveIndex(0); // Reset scroll on close
        }
    }, [isOpen]);

    // Track scroll position to determine which section to show
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, clientHeight } = scrollContainerRef.current;
        const newIndex = Math.round(scrollTop / clientHeight);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    // Auto-scroll to the next section
    const scrollToNext = () => {
        if (!scrollContainerRef.current) return;
        const nextIndex = activeIndex + 1;
        if (nextIndex < totalSections) {
            scrollContainerRef.current.scrollTo({
                top: nextIndex * scrollContainerRef.current.clientHeight,
                behavior: "smooth"
            });
        }
    };

    return (
        <div
            className={`origin-bottom flex flex-col transition-all duration-1500 ease-[cubic-bezier(0.2,0.8,0.3,1)] ${className} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{
                transform: `translateY(${isOpen ? "0%" : "100%"})`,
                width: "100%",
                zIndex: isOpen ? 40 : 10,
                transitionDelay: isOpen ? '300ms' : '0ms'
            }}
        >
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className={`w-full relative shadow-2xl rounded-sm overflow-x-hidden snap-y snap-mandatory scroll-smooth ${isOpen ? 'overflow-y-auto' : 'overflow-y-hidden'} ${t.bg}`}
                style={{ height: "90dvh" }}
            >
                {/* STATIC BACKGROUND & FRAME EXPERIMENT */}
                <div className={`sticky top-0 left-0 w-full h-[90dvh] z-0 pointer-events-none overflow-hidden ${t.bg}`}>
                    {/* Flower Animations Styles */}
                    <FlowerAnimations />

                    {/* ROSE 1: Top Right Peeking (Large Bloom) */}
                    <div className="absolute -right-8 -top-8 w-48 h-48 md:w-64 md:h-64 text-[#E6C27A]/30 anim-gentle z-0 pointer-events-none">
                        <RoseTwo className="w-full h-full drop-shadow-md" />
                    </div>

                    {/* ROSE 2: Bottom Left Emergence (Stem Rose) */}
                    <div className="absolute -left-12 -bottom-16 w-40 h-80 md:w-56 md:h-96 text-[#E6C27A]/40 anim-sway z-0 pointer-events-none">
                        <RoseOne className="w-full h-full drop-shadow-md" />
                    </div>

                    {/* Inner Gold Frame */}
                    <ScallopedFrame
                        insetClass="inset-4 md:inset-6"
                        borderColor="border-[#E6C27A]/50"
                        bgColor="bg-[#E6C27A]/50"
                        wClass="w-12 md:w-16" hClass="h-12 md:h-16"
                        xClass="left-12 right-12 md:left-16 md:right-16"
                        yClass="top-12 bottom-12 md:top-16 md:bottom-16"
                    />
                    {/* Secondary inset line for a classic double-border effect */}
                    <ScallopedFrame
                        insetClass="inset-[22px] md:inset-[30px]"
                        borderColor="border-[#E6C27A]/20"
                        bgColor="bg-[#E6C27A]/20"
                        wClass="w-8 md:w-12" hClass="h-8 md:h-12"
                        xClass="left-8 right-8 md:left-12 md:right-12"
                        yClass="top-8 bottom-8 md:top-12 md:bottom-12"
                    />
                </div>

                {/* FIXED CONTENT WRAPPER */}
                <div className="sticky top-0 left-0 w-full h-[90dvh] z-10 flex flex-col items-center justify-center p-6 md:p-8 -mt-[90dvh]">

                    {/* SECTION 0: THE INTRO */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out 
                        ${activeIndex === 0
                            ? (isUnfolded ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none")
                            : "opacity-0 -translate-y-8 pointer-events-none"}`}
                    >
                        <p className={`font-serif uppercase tracking-[0.25em] text-[10px] md:text-xs mb-8 ${t.textLight}`}>
                            Please join us
                        </p>
                        <h1 className={`font-script text-6xl md:text-7xl lg:text-8xl leading-[0.8] mb-8 drop-shadow-sm ${t.textMain}`}>
                            {groomFirstName} <br />
                            <span className={`text-4xl md:text-5xl my-4 block font-serif ${t.textAccent}`}>&amp;</span>
                            {brideFirstName}
                        </h1>
                        <p className={`font-sans font-light tracking-wide text-xs md:text-sm leading-relaxed max-w-[280px] md:max-w-sm ${t.textMuted}`}>
                            for the celebration of our engagement and the beginning of our new chapter together.
                        </p>
                    </div>

                    {/* SECTION 1: THE DETAILS */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 1 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <div className={`w-full h-4 bg-[url('/assets/images/line-break.png')] bg-contain bg-center bg-no-repeat mb-10 ${t.lineBreak}`} />

                        <p className={`font-script text-4xl md:text-5xl mb-4 ${t.textAccent}`}>When & Where</p>
                        <p className={`font-sans font-light text-xs md:text-sm tracking-wide max-w-xs mb-10 ${t.textMuted}`}>
                            We cannot wait to share this beautiful evening with our closest friends and family.
                        </p>

                        <div className="space-y-8">
                            <div className="flex flex-col items-center gap-3">
                                <Calendar className={`w-5 h-5 ${t.textAccent}`} strokeWidth={1.5} />
                                <div className={`font-sans font-light tracking-widest ${t.textMuted}`}>
                                    <span className={`font-serif uppercase tracking-widest text-sm ${t.textMain}`}>{weddingData?.celebrations?.[0]?.date || "Saturday, September 24th"}</span><br />
                                    {weddingData?.celebrations?.[0]?.time || "Two Thousand and Twenty-Six"}
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-3 mt-4">
                                <MapPin className={`w-5 h-5 ${t.textAccent}`} strokeWidth={1.5} />
                                <div className={`font-sans font-light tracking-wide ${t.textMuted}`}>
                                    <span className={`font-serif uppercase tracking-widest text-sm ${t.textMain}`}>{weddingData?.celebrations?.[0]?.venue?.split(',')[0] || "The Conservatory"}</span><br />
                                    {weddingData?.celebrations?.[0]?.venue?.split(',').slice(1).join(',').trim() || "123 Botanical Garden Way"}
                                </div>
                                {weddingData?.celebrations?.[0]?.googleMapsUrl && (
                                    <a
                                        href={weddingData.celebrations[0].googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`mt-2 px-5 py-2 border rounded-full text-[10px] uppercase tracking-[0.2em] font-medium transition-all ${t.btnOutline} hover:scale-105`}
                                    >
                                        Get Directions
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className={`w-full h-4 bg-[url('/assets/images/line-break.png')] bg-contain bg-center bg-no-repeat mt-10 ${t.lineBreak}`} />
                    </div>

                    {/* SECTION 2: ITINERARY & ATTIRE */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 2 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <p className={`font-script text-4xl md:text-5xl mb-8 ${t.textAccent}`}>{weddingData?.eventType || 'Wedding'} Celebrations</p>

                        <div className="space-y-6 max-w-sm w-full font-serif text-center">
                            {weddingData?.celebrations?.map((celeb: any, i: number) => (
                                <div key={i} className={`flex flex-col items-center gap-1 ${i < weddingData.celebrations.length - 1 ? `pb-5 border-b ${t.border}` : ''}`}>
                                    <h3 className={`text-lg tracking-widest uppercase ${t.textMain}`}>{celeb.name}</h3>
                                    <p className={`font-sans tracking-wide font-light text-sm ${t.textLight}`}>{celeb.time} • {celeb.date}</p>
                                    <p className={`font-sans font-light text-[11px] mt-1 mb-1 ${t.textMuted} leading-tight`}>{celeb.venue}</p>
                                    {celeb.googleMapsUrl && (
                                        <a
                                            href={celeb.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`mt-1 px-4 py-1.5 border rounded-full text-[9px] uppercase tracking-[0.15em] font-medium transition-all ${t.btnOutline} hover:scale-105`}
                                        >
                                            View Map
                                        </a>
                                    )}
                                </div>
                            )) || (
                                    <>
                                        <div className={`flex flex-col items-center gap-2 pb-6 border-b ${t.border}`}>
                                            <h3 className={`text-lg tracking-widest uppercase ${t.textMain}`}>Welcome Cocktails</h3>
                                            <p className={`font-sans tracking-wide font-light text-sm ${t.textLight}`}>6:00 PM • The Garden Terrace</p>
                                            <p className={`font-sans italic font-light text-xs mt-1 ${t.textMuted}`}>Join us for sunset drinks and light hors d'oeuvres.</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <h3 className={`text-lg tracking-widest uppercase ${t.textMain}`}>Dinner & Dancing</h3>
                                            <p className={`font-sans tracking-wide font-light text-sm ${t.textLight}`}>7:30 PM • The Glasshouse</p>
                                            <p className={`font-sans italic font-light text-xs mt-1 ${t.textMuted}`}>A seated twilight dinner followed by live music.</p>
                                        </div>
                                    </>
                                )}
                        </div>

                        <div className={`mt-8 p-4 w-full max-w-sm rounded-sm ${t.card}`}>
                            <h4 className={`text-[10px] font-sans font-bold uppercase tracking-[0.2em] mb-1 ${t.textMain}`}>Attire</h4>
                            <p className={`font-serif italic text-sm ${t.textMuted}`}>{weddingData?.celebrations?.[0]?.dressCode || "Black-Tie Inspired"}</p>
                        </div>
                    </div>

                    {/* SECTION 3: RSVP */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 3 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <h2 className={`font-script text-5xl md:text-6xl mb-6 drop-shadow-sm ${t.textMain}`}>RSVP</h2>
                        <p className={`font-sans font-light text-xs md:text-sm tracking-wide leading-relaxed max-w-[280px] md:max-w-xs mb-8 ${t.textMuted}`}>
                            {weddingData?.messages?.thankYou || "Your presence is the greatest gift of all. Please let us know if you'll be able to celebrate with us."}
                        </p>

                        <div className="flex flex-col w-full max-w-sm gap-4 mb-20 md:mb-16">
                            {weddingData && <RSVPForm weddingData={weddingData} />}
                        </div>

                        {/* HALF SEAL FOR CLOSING */}
                        <div className="absolute bottom-[-30px] md:bottom-[-40px] left-1/2 -translate-x-1/2 z-50">
                            <button
                                onClick={onClose}
                                className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full group cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                            >
                                <div className="absolute inset-x-[-15%] inset-y-[-15%] bg-[#BF953F]/10 rounded-full group-hover:bg-[#BF953F]/20 transition-colors pointer-events-none" />
                                <img
                                    src="/assets/images/seal.png"
                                    alt="Close Envelope"
                                    className="w-full h-full object-contain pointer-events-none drop-shadow-md"
                                />

                                {/* Circular Instruction Text */}
                                <div className="absolute inset-[-15px] z-0 pointer-events-none transition-opacity duration-1000 opacity-70 group-hover:opacity-100">
                                    <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow origin-center">
                                        <path
                                            id="closeCirclePath"
                                            d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                                            fill="none"
                                        />
                                        <text className={`text-[9px] font-bold uppercase tracking-[0.2em] ${t.sealOrbit}`}>
                                            <textPath href="#closeCirclePath" startOffset="7%">
                                                • Relive the experience •
                                            </textPath>
                                            <textPath href="#closeCirclePath" startOffset="57%">
                                                • Relive the experience •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* NAVIGATION BUTTON */}
                    {isOpen && (
                        <div className="absolute bottom-6 left-0 w-full z-50 flex justify-center pointer-events-none">
                            <div className={`transition-all duration-700 ${activeIndex === totalSections - 1 || !isUnfolded ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                                <button
                                    onClick={scrollToNext}
                                    className={`flex flex-col items-center gap-2 group backdrop-blur-md px-6 py-3 rounded-full shadow-lg transition-all active:scale-95 ${t.navBtnBg} ${activeIndex === totalSections - 1 || !isUnfolded ? 'pointer-events-none' : 'pointer-events-auto'}`}
                                >
                                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${t.navBtnText}`}>
                                        {activeIndex === 0 ? "Tap to Read" : "Tap for More"}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 animate-bounce ${t.navBtnIcon}`} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* SCROLL TRACKS */}
                <div className="w-full -mt-[90dvh] pointer-events-none">
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                </div>

            </div>
        </div>
    );
}