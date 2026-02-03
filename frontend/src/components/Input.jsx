import { useState } from 'react';
import './Input.css';

const Input = ({ 
  label, 
  type = 'text', 
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={`input-wrapper ${className}`}>
      <div className={`input-container ${isFocused || hasValue ? 'active' : ''} ${error ? 'error' : ''}`}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          className="input-field"
          placeholder=" "
          {...props}
        />
        {label && (
          <label className="input-label">
            {label} {required && <span className="required">*</span>}
          </label>
        )}
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
