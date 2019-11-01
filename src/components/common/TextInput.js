import React from 'react';
import { TextField } from '@material-ui/core';

// eslint-disable-next-line import/prefer-default-export
export function TextInput({
  error,
  label,
  value,
  fullWidth = true,
  autoFocus = true,
  onChange,
  required = true,
  ...rest
}) {
  return (
    <TextField
      variant="outlined"
      label={label}
      error={error}
      onChange={onChange}
      value={value}
      required={required}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      {...rest}
    />
  );
}
