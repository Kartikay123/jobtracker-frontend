import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import { selectCurrentUser } from '@/features/auth/slice/authSlice';
import { useProfile, useUploadResume, useDeleteResume } from '../hooks/useProfile';
import { Button } from '@/shared/components/Button/Button';
import { Spinner } from '@/shared/components/Spinner/Spinner';

export default function ProfilePage() {
  const user = useSelector(selectCurrentUser);
  const fileRef = useRef(null);
  const { data: profile, isLoading } = useProfile();
  const upload = useUploadResume();
  const remove = useDeleteResume();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) upload.mutate(file);
    e.target.value = '';
  };

  return (
    <>
      <div className="jt-page-header">
        <h3>Profile</h3>
        <p>Manage your account and saved resume.</p>
      </div>

      <Row className="g-4" style={{ maxWidth: 720 }}>
        {/* Account info */}
        <Col xs={12}>
          <Card style={{ border: '1px solid var(--jt-border)', borderRadius: 12, background: 'var(--jt-surface)', boxShadow: 'none' }}>
            <Card.Body className="p-4">
              <h6 className="mb-3" style={{ fontWeight: 700 }}>Account</h6>
              <div className="d-flex align-items-center gap-3">
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--jt-primary-soft)', color: 'var(--jt-primary-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '1.25rem',
                }}>
                  {(user?.name || '?').split(' ').map(p => p[0]).join('').toUpperCase().slice(0,2)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{user?.name}</div>
                  <div style={{ color: 'var(--jt-text-muted)', fontSize: '0.875rem' }}>{user?.email}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Saved Resume */}
        <Col xs={12}>
          <Card style={{ border: '1px solid var(--jt-border)', borderRadius: 12, background: 'var(--jt-surface)', boxShadow: 'none' }}>
            <Card.Body className="p-4">
              <h6 className="mb-1" style={{ fontWeight: 700 }}>Saved Resume</h6>
              <p style={{ color: 'var(--jt-text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Your saved resume is automatically used for Resume Match and Cover Letter generation — no need to re-upload each time.
              </p>

              {isLoading ? <Spinner /> : profile?.hasResume ? (
                <div className="d-flex align-items-center gap-3 p-3"
                  style={{ background: 'var(--jt-primary-soft)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--jt-primary-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <div className="flex-grow-1">
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--jt-primary-strong)' }}>
                      {profile.resumeFilename || 'resume.pdf'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--jt-text-muted)' }}>Saved to your profile</div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" size="sm" onClick={() => fileRef.current?.click()} loading={upload.isPending}>
                      Replace
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => remove.mutate()} loading={remove.isPending}>
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <Button onClick={() => fileRef.current?.click()} loading={upload.isPending}>
                    Upload Resume (PDF)
                  </Button>
                  <span style={{ color: 'var(--jt-text-muted)', fontSize: '0.82rem' }}>No resume saved yet</span>
                </div>
              )}

              <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFile} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
