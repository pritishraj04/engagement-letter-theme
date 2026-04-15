import React, { useRef } from "react";
import { MapPin, Calendar, Clock, ArrowRight, ArrowDown } from "lucide-react";

// ==========================================
// THE LETTER COMPONENT
// ==========================================

export default function Letter({ isOpen, className }: { isOpen: boolean, className?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);

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
                ref={scrollRef}
                className="w-full relative shadow-2xl rounded-sm overflow-hidden bg-[#FFFDF9]"
                style={{ height: "90dvh" }}
            >
                {/* Letter Pattern Background (Distinct from scene) */}
                <div className="absolute inset-0 z-0 bg-[url('/assets/images/letter-bg5.jpg')] bg-cover bg-center bg-no-repeat pointer-events-none" />

                {/* Scroll Cue */}
                <div
                    className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-50 text-stone-600 transition-opacity duration-1000 ${isOpen ? "opacity-100 delay-2500" : "opacity-0 delay-0"}`}
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold bg-white/90 px-4 py-2 rounded-full shadow-md backdrop-blur-sm border border-stone-200">Scroll to Read</span>
                    <div className="animate-bounce">
                        <ArrowDown className="w-5 h-5 drop-shadow-sm" />
                    </div>
                </div>

                {/* Padding container to show the patterned border */}
                <div className={`absolute inset-0 z-10 p-6 md:p-8 overflow-x-hidden scrollbar-hide ${isOpen ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>

                    {/* Inner Content Box */}
                    <div className="min-h-full w-full relative flex flex-col items-center py-28 px-10 md:px-16 text-center">


                        <p className="font-serif text-stone-500 uppercase tracking-widest text-xs md:text-sm mb-6 mt-4">
                            Together with their families
                        </p>

                        <h1
                            className={`font-script text-6xl md:text-7xl lg:text-8xl text-stone-800 leading-tight mb-8 transition-all duration-1000 ${isOpen ? "opacity-100 translate-y-0 delay-1500" : "opacity-0 translate-y-5"}`}
                        >
                            William <br />
                            <span className="text-4xl md:text-5xl my-4 block font-serif text-stone-400">&amp;</span>
                            Josephine
                        </h1>

                        <p
                            className={`font-serif text-stone-600 uppercase tracking-widest text-sm md:text-base leading-relaxed max-w-sm mb-8 transition-opacity duration-1000 ${isOpen ? "opacity-100 delay-2000" : "opacity-0"}`}
                        >
                            Request the pleasure of your company at their engagement celebration
                        </p>

                        <div className="w-full h-6 opacity-60 bg-[url('/assets/images/line-break.png')] bg-contain bg-center bg-no-repeat mb-12"></div>

                        <div className="w-full max-w-sm mx-auto border-t border-b border-stone-200 py-12 my-8 space-y-10 relative">
                            <div className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-4">
                                <div className="w-2 h-2 rounded-full bg-stone-300" />
                            </div>

                            <div
                                className={`flex flex-col items-center gap-3 transition-all duration-800 ${isOpen ? "opacity-100 translate-y-0 delay-2200" : "opacity-0 translate-y-2"}`}
                            >
                                <Calendar className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
                                <div className="font-sans font-light tracking-wide text-stone-700">
                                    <span className="font-medium text-stone-900">Saturday</span><br />
                                    September 24th, 2026
                                </div>
                            </div>

                            <div
                                className={`flex flex-col items-center gap-3 transition-all duration-800 ${isOpen ? "opacity-100 translate-y-0 delay-2400" : "opacity-0 translate-y-2"}`}
                            >
                                <Clock className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
                                <div className="font-sans font-light tracking-wide text-stone-700">
                                    Six o'clock in the evening<br />
                                    <span className="text-stone-500 text-sm">Dinner and dancing to follow</span>
                                </div>
                            </div>

                            <div
                                className={`flex flex-col items-center gap-3 transition-all duration-800 ${isOpen ? "opacity-100 translate-y-0 delay-2600" : "opacity-0 translate-y-2"}`}
                            >
                                <MapPin className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
                                <div className="font-sans font-light tracking-wide text-stone-700">
                                    <span className="font-medium text-stone-900">The Conservatory</span><br />
                                    123 Botanical Garden Way<br />
                                    San Francisco, CA
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div
                            className={`flex flex-col w-full max-w-xs gap-4 mt-8 transition-opacity duration-1000 ${isOpen ? "opacity-100 delay-2800" : "opacity-0"}`}
                        >
                            <button className="group relative w-full overflow-hidden rounded bg-stone-900 text-stone-100 py-4 px-6 text-sm tracking-widest uppercase font-medium transition-all hover:bg-black flex items-center justify-center gap-3">
                                <span>View Map</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <button className="group relative w-full rounded border border-stone-300 bg-transparent text-stone-700 py-4 px-6 text-sm tracking-widest uppercase font-medium transition-all hover:bg-stone-50 flex items-center justify-center gap-3">
                                <span>RSVP Now</span>
                            </button>
                        </div>

                        <div className="w-full h-6 opacity-60 bg-[url('/assets/images/line-break.png')] bg-contain bg-center bg-no-repeat mt-16"></div>

                        {/* Bottom spacer to ensure the pattern is visible at bottom when completely scrolled out */}
                        <div className="h-40 w-full" />

                    </div>
                </div>
            </div>
        </div>
    );
}
