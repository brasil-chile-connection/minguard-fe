import React from 'react';
import './BaseModal.css';

import { Modal, Fade } from '@mui/material';

interface BaseModalProps {
  open: boolean;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClose: () => void;
}

function BaseModal({
  open,
  children,
  size = 'md',
  onClose,
}: BaseModalProps): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <div className={`base-modal ${size} py-2 px-3`}>{children}</div>
      </Fade>
    </Modal>
  );
}

export default BaseModal;
