import { Form } from 'react-bootstrap';
import { forwardRef } from 'react';

export const FormInput = forwardRef(({ label, error, type = 'text', as, rows, ...rest }, ref) => (
  <Form.Group className="mb-3">
    {label && <Form.Label>{label}</Form.Label>}
    <Form.Control ref={ref} type={type} as={as} rows={rows} isInvalid={!!error} {...rest} />
    {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
  </Form.Group>
));

FormInput.displayName = 'FormInput';
