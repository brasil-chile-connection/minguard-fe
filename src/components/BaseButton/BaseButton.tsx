import React from 'react';
import './BaseButton.css';

import { Variant } from 'react-bootstrap/esm/types';

interface BaseButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  type?: Variant;
}

function BaseButton({
  children,
  type = 'light',
  onClick,
}: BaseButtonProps): JSX.Element {
  return (
    <button type="button" className={`btn btn-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default BaseButton;
