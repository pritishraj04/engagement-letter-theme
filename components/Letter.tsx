import React, { useRef, useState, useEffect } from "react";
import { MapPin, Calendar, Clock, ArrowRight, ChevronDown, GlassWater, Music } from "lucide-react";

export default function Letter({ isOpen, onClose, className }: { isOpen: boolean, onClose?: () => void, className?: string }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isUnfolded, setIsUnfolded] = useState(false);

    const totalSections = 4;

    // Toggle this variable to instantly switch between 'light' and 'dark' themes
    const themeConfig: string = 'dark';

    const t = {
        bg: themeConfig === 'light' ? 'bg-[#FFFDF9]' : 'bg-[#0A1128]',
        textMain: themeConfig === 'light' ? 'text-stone-800' : 'text-[#F3E8D6]',
        textMuted: themeConfig === 'light' ? 'text-stone-600' : 'text-[#C6A869]/80',
        textLight: themeConfig === 'light' ? 'text-stone-500' : 'text-[#C6A869]/60',
        textAccent: themeConfig === 'light' ? 'text-stone-400' : 'text-[#C6A869]',
        border: themeConfig === 'light' ? 'border-stone-200/60' : 'border-[#C6A869]/30',
        btnSolid: themeConfig === 'light' ? 'bg-stone-900 text-stone-100 hover:bg-stone-800' : 'bg-[#C6A869] text-[#0A1128] hover:bg-[#D4B981]',
        btnOutline: themeConfig === 'light' ? 'border-stone-300 bg-transparent text-stone-700 hover:bg-stone-100' : 'border-[#C6A869]/50 bg-transparent text-[#C6A869] hover:bg-[#C6A869]/10',
        card: themeConfig === 'light' ? 'border-stone-300/50 bg-stone-50/50' : 'border-[#C6A869]/20 bg-[#C6A869]/5',
        lineBreak: themeConfig === 'light' ? 'opacity-60 invert-0' : 'opacity-80 invert brightness-150',
        sealOrbit: themeConfig === 'light' ? 'fill-stone-600/80' : 'fill-[#C6A869]/90',
        navBtnBg: themeConfig === 'light' ? 'bg-white/80 border-stone-200/50 hover:bg-white' : 'bg-[#0A1128]/80 border-[#C6A869]/30 hover:bg-[#0A1128]',
        navBtnText: themeConfig === 'light' ? 'text-stone-600' : 'text-[#F3E8D6]',
        navBtnIcon: themeConfig === 'light' ? 'text-stone-500' : 'text-[#C6A869]',
    };

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
                    {/* Inner Gold Frame */}
                    <div className="absolute inset-4 md:inset-6 border border-[#C6A869]/50 pointer-events-none rounded-sm" />
                    {/* Secondary inset line for a classic double-border effect */}
                    <div className="absolute inset-[22px] md:inset-[30px] border border-[#C6A869]/20 pointer-events-none rounded-sm" />
                </div>

                {/* FIXED CONTENT WRAPPER */}
                <div className="sticky top-0 left-0 w-full h-[90dvh] z-10 flex flex-col items-center justify-center p-6 md:p-8 -mt-[90dvh]">

                    {/* SECTION 0: THE INTRO */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out 
                        ${activeIndex === 0
                            ? (isUnfolded ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none")
                            : "opacity-0 -translate-y-8 pointer-events-none"}`}
                    >
                        <p className={`font-serif uppercase tracking-widest text-xs md:text-sm mb-6 ${t.textLight}`}>
                            Together with their families
                        </p>
                        <h1 className={`font-script text-6xl md:text-7xl lg:text-8xl leading-tight mb-8 drop-shadow-sm ${t.textMain}`}>
                            William <br />
                            <span className={`text-4xl md:text-5xl my-4 block font-serif ${t.textAccent}`}>&amp;</span>
                            Josephine
                        </h1>
                        <p className={`font-serif uppercase tracking-widest text-sm md:text-base leading-relaxed max-w-sm ${t.textMuted}`}>
                            Request the pleasure of your company at their engagement celebration
                        </p>
                    </div>

                    {/* SECTION 1: THE DETAILS */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 1 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <div className={`w-full h-4 bg-[url('/assets/images/line-break.png')] bg-contain bg-center bg-no-repeat mb-10 ${t.lineBreak}`} />
                        <h2 className={`font-serif text-2xl tracking-widest uppercase mb-10 ${t.textMain}`}>The Details</h2>

                        <div className="space-y-8">
                            <div className="flex flex-col items-center gap-2">
                                <Calendar className={`w-5 h-5 mb-1 ${t.textAccent}`} strokeWidth={1.5} />
                                <div className={`font-sans font-light tracking-wider ${t.textMuted}`}>
                                    <span className={`font-medium uppercase text-sm ${t.textMain}`}>Saturday</span><br />
                                    September 24th, 2026
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <MapPin className={`w-5 h-5 mb-1 ${t.textAccent}`} strokeWidth={1.5} />
                                <div className={`font-sans font-light tracking-wider ${t.textMuted}`}>
                                    <span className={`font-medium uppercase text-sm ${t.textMain}`}>The Conservatory</span><br />
                                    123 Botanical Garden Way<br />
                                    San Francisco, CA
                                </div>
                            </div>
                        </div>
                        <div className={`w-full h-4 bg-[url('/assets/images/line-break.png')] bg-contain bg-center bg-no-repeat mt-10 ${t.lineBreak}`} />
                    </div>

                    {/* SECTION 2: ITINERARY & DRESS CODE */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 2 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <h2 className={`font-serif text-2xl tracking-widest uppercase mb-10 ${t.textMain}`}>Schedule</h2>

                        <div className="space-y-8 max-w-sm w-full">
                            <div className={`flex items-start gap-4 text-left border-b pb-6 ${t.border}`}>
                                <GlassWater className={`w-6 h-6 shrink-0 mt-1 ${t.textAccent}`} strokeWidth={1.5} />
                                <div>
                                    <h3 className={`font-serif font-medium tracking-wider ${t.textMain}`}>6:00 PM — Welcome Cocktails</h3>
                                    <p className={`font-sans font-light text-sm mt-1 ${t.textLight}`}>Join us on the terrace for sunset drinks and light hors d'oeuvres.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 text-left">
                                <Music className={`w-6 h-6 shrink-0 mt-1 ${t.textAccent}`} strokeWidth={1.5} />
                                <div>
                                    <h3 className={`font-serif font-medium tracking-wider ${t.textMain}`}>7:30 PM — Dinner & Dancing</h3>
                                    <p className={`font-sans font-light text-sm mt-1 ${t.textLight}`}>A seated dinner in the glasshouse followed by live music.</p>
                                </div>
                            </div>
                        </div>

                        <div className={`mt-12 p-4 border w-full max-w-sm rounded ${t.card}`}>
                            <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${t.textMain}`}>Dress Code</h4>
                            <p className={`font-serif italic text-sm ${t.textMuted}`}>Black-Tie Optional</p>
                        </div>
                    </div>

                    {/* SECTION 3: RSVP */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 3 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <h2 className={`font-script text-5xl mb-6 drop-shadow-sm ${t.textMain}`}>We can't wait!</h2>
                        <p className={`font-serif uppercase tracking-widest text-xs md:text-sm leading-relaxed max-w-xs mb-10 ${t.textMuted}`}>
                            Kindly reply by the fourth of September
                        </p>

                        <div className="flex flex-col w-full max-w-xs gap-4">
                            <button className={`group relative w-full overflow-hidden rounded py-4 px-6 text-sm tracking-widest uppercase font-medium transition-all flex items-center justify-center gap-3 ${t.btnSolid}`}>
                                <span>RSVP Now</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                            <button className={`group relative w-full rounded border py-4 px-6 text-sm tracking-widest uppercase font-medium transition-all flex items-center justify-center gap-3 ${t.btnOutline}`}>
                                <span>View Map & Stay</span>
                            </button>
                        </div>

                        {/* HALF SEAL FOR CLOSING */}
                        <div className="absolute bottom-[-30px] md:bottom-[-40px] left-1/2 -translate-x-1/2 z-50">
                            <button
                                onClick={onClose}
                                className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full group cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 pointer-events-auto"
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
                    <div className="w-full h-[90dvh] snap-start" />
                    <div className="w-full h-[90dvh] snap-start" />
                    <div className="w-full h-[90dvh] snap-start" />
                    <div className="w-full h-[90dvh] snap-start" />
                </div>

            </div>
        </div>
    );
}