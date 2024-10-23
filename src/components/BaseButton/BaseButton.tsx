import React from 'react';
import './BaseButton.css';

import { ButtonVariant } from 'react-bootstrap/esm/types';

interface BaseButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  type?: ButtonVariant;
}

function BaseButton({
  children,
  type = 'light',
  disabled = false,
  onClick,
}: BaseButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`btn btn-${type}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BaseButton;
