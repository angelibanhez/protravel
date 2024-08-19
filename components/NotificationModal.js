import React, { useEffect, useRef } from 'react';
import { create } from 'zustand'
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

const NOTIFICATION_PERIOD = 3000

const useNotificationsStore = create((set) => ({
  message: '', type: '',
  setMessage: (message) => set({message}),
  notify: (message, type) => set({message, type})
}))

export const notifyError = (msg) => {
  useNotificationsStore.getState().notify(msg, 'error')
}

export const notifySuccess = (msg) => {
  useNotificationsStore.getState().notify(msg, 'success')
}

export default function NotificationModal() {
  const message = useNotificationsStore(store => store.message)
  const setMessage = useNotificationsStore(store => store.setMessage)
  const type = useNotificationsStore(store => store.type)

  const timerRef = useRef(setTimeout(() => {}, 0))

  useEffect(() => {
    if (message) {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setMessage('') 
      }, NOTIFICATION_PERIOD)
    }
  }, [message]);

  const show = !!message;
  return (
    <NotificationContainer type={type} show={show}>
      {message}
    </NotificationContainer>
  );
}
