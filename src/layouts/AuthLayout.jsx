import { Outlet } from 'react-router-dom';

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const AuthLayout = () => (
  <div className="jt-auth-shell">
    <section className="jt-auth-hero">
      <div className="jt-auth-hero-inner">
        <div className="jt-brand" style={{ color: '#fff', padding: 0, marginBottom: '2rem' }}>
          <div className="jt-brand-mark" style={{ background: 'rgba(255,255,255,0.18)', boxShadow: 'none', border: '1px solid rgba(255,255,255,0.35)' }}>JT</div>
          <span>JobTracker</span>
        </div>
        <h1>Land your next role with confidence.</h1>
        <p>
          Track every application, prep for interviews, and match your resume to job
          descriptions — all in one beautifully simple workspace.
        </p>
        <ul className="jt-auth-hero-features">
          <li><span className="dot"><Check /></span> Visual kanban for every application</li>
          <li><span className="dot"><Check /></span> AI-powered resume match analysis</li>
          <li><span className="dot"><Check /></span> Smart interview question prep</li>
          <li><span className="dot"><Check /></span> Insightful analytics & funnel</li>
        </ul>
      </div>
      <div className="jt-auth-hero-foot">© {new Date().getFullYear()} JobTracker · Made for job seekers.</div>
    </section>

    <section className="jt-auth-form-wrap">
      <Outlet />
    </section>
  </div>
);
