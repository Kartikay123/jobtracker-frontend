const Up = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 15 12 9 18 15" />
  </svg>
);
const Down = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const StatCard = ({ label, value, delta }) => {
  const positive = delta == null ? null : delta >= 0;
  return (
    <div className="jt-stat-card">
      <div className="label">{label}</div>
      <div className="d-flex align-items-baseline gap-2 mt-1">
        <div className="value">{value}</div>
        {delta != null && (
          <span className={`delta ${positive ? 'up' : 'down'}`}>
            {positive ? <Up /> : <Down />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
    </div>
  );
};
