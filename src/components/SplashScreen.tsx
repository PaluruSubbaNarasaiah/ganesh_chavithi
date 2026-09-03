import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`splash-${Date.now()}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0a0502',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <style>{`
            @keyframes sp-fadein {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes sp-dot {
              0%, 100% { opacity: 0.3; transform: scale(0.8); }
              50%       { opacity: 1;   transform: scale(1.3); }
            }
            .sp-title { animation: sp-fadein 0.9s ease-out 0.4s both; }
            .sp-sub   { animation: sp-fadein 0.9s ease-out 0.6s both; }
            .sp-d1    { animation: sp-dot 0.7s infinite 0s; }
            .sp-d2    { animation: sp-dot 0.7s infinite 0.18s; }
            .sp-d3    { animation: sp-dot 0.7s infinite 0.36s; }
          `}</style>

          {/* GIF — centered */}
          <img
            src="/loading.gif"
            alt="Loading"
            style={{
              width: 'min(340px, 80vw)',
              height: 'auto',
              display: 'block',
              marginBottom: 24,
            }}
          />

          {/* Title */}
          <p className="sp-title" style={{
            fontFamily: 'serif',
            fontSize: 'clamp(20px, 5.5vw, 26px)',
            fontWeight: 700,
            color: '#D4AF37',
            textShadow: '0 0 20px rgba(212,175,55,0.7)',
            margin: 0,
            letterSpacing: '0.06em',
            textAlign: 'center',
          }}>
            ॐ गणेशाय नमः
          </p>

          <p className="sp-sub" style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(9px, 2.5vw, 11px)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginTop: 6,
            textAlign: 'center',
          }}>
            Sri Ganga Ghanapathi · 2026
          </p>

          {/* Loading dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
            <span style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}>Loading</span>
            <div className="sp-d1" style={{ width: 8, height: 8, borderRadius: '50%', background: '#F27D26', boxShadow: '0 0 6px #F27D26' }} />
            <div className="sp-d2" style={{ width: 8, height: 8, borderRadius: '50%', background: '#F27D26', boxShadow: '0 0 6px #F27D26' }} />
            <div className="sp-d3" style={{ width: 8, height: 8, borderRadius: '50%', background: '#F27D26', boxShadow: '0 0 6px #F27D26' }} />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
