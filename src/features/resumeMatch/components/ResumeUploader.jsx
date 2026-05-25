import { Form } from 'react-bootstrap';

export const ResumeUploader = ({ value, onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Upload Resume (PDF)</Form.Label>
    <label className="jt-uploader d-block">
      <div className="jt-uploader-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <div style={{ fontWeight: 600 }}>
        {value ? 'Replace file' : 'Click to upload your resume'}
      </div>
      <div className="hint">PDF · up to ~5 MB</div>
      {value && <div className="file-name">{value.name}</div>}
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </label>
  </Form.Group>
);
