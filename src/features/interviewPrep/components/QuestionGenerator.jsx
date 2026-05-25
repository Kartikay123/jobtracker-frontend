import { Card, Form, InputGroup } from 'react-bootstrap';
import { Button } from '@/shared/components/Button/Button';

export const QuestionGenerator = ({ role, onRoleChange, onGenerate, isPending }) => (
  <Card className="mb-4">
    <Card.Body>
      <Form.Label className="mb-2">What role are you interviewing for?</Form.Label>
      <div className="d-flex gap-2 flex-wrap">
        <InputGroup style={{ minWidth: 240, flex: 1 }}>
          <InputGroup.Text
            style={{
              background: 'transparent',
              border: '1px solid var(--jt-border)',
              borderRight: 'none',
              color: 'var(--jt-text-muted)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
          </InputGroup.Text>
          <Form.Control
            placeholder="e.g. Senior React Engineer"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            style={{ borderLeft: 'none' }}
          />
        </InputGroup>
        <Button onClick={onGenerate} loading={isPending} disabled={!role.trim()}>
          Generate Questions
        </Button>
      </div>
    </Card.Body>
  </Card>
);
