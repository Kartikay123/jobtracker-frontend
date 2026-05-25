import { Spinner as BsSpinner } from 'react-bootstrap';

export const Spinner = ({ fullscreen = false, label = 'Loading…' }) => {
  if (fullscreen) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          background: 'var(--bs-body-bg)',
        }}
      >
        <BsSpinner animation="border" style={{ color: 'var(--jt-primary)' }} />
        <span className="mt-3 text-muted small">{label}</span>
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center py-5">
      <BsSpinner animation="border" style={{ color: 'var(--jt-primary)' }} />
    </div>
  );
};
