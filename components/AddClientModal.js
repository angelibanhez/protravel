import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled components for the overlay and modal
const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); /* Blur effect */
  z-index: 999;
`;

const DialogStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 0.375rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const DialogContentStyled = styled.div`
  max-width: 425px;
`;

const DialogHeaderStyled = styled.div`
  margin-bottom: 1rem;
`;

const DialogTitleStyled = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
`;

const DialogDescriptionStyled = styled.p`
  margin: 0;
  color: #4a5568;
`;

const DialogFooterStyled = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

const LabelStyled = styled.label`
  text-align: right;
  padding-right: 0.75rem;
`;

const InputStyled = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const ButtonStyled = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color, #0070f3);
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color-hover, #005bb5);
  }
`;

export default function AddClientModal({ isOpen, onClose, onSave, clientData, onChange }) {
  const modalRef = useRef();

  // Close modal when clicking outside of it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <>
      <OverlayStyled /> {/* Blurred overlay */}
      <DialogStyled ref={modalRef}>
        <DialogContentStyled>
          <DialogHeaderStyled>
            <DialogTitleStyled>Add New Client</DialogTitleStyled>
            <DialogDescriptionStyled>Enter the client's details below.</DialogDescriptionStyled>
          </DialogHeaderStyled>
          
          {/* Form fields */}
          <div>
            <LabelStyled htmlFor="name">Name</LabelStyled>
            <InputStyled
              id="name"
              name="name"
              value={clientData.name}
              onChange={onChange}
            />

            <LabelStyled htmlFor="email">Email</LabelStyled>
            <InputStyled
              id="email"
              name="email"
              type="email"
              value={clientData.email}
              onChange={onChange}
            />

            <LabelStyled htmlFor="phone">Phone</LabelStyled>
            <InputStyled
              id="phone"
              name="phone"
              value={clientData.phone}
              onChange={onChange}
            />

            <LabelStyled htmlFor="nationality">Nationality</LabelStyled>
            <InputStyled
              id="nationality"
              name="nationality"
              value={clientData.nationality}
              onChange={onChange}
            />

            <LabelStyled htmlFor="recommendedBy">Recommended By</LabelStyled>
            <InputStyled
              id="recommendedBy"
              name="recommendedBy"
              value={clientData.recommendedBy}
              onChange={onChange}
            />
          </div>
          
          {/* Footer with action buttons */}
          <DialogFooterStyled>
            <ButtonStyled onClick={onSave}>Save Client</ButtonStyled>
            <ButtonStyled onClick={onClose} style={{ marginLeft: '1rem', backgroundColor: 'gray' }}>Cancel</ButtonStyled>
          </DialogFooterStyled>
        </DialogContentStyled>
      </DialogStyled>
    </>
  );
}
