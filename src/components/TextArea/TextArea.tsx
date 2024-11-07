import React, { useId } from 'react';
import './TextArea.css';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | React.ReactElement | undefined;
  feedback?: string | React.ReactElement | undefined;
  feedbackType?: 'valid' | 'invalid' | 'warning';
}

function TextArea({
  className,
  name,
  value,
  placeholder,
  label = '',
  feedback = '',
  feedbackType = 'valid',
  disabled = false,
  style,
  onChange,
}: TextAreaProps): JSX.Element {
  const inputId = useId();
  return (
    <div className="text-area">
      <div className="form-floating">
        <textarea
          className={`form-control ${className}`}
          name={name}
          value={value}
          style={style}
          id={inputId}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
        />
        <label htmlFor={inputId}>
          <strong>{label}</strong>
        </label>
      </div>
      <div className={`${feedbackType}-feedback`} id="basic-addon4">
        {feedback}
      </div>
    </div>
  );
}

export default TextArea;