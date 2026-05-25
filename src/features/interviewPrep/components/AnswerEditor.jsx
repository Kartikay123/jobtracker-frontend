import { Card, Form } from 'react-bootstrap';
import { Button } from '@/shared/components/Button/Button';

export const AnswerEditor = ({ question, value, onChange, onSave, isSaving, index }) => (
  <Card className="mb-3">
    <Card.Body>
      <div className="d-flex gap-3 mb-3">
        {index != null && (
          <div
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'var(--jt-primary-soft)',
              color: 'var(--jt-primary-strong)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {index}
          </div>
        )}
        <p className="fw-semibold mb-0" style={{ fontSize: '1rem' }}>
          {question.text}
        </p>
      </div>
      <Form.Control
        as="textarea"
        rows={4}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Draft your answer here…"
      />
      <div className="mt-2 d-flex justify-content-end">
        <Button
          size="sm"
          loading={isSaving}
          onClick={onSave}
          disabled={!value?.trim()}
        >
          Save answer
        </Button>
      </div>
    </Card.Body>
  </Card>
);
