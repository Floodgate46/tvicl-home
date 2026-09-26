import React, { useState } from 'react';

export interface TVICLLogoProps {
  /**
   * Layout format:
   * - 'horizontal': Official complete logo (emblem + TVICL typography)
   * - 'stacked': Centered emblem above TVICL wordmark
   * - 'mark-only': Only the golden architectural emblem crest
   * - 'full': Complete corporate lockup
   */
  variant?: 'horizontal' | 'stacked' | 'mark-only' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const TVICL_LOGO_URL = 'https://0oxbdigmvuxutmrq.public.blob.vercel-storage.com/tvicl-logo';

/**
 * TVICL Official Corporate Logo
 * The Valley Investment Company Limited
 * 
 * Powered directly by the official high-resolution corporate logo asset:
 * https://0oxbdigmvuxutmrq.public.blob.vercel-storage.com/tvicl-logo
 */
export const TVICLLogo: React.FC<TVICLLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const [logoSrc, setLogoSrc] = useState<string>('/tvicl-logo-trimmed.png');
  const [markSrc, setMarkSrc] = useState<string>('/tvicl-mark.png');
  const [textSrc, setTextSrc] = useState<string>('/tvicl-text.png');

  // Height mappings for horizontal and full variants (aspect ratio ~ 3.56:1)
  const horizontalHeightMap = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  // Height mappings for mark-only variant (aspect ratio ~ 0.84:1)
  const markHeightMap = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  // Height mappings for wordmark text in stacked layout
  const textHeightMap = {
    sm: 'h-4 sm:h-5',
    md: 'h-6 sm:h-7',
    lg: 'h-8 sm:h-9',
    xl: 'h-10 sm:h-12',
  };

  // Mark-only layout (avatars, notification badges, particle concepts)
  if (variant === 'mark-only') {
    return (
      <div className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>
        <img
          src={markSrc}
          alt="TVICL Crest"
          className={`${markHeightMap[size]} w-auto object-contain transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]`}
          onError={() => {
            // Fallback to full logo if mark file isn't loaded
            setMarkSrc(TVICL_LOGO_URL);
          }}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // Stacked layout (Centered emblem crest with wordmark below)
  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center justify-center text-center ${className}`}>
        <img
          src={markSrc}
          alt="TVICL Crest"
          className={`${markHeightMap[size]} w-auto object-contain transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]`}
          onError={() => setMarkSrc(TVICL_LOGO_URL)}
          loading="eager"
          decoding="async"
        />
        <div className="mt-2 flex flex-col items-center">
          <img
            src={textSrc}
            alt="The Valley Investment Company Limited"
            className={`${textHeightMap[size]} w-auto object-contain`}
            onError={() => setTextSrc(TVICL_LOGO_URL)}
            loading="eager"
            decoding="async"
          />
          {showSubtitle && (
            <span
              className="text-[9px] sm:text-[10px] tracking-[0.24em] font-sans uppercase text-[#bfa15f] mt-1 opacity-90"
            >
              The Valley Investment Company Limited
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal or Full lockup: Render the official trimmed logo
  return (
    <div className={`inline-flex items-center group flex-shrink-0 ${className}`}>
      <img
        src={logoSrc}
        alt="TVICL - The Valley Investment Company Limited"
        className={`${horizontalHeightMap[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]`}
        onError={() => {
          // Fallback to the direct Vercel blob URL
          if (logoSrc !== TVICL_LOGO_URL) {
            setLogoSrc(TVICL_LOGO_URL);
          }
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
