import { Button as BsButton, Spinner } from 'react-bootstrap';

export const Button = ({ loading, children, disabled, ...rest }) => (
  <BsButton disabled={disabled || loading} {...rest}>
    {loading && <Spinner size="sm" className="me-2" animation="border" />}
    {children}
  </BsButton>
);
