import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => (props.darkMode ? '#444' : '#fff')};
  color: ${(props) => (props.darkMode ? '#fff' : '#333')};
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: ${(props) => (props.darkMode ? '#1e90ff' : '#0073b1')};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${(props) => (props.darkMode ? '#fff' : '#333')};
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-top: 10px;
`;

const Modal = ({ darkMode, title, children, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent darkMode={darkMode}>
        <ModalHeader>
          <ModalTitle darkMode={darkMode}>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;