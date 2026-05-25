import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MENU_WIDTH = 180;

export const CardContextMenu = ({ x, y, onEdit, onDelete, onClose }) => {
  const ref = useRef(null);
  const [confirming, setConfirming] = useState(false);

  // Adjust position so menu doesn't overflow viewport
  const left = Math.min(x, window.innerWidth - MENU_WIDTH - 8);
  const top = y;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const menuStyle = {
    position: 'fixed',
    top,
    left,
    zIndex: 9999,
    background: 'var(--jt-surface)',
    border: '1px solid var(--jt-border)',
    borderRadius: 8,
    boxShadow: '0 8px 24px -4px rgba(0,0,0,0.18)',
    minWidth: MENU_WIDTH,
    padding: '4px 0',
    animation: 'ctxFadeIn 0.1s ease',
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '8px 14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--jt-text)',
    textAlign: 'left',
    borderRadius: 0,
    transition: 'background 0.12s',
  };

  return createPortal(
    <>
      <style>{`
        @keyframes ctxFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(-4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div ref={ref} style={menuStyle}>
        <button
          style={itemStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--jt-primary-soft)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          onClick={() => { onEdit(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Job
        </button>

        {!confirming ? (
          <button
            style={{ ...itemStyle, color: '#ef4444' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            onClick={() => setConfirming(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Delete Job
          </button>
        ) : (
          <div style={{ padding: '8px 14px', borderTop: '1px solid var(--jt-border)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444', marginBottom: 8 }}>
              Are you sure?
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                style={{
                  flex: 1, padding: '4px 0', fontSize: '0.78rem', fontWeight: 600,
                  background: '#ef4444', color: '#fff', border: 'none',
                  borderRadius: 6, cursor: 'pointer',
                }}
                onClick={() => { onDelete(); }}
              >
                Confirm
              </button>
              <button
                style={{
                  flex: 1, padding: '4px 0', fontSize: '0.78rem', fontWeight: 500,
                  background: 'var(--jt-surface)', color: 'var(--jt-text)',
                  border: '1px solid var(--jt-border)', borderRadius: 6, cursor: 'pointer',
                }}
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>,
    document.body,
  );
};
