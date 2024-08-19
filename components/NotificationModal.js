import React, { useEffect } from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: ${({ type }) => (type === 'success' ? '#4caf50' : '#f44336')}; // Verde para éxito, rojo para error
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

export default function NotificationModal({ message, type, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <NotificationContainer type={type} show={show}>
      {message}
    </NotificationContainer>
  );
}
