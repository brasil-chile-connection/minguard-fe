import React from 'react';
import './BaseButton.css';

import { ButtonVariant } from 'react-bootstrap/esm/types';

interface BaseButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLButtonElement>, 'size'> {
  type?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
}

function BaseButton({
  children,
  type = 'light',
  disabled = false,
  size = 'md',
  onClick,
  onKeyDown,
}: BaseButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`btn btn-${type} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
}

export default BaseButton;
