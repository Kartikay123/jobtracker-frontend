import { Form } from 'react-bootstrap';

export const JobDescriptionInput = ({ value, onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Job Description</Form.Label>
    <Form.Control
      as="textarea"
      rows={8}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste the full job description here…"
    />
  </Form.Group>
);
