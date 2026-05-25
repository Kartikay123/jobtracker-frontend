import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { selectCurrentUser } from '@/features/auth/slice/authSlice';
import { useAllJobs } from '@/features/jobs/hooks/useJobs';
import { useAnalytics } from '@/features/analytics/hooks/useAnalytics';
import { Spinner } from '@/shared/components/Spinner/Spinner';
import { formatRelative } from '@/lib/formatters';

const STATUS_CONFIG = {
  applied:   { label: 'Applied',     color: '#6366f1', bg: 'rgba(99,102,241,0.1)'  },
  interview: { label: 'Interview',   color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
  offer:     { label: 'Offer',       color: '#10b981', bg: 'rgba(16,185,129,0.1)'  },
  rejected:  { label: 'Rejected',    color: '#ef4444', bg: 'rgba(239,68,68,0.1)'   },
};

const PipelineCard = ({ status, count }) => {
  const cfg = STATUS_CONFIG[status] || {};
  return (
    <Col xs={6} md={3}>
      <div
        style={{
          background: cfg.bg,
          border: `1px solid ${cfg.color}30`,
          borderRadius: 12,
          padding: '1.1rem 1rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2rem', fontWeight: 700, color: cfg.color, lineHeight: 1 }}>
          {count}
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: cfg.color, marginTop: 4, opacity: 0.85 }}>
          {cfg.label}
        </div>
      </div>
    </Col>
  );
};

const QuickAction = ({ to, icon, label, description }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div
      className="d-flex align-items-center gap-3 p-3"
      style={{
        border: '1px solid var(--jt-border)',
        borderRadius: 10,
        background: 'var(--jt-surface)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)';
        e.currentTarget.style.boxShadow = '0 4px 16px -4px rgba(99,102,241,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--jt-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: 'var(--jt-primary-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--jt-primary-strong)',
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--jt-text)' }}>{label}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--jt-text-muted)', marginTop: 1 }}>{description}</div>
      </div>
    </div>
  </Link>
);

export default function DashboardPage() {
  const user = useSelector(selectCurrentUser);
  const { data: jobs = [], isLoading: jobsLoading } = useAllJobs();
  const { data: analytics } = useAnalytics('30d');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'there';

  // Count per status
  const counts = { applied: 0, interview: 0, offer: 0, rejected: 0 };
  jobs.forEach((j) => { if (j.status in counts) counts[j.status]++; });

  // 5 most recent jobs
  const recent = [...jobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <>
      {/* Header */}
      <div className="jt-page-header">
        <h3>{greeting}, {firstName} 👋</h3>
        <p>Here's a snapshot of your job search today.</p>
      </div>

      {jobsLoading ? (
        <Spinner />
      ) : (
        <>
          {/* Pipeline overview */}
          <div className="mb-4">
            <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--jt-text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Pipeline Overview
            </div>
            <Row className="g-3">
              {Object.keys(counts).map((s) => (
                <PipelineCard key={s} status={s} count={counts[s]} />
              ))}
            </Row>
          </div>

          {/* Stats row (from analytics) */}
          {analytics && (
            <Row className="g-3 mb-4">
              {[
                { label: 'Total Applications', value: analytics.totalApplications ?? 0 },
                { label: 'Response Rate',      value: `${analytics.responseRate ?? 0}%` },
                { label: 'Interview Rate',     value: `${analytics.interviewRate ?? 0}%` },
              ].map(({ label, value }) => (
                <Col md={4} key={label}>
                  <div
                    style={{
                      background: 'var(--jt-surface)',
                      border: '1px solid var(--jt-border)',
                      borderRadius: 12,
                      padding: '1rem 1.25rem',
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', color: 'var(--jt-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--jt-text)', marginTop: 4 }}>{value}</div>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          <Row className="g-4">
            {/* Recent Activity */}
            <Col lg={7}>
              <Card style={{ border: '1px solid var(--jt-border)', borderRadius: 12, background: 'var(--jt-surface)', boxShadow: 'none' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Recent Applications</div>
                    <Link to="/jobs" style={{ fontSize: '0.82rem', color: 'var(--jt-primary-strong)', textDecoration: 'none', fontWeight: 600 }}>
                      View all →
                    </Link>
                  </div>
                  {recent.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--jt-text-muted)', fontSize: '0.88rem' }}>
                      No jobs yet.{' '}
                      <Link to="/jobs" style={{ color: 'var(--jt-primary-strong)' }}>Add your first one →</Link>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {recent.map((job) => {
                        const cfg = STATUS_CONFIG[job.status] || {};
                        return (
                          <div
                            key={job.id}
                            className="d-flex align-items-center justify-content-between"
                            style={{ padding: '0.6rem 0.75rem', borderRadius: 8, background: 'var(--bs-body-bg)', border: '1px solid var(--jt-border)' }}
                          >
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--jt-text)' }}>{job.title}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--jt-text-muted)' }}>{job.company}</div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <span style={{ fontSize: '0.7rem', color: 'var(--jt-text-muted)' }}>
                                {formatRelative(job.createdAt)}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem',
                                  borderRadius: 999, background: cfg.bg, color: cfg.color,
                                  textTransform: 'capitalize',
                                }}
                              >
                                {cfg.label || job.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Quick Actions */}
            <Col lg={5}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>Quick Actions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <QuickAction
                  to="/jobs"
                  label="Add a Job"
                  description="Track a new application on your board"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  }
                />
                <QuickAction
                  to="/interview"
                  label="Interview Prep"
                  description="Generate questions and rehearse answers"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  }
                />
                <QuickAction
                  to="/resume"
                  label="Resume Match"
                  description="Score your resume against a job description"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                    </svg>
                  }
                />
                <QuickAction
                  to="/analytics"
                  label="View Analytics"
                  description="Deep-dive into charts and trends"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  }
                />
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
