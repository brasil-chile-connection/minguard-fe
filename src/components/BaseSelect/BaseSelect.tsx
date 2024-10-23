import React, { useId } from 'react';
import './BaseSelect.css';

interface BaseSelectProps
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

function BaseSelect({
  'aria-label': ariaLabel,
  value,
  children = [],
  size = 'md',
  disabled = false,
  label = '',
  onChange,
}: BaseSelectProps): JSX.Element {
  const inputId = useId();
  return (
    <label htmlFor={inputId} className="form-label w-100">
      <strong>{label}</strong>
      <select
        className={`base-select form-select form-select-${size}`}
        value={value}
        aria-label={ariaLabel}
        disabled={disabled}
        onChange={onChange}
      >
        {children}
      </select>
    </label>
  );
}

export default BaseSelect;
