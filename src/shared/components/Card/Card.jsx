import { Card as BsCard } from 'react-bootstrap';

export const Card = ({ title, actions, children, className = '', ...rest }) => (
  <BsCard className={className} {...rest}>
    {(title || actions) && (
      <BsCard.Header className="d-flex align-items-center justify-content-between">
        {title && <strong>{title}</strong>}
        {actions}
      </BsCard.Header>
    )}
    <BsCard.Body>{children}</BsCard.Body>
  </BsCard>
);
