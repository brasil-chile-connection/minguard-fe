import React, { useId } from 'react';
import './BaseSelect.css';

interface BaseSelectProps
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  feedback?: string | React.ReactElement | undefined;
  feedbackType?: 'valid' | 'invalid' | 'warning';
  label?: string;
}

function BaseSelect({
  'aria-label': ariaLabel,
  name,
  value,
  children = [],
  size = 'md',
  disabled = false,
  label = '',
  feedback = '',
  feedbackType = 'invalid',
  onChange,
}: BaseSelectProps): JSX.Element {
  const inputId = useId();
  return (
    <label htmlFor={inputId} className="form-label w-100">
      <strong>{label}</strong>
      <select
        className={`base-select form-select form-select-${size}`}
        value={value}
        name={name}
        aria-label={ariaLabel}
        disabled={disabled}
        onChange={onChange}
      >
        {children}
      </select>
      {feedback && (
        <div className={`${feedbackType}-custom-feedback`}>{feedback}</div>
      )}
    </label>
  );
}

export default BaseSelect;
