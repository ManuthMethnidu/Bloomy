import React from 'react';
import { Product } from '../utils/storeLogic';

interface BotanicalVisualProps {
  style: Product['botanicalStyle'];
  className?: string;
  viewVariant?: 'front' | 'detail';
}

export const BotanicalVisual: React.FC<BotanicalVisualProps> = ({
  style,
  className = '',
  viewVariant = 'front',
}) => {
  const isDetail = viewVariant === 'detail';

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-[#EEF3E7] ${className}`}
    >
      <svg
        viewBox={isDetail ? '80 60 240 240' : '0 0 400 420'}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        role="img"
        aria-label={`Studio view of ${style} botanical arrangement`}
      >
        <defs>
          <radialGradient id={`studioBg-${style}`} cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="#FAFDF6" />
            <stop offset="65%" stopColor="#ECF2E3" />
            <stop offset="100%" stopColor="#DFEAD1" />
          </radialGradient>
          <linearGradient id="sunlightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#08482D" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="leafDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B6644" />
            <stop offset="55%" stopColor="#0D4F32" />
            <stop offset="100%" stopColor="#06311E" />
          </linearGradient>
          <linearGradient id="leafMid" x1="0%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#3B8B5E" />
            <stop offset="60%" stopColor="#1E6B45" />
            <stop offset="100%" stopColor="#0E4A2D" />
          </linearGradient>
          <linearGradient id="leafFresh" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#6BB37B" />
            <stop offset="55%" stopColor="#3D8D58" />
            <stop offset="100%" stopColor="#1F643B" />
          </linearGradient>
          <linearGradient id="leafSage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9BBFA2" />
            <stop offset="55%" stopColor="#6D9B79" />
            <stop offset="100%" stopColor="#467254" />
          </linearGradient>
          <linearGradient id="potCharcoal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3A3F3B" />
            <stop offset="40%" stopColor="#262B28" />
            <stop offset="100%" stopColor="#161917" />
          </linearGradient>
          <linearGradient id="potTravertine" x1="0%" y1="0%" x2="100%" y2="15%">
            <stop offset="0%" stopColor="#F5F1E8" />
            <stop offset="55%" stopColor="#E6DEC8" />
            <stop offset="100%" stopColor="#CFC4AC" />
          </linearGradient>
          <linearGradient id="potTerracotta" x1="0%" y1="0%" x2="100%" y2="10%">
            <stop offset="0%" stopColor="#D98A6C" />
            <stop offset="55%" stopColor="#C16E50" />
            <stop offset="100%" stopColor="#9C5036" />
          </linearGradient>
          <linearGradient id="potSeagrass" x1="0%" y1="0%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#E4CFA3" />
            <stop offset="50%" stopColor="#CCAFA0" />
            <stop offset="100%" stopColor="#A98C63" />
          </linearGradient>
        </defs>

        {/* Studio backdrop & architectural pedestal */}
        <rect width="400" height="420" fill={`url(#studioBg-${style})`} />
        <polygon points="0,0 240,0 400,260 400,420 110,420" fill="url(#sunlightBeam)" />
        <rect x="0" y="340" width="400" height="80" fill="#E4ECD8" />
        <line x1="0" y1="340" x2="400" y2="340" stroke="#D2DEC2" strokeWidth="1.5" />

        {/* Ambient studio floor shadow */}
        <ellipse cx="205" cy="368" rx="76" ry="14" fill="#08482D" fillOpacity="0.14" />
        <ellipse cx="200" cy="366" rx="52" ry="9" fill="#08482D" fillOpacity="0.22" />

        {/* MONSTERA DELICIOSA */}
        {style === 'monstera' && (
          <g>
            {/* Stems */}
            <path d="M200,285 Q175,215 130,155" stroke="#185437" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M200,285 Q200,195 198,118" stroke="#13482E" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M200,285 Q230,210 272,152" stroke="#1D6441" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M200,285 Q150,245 108,220" stroke="#26734B" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M200,285 Q250,248 292,218" stroke="#1A5A3A" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Back Leaves */}
            <g transform="translate(105, 195) rotate(-32)">
              <path d="M0,45 C-38,30 -48,-25 0,-52 C48,-25 38,30 0,45 Z" fill="url(#leafDeep)" />
              <circle cx="-16" cy="-8" r="5" fill="#ECF2E3" />
              <circle cx="16" cy="-12" r="5.5" fill="#ECF2E3" />
              <ellipse cx="-22" cy="12" rx="10" ry="3.5" fill="#ECF2E3" transform="rotate(-15 -22 12)" />
            </g>
            <g transform="translate(292, 200) rotate(34)">
              <path d="M0,45 C-38,30 -48,-25 0,-52 C48,-25 38,30 0,45 Z" fill="url(#leafDeep)" />
              <circle cx="-15" cy="-10" r="5" fill="#ECF2E3" />
              <ellipse cx="22" cy="8" rx="11" ry="3.5" fill="#ECF2E3" transform="rotate(15 22 8)" />
            </g>

            {/* Mid Left Fenestrated Leaf */}
            <g transform="translate(132, 145) rotate(-22)">
              <path d="M0,55 C-48,38 -56,-30 0,-64 C56,-30 48,38 0,55 Z" fill="url(#leafMid)" />
              <path d="M0,50 L0,-56" stroke="#5CA874" strokeWidth="2.2" opacity="0.65" />
              <ellipse cx="-26" cy="-14" rx="14" ry="4" fill="#F2F7EB" transform="rotate(-18 -26 -14)" />
              <ellipse cx="-24" cy="8" rx="13" ry="4" fill="#F2F7EB" transform="rotate(-14 -24 8)" />
              <ellipse cx="26" cy="-12" rx="14" ry="4" fill="#F2F7EB" transform="rotate(18 26 -12)" />
              <ellipse cx="23" cy="10" rx="12" ry="4" fill="#F2F7EB" transform="rotate(14 23 10)" />
              <circle cx="-10" cy="-24" r="4" fill="#F2F7EB" />
              <circle cx="11" cy="-2" r="4.5" fill="#F2F7EB" />
            </g>

            {/* Mid Right Fenestrated Leaf */}
            <g transform="translate(268, 148) rotate(20)">
              <path d="M0,55 C-48,38 -56,-30 0,-64 C56,-30 48,38 0,55 Z" fill="url(#leafFresh)" />
              <path d="M0,50 L0,-56" stroke="#90D49E" strokeWidth="2.2" opacity="0.7" />
              <ellipse cx="-25" cy="-12" rx="14" ry="4" fill="#F2F7EB" transform="rotate(-16 -25 -12)" />
              <ellipse cx="26" cy="-14" rx="14" ry="4" fill="#F2F7EB" transform="rotate(18 26 -14)" />
              <ellipse cx="24" cy="10" rx="13" ry="4" fill="#F2F7EB" transform="rotate(15 24 10)" />
              <circle cx="-11" cy="5" r="4.5" fill="#F2F7EB" />
            </g>

            {/* Hero Center Leaf */}
            <g transform="translate(200, 112) rotate(2)">
              <path d="M0,64 C-56,44 -64,-36 0,-74 C64,-36 56,44 0,64 Z" fill="url(#leafMid)" />
              <path d="M0,58 L0,-66" stroke="#7AC48E" strokeWidth="2.6" opacity="0.75" />
              <ellipse cx="-30" cy="-20" rx="16" ry="4.5" fill="#F5F9F0" transform="rotate(-18 -30 -20)" />
              <ellipse cx="-28" cy="4" rx="15" ry="4.5" fill="#F5F9F0" transform="rotate(-12 -28 4)" />
              <ellipse cx="-22" cy="26" rx="12" ry="4" fill="#F5F9F0" transform="rotate(-8 -22 26)" />
              <ellipse cx="30" cy="-18" rx="16" ry="4.5" fill="#F5F9F0" transform="rotate(18 30 -18)" />
              <ellipse cx="28" cy="6" rx="15" ry="4.5" fill="#F5F9F0" transform="rotate(12 28 6)" />
              <circle cx="-12" cy="-32" r="4.5" fill="#F5F9F0" />
              <circle cx="12" cy="-8" r="5" fill="#F5F9F0" />
            </g>

            {/* Pot: Matte Charcoal Weighted Cylinder */}
            <ellipse cx="200" cy="278" rx="46" ry="10" fill="#3D4A3A" />
            <path d="M154,278 L162,362 C162,368 238,368 238,362 L246,278 Z" fill="url(#potCharcoal)" />
            <ellipse cx="200" cy="278" rx="46" ry="9" fill="#4E5E48" />
          </g>
        )}

        {/* FIDDLE LEAF FIG TREE */}
        {style === 'fiddle' && (
          <g>
            {/* Sculpted Hardwood Trunk */}
            <path d="M200,290 C198,240 204,195 198,140" stroke="#6E5039" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d="M199,215 Q165,185 142,155" stroke="#7A5A42" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M201,195 Q235,170 258,142" stroke="#7A5A42" strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Fiddle-shaped broad violin leaves */}
            {[
              { x: 138, y: 152, r: -34, s: 0.9, f: 'url(#leafDeep)' },
              { x: 262, y: 145, r: 32, s: 0.92, f: 'url(#leafDeep)' },
              { x: 162, y: 112, r: -18, s: 1, f: 'url(#leafMid)' },
              { x: 238, y: 110, r: 20, s: 1, f: 'url(#leafFresh)' },
              { x: 152, y: 192, r: -48, s: 0.82, f: 'url(#leafFresh)' },
              { x: 248, y: 190, r: 46, s: 0.82, f: 'url(#leafMid)' },
              { x: 200, y: 84, r: 0, s: 1.08, f: 'url(#leafMid)' },
            ].map((lf, i) => (
              <g key={i} transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.r}) scale(${lf.s})`}>
                <path
                  d="M0,38 C-18,32 -22,16 -14,4 C-28,-8 -32,-34 0,-46 C32,-34 28,-8 14,4 C22,16 18,32 0,38 Z"
                  fill={lf.f}
                />
                <path d="M0,35 L0,-40 M0,10 L-12,0 M0,-6 L15,-18 M0,-14 L-15,-26" stroke="#8BD19D" strokeWidth="1.6" opacity="0.65" fill="none" />
              </g>
            ))}

            {/* Ribbed Sandstone Planter */}
            <path d="M150,276 L158,364 C158,371 242,371 242,364 L250,276 Z" fill="url(#potTravertine)" />
            <ellipse cx="200" cy="276" rx="50" ry="10" fill="#526149" />
            {[166, 178, 190, 202, 214, 226, 238].map((lx) => (
              <line key={lx} x1={lx} y1="284" x2={lx} y2="364" stroke="#C5B99E" strokeWidth="1.5" opacity="0.6" />
            ))}
          </g>
        )}

        {/* MEDITERRANEAN OLIVE TREE */}
        {style === 'olive' && (
          <g>
            <path d="M200,285 C194,230 208,185 196,120" stroke="#7C6855" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M198,210 C170,185 135,165 112,135" stroke="#7C6855" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M201,190 C230,165 262,148 286,122" stroke="#7C6855" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M197,155 C175,125 155,98 140,78" stroke="#7C6855" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M199,145 C222,118 242,95 256,74" stroke="#7C6855" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* Airy Silver-Sage Olive Leaves */}
            {[
              [115, 135, -35], [132, 148, 25], [148, 162, -45], [125, 118, -15],
              [282, 124, 38], [265, 138, -22], [248, 152, 42], [272, 108, 15],
              [142, 80, -28], [158, 96, 20], [174, 112, -30], [195, 72, 5],
              [254, 76, 30], [236, 94, -18], [218, 108, 25], [186, 95, -15],
              [212, 85, 18], [164, 135, -35], [232, 132, 32], [198, 118, -10],
              [145, 125, 40], [255, 118, -38], [180, 148, 22], [220, 145, -24],
            ].map(([cx, cy, rot], idx) => (
              <g key={idx} transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
                <ellipse cx="-8" cy="0" rx="16" ry="5.5" fill={idx % 2 === 0 ? 'url(#leafSage)' : 'url(#leafMid)'} transform="rotate(-20 -8 0)" />
                <ellipse cx="8" cy="-4" rx="15" ry="5" fill={idx % 3 === 0 ? '#A9C7AF' : 'url(#leafFresh)'} transform="rotate(22 8 -4)" />
              </g>
            ))}

            {/* Botanical Olive Fruits */}
            <ellipse cx="155" cy="136" rx="4.5" ry="6" fill="#4A5D3F" />
            <ellipse cx="242" cy="128" rx="4.5" ry="6" fill="#3B2D38" />
            <ellipse cx="192" cy="105" rx="4.5" ry="6" fill="#556B47" />
            <ellipse cx="222" cy="96" rx="4.5" ry="6" fill="#3B2D38" />

            {/* Limestone Cylinder Pot */}
            <path d="M154,278 L160,364 C160,370 240,370 240,364 L246,278 Z" fill="url(#potTravertine)" />
            <ellipse cx="200" cy="278" rx="46" ry="9" fill="#5D6B53" />
          </g>
        )}

        {/* TRAILING SILVER EUCALYPTUS */}
        {style === 'eucalyptus' && (
          <g>
            {/* Matte Sage Ceramic Shelf Pot sits higher so trails cascade */}
            <ellipse cx="200" cy="145" rx="48" ry="10" fill="#4E6352" />
            <path d="M152,145 L160,228 C160,235 240,235 240,228 L248,145 Z" fill="#C9D8C5" />
            <ellipse cx="200" cy="145" rx="46" ry="8" fill="#3E5242" />

            {/* Cascading Vines */}
            {[158, 178, 200, 222, 242].map((vx, i) => (
              <path
                key={i}
                d={`M${vx},148 Q${vx + (i % 2 === 0 ? -18 : 18)},235 ${vx + (i - 2) * 8},348`}
                stroke="#4F795D"
                strokeWidth="2.5"
                fill="none"
              />
            ))}

            {/* Silver Dollar Round Leaves */}
            {[
              [148, 130, 14], [172, 122, 16], [200, 118, 17], [228, 124, 15], [250, 134, 14],
              [145, 165, 15], [168, 175, 14], [192, 168, 16], [216, 176, 15], [242, 166, 14],
              [142, 202, 14], [165, 214, 15], [188, 206, 15], [212, 216, 14], [238, 204, 15],
              [146, 242, 13], [170, 252, 14], [195, 246, 15], [218, 254, 13], [244, 242, 13],
              [150, 282, 12], [174, 292, 13], [198, 286, 14], [222, 294, 12], [240, 280, 11],
              [156, 318, 11], [182, 326, 12], [204, 322, 12], [226, 328, 10],
            ].map(([cx, cy, r], idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={r}
                fill={idx % 3 === 0 ? 'url(#leafSage)' : idx % 2 === 0 ? 'url(#leafFresh)' : 'url(#leafMid)'}
                stroke="#DFECE0"
                strokeWidth="0.8"
              />
            ))}
          </g>
        )}

        {/* WHITE PHALAENOPSIS ORCHID */}
        {style === 'orchid' && (
          <g>
            {/* Dark Glossy Basal Leaves */}
            <path d="M200,282 C155,275 120,295 105,310 C135,315 175,302 200,288 Z" fill="url(#leafDeep)" />
            <path d="M200,282 C245,275 280,295 295,310 C265,315 225,302 200,288 Z" fill="url(#leafDeep)" />
            <path d="M200,278 C165,260 135,268 122,282 C148,290 180,286 200,282 Z" fill="url(#leafMid)" />
            <path d="M200,278 C235,260 265,268 278,282 C252,290 220,286 200,282 Z" fill="url(#leafMid)" />

            {/* Three Arching Stems */}
            <path d="M188,280 C175,195 145,115 108,132" stroke="#24593B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M200,280 C200,175 205,95 235,98" stroke="#1E4D32" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M212,280 C228,200 258,130 292,145" stroke="#24593B" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Real-Touch Ivory Orchid Blossoms */}
            {[
              [122, 128, 0.95], [146, 148, 1.05], [164, 178, 0.95],
              [224, 98, 1.1], [206, 125, 1.08], [202, 160, 1.0],
              [280, 140, 0.95], [258, 162, 1.02], [242, 192, 0.92],
            ].map(([bx, by, sc], idx) => (
              <g key={idx} transform={`translate(${bx}, ${by}) scale(${sc})`}>
                <ellipse cx="-14" cy="-2" rx="15" ry="11" fill="#FFFFFF" stroke="#E4E8DF" strokeWidth="1" transform="rotate(-15 -14 -2)" />
                <ellipse cx="14" cy="-2" rx="15" ry="11" fill="#FFFFFF" stroke="#E4E8DF" strokeWidth="1" transform="rotate(15 14 -2)" />
                <ellipse cx="0" cy="-14" rx="10" ry="14" fill="#FAFBF7" stroke="#E4E8DF" strokeWidth="1" />
                <ellipse cx="-8" cy="11" rx="7" ry="10" fill="#F7F9F2" transform="rotate(20 -8 11)" />
                <ellipse cx="8" cy="11" rx="7" ry="10" fill="#F7F9F2" transform="rotate(-20 8 11)" />
                {/* Golden/Rose Lip Center */}
                <circle cx="0" cy="3" r="5.5" fill="#E8C56B" />
                <circle cx="0" cy="4" r="3" fill="#C86D7B" />
              </g>
            ))}

            {/* Low Stoneware Oval Boat Vessel */}
            <ellipse cx="200" cy="285" rx="72" ry="14" fill="#465942" />
            <path d="M128,285 C132,348 268,348 272,285 Z" fill="#F7F6F0" stroke="#DCD9CC" strokeWidth="1.5" />
          </g>
        )}

        {/* GIANT BIRD OF PARADISE (STRELITZIA) */}
        {style === 'strelitzia' && (
          <g>
            <path d="M200,285 L148,145" stroke="#1B5B3A" strokeWidth="6" strokeLinecap="round" />
            <path d="M200,285 L182,115" stroke="#14492E" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M200,285 L222,120" stroke="#1E6440" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M200,285 L256,155" stroke="#25734B" strokeWidth="6" strokeLinecap="round" />

            {/* Upright Broad Banana-Style Paddles */}
            {[
              { x: 138, y: 128, r: -26, w: 32, h: 72, f: 'url(#leafDeep)' },
              { x: 262, y: 138, r: 28, w: 32, h: 70, f: 'url(#leafFresh)' },
              { x: 176, y: 98, r: -10, w: 36, h: 82, f: 'url(#leafMid)' },
              { x: 224, y: 102, r: 12, w: 35, h: 80, f: 'url(#leafFresh)' },
              { x: 118, y: 190, r: -42, w: 28, h: 58, f: 'url(#leafMid)' },
              { x: 282, y: 192, r: 40, w: 28, h: 58, f: 'url(#leafDeep)' },
            ].map((pd, i) => (
              <g key={i} transform={`translate(${pd.x}, ${pd.y}) rotate(${pd.r})`}>
                <path
                  d={`M0,${pd.h} C-${pd.w},${pd.h * 0.6} -${pd.w},-${pd.h * 0.6} 0,-${pd.h} C${pd.w},-${pd.h * 0.6} ${pd.w},${pd.h * 0.6} 0,${pd.h} Z`}
                  fill={pd.f}
                />
                <line x1="0" y1={pd.h * 0.9} x2="0" y2={-pd.h * 0.9} stroke="#8FD49E" strokeWidth="2.2" opacity="0.7" />
              </g>
            ))}

            {/* Weighted Black Starter Pot */}
            <path d="M158,282 L165,362 C165,368 235,368 235,362 L242,282 Z" fill="url(#potCharcoal)" />
            <ellipse cx="200" cy="282" rx="42" ry="8" fill="#465743" />
          </g>
        )}

        {/* BOSTON FERN */}
        {style === 'fern' && (
          <g>
            {/* Macrame Hanging Cord */}
            <line x1="200" y1="0" x2="155" y2="195" stroke="#C5B293" strokeWidth="2" />
            <line x1="200" y1="0" x2="245" y2="195" stroke="#C5B293" strokeWidth="2" />
            <circle cx="200" cy="28" r="5" fill="#A99270" />

            {/* Dense Arching Fronds */}
            {[-75, -55, -38, -20, -5, 10, 26, 44, 62, 78].map((ang, i) => (
              <g key={i} transform={`translate(200, 192) rotate(${ang})`}>
                <path d="M0,0 Q-12,-70 0,-132" stroke="#1E6640" strokeWidth="2.5" fill="none" />
                {[-22, -38, -54, -70, -86, -102, -118].map((fy, j) => (
                  <g key={j} transform={`translate(-4, ${fy})`}>
                    <ellipse cx="-12" cy="0" rx="12" ry="4" fill={i % 2 === 0 ? 'url(#leafFresh)' : 'url(#leafMid)'} transform="rotate(-18 -12 0)" />
                    <ellipse cx="10" cy="0" rx="12" ry="4" fill={i % 2 === 0 ? 'url(#leafMid)' : 'url(#leafDeep)'} transform="rotate(18 10 0)" />
                  </g>
                ))}
              </g>
            ))}

            {/* Terracotta Hanging Bowl */}
            <path d="M148,192 C152,258 248,258 252,192 Z" fill="url(#potTerracotta)" />
            <ellipse cx="200" cy="192" rx="52" ry="9" fill="#3B543A" />
          </g>
        )}

        {/* PEACE LILY (SPATHIPHYLLUM) */}
        {style === 'peacelily' && (
          <g>
            {/* Glossy Ribbed Foliage */}
            {[
              [-36, 145, 185, 'url(#leafDeep)'],
              [36, 255, 185, 'url(#leafDeep)'],
              [-20, 165, 155, 'url(#leafMid)'],
              [22, 235, 155, 'url(#leafFresh)'],
              [0, 200, 145, 'url(#leafMid)'],
              [-48, 130, 215, 'url(#leafFresh)'],
              [48, 270, 215, 'url(#leafMid)'],
            ].map(([rot, lx, ly, fill], i) => (
              <g key={i} transform={`translate(${lx}, ${ly}) rotate(${rot})`}>
                <path d="M0,65 C-32,35 -34,-25 0,-65 C34,-25 32,35 0,65 Z" fill={String(fill)} />
                <line x1="0" y1="60" x2="0" y2="-58" stroke="#7BC68F" strokeWidth="1.8" opacity="0.6" />
              </g>
            ))}

            {/* Creamy White Spathe Blooms */}
            {[
              { x: 162, y: 98, r: -14 },
              { x: 204, y: 78, r: 4 },
              { x: 242, y: 104, r: 16 },
            ].map((bl, idx) => (
              <g key={idx}>
                <path d={`M200,275 Q${bl.x},${bl.y + 70} ${bl.x},${bl.y + 15}`} stroke="#236642" strokeWidth="3.5" fill="none" />
                <g transform={`translate(${bl.x}, ${bl.y}) rotate(${bl.r})`}>
                  <path d="M0,28 C-22,18 -24,-18 0,-38 C24,-18 22,18 0,28 Z" fill="#FFFFFF" stroke="#E5EAE0" strokeWidth="1" />
                  <rect x="-3" y="-16" width="6" height="28" rx="3" fill="#EBD27A" />
                </g>
              </g>
            ))}

            {/* Minimalist Matte Cream Cylinder Pot */}
            <path d="M154,276 L160,362 C160,369 240,369 240,362 L246,276 Z" fill="#F7F5EE" stroke="#DFDDD2" strokeWidth="1.5" />
            <ellipse cx="200" cy="276" rx="46" ry="9" fill="#465944" />
          </g>
        )}

        {/* GOLDEN ARECA PALM */}
        {style === 'areca' && (
          <g>
            {/* Arching Feathery Palm Fronds */}
            {[
              { r: -48, sx: 185, sy: 275, len: 175, f: 'url(#leafDeep)' },
              { r: 48, sx: 215, sy: 275, len: 175, f: 'url(#leafDeep)' },
              { r: -26, sx: 192, sy: 275, len: 195, f: 'url(#leafMid)' },
              { r: 26, sx: 208, sy: 275, len: 195, f: 'url(#leafFresh)' },
              { r: -6, sx: 198, sy: 275, len: 205, f: 'url(#leafFresh)' },
              { r: 10, sx: 203, sy: 275, len: 198, f: 'url(#leafMid)' },
            ].map((fr, i) => (
              <g key={i} transform={`translate(${fr.sx}, ${fr.sy}) rotate(${fr.r})`}>
                <path d={`M0,0 Q-8,-${fr.len * 0.55} 0,-${fr.len}`} stroke="#5D8F56" strokeWidth="3.5" fill="none" />
                {[-35, -55, -75, -95, -115, -135, -155, -175].map((py, j) => (
                  <g key={j} transform={`translate(-3, ${py})`}>
                    <path d="M0,0 Q-26,-12 -42,-4 Q-22,4 0,4 Z" fill={fr.f} />
                    <path d="M4,0 Q30,-12 46,-4 Q26,4 4,4 Z" fill={fr.f} />
                  </g>
                ))}
              </g>
            ))}

            {/* Woven Seagrass Belly Basket */}
            <path d="M152,276 C136,315 144,352 164,364 L236,364 C256,352 264,315 248,276 Z" fill="url(#potSeagrass)" />
            <ellipse cx="200" cy="276" rx="48" ry="9" fill="#4B5D45" />
            <path d="M145,318 Q200,328 255,318" stroke="#9E8056" strokeWidth="2" fill="none" opacity="0.65" />
            <path d="M150,338 Q200,348 250,338" stroke="#9E8056" strokeWidth="2" fill="none" opacity="0.65" />
          </g>
        )}

        {/* FLUTED TRAVERTINE PLANTER DUO */}
        {style === 'planter' && (
          <g>
            {/* Subtle foliage hint in larger planter */}
            <ellipse cx="168" cy="198" rx="54" ry="12" fill="#4A5D44" />
            <path d="M114,198 L124,356 C124,365 212,365 212,356 L222,198 Z" fill="url(#potTravertine)" />
            {[128, 140, 152, 164, 176, 188, 200, 210].map((fx) => (
              <line key={fx} x1={fx} y1="208" x2={fx} y2="356" stroke="#C5B89B" strokeWidth="2" opacity="0.7" />
            ))}
            <ellipse cx="168" cy="198" rx="50" ry="9" fill="#5B7352" />

            {/* Nested Medium Ceramic Planter */}
            <ellipse cx="252" cy="248" rx="44" ry="10" fill="#3B4D38" />
            <path d="M208,248 L216,364 C216,371 288,371 288,364 L296,248 Z" fill="#FAF8F2" stroke="#DCD8CA" strokeWidth="1.5" />
            {[220, 232, 244, 256, 268, 280].map((fx) => (
              <line key={fx} x1={fx} y1="256" x2={fx} y2="364" stroke="#E3DFD2" strokeWidth="2" />
            ))}
            <ellipse cx="252" cy="248" rx="41" ry="8" fill="#4D6646" />
          </g>
        )}

        {/* MARBLE QUEEN POTHOS VINE */}
        {style === 'pothos' && (
          <g>
            {/* Speckled Oat Ceramic Pot */}
            <path d="M154,155 L162,238 C162,245 238,245 238,238 L246,155 Z" fill="#EFECE2" stroke="#D5D0C0" strokeWidth="1.5" />
            <ellipse cx="200" cy="155" rx="46" ry="9" fill="#465A42" />

            {/* Variegated Heart-Shaped Leaves Cascading */}
            {[
              [155, 135, -25], [182, 125, -8], [212, 126, 12], [242, 138, 28],
              [148, 172, -32], [178, 168, -10], [208, 172, 8], [238, 175, 24],
              [154, 212, -20], [185, 210, 5], [216, 214, -12], [244, 216, 18],
              [162, 252, -15], [194, 254, 10], [224, 256, -8],
              [172, 294, -10], [204, 298, 12], [190, 334, 4],
            ].map(([px, py, rot], idx) => (
              <g key={idx} transform={`translate(${px}, ${py}) rotate(${rot})`}>
                <path
                  d="M0,18 C-18,8 -22,-12 -10,-18 C-3,-21 0,-14 0,-12 C0,-14 3,-21 10,-18 C22,-12 18,8 0,18 Z"
                  fill={idx % 2 === 0 ? 'url(#leafFresh)' : 'url(#leafMid)'}
                />
                {/* Cream Marble Variegation */}
                <path
                  d="M-2,12 C-10,4 -11,-8 -5,-12 C-1,-10 2,-2 -2,12 Z"
                  fill="#EDF4E4"
                  opacity="0.78"
                />
              </g>
            ))}
          </g>
        )}

        {/* ZEN BLACK-STEM BAMBOO CLUSTER */}
        {style === 'bamboo' && (
          <g>
            {/* Slender Bamboo Culms with Nodes */}
            {[164, 182, 200, 218, 236].map((bx, i) => (
              <g key={i}>
                <line x1={bx} y1="280" x2={bx + (i - 2) * 6} y2="68" stroke="#243028" strokeWidth="4.5" strokeLinecap="round" />
                {[110, 155, 200, 245].map((ny) => (
                  <line key={ny} x1={bx - 4} y1={ny} x2={bx + 4} y2={ny} stroke="#5E7362" strokeWidth="2" />
                ))}
              </g>
            ))}

            {/* Whisper-Green Bamboo Blade Clusters */}
            {[
              [152, 95, -35], [176, 82, 25], [202, 74, -20], [226, 86, 32], [248, 98, 40],
              [146, 138, -42], [172, 128, -22], [198, 122, 28], [224, 132, -26], [252, 142, 38],
              [154, 182, -36], [182, 174, 24], [212, 176, -24], [242, 184, 34],
              [162, 224, -28], [196, 218, 22], [232, 226, 30],
            ].map(([lx, ly, rot], idx) => (
              <g key={idx} transform={`translate(${lx}, ${ly}) rotate(${rot})`}>
                <path d="M0,0 Q-18,-8 -36,-2 Q-18,6 0,0 Z" fill="url(#leafFresh)" />
                <path d="M0,0 Q-14,10 -30,14 Q-12,2 0,0 Z" fill="url(#leafMid)" />
                <path d="M0,0 Q18,-8 36,-2 Q18,6 0,0 Z" fill="url(#leafMid)" />
              </g>
            ))}

            {/* Matte Slate Cylinder Planter with White River Pebbles */}
            <path d="M150,278 L156,364 C156,370 244,370 244,364 L250,278 Z" fill="url(#potCharcoal)" />
            <ellipse cx="200" cy="278" rx="50" ry="9" fill="#E9ECE6" />
          </g>
        )}
      </svg>
    </div>
  );
};
