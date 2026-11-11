import React, { useEffect, useRef, useState } from 'react';
import {
  CategoryId,
  HERO_CAROUSEL_CARDS,
  UI_STRINGS,
  buildRoundedQuadPath,
  computeCardCylinderGeometry,
} from '../utils/storeLogic';
import { BloomyLogo } from './BloomyLogo';

interface HeroStageProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToCatalog: (category?: CategoryId) => void;
  onScrollToSection: (sectionId: string) => void;
}

const CARD_PITCH = 242;
const NUM_CARDS = HERO_CAROUSEL_CARDS.length; // 10
const TOTAL_SPAN = CARD_PITCH * NUM_CARDS; // 2420u
const AUTO_SPEED_U_PER_SEC = 50;

export const HeroStage: React.FC<HeroStageProps> = ({
  cartCount,
  onOpenCart,
  onScrollToCatalog,
  onScrollToSection,
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mobileBandRef = useRef<HTMLDivElement | null>(null);

  // Refs for desktop card elements
  const desktopCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Refs for mobile card elements
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [videosReady, setVideosReady] = useState<boolean[]>(() =>
    Array(NUM_CARDS).fill(false)
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  // Carousel physics state stored in ref to avoid React re-renders at 60fps
  const physicsRef = useRef({
    offsetU: 0,
    velocityU: 0,
    dragging: false,
    lastPointerX: 0,
    lastMoveTime: 0,
    lastClockTime: 0,
    unitPxDesktop: 1,
    unitPxMobile: 1,
  });

  // Entrance Web Animations sequence + reduced motion check
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);

    if (!mq.matches && stageRef.current) {
      const root = stageRef.current;
      const navEl = root.querySelector('[data-anim="nav"]');
      const badgeEl = root.querySelector('[data-anim="badge"]');
      const hLine1 = root.querySelector('[data-anim="h1"]');
      const hLine2 = root.querySelector('[data-anim="h2"]');
      const subEl = root.querySelector('[data-anim="sub"]');
      const cardsEl = root.querySelector('[data-anim="cards"]');
      const ctaEl = root.querySelector('[data-anim="cta"]');
      const notesEls = root.querySelectorAll('[data-anim="note"]');
      const strokePaths = root.querySelectorAll<SVGPathElement>('[data-anim="stroke"]');

      const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)';

      navEl?.animate(
        [
          { transform: 'translateY(-24px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 },
        ],
        { duration: 600, easing: easeOut, fill: 'both' }
      );

      badgeEl?.animate(
        [
          { transform: 'scale(0.82)', opacity: 0 },
          { transform: 'scale(1)', opacity: 1 },
        ],
        { duration: 520, delay: 110, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'both' }
      );

      hLine1?.animate(
        [
          { transform: 'translateY(28px)', filter: 'blur(8px)', opacity: 0 },
          { transform: 'translateY(0)', filter: 'blur(0px)', opacity: 1 },
        ],
        { duration: 680, delay: 180, easing: easeOut, fill: 'both' }
      );

      hLine2?.animate(
        [
          { transform: 'translateY(28px)', filter: 'blur(8px)', opacity: 0 },
          { transform: 'translateY(0)', filter: 'blur(0px)', opacity: 1 },
        ],
        { duration: 680, delay: 270, easing: easeOut, fill: 'both' }
      );

      subEl?.animate(
        [
          { transform: 'translateY(18px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 },
        ],
        { duration: 620, delay: 370, easing: easeOut, fill: 'both' }
      );

      cardsEl?.animate(
        [
          { transform: 'translateY(48px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 },
        ],
        { duration: 760, delay: 420, easing: easeOut, fill: 'both' }
      );

      ctaEl?.animate(
        [
          { transform: 'scale(0.86)', opacity: 0 },
          { transform: 'scale(1)', opacity: 1 },
        ],
        { duration: 560, delay: 540, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'both' }
      );

      notesEls.forEach((el, idx) => {
        el.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 500, delay: 620 + idx * 90, easing: easeOut, fill: 'both' }
        );
      });

      strokePaths.forEach((pathEl, idx) => {
        try {
          const len = pathEl.getTotalLength() || 180;
          pathEl.style.strokeDasharray = `${len}`;
          pathEl.style.strokeDashoffset = `${len}`;
          pathEl.animate(
            [{ strokeDashoffset: `${len}` }, { strokeDashoffset: '0' }],
            { duration: 750, delay: 650 + idx * 70, easing: easeOut, fill: 'forwards' }
          );
        } catch {
          // Ignore if SVG is hidden on current breakpoint
        }
      });
    }

    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Main Web Animations clock driving the 10-card cylindrical carousel
  useEffect(() => {
    const clockAnim = document.documentElement.animate([], { duration: 1e9 });
    let rafId = 0;

    const updateScaleFactors = () => {
      const vw = window.innerWidth;
      physicsRef.current.unitPxDesktop = vw / 1440;
      physicsRef.current.unitPxMobile = vw / 640;
    };

    updateScaleFactors();
    window.addEventListener('resize', updateScaleFactors);

    const renderCardsForViewport = (
      isMobile: boolean,
      uPx: number,
      cardElements: (HTMLDivElement | null)[]
    ) => {
      const offsetU = physicsRef.current.offsetU;

      for (let i = 0; i < NUM_CARDS; i++) {
        const cardEl = cardElements[i];
        if (!cardEl) continue;

        // Compute unpushed offset t wrapped seamlessly into [-TOTAL_SPAN/2, +TOTAL_SPAN/2]
        const rawT = i * CARD_PITCH - offsetU;
        let t = (rawT + TOTAL_SPAN / 2) % TOTAL_SPAN;
        if (t < 0) t += TOTAL_SPAN;
        t -= TOTAL_SPAN / 2;

        // Visibility culling across full-width stage
        if (Math.abs(t) > 1050) {
          cardEl.style.display = 'none';
          continue;
        }
        cardEl.style.display = 'block';

        const geom = computeCardCylinderGeometry(t);
        const wPx = geom.width * uPx;
        const leftHPx = geom.leftHeight * uPx;
        const rightHPx = geom.rightHeight * uPx;
        const maxHPx = geom.maxHeight * uPx;
        const rPx = 15 * uPx;

        // On mobile 640u band, center at x=320u and vertical center of 260px band
        const leftPx = isMobile
          ? (320 + (geom.centerX - 720) - geom.width / 2) * uPx
          : (geom.centerX - geom.width / 2) * uPx;

        const topPx = isMobile
          ? 130 - maxHPx / 2 - 12 * geom.d * geom.d * uPx
          : (geom.centerY - geom.maxHeight / 2) * uPx;

        const pathStr = buildRoundedQuadPath(wPx, leftHPx, rightHPx, rPx);

        cardEl.style.width = `${wPx.toFixed(2)}px`;
        cardEl.style.height = `${maxHPx.toFixed(2)}px`;
        cardEl.style.transform = `translate3d(${leftPx.toFixed(2)}px, ${topPx.toFixed(2)}px, 0)`;
        cardEl.style.clipPath = `path('${pathStr}')`;
      }
    };

    const tick = () => {
      const nowMs = Number(clockAnim.currentTime ?? performance.now());
      const prevMs = physicsRef.current.lastClockTime || nowMs;
      const dt = Math.min(0.1, Math.max(0, (nowMs - prevMs) / 1000));
      physicsRef.current.lastClockTime = nowMs;

      if (!physicsRef.current.dragging) {
        if (!reducedMotion) {
          physicsRef.current.offsetU +=
            (AUTO_SPEED_U_PER_SEC + physicsRef.current.velocityU) * dt;
        } else {
          physicsRef.current.offsetU += physicsRef.current.velocityU * dt;
        }
        // Velocity decays ~95% per second: (1 - 0.95)^dt = 0.05^dt
        physicsRef.current.velocityU *= Math.pow(0.05, dt);
        if (Math.abs(physicsRef.current.velocityU) < 0.5) {
          physicsRef.current.velocityU = 0;
        }
      }

      const isMobile = window.innerWidth <= 820;
      if (isMobile) {
        renderCardsForViewport(
          true,
          physicsRef.current.unitPxMobile,
          mobileCardRefs.current
        );
      } else {
        renderCardsForViewport(
          false,
          physicsRef.current.unitPxDesktop,
          desktopCardRefs.current
        );
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clockAnim.cancel();
      window.removeEventListener('resize', updateScaleFactors);
    };
  }, [reducedMotion]);

  // Pointer drag handlers for 1:1 dragging and momentum coasting
  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    isMobileBand: boolean
  ) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    physicsRef.current.dragging = true;
    physicsRef.current.velocityU = 0;
    physicsRef.current.lastPointerX = e.clientX;
    physicsRef.current.lastMoveTime = performance.now();
    setIsDragging(true);
    void isMobileBand;
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
    isMobileBand: boolean
  ) => {
    if (!physicsRef.current.dragging) return;
    const now = performance.now();
    const dxPx = e.clientX - physicsRef.current.lastPointerX;
    const dt = Math.max(0.004, (now - physicsRef.current.lastMoveTime) / 1000);

    const scaleU = isMobileBand
      ? physicsRef.current.unitPxMobile
      : physicsRef.current.unitPxDesktop;
    const du = -dxPx / (scaleU || 1);

    physicsRef.current.offsetU += du;
    physicsRef.current.velocityU = du / dt;
    physicsRef.current.lastPointerX = e.clientX;
    physicsRef.current.lastMoveTime = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!physicsRef.current.dragging) return;
    physicsRef.current.dragging = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const markVideoReady = (idx: number) => {
    setVideosReady((prev) => {
      if (prev[idx]) return prev;
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  return (
    <section
      aria-label="Bloomy Hero Showcase"
      className="relative w-full bg-[#F5F8EF] text-[#101410] overflow-hidden select-none"
    >
      {/* =====================================================================
          DESKTOP FULL-WIDTH 1440×1080 PROPORTIONAL STAGE (> 820px)
          ===================================================================== */}
      <div className="hidden min-[821px]:flex w-full justify-center items-center">
        <div
          ref={stageRef}
          className="relative w-full overflow-hidden shrink-0"
          style={{
            width: 'calc(1440 * var(--u))',
            height: 'calc(1080 * var(--u))',
          }}
        >
          {/* TOP BAR */}
          <header data-anim="nav" className="absolute inset-x-0 top-0 h-[calc(100*var(--u))] z-20">
            {/* Logo at (37, 36) */}
            <a
              href="#top"
              aria-label="Bloomy Home"
              className="absolute flex items-center focus-visible:outline-2 focus-visible:outline-[#08482D] rounded-md"
              style={{
                left: 'calc(37 * var(--u))',
                top: 'calc(30 * var(--u))',
                fontSize: 'calc(30 * var(--u))',
              }}
            >
              <BloomyLogo variant="light" />
            </a>

            {/* Nav starting at x = 440 with a 28u gap, Inter 16.4u */}
            <nav
              aria-label="Primary Navigation"
              className="absolute flex items-center text-[#101410] font-medium"
              style={{
                left: 'calc(440 * var(--u))',
                top: 'calc(38 * var(--u))',
                gap: 'calc(28 * var(--u))',
                fontSize: 'calc(16.4 * var(--u))',
                lineHeight: 1.2,
              }}
            >
              <button
                type="button"
                onClick={() => onScrollToCatalog('Indoor Plants')}
                className="hover:text-[#08482D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {UI_STRINGS.navShopPlants}
              </button>
              <button
                type="button"
                onClick={() => onScrollToCatalog('Trees')}
                className="hover:text-[#08482D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {UI_STRINGS.navTreesFlowers}
              </button>
              <button
                type="button"
                onClick={() => onScrollToCatalog('Pots & Accessories')}
                className="hover:text-[#08482D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {UI_STRINGS.navPots}
              </button>
              <button
                type="button"
                onClick={() => onScrollToSection('commercial-callout')}
                className="hover:text-[#08482D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {UI_STRINGS.navCommercial}
              </button>
              <button
                type="button"
                onClick={() => onScrollToSection('care-free-strip')}
                className="hover:text-[#08482D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {UI_STRINGS.navDelivery}
              </button>
            </nav>

            {/* White "Cart (0)" pill, 102×40 at (1196, 29) */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className="absolute bg-white hover:bg-[#EDF3E4] text-[#101410] font-medium rounded-full flex items-center justify-center transition-colors border border-[#101410]/10 cursor-pointer whitespace-nowrap"
              style={{
                left: 'calc(1196 * var(--u))',
                top: 'calc(29 * var(--u))',
                width: 'calc(102 * var(--u))',
                height: 'calc(40 * var(--u))',
                fontSize: 'calc(15.2 * var(--u))',
              }}
            >
              {UI_STRINGS.cartLabel} ({cartCount})
            </button>

            {/* Forest-green "Shop Now" pill, 105×40 at (1308, 29) */}
            <button
              type="button"
              onClick={() => onScrollToCatalog('All')}
              className="absolute bg-[#08482D] hover:bg-[#0B5E3B] text-[#F5F8EF] font-medium rounded-full flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap"
              style={{
                left: 'calc(1308 * var(--u))',
                top: 'calc(29 * var(--u))',
                width: 'calc(105 * var(--u))',
                height: 'calc(40 * var(--u))',
                fontSize: 'calc(15.2 * var(--u))',
              }}
            >
              {UI_STRINGS.shopNow}
            </button>
          </header>

          {/* MINT BADGE at (560, 115), min 320×37 */}
          <div
            data-anim="badge"
            className="absolute bg-[#DAE7C7] text-[#08482D] font-medium rounded-full flex items-center justify-center whitespace-nowrap"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: 'calc(115 * var(--u))',
              minWidth: 'calc(320 * var(--u))',
              paddingLeft: 'calc(18 * var(--u))',
              paddingRight: 'calc(18 * var(--u))',
              height: 'calc(37 * var(--u))',
              fontSize: 'calc(16.6 * var(--u))',
              letterSpacing: '-0.01em',
            }}
          >
            {UI_STRINGS.heroBadge}
          </div>

          {/* HEADLINE: Centred, top 176, Inter Tight 700, 88u on 92u line */}
          <h1
            className="absolute inset-x-0 text-center font-display font-bold text-[#101410] pointer-events-none"
            style={{
              top: 'calc(176 * var(--u))',
              fontSize: 'calc(88 * var(--u))',
              lineHeight: 'calc(92 * var(--u))',
            }}
          >
            <span
              data-anim="h1"
              className="block"
              style={{ letterSpacing: '-0.035em' }}
            >
              {UI_STRINGS.heroHeadline1}
            </span>
            <span
              data-anim="h2"
              className="block"
              style={{ letterSpacing: '-0.022em' }}
            >
              {UI_STRINGS.heroHeadline2}
            </span>
          </h1>

          {/* SUBLINE: Centred, top 394, 20.8u / 32u, three lines in #5E5E61 */}
          <p
            data-anim="sub"
            className="absolute inset-x-0 text-center text-[#5E5E61] font-normal pointer-events-none"
            style={{
              top: 'calc(394 * var(--u))',
              fontSize: 'calc(20.8 * var(--u))',
              lineHeight: 'calc(32 * var(--u))',
            }}
          >
            <span className="block">{UI_STRINGS.heroSub1}</span>
            <span className="block">{UI_STRINGS.heroSub2}</span>
            <span className="block">{UI_STRINGS.heroSub3}</span>
          </p>

          {/* HAND-DRAWN NOTES & DOODLES (Caveat 600 in #08482D) */}
          {/* 1. "//" doodle at (263, 377) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 60 54"
            className="absolute pointer-events-none overflow-visible"
            style={{
              left: 'calc(263 * var(--u))',
              top: 'calc(377 * var(--u))',
              width: 'calc(44 * var(--u))',
              height: 'calc(40 * var(--u))',
            }}
          >
            <path
              data-anim="stroke"
              d="M 22 6 C 17 20, 11 33, 6 46"
              stroke="#08482D"
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              data-anim="stroke"
              d="M 40 4 C 35 18, 28 32, 23 45"
              stroke="#08482D"
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* 2. Handwritten "No watering, / no fading" rotated 16° at (1212, 310), with curving arrow starting BELOW the note */}
          <div
            data-anim="note"
            className="absolute pointer-events-none font-hand font-semibold text-[#08482D] text-center"
            style={{
              left: 'calc(1212 * var(--u))',
              top: 'calc(310 * var(--u))',
              transform: 'rotate(16deg)',
              transformOrigin: 'left top',
              fontSize: 'calc(26 * var(--u))',
              lineHeight: 'calc(26 * var(--u))',
            }}
          >
            <span className="block whitespace-nowrap">{UI_STRINGS.noteTopRight1}</span>
            <span className="block whitespace-nowrap">{UI_STRINGS.noteTopRight2}</span>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 120 150"
            className="absolute pointer-events-none overflow-visible"
            style={{
              left: 'calc(1205 * var(--u))',
              top: 'calc(382 * var(--u))',
              width: 'calc(105 * var(--u))',
              height: 'calc(130 * var(--u))',
            }}
          >
            <path
              data-anim="stroke"
              d="M 48 6 C 72 34, 76 82, 36 124"
              stroke="#08482D"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              data-anim="stroke"
              d="M 34 110 L 34 126 L 52 121"
              stroke="#08482D"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          {/* 3. "Order in a few taps" rotated 24° near (505, 937), with small arrow pointing cleanly to main CTA button */}
          <div
            data-anim="note"
            className="absolute pointer-events-none font-hand font-semibold text-[#08482D] whitespace-nowrap"
            style={{
              left: 'calc(422 * var(--u))',
              top: 'calc(914 * var(--u))',
              transform: 'rotate(24deg)',
              transformOrigin: 'center center',
              fontSize: 'calc(24.5 * var(--u))',
              lineHeight: 1,
            }}
          >
            {UI_STRINGS.noteBottom}
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 80 50"
            className="absolute pointer-events-none overflow-visible"
            style={{
              left: 'calc(558 * var(--u))',
              top: 'calc(918 * var(--u))',
              width: 'calc(54 * var(--u))',
              height: 'calc(36 * var(--u))',
            }}
          >
            <path
              data-anim="stroke"
              d="M 8 34 C 24 38, 40 32, 52 18"
              stroke="#08482D"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              data-anim="stroke"
              d="M 41 16 L 53 16 L 51 29"
              stroke="#08482D"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          {/* CURVED BOTANICAL VIDEO CAROUSEL ROW (10 wide cards, no play icons or labels) */}
          <div
            data-anim="cards"
            data-testid="hero-carousel-desktop"
            onPointerDown={(e) => handlePointerDown(e, false)}
            onPointerMove={(e) => handlePointerMove(e, false)}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute inset-x-0 top-0 bottom-0 w-full z-10 touch-pan-y ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {HERO_CAROUSEL_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  desktopCardRefs.current[i] = el;
                }}
                className="absolute top-0 left-0 overflow-hidden bg-[#CBE0B8] will-change-transform"
              >
                {/* Botanical Still Poster Layer */}
                <img
                  src={card.posterUrl}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Botanical Video Loop (no labels or play icons) */}
                {!reducedMotion && (
                  <video
                    ref={(el) => {
                      desktopVideoRefs.current[i] = el;
                    }}
                    src={card.videoUrl}
                    poster={card.posterUrl}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    onLoadedData={() => markVideoReady(i)}
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
                      videosReady[i] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* MAIN CTA BUTTON: Forest-green "Browse Collection" pill (186×58) inside dashed green outline ring (204×74) at (618, 901) */}
          <div
            data-anim="cta"
            className="absolute z-20 flex items-center justify-center rounded-full border-[1.5px] border-dashed border-[#08482D]"
            style={{
              left: 'calc(618 * var(--u))',
              top: 'calc(901 * var(--u))',
              width: 'calc(204 * var(--u))',
              height: 'calc(74 * var(--u))',
            }}
          >
            <button
              type="button"
              onClick={() => onScrollToCatalog('All')}
              className="bg-[#08482D] hover:bg-[#0B5E3B] active:scale-[0.98] text-[#F5F8EF] font-semibold rounded-full flex items-center justify-center transition-all cursor-pointer whitespace-nowrap"
              style={{
                width: 'calc(186 * var(--u))',
                height: 'calc(58 * var(--u))',
                fontSize: 'calc(17 * var(--u))',
                letterSpacing: '-0.01em',
              }}
            >
              {UI_STRINGS.browseCollection}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MOBILE LAYOUT (≤ 820px)
          ===================================================================== */}
      <div className="min-[821px]:hidden flex flex-col items-center px-4 pt-4 pb-8">
        {/* Mobile Top Bar: bloomy logo and Cart + Shop Now pills (English only) */}
        <header className="w-full flex items-center justify-between gap-2 pb-5">
          <a
            href="#top"
            aria-label="Bloomy Home"
            className="text-2xl flex items-center"
          >
            <BloomyLogo variant="light" />
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className="h-9 px-3.5 rounded-full bg-white border border-[#101410]/10 text-xs font-semibold text-[#101410] whitespace-nowrap"
            >
              {UI_STRINGS.cartLabel} ({cartCount})
            </button>

            <button
              type="button"
              onClick={() => onScrollToCatalog('All')}
              className="h-9 px-3.5 rounded-full bg-[#08482D] text-[#F5F8EF] text-xs font-semibold whitespace-nowrap"
            >
              {UI_STRINGS.shopNow}
            </button>
          </div>
        </header>

        {/* Stacked and centred copy: mint badge, headline (clamp(36px, 9vw, 54px)), and subline */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#DAE7C7] text-[#08482D] text-xs font-medium mb-4">
          {UI_STRINGS.heroBadge}
        </div>

        <h1
          className="font-display font-bold text-center text-[#101410] tracking-tight mb-3"
          style={{
            fontSize: 'clamp(36px, 9vw, 54px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          <span className="block">{UI_STRINGS.heroHeadline1}</span>
          <span className="block">{UI_STRINGS.heroHeadline2}</span>
        </h1>

        <p className="text-center text-[#5E5E61] text-sm leading-relaxed max-w-md mb-5">
          {UI_STRINGS.heroSub1} {UI_STRINGS.heroSub2} {UI_STRINGS.heroSub3}
        </p>

        {/* Mobile Hero Cards: 640-unit scale in a 260px-tall band, pure botanical video without play icons or names */}
        <div
          ref={mobileBandRef}
          data-testid="hero-carousel-mobile"
          onPointerDown={(e) => handlePointerDown(e, true)}
          onPointerMove={(e) => handlePointerMove(e, true)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-screen h-[260px] overflow-hidden my-2 touch-pan-y ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {HERO_CAROUSEL_CARDS.map((card, i) => (
            <div
              key={`mob-${card.id}`}
              ref={(el) => {
                mobileCardRefs.current[i] = el;
              }}
              className="absolute top-0 left-0 overflow-hidden bg-[#CBE0B8] will-change-transform"
            >
              <img
                src={card.posterUrl}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              {!reducedMotion && (
                <video
                  ref={(el) => {
                    mobileVideoRefs.current[i] = el;
                  }}
                  src={card.videoUrl}
                  poster={card.posterUrl}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Hero Bottom: Browse Collection button & "Order in a few taps" handwritten note */}
        <div className="relative mt-5 flex flex-col items-center">
          <div className="p-2 rounded-full border-[1.5px] border-dashed border-[#08482D]">
            <button
              type="button"
              onClick={() => onScrollToCatalog('All')}
              className="px-7 py-3.5 rounded-full bg-[#08482D] text-[#F5F8EF] font-semibold text-sm whitespace-nowrap"
            >
              {UI_STRINGS.browseCollection}
            </button>
          </div>
          <span className="font-hand font-semibold text-[#08482D] text-xl mt-2 -rotate-6">
            {UI_STRINGS.noteBottom} ↑
          </span>
        </div>
      </div>
    </section>
  );
};
