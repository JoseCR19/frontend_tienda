// src/components/Payment/PaymentRibbon.jsx
import React from "react";

// 1. LOGOS FILTRADOS (Tus 4 logos)
const DEFAULT_LOGOS = [
  "Logos_pagos/Visa.png",
  "Logos_pagos/MasterCard.png",
  "Logos_pagos/Yape.png",
  "Logos_pagos/Pago_en_efectivo.png",
];

// 2. CREAMOS UN SET MÁS GRANDE (16 logos)
// Esto asegura que el ancho de 1 set sea mayor que el de la mayoría de monitores.
const LOGO_SET = [
  ...DEFAULT_LOGOS,
  ...DEFAULT_LOGOS,
  ...DEFAULT_LOGOS,
  ...DEFAULT_LOGOS,
];

export default function PaymentRibbon() {
  return (
    <div className="payment-ribbon overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="ticker">
          <div className="track">
            {/* 3. Renderizamos el SET GRANDE (16 logos) */}
            {LOGO_SET.map((src, i) => (
              <div key={`set1-${i}`} className="item">
                <img
                  src={src}
                  alt={`logo-${i}`}
                  // 4. CLASE "h-10" ELIMINADA. El tamaño se controla 100% por CSS.
                  className="object-contain"
                />
              </div>
            ))}
            {/* 3. Renderizamos la SEGUNDA COPIA del SET GRANDE (otros 16 logos) */}
            {LOGO_SET.map((src, i) => (
              <div key={`set2-${i}`} className="item">
                <img src={src} alt={`logo-${i}`} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .payment-ribbon {
          border-bottom: 5px solid #e5e7eb;
          padding: 1.5rem 0;
        }
        
        .ticker { 
          overflow: hidden;
          width: 100%;
          position: relative;
        }

        .track {
          display: flex;
          animation: scroll 40s linear infinite; 
          gap: 80px; 
          width: fit-content;
          will-change: transform;
        }

        .item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
        }

        .item img {
          height: 45px;
          width: auto;
          object-fit: contain;
          transition: all 0.3s ease;
        /* El 'img-4.png' ha sido eliminado */
        }

        .item:hover img {
          transform: scale(1.1);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker::before,
        .ticker::after {
          content: "";
          position: absolute;
          top: 0;
          height: 100%;
          width: 100px;
          z-index: 2;
        /* La 'S' ha sido eliminada */
        }

        .ticker::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }

        .ticker::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }

        @media (max-width: 640px) {
          .track { 
            gap: 50px;
            animation-duration: 30s;
          }
          .item img { 
            height: 35px;
          }
        }
      `}</style>
    </div>
  );
}
