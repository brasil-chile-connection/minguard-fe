import React, { useId } from 'react';
import './BaseInput.css';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactElement | undefined;
  feedback?: string | React.ReactElement | undefined;
  feedbackType?: 'valid' | 'invalid' | 'warning';
  icon?: string;
}

function BaseInput({
  value,
  placeholder,
  icon = '',
  label = '',
  feedback = '',
  feedbackType = 'valid',
  type = 'text',
  onChange,
}: BaseInputProps): JSX.Element {
  const inputId = useId();
  return (
    <div className="base-input">
      <label htmlFor={inputId} className="form-label">
        {label}
        <div className="input-group">
          {icon && (
            <span className="input-group-text" id="basic-addon3">
              <i className={icon} />
            </span>
          )}
          <input
            className="form-control"
            type={type}
            value={value}
            id={inputId}
            aria-describedby="basic-addon3 basic-addon4"
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </label>
      <div className={`${feedbackType}-feedback`} id="basic-addon4">
        {feedback}
      </div>
    </div>
  );
}

export default BaseInput;
