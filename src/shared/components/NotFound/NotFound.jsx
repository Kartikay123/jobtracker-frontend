import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center px-3"
      style={{
        minHeight: '100vh',
        background: 'var(--bs-body-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--jt-gradient-mesh)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="display-1 fw-bold mb-2"
          style={{
            background: 'var(--jt-gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '6rem',
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <h4 className="mb-2">Page not found</h4>
        <p className="text-muted mb-4" style={{ maxWidth: 380 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
