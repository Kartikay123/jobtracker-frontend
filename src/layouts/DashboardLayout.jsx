import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/slice/authSlice';
import { toggleTheme } from '@/features/ui/slice/uiSlice';

const Icon = ({ d, size = 20 }) => (
  <svg
    className="jt-nav-icon"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <Icon
        d={
          <>
            <rect x="3" y="3" width="7" height="9" rx="1.5" />
            <rect x="14" y="3" width="7" height="5" rx="1.5" />
            <rect x="14" y="12" width="7" height="9" rx="1.5" />
            <rect x="3" y="16" width="7" height="5" rx="1.5" />
          </>
        }
      />
    ),
  },
  {
    to: '/jobs',
    label: 'Jobs',
    icon: (
      <Icon
        d={
          <>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            <path d="M3 12h18" />
          </>
        }
      />
    ),
  },
  {
    to: '/analytics',
    label: 'Analytics',
    icon: (
      <Icon
        d={
          <>
            <path d="M3 3v18h18" />
            <path d="M7 14l4-4 3 3 5-6" />
          </>
        }
      />
    ),
  },
  {
    to: '/interview',
    label: 'Interview Prep',
    icon: (
      <Icon
        d={
          <>
            <path d="M21 11.5a8.5 8.5 0 1 1-3.6-6.93" />
            <path d="M21 4v5h-5" />
            <circle cx="12" cy="12" r="3" />
          </>
        }
      />
    ),
  },
  {
    to: '/resume',
    label: 'Resume Match',
    icon: (
      <Icon
        d={
          <>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
            <path d="M9 13l2 2 4-4" />
          </>
        }
      />
    ),
  },
];

const initials = (name) =>
  (name || '')
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'JT';

export const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((s) => s.ui.theme);
  const user = useSelector((s) => s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="jt-app-shell">
      <aside className="jt-sidebar">
        <div className="jt-brand">
          <div className="jt-brand-mark">JT</div>
          <span>JobTracker</span>
        </div>

        <nav className="jt-nav">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `jt-nav-link ${isActive ? 'active' : ''}`}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-3" style={{ borderTop: '1px solid var(--jt-border)' }}>
          <div className="d-flex align-items-center gap-2 px-2">
            <div className="jt-avatar">{initials(user?.name)}</div>
            <div className="flex-grow-1" style={{ minWidth: 0 }}>
              <div className="text-truncate" style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                {user?.name || 'Guest'}
              </div>
              <div
                className="text-truncate"
                style={{ fontSize: '0.75rem', color: 'var(--jt-text-muted)' }}
              >
                {user?.email || 'Welcome back'}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        <header className="jt-topbar">
          <div className="d-md-none jt-brand" style={{ padding: 0 }}>
            <div className="jt-brand-mark">JT</div>
          </div>
          <div className="flex-grow-1">
            <div className="text-muted-greeting">Welcome back</div>
            <h6>{user?.name ? `Hi, ${user.name.split(' ')[0]} 👋` : 'Hi there 👋'}</h6>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        <main className="jt-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
