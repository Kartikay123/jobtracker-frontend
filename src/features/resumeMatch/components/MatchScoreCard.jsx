import { Card } from 'react-bootstrap';

const scoreColor = (score) => {
  if (score >= 80) return 'var(--jt-success)';
  if (score >= 60) return 'var(--jt-primary)';
  if (score >= 40) return 'var(--jt-warning)';
  return 'var(--jt-danger)';
};

const Bullet = ({ tone }) => (
  <span
    aria-hidden="true"
    style={{
      width: 18,
      height: 18,
      borderRadius: 999,
      display: 'inline-grid',
      placeItems: 'center',
      flexShrink: 0,
      marginTop: 2,
      background:
        tone === 'good' ? 'rgba(16,185,129,0.14)' : 'rgba(245,158,11,0.16)',
      color: tone === 'good' ? '#047857' : '#b45309',
    }}
  >
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      {tone === 'good' ? (
        <polyline points="20 6 9 17 4 12" />
      ) : (
        <>
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12" y2="16" />
        </>
      )}
    </svg>
  </span>
);

export const MatchScoreCard = ({ result, isPending }) => (
  <Card style={{ height: '100%' }}>
    <Card.Body>
      {!result && !isPending && (
        <div className="text-center py-5">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              margin: '0 auto 1rem',
              display: 'grid',
              placeItems: 'center',
              background: 'var(--jt-primary-soft)',
              color: 'var(--jt-primary-strong)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <h6 className="mb-1">Match insights appear here</h6>
          <p className="text-muted small mb-0">
            Upload a resume and paste a job description to begin.
          </p>
        </div>
      )}
      {isPending && (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: 'var(--jt-primary)' }} />
          <p className="mt-3 mb-0 small text-muted">Analyzing… (may take ~30s)</p>
        </div>
      )}
      {result && (
        <>
          <div
            className="jt-score-ring"
            style={{
              '--p': result.score,
              background: `conic-gradient(${scoreColor(result.score)} ${result.score}%, var(--jt-surface-3) 0)`,
            }}
          >
            <span>{result.score}%</span>
          </div>
          <p className="text-center text-muted small mb-3">
            Overall resume match score
          </p>
          {result.strengths?.length > 0 && (
            <>
              <h6 className="mt-3 mb-2">Strengths</h6>
              <ul className="list-unstyled mb-3 small">
                {result.strengths.map((s, i) => (
                  <li key={i} className="d-flex gap-2 mb-2">
                    <Bullet tone="good" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {result.gaps?.length > 0 && (
            <>
              <h6 className="mt-3 mb-2">Gaps</h6>
              <ul className="list-unstyled mb-0 small">
                {result.gaps.map((g, i) => (
                  <li key={i} className="d-flex gap-2 mb-2">
                    <Bullet tone="warn" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </Card.Body>
  </Card>
);
