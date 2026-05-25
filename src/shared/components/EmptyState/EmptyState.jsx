export const EmptyState = ({ title = 'Nothing here yet', description, action, icon }) => (
  <div
    className="text-center py-5 px-3"
    style={{
      background: 'var(--jt-surface)',
      border: '1px dashed var(--jt-border)',
      borderRadius: 'var(--bs-border-radius-lg)',
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        margin: '0 auto 1rem',
        borderRadius: 16,
        background: 'var(--jt-primary-soft)',
        color: 'var(--jt-primary-strong)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {icon || (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9h.01M15 9h.01M9 15c.667-.667 1.667-1 3-1s2.333.333 3 1" />
        </svg>
      )}
    </div>
    <h6 className="mb-1">{title}</h6>
    {description && (
      <p className="text-muted small mb-0" style={{ maxWidth: 360, margin: '0 auto' }}>
        {description}
      </p>
    )}
    {action && <div className="mt-3">{action}</div>}
  </div>
);
