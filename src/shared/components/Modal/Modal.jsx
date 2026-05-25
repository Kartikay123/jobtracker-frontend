import { Modal as BsModal } from 'react-bootstrap';

export const Modal = ({ show, onClose, title, children, footer, size }) => (
  <BsModal show={show} onHide={onClose} centered size={size}>
    {title && (
      <BsModal.Header closeButton>
        <BsModal.Title>{title}</BsModal.Title>
      </BsModal.Header>
    )}
    <BsModal.Body>{children}</BsModal.Body>
    {footer && <BsModal.Footer>{footer}</BsModal.Footer>}
  </BsModal>
);
