import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Button } from '@/shared/components/Button/Button';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { coverLetterApi } from '../api/coverLetterApi';

export default function CoverLetterPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [copied, setCopied] = useState(false);
  const fileRef = useRef(null);
  const { data: profile } = useProfile();

  const generate = useMutation({
    mutationFn: coverLetterApi.generate,
    onSuccess: (data) => setCoverLetter(data.coverLetter),
    onError: (e) => toast.error(e.response?.data?.detail || 'Failed to generate cover letter'),
  });

  const handleGenerate = () => {
    if (!jobDescription.trim()) return toast.error('Please paste a job description');
    if (!profile?.hasResume && !file) return toast.error('Please upload a resume or save one to your profile');
    generate.mutate({ jobDescription, file });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="jt-page-header">
        <h3>Cover Letter Generator</h3>
        <p>Generate a tailored cover letter from your resume and a job description.</p>
      </div>

      <div style={{ maxWidth: 760 }}>
        {/* Resume source */}
        <Card className="mb-3" style={{ border: '1px solid var(--jt-border)', borderRadius: 12, background: 'var(--jt-surface)', boxShadow: 'none' }}>
          <Card.Body className="p-4">
            <h6 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Resume</h6>
            {profile?.hasResume ? (
              <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.875rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--jt-primary-strong)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ color: 'var(--jt-primary-strong)', fontWeight: 600 }}>Using saved resume: {profile.resumeFilename}</span>
                <span style={{ color: 'var(--jt-text-muted)' }}>· or</span>
                <button style={{ background: 'none', border: 'none', color: 'var(--jt-primary-strong)', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: '0.875rem' }}
                  onClick={() => fileRef.current?.click()}>
                  upload a different one
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <Button variant="outline-primary" size="sm" onClick={() => fileRef.current?.click()}>
                  Upload Resume PDF
                </Button>
                {file && <span style={{ fontSize: '0.82rem', color: 'var(--jt-text-muted)' }}>{file.name}</span>}
                {!file && <span style={{ fontSize: '0.82rem', color: 'var(--jt-text-muted)' }}>Or <a href="/profile" style={{ color: 'var(--jt-primary-strong)' }}>save one to your profile</a> to skip this every time</span>}
              </div>
            )}
            {file && profile?.hasResume && (
              <div style={{ fontSize: '0.8rem', marginTop: 6, color: 'var(--jt-text-muted)' }}>Using: {file.name}</div>
            )}
            <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </Card.Body>
        </Card>

        {/* Job description */}
        <Card className="mb-3" style={{ border: '1px solid var(--jt-border)', borderRadius: 12, background: 'var(--jt-surface)', boxShadow: 'none' }}>
          <Card.Body className="p-4">
            <h6 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Job Description</h6>
            <Form.Control
              as="textarea"
              rows={7}
              placeholder="Paste the full job description here…"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{ resize: 'vertical', fontSize: '0.875rem' }}
            />
          </Card.Body>
        </Card>

        <Button onClick={handleGenerate} loading={generate.isPending} className="mb-4">
          Generate Cover Letter
        </Button>

        {generate.isPending && (
          <div className="d-flex align-items-center gap-2 mb-3 px-3 py-2"
            style={{ background: 'var(--jt-primary-soft)', color: 'var(--jt-primary-strong)', borderRadius: 8, fontSize: '0.88rem', fontWeight: 500 }}>
            <div className="spinner-border spinner-border-sm" />
            Writing your cover letter… (may take ~15s)
          </div>
        )}

        {coverLetter && !generate.isPending && (
          <Card style={{ border: '1px solid var(--jt-border)', borderRadius: 12, background: 'var(--jt-surface)', boxShadow: 'none' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ fontWeight: 700, margin: 0 }}>Your Cover Letter</h6>
                <Button variant="outline-secondary" size="sm" onClick={handleCopy}>
                  {copied ? '✓ Copied' : 'Copy'}
                </Button>
              </div>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--jt-text)' }}>
                {coverLetter}
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}
