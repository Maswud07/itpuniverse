import React, { useState, useEffect } from 'react';

interface DynamicSuperheroProps {
  iconKey: 'low' | 'mid' | 'high';
  isSelected: boolean;
}

type MascotExpression = 'normal' | 'blink' | 'wink' | 'excited' | 'funny';

export default function DynamicSuperhero({ iconKey, isSelected }: DynamicSuperheroProps) {
  const [expression, setExpression] = useState<MascotExpression>('normal');
  const [isHovered, setIsHovered] = useState(false);
  const [microPulse, setMicroPulse] = useState(false);

  // Random Idle Expression loops
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const triggerRandomAction = () => {
      // Choose random action
      const rand = Math.random();
      if (rand < 0.4) {
        // Classic blink
        setExpression('blink');
        setTimeout(() => setExpression('normal'), 180);
      } else if (rand < 0.65) {
        // Cheeky double wink
        setExpression('wink');
        setTimeout(() => {
          setExpression('normal');
          setTimeout(() => {
            setExpression('wink');
            setTimeout(() => setExpression('normal'), 150);
          }, 150);
        }, 185);
      } else if (rand < 0.85) {
        // Funny face / excited state
        setExpression('funny');
        setTimeout(() => setExpression('normal'), 800);
      } else {
        // High-energy excited
        setExpression('excited');
        setMicroPulse(true);
        setTimeout(() => {
          setExpression('normal');
          setMicroPulse(false);
        }, 1200);
      }

      // Schedule next dynamic check between 2.5s and 6s
      const delay = 2500 + Math.random() * 3500;
      timeoutId = setTimeout(triggerRandomAction, delay);
    };

    // Initial delay
    timeoutId = setTimeout(triggerRandomAction, 2000 + Math.random() * 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Hover reactions
  const handleMouseEnter = () => {
    setIsHovered(true);
    setMicroPulse(true);
    // When hovered, show happy/funny/excited expression immediately!
    const possibleHoverExpressions: MascotExpression[] = ['wink', 'excited', 'funny'];
    const randomExpr = possibleHoverExpressions[Math.floor(Math.random() * possibleHoverExpressions.length)];
    setExpression(randomExpr);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMicroPulse(false);
    setExpression('normal');
  };

  // Determine actual expression taking hover into account
  const activeExpression = expression;

  // BASE 1: LOW SUPERHERO (FOUNDATION MODE)
  if (iconKey === 'low') {
    return (
      <div 
        className="relative flex items-center justify-center cursor-pointer select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id="dynamic-superhero-low"
      >
        {/* Animated 3D Glow Aura */}
        <div className={`absolute inset-0 rounded-full blur-xl opacity-35 transition-all duration-700 scale-125 ${
          isSelected 
            ? 'bg-rose-500 animate-pulse' 
            : isHovered 
            ? 'bg-rose-400 opacity-25 scale-110' 
            : 'bg-transparent'
        }`} />
        
        <svg 
          viewBox="0 0 120 120" 
          className={`w-20 h-20 relative z-10 transition-all duration-300 transform ${
            isSelected 
              ? 'scale-115 filter drop-shadow-[0_8px_16px_rgba(244,63,94,0.45)]' 
              : isHovered
              ? 'scale-110 filter drop-shadow-[0_6px_12px_rgba(244,63,94,0.25)]'
              : 'opacity-90'
          } ${microPulse ? 'animate-[bounce_0.6s_infinite_alternate]' : 'animate-[mascot-float-gentle_3s_infinite_ease-in-out]'}`}
        >
          <defs>
            <linearGradient id="low-cape" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="low-cowl" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
            <radialGradient id="low-face" cx="50%" cy="35%" r="55%" fx="35%" fy="25%">
              <stop offset="0%" stopColor="#FFF1F2" />
              <stop offset="60%" stopColor="#FECDD3" />
              <stop offset="100%" stopColor="#FDA4AF" />
            </radialGradient>
            <radialGradient id="low-cheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="low-arm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>

          {/* Premium Floppy Cartoon Cape (Animate skew on hover) */}
          <path 
            d="M60 40 C35 42, 20 85, 25 105 C42 108, 78 108, 95 105 C100 85, 85 42, 60 40 Z" 
            fill="url(#low-cape)" 
            className={`transition-all duration-500 origin-center ${
              isHovered ? 'skew-x-2' : ''
            }`}
          />
          {/* Cape Inner Shadows */}
          <path 
            d="M60 40 C45 42, 35 75, 40 106 C48 107, 72 107, 80 106 C85 75, 75 42, 60 40 Z" 
            fill="#E11D48" 
            opacity="0.3"
          />

          {/* Body / Suit */}
          <rect 
            x="44" 
            y="58" 
            width="32" 
            height="35" 
            rx="12" 
            fill="url(#low-cowl)" 
            className="transition-all duration-300"
          />

          {/* Hands on Hips / Cute arm wave on hover */}
          <path 
            d={isHovered ? "M44 65 C22 60, 20 50, 28 44" : "M44 65 C32 65, 30 78, 42 82"} 
            stroke="url(#low-arm)" 
            strokeWidth="7" 
            strokeLinecap="round" 
            fill="none" 
            className="transition-all duration-300"
          />
          <path 
            d="M76 65 C88 65, 90 78, 78 82" 
            stroke="url(#low-arm)" 
            strokeWidth="7" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Chubby Round Head */}
          <g className={`transition-all duration-300 origin-[60px_42px] ${isHovered ? 'rotate-3 scale-102' : ''}`}>
            <circle 
              cx="60" 
              cy="42" 
              r="24" 
              fill="url(#low-face)" 
            />

            {/* Cowl Mask */}
            <path 
              d="M60 16 C44 16, 36 26, 36 42 C36 48, 40 50, 44 48 C48 46, 52 40, 60 40 C68 40, 72 46, 76 48 C80 50, 84 48, 84 42 C84 26, 76 16, 60 16 Z" 
              fill="url(#low-cowl)"
            />
            {/* Bunny ears on mask (Twitch slightly on hover) */}
            <path 
              d="M42 18 C38 4, 46 8, 48 18 Z" 
              fill="url(#low-cowl)" 
              className={`transition-transform duration-300 origin-[48px_18px] ${isHovered ? '-rotate-6' : ''}`}
            />
            <path 
              d="M78 18 C82 4, 74 8, 72 18 Z" 
              fill="url(#low-cowl)" 
              className={`transition-transform duration-300 origin-[72px_18px] ${isHovered ? 'rotate-6' : ''}`}
            />

            {/* High-Gloss Cowl Highlight */}
            <path 
              d="M48 20 C54 18, 66 18, 72 20" 
              stroke="#FFF" 
              strokeWidth="2" 
              strokeLinecap="round" 
              opacity="0.4" 
            />

            {/* Rosy blush cheeks (expand dynamically when happy/excited) */}
            <circle 
              cx="44" 
              cy="46" 
              r={isHovered || activeExpression === 'funny' ? "7.5" : "5.5"} 
              fill="url(#low-cheek)" 
              className="transition-all duration-200" 
            />
            <circle 
              cx="76" 
              cy="46" 
              r={isHovered || activeExpression === 'funny' ? "7.5" : "5.5"} 
              fill="url(#low-cheek)" 
              className="transition-all duration-200"
            />

            {/* ================= DYNAMIC EXPRESSIVE EYES ================= */}
            {activeExpression === 'blink' ? (
              // Cute sleepy happy arches
              <>
                <path d="M43 38 Q48 33 53 38" stroke="#9F1239" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M67 38 Q72 33 77 38" stroke="#9F1239" strokeWidth="3" strokeLinecap="round" fill="none" />
              </>
            ) : activeExpression === 'wink' ? (
              // Left eye closed winking, right eye open
              <>
                <path d="M43 38 Q48 33 53 38" stroke="#9F1239" strokeWidth="3" strokeLinecap="round" fill="none" />
                
                {/* Right Eye: Glistening and open with a heart/star gleam */}
                <ellipse cx="72" cy="38" rx="5" ry="6" fill="#FFFFFF" />
                <ellipse cx="72" cy="38" rx="3.5" ry="4" fill="#9F1239" />
                <polygon points="72,34 73,36 75,36 73,37 74,39 72,38 70,39 71,37 69,36 71,36" fill="#FFFFFF" />
                <circle cx="73.5" cy="39" r="0.6" fill="#FFFFFF" />
              </>
            ) : activeExpression === 'funny' ? (
              // Adorably goofy cross-eyed or dizzy look
              <>
                <ellipse cx="48" cy="38" rx="5" ry="6" fill="#FFFFFF" />
                <ellipse cx="72" cy="38" rx="5" ry="6" fill="#FFFFFF" />
                {/* Cross-eyed pupils looking inward */}
                <circle cx="50.5" cy="38" r="3.2" fill="#9F1239" />
                <circle cx="69.5" cy="38" r="3.2" fill="#9F1239" />
                {/* Specular glints */}
                <circle cx="49.5" cy="36.5" r="1" fill="#FFFFFF" />
                <circle cx="68.5" cy="36.5" r="1" fill="#FFFFFF" />
              </>
            ) : activeExpression === 'excited' ? (
              // Sparkly star eyes of wonder
              <>
                <ellipse cx="48" cy="38" rx="6" ry="6" fill="#FFFFFF" />
                <ellipse cx="72" cy="38" rx="6" ry="6" fill="#FFFFFF" />
                <ellipse cx="48" cy="38" rx="4.5" ry="4.5" fill="#E11D48" />
                <ellipse cx="72" cy="38" rx="4.5" ry="4.5" fill="#E11D48" />
                {/* Shiny white stars */}
                <path d="M48 34 L49.5 37 L52.5 38 L49.5 39 L48 42 L46.5 39 L43.5 38 L46.5 37 Z" fill="#FFFFFF" />
                <path d="M72 34 L73.5 37 L76.5 38 L73.5 39 L72 42 L70.5 39 L67.5 38 L70.5 37 Z" fill="#FFFFFF" />
              </>
            ) : (
              // NORMAL STATE
              <>
                <ellipse cx="48" cy="38" rx="5" ry="6" fill="#FFFFFF" />
                <ellipse cx="72" cy="38" rx="5" ry="6" fill="#FFFFFF" />
                <ellipse cx="48" cy="38" rx="3.5" ry="4" fill="#9F1239" />
                <ellipse cx="72" cy="38" rx="3.5" ry="4" fill="#9F1239" />
                {/* White Glints */}
                <circle cx="46.5" cy="36" r="1.5" fill="#FFFFFF" />
                <circle cx="49.5" cy="39" r="0.6" fill="#FFFFFF" />
                <circle cx="70.5" cy="36" r="1.5" fill="#FFFFFF" />
                <circle cx="73.5" cy="39" r="0.6" fill="#FFFFFF" />
              </>
            )}

            {/* ================= DYNAMIC EXPRESSIVE MOUTH ================= */}
            {isHovered || activeExpression === 'excited' || activeExpression === 'funny' ? (
              // Open joyful vocalizing mouth! (Huge smile with little organic tongue)
              <g>
                <path 
                  d="M52 46 Q60 55 68 46 Q60 48 52 46" 
                  fill="#9F1239" 
                  className="transition-all duration-200"
                />
                <ellipse cx="60" cy="49" rx="5" ry="3.5" fill="#9F1239" />
                <path d="M57 49 Q60 46 63 49 Q60 52 57 49" fill="#FDA4AF" />
              </g>
            ) : (
              // Standard Cute Smiley Line
              <path 
                d="M54 48 Q60 54 66 48" 
                stroke="#9F1239" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                fill="none" 
              />
            )}
          </g>

          {/* Shiny gold shield emblem on chest */}
          <path 
            d="M60 66 L65 62 L60 58 L55 62 Z" 
            fill="#F59E0B" 
            className={`transition-all duration-300 origin-center ${isHovered ? 'rotate-12 scale-110' : ''}`}
          />
          <circle cx="60" cy="62" r="1.2" fill="#FFF" />

          {/* Stubby Legs (Do a tiny run action when hovered) */}
          <rect 
            x="48" 
            y="90" 
            width="8" 
            height="14" 
            rx="4" 
            fill="#9F1239" 
            className={`origin-top transition-transform duration-200 ${isHovered ? 'skew-x-12 translate-y-0.5' : ''}`}
          />
          <rect 
            x="64" 
            y="90" 
            width="8" 
            height="14" 
            rx="4" 
            fill="#9F1239" 
            className={`origin-top transition-transform duration-200 ${isHovered ? '-skew-x-12 translate-y-0.5' : ''}`}
          />
        </svg>
      </div>
    );
  }

  // BASE 2: MID SUPERHERO (INTERMEDIATE MODE - DIAGONAL FLYER)
  if (iconKey === 'mid') {
    return (
      <div 
        className="relative flex items-center justify-center cursor-pointer select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id="dynamic-superhero-mid"
      >
        {/* Animated 3D Glow Aura */}
        <div className={`absolute inset-0 rounded-full blur-xl opacity-35 transition-all duration-500 scale-125 ${
          isSelected 
            ? 'bg-amber-450 animate-pulse' 
            : isHovered 
            ? 'bg-amber-300 opacity-20 scale-110' 
            : 'bg-transparent'
        }`} />
        
        <svg 
          viewBox="0 0 120 120" 
          className={`w-20 h-20 relative z-10 transition-all duration-300 transform ${
            isSelected 
              ? 'scale-115 filter drop-shadow-[0_8px_16px_rgba(245,158,11,0.45)]' 
              : isHovered
              ? 'scale-110 filter drop-shadow-[0_6px_12px_rgba(245,158,11,0.25)]'
              : 'opacity-90'
          } ${microPulse ? 'animate-[mascot-jet-turbulent_1s_infinite_ease-in-out]' : 'animate-[mascot-jet-gentle_4s_infinite_ease-in-out]'}`}
        >
          <defs>
            <linearGradient id="mid-cape" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="mid-helmet" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <radialGradient id="mid-face" cx="45%" cy="30%" r="55%" fx="35%" fy="20%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="65%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </radialGradient>
            <radialGradient id="mid-cheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="mid-wing" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Dynamic Flying Cape blowing behind diagonally */}
          <path 
            d="M52 48 C20 54, 8 82, 10 98 C30 84, 48 72, 64 64 Z" 
            fill="url(#mid-cape)" 
            className={`transition-all duration-300 origin-center ${
              isHovered ? 'scale-x-110 -skew-y-3' : ''
            }`}
          />
          <path 
            d="M48 50 C24 54, 16 75, 18 90 C32 80, 46 70, 56 64 Z" 
            fill="#D97706" 
            opacity="0.3"
          />

          {/* Legs trailing behind in flying pose (flutter kick on hover!) */}
          <path 
            d={isHovered ? "M42 58 L14 74 M50 62 L22 84" : "M42 58 L18 72 M50 62 L26 78"} 
            stroke="#B45309" 
            strokeWidth="7" 
            strokeLinecap="round" 
            className="transition-all duration-300"
          />
          {/* Cute boots */}
          <circle 
            cx={isHovered ? 14 : 18} 
            cy={isHovered ? 74 : 72} 
            r="5.5" 
            fill="#D97706" 
            className="transition-all duration-300" 
          />
          <circle 
            cx={isHovered ? 22 : 26} 
            cy={isHovered ? 84 : 78} 
            r="5.5" 
            fill="#D97706" 
            className="transition-all duration-300" 
          />

          {/* Diagonal Torso/Body */}
          <path 
            d="M38 58 L62 40" 
            stroke="url(#mid-helmet)" 
            strokeWidth="24" 
            strokeLinecap="round" 
            className="transition-colors duration-300"
          />

          {/* Golden Chubby Flying Head (Subtle tilt) */}
          <g className={`transition-transform duration-300 origin-[74px_34px] ${isHovered ? 'rotate-6' : ''}`}>
            <circle 
              cx="74" 
              cy="34" 
              r="24" 
              fill="url(#mid-face)" 
            />

            {/* Flying Helmet with Winglets */}
            <path 
              d="M74 10 C58 10, 50 18, 50 34 C50 40, 54 44, 58 42 C64 40, 68 32, 74 32 C80 32, 84 40, 90 42 C94 44, 98 40, 98 34 C98 18, 90 10, 74 10 Z" 
              fill="url(#mid-helmet)"
            />
            
            {/* Winglet Accent (Wiggle/rotate on hover) */}
            <g className={`transition-transform duration-300 origin-[52px_26px] ${isHovered ? '-rotate-12 scale-110' : ''}`}>
              <path 
                d="M52 26 C40 22, 42 12, 54 16 Z" 
                fill="url(#mid-wing)" 
              />
              <path 
                d="M51 24 L42 20 L46 25 Z" 
                fill="#F59E0B" 
              />
            </g>

            {/* Soft blush cheeks */}
            <circle cx="62" cy="40" r="5" fill="url(#mid-cheek)" />
            <circle cx="86" cy="40" r="5" fill="url(#mid-cheek)" />

            {/* ================= DYNAMIC EXPRESSIVE EYES ================= */}
            {activeExpression === 'blink' ? (
              <>
                <path d="M61 31 Q66 26 71 31" stroke="#B45309" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M83 31 Q88 26 93 31" stroke="#B45309" strokeWidth="3" strokeLinecap="round" fill="none" />
              </>
            ) : activeExpression === 'wink' ? (
              <>
                <path d="M61 31 Q66 26 71 31" stroke="#B45309" strokeWidth="3" strokeLinecap="round" fill="none" />
                
                {/* Determined right eye open */}
                <ellipse cx="88" cy="31" rx="5" ry="6" fill="#FFFFFF" />
                <ellipse cx="87" cy="31" rx="3.5" ry="4" fill="#B45309" />
                <polygon points="87,27 88.2,29.5 90.5,29.5 88.5,31 89.5,33 87,31.8 84.5,33 85.5,31 83.5,29.5 85.8,29.5" fill="#FFFFFF" />
              </>
            ) : activeExpression === 'funny' ? (
              // Happy winking cheeky tongue-out pose
              <>
                <path d="M61 31 Q66 26 71 31" stroke="#B45309" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Huge giant wide right eye */}
                <ellipse cx="88" cy="31" rx="6" ry="6" fill="#FFFFFF" />
                <circle cx="88" cy="31" r="3" fill="#B45309" />
                <circle cx="87.5" cy="29.5" r="1" fill="#FFFFFF" />
              </>
            ) : activeExpression === 'excited' ? (
              // Energetic blazing lightning eyes!
              <>
                <ellipse cx="66" cy="31" rx="5" ry="6" fill="#FFFFFF" />
                <ellipse cx="88" cy="31" rx="5" ry="6" fill="#FFFFFF" />
                {/* Golden lightning strikes over eyes */}
                <path d="M68 25 L62 31 H68 L64 37" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M90 25 L84 31 H90 L86 37" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              // NORMAL STATE
              <>
                <ellipse cx="66" cy="31" rx="5" ry="6" fill="#FFFFFF" />
                <ellipse cx="88" cy="31" rx="5" ry="6" fill="#FFFFFF" />
                <ellipse cx="67" cy="31" rx="3.5" ry="4" fill="#B45309" />
                <ellipse cx="87" cy="31" rx="3.5" ry="4" fill="#B45309" />
                {/* Reflections */}
                <circle cx="65" cy="29" r="1.5" fill="#FFFFFF" />
                <circle cx="68" cy="32" r="0.6" fill="#FFFFFF" />
                <circle cx="85" cy="29" r="1.5" fill="#FFFFFF" />
                <circle cx="88" cy="32" r="0.6" fill="#FFFFFF" />
              </>
            )}

            {/* Confident gentle brow lines (wiggle slightly) */}
            <path 
              d="M62 23 Q67 21 72 24" 
              stroke="#B45309" 
              strokeWidth="2" 
              strokeLinecap="round" 
              fill="none" 
              className={`transition-all duration-300 ${isHovered ? '-translate-y-0.5' : ''}`}
            />
            <path 
              d="M82 23 Q87 21 92 24" 
              stroke="#B45309" 
              strokeWidth="2" 
              strokeLinecap="round" 
              fill="none" 
              className={`transition-all duration-300 ${isHovered ? '-translate-y-0.5' : ''}`}
            />

            {/* ================= DYNAMIC EXPRESSIVE MOUTH ================= */}
            {isHovered || activeExpression === 'funny' ? (
              // Funny wide grin/giggle with tongue!
              <g>
                <path d="M68 41 Q75 49 82 41 Z" fill="#B45309" />
                <path d="M72 44 Q75 41 78 44 Q75 47 72 44" fill="#FB7185" />
              </g>
            ) : (
              // Confident happy mouth
              <path 
                d="M70 42 Q75 47 80 42" 
                stroke="#B45309" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                fill="none" 
              />
            )}
          </g>

          {/* Glowing Lightning emblem on chest */}
          <path 
            d="M52 46 L46 51 H54 L48 57" 
            stroke="#FFFFFF" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
            className={`origin-center ${
              isHovered ? 'animate-pulse' : ''
            }`}
          />

          {/* Superhero Punching Fist Arm (Thrust forward dynamic extension on hover!) */}
          <path 
            d={isHovered ? "M74 38 L104 50" : "M74 38 L98 48"} 
            stroke="url(#mid-helmet)" 
            strokeWidth="7" 
            strokeLinecap="round" 
            className="transition-all duration-200"
          />
          {/* Fist */}
          <circle 
            cx={isHovered ? 104 : 98} 
            cy={isHovered ? 50 : 48} 
            r={isHovered ? "6" : "5"} 
            fill="#FCD34D" 
            className="transition-all duration-200" 
          />
        </svg>
      </div>
    );
  }

  // BASE 3: HIGH SUPERHERO (ADVANCED/EXPERT MODE - ROYAL FLOATER)
  return (
    <div 
      className="relative flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="dynamic-superhero-high"
    >
      {/* Animated 3D Glow Aura */}
      <div className={`absolute inset-0 rounded-full blur-xl opacity-35 transition-all duration-500 scale-125 ${
        isSelected 
          ? 'bg-indigo-500 animate-pulse' 
          : isHovered 
          ? 'bg-indigo-300 opacity-25 scale-115' 
          : 'bg-transparent'
      }`} />
      
      <svg 
        viewBox="0 0 120 120" 
        className={`w-20 h-20 relative z-10 transition-all duration-300 transform ${
          isSelected 
            ? 'scale-115 filter drop-shadow-[0_8px_16px_rgba(99,75,241,0.5)]' 
            : isHovered
            ? 'scale-110 filter drop-shadow-[0_6px_12px_rgba(99,75,241,0.25)]'
            : 'opacity-90'
        } ${microPulse ? 'animate-[mascot-float-extreme_2s_infinite_ease-in-out]' : 'animate-[mascot-float-noble_5s_infinite_ease-in-out]'}`}
      >
        <defs>
          <linearGradient id="high-cape" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="40%" stopColor="#634BF1" />
            <stop offset="100%" stopColor="#1E1054" />
          </linearGradient>
          <linearGradient id="high-cowl" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <radialGradient id="high-face" cx="50%" cy="32%" r="55%" fx="35%" fy="22%">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="60%" stopColor="#C7D2FE" />
            <stop offset="100%" stopColor="#818CF8" />
          </radialGradient>
          <radialGradient id="high-cheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="high-crown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Majestic Grand Billowing Cape */}
        <path 
          d="M60 38 C24 40, 10 88, 14 112 C44 116, 76 116, 106 112 C110 88, 96 40, 60 38 Z" 
          fill="url(#high-cape)" 
          className={`transition-all duration-300 origin-center ${
            isHovered ? 'skew-x-3 text-cyan-200' : ''
          }`}
        />
        {/* Shading/Creases for 3D Volume */}
        <path 
          d="M60 38 C40 40, 24 78, 28 111 C46 113, 74 113, 92 111 C96 78, 80 40, 60 38 Z" 
          fill="#4F34DA" 
          opacity="0.32"
        />

        {/* Levitating Glow Ring (Vibrates and pulses dynamically!) */}
        <ellipse 
          cx="60" 
          cy="112" 
          rx={isHovered ? "26" : "22"} 
          ry="4" 
          fill="#634BF1" 
          opacity={isHovered ? "0.6" : "0.4"} 
          className="transition-all duration-200 animate-pulse"
        />

        {/* Strong Mascot Body */}
        <path 
          d="M44 58 L76 58 L70 88 L50 88 Z" 
          fill="url(#high-cowl)" 
          className="transition-all duration-300"
        />

        {/* Arm crossing chest (Transforms to high-IQ finger-to-head or happy high-five pose on hover) */}
        {isHovered ? (
          // Dynamic celebratory "High-Five" / wave arm!
          <g className="transition-all duration-300">
            {/* Left arm waving */}
            <path d="M42 64 C24 55, 20 40, 32 32" stroke="url(#high-cowl)" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="32" cy="32" r="5" fill="#38BDF8" />
            {/* Right arm folded */}
            <path d="M78 64 C90 64, 88 78, 66 78" stroke="url(#high-cowl)" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="66" cy="78" r="4.5" fill="#38BDF8" />
          </g>
        ) : (
          // Stately folded arms
          <g>
            <path d="M42 64 C30 64, 32 78, 54 78" stroke="url(#high-cowl)" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M78 64 C90 64, 88 78, 66 78" stroke="url(#high-cowl)" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Glowing blue fist-covers */}
            <circle cx="54" cy="78" r="4.5" fill="#38BDF8" />
            <circle cx="66" cy="78" r="4.5" fill="#38BDF8" />
          </g>
        )}

        {/* Deep Intelligent Mascot Head */}
        <g className={`transition-transform duration-300 origin-[60px_40px] ${isHovered ? '-rotate-3 scale-102' : ''}`}>
          <circle 
            cx="60" 
            cy="40" 
            r="23" 
            fill="url(#high-face)" 
          />

          {/* Regal Mask-Crown Cowl Helmet */}
          <path 
            d="M60 17 C45 17, 37 25, 37 40 C37 46, 41 48, 45 46 C49 44, 53 38, 60 38 C67 38, 71 44, 75 46 C79 48, 83 46, 83 40 C83 25, 75 17, 60 17 Z" 
            fill="url(#high-cowl)"
          />
          
          {/* beautiful Crown Emblem (Gleams of luxury on hover) */}
          <g className={`transition-transform duration-300 origin-[60px_17px] ${isHovered ? 'scale-110 -translate-y-1' : ''}`}>
            <path 
              d="M50 17 L54 6 L60 12 L66 6 L70 17 Z" 
              fill="url(#high-crown)" 
            />
            <circle cx="60" cy="15" r="2" fill="#FFFFFF" />
          </g>

          {/* Adorable pink blush dots */}
          <circle cx="45" cy="44" r="5" fill="url(#high-cheek)" />
          <circle cx="75" cy="44" r="5" fill="url(#high-cheek)" />

          {/* ================= DYNAMIC EXPRESSIVE EYES ================= */}
          {activeExpression === 'blink' ? (
            <>
              <path d="M44 35 Q49 30 54 35" stroke="#312E81" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M66 35 Q71 30 76 35" stroke="#312E81" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : activeExpression === 'wink' ? (
            <>
              <path d="M44 35 Q49 30 54 35" stroke="#312E81" strokeWidth="3" strokeLinecap="round" fill="none" />
              
              {/* Intelligent Right Eye */}
              <ellipse cx="71" cy="35" rx="5" ry="6" fill="#FFFFFF" />
              <ellipse cx="71" cy="35" rx="3.5" ry="4" fill="#312E81" />
              <polygon points="71,31 72,33 74,33 72.5,34 73,36 71,35 69,36 69.5,34 68,33 70,33" fill="#38BDF8" className="animate-spin duration-3000" />
            </>
          ) : activeExpression === 'funny' ? (
            // Intellectual "Nerd" emoji mode with gold-rim spectacles!
            <>
              <ellipse cx="49" cy="35" rx="5" ry="5" fill="#FFFFFF" />
              <ellipse cx="71" cy="35" rx="5" ry="5" fill="#FFFFFF" />
              <circle cx="48" cy="35" r="2.5" fill="#312E81" />
              <circle cx="70" cy="35" r="2.5" fill="#312E81" />
              {/* Specular Glints */}
              <circle cx="47.2" cy="33.8" r="0.8" fill="#FFFFFF" />
              <circle cx="69.2" cy="33.8" r="0.8" fill="#FFFFFF" />
              {/* Gold Spectacles frame bridge and circles */}
              <circle cx="49" cy="35" r="6" stroke="#FCD34D" strokeWidth="1.5" fill="none" />
              <circle cx="71" cy="35" r="6" stroke="#FCD34D" strokeWidth="1.5" fill="none" />
              <path d="M55 35 Q60 38 65 35" stroke="#FCD34D" strokeWidth="1.5" fill="none" />
            </>
          ) : activeExpression === 'excited' ? (
            // Ultimate cosmic-energy starry eyes!
            <>
              <ellipse cx="49" cy="35" rx="6" ry="6" fill="#FFFFFF" />
              <ellipse cx="71" cy="35" rx="6" ry="6" fill="#FFFFFF" />
              <ellipse cx="49" cy="35" rx="4.5" ry="4.5" fill="#634BF1" />
              <ellipse cx="71" cy="35" rx="4.5" ry="4.5" fill="#634BF1" />
              {/* Star details inside */}
              <path d="M49 31.5 L50.2 34 L52.7 34 L50.7 35.5 L51.5 38 L49 36.5 L46.5 38 L47.3 35.5 L45.3 34 L47.8 34 Z" fill="#FFFFFF" />
              <path d="M71 31.5 L72.2 34 L74.7 34 L72.7 35.5 L73.5 38 L71 36.5 L68.5 38 L69.3 35.5 L67.3 34 L69.8 34 Z" fill="#FFFFFF" />
            </>
          ) : (
            // NORMAL STATE
            <>
              <ellipse cx="49" cy="35" rx="5" ry="6" fill="#FFFFFF" />
              <ellipse cx="71" cy="35" rx="5" ry="6" fill="#FFFFFF" />
              <ellipse cx="49" cy="35" rx="3.5" ry="4" fill="#312E81" />
              <ellipse cx="71" cy="35" rx="3.5" ry="4" fill="#312E81" />
              {/* Dual reflections */}
              <circle cx="47.5" cy="33" r="1.5" fill="#FFFFFF" />
              <circle cx="50.2" cy="36" r="0.6" fill="#FFFFFF" />
              <circle cx="69.5" cy="33" r="1.5" fill="#FFFFFF" />
              <circle cx="72.2" cy="36" r="0.6" fill="#FFFFFF" />
            </>
          )}

          {/* ================= DYNAMIC EXPRESSIVE MOUTH ================= */}
          {isHovered || activeExpression === 'excited' || activeExpression === 'funny' ? (
            // Open laughing smile
            <g>
              <path d="M53 45 Q60 53 67 45 Z" fill="#312E81" />
              <path d="M56 48 Q60 46 64 48 Q60 51 56 48" fill="#FCA5A5" />
            </g>
          ) : (
            // Standard confident smile
            <path 
              d="M54 46 Q60 51 66 46" 
              stroke="#312E81" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              fill="none" 
            />
          )}
        </g>

        {/* Sparkling golden star on chest */}
        <path 
          d="M60 60 L62 64 L66 64 L63 67 L65 71 L60 69 L55 71 L57 67 L54 64 L58 64 Z" 
          fill="#FCD34D" 
          className={`origin-center ${isHovered ? 'animate-spin scale-125' : 'animate-pulse'}`}
          style={{ animationDuration: isHovered ? '1s' : '2s' }}
        />

        {/* Strong stance legs apart (levitating flutter kick on hover!) */}
        <path 
          d={isHovered ? "M48 88 L44 110 M72 88 L76 110" : "M48 88 L42 108 M72 88 L78 108"} 
          stroke="#1E1054" 
          strokeWidth="5" 
          strokeLinecap="round" 
          className="transition-all duration-300"
        />
        <circle 
          cx={isHovered ? 44 : 42} 
          cy={isHovered ? 110 : 108} 
          r="4.5" 
          fill="#312E81" 
          className="transition-all duration-300" 
        />
        <circle 
          cx={isHovered ? 76 : 78} 
          cy={isHovered ? 110 : 108} 
          r="4.5" 
          fill="#312E81" 
          className="transition-all duration-300" 
        />
      </svg>
    </div>
  );
}
