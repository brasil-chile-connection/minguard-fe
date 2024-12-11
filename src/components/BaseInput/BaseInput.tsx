import React, { useId } from 'react';
import './BaseInput.css';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactElement | undefined;
  feedback?: string | React.ReactElement | undefined;
  feedbackType?: 'valid' | 'invalid' | 'warning';
  icon?: string;
}

function BaseInput({
  name,
  value,
  placeholder,
  icon = '',
  label = '',
  feedback = '',
  feedbackType = 'invalid',
  type = 'text',
  disabled = false,
  onChange,
  onKeyDown,
}: BaseInputProps): JSX.Element {
  const inputId = useId();
  return (
    <div className="base-input">
      <label
        htmlFor={inputId}
        className={`form-label ${feedback ? 'm-0' : ''}`}
      >
        <strong>{label}</strong>
        <div className="input-group">
          {icon && (
            <span className="input-group-text" id="basic-addon3">
              <i className={icon} />
            </span>
          )}
          <input
            name={name}
            className="form-control"
            type={type}
            value={value}
            id={inputId}
            aria-describedby="basic-addon3 basic-addon4"
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </label>
      {feedback && (
        <div className={`${feedbackType}-custom-feedback`}>{feedback}</div>
      )}
    </div>
  );
}

export default BaseInput;
