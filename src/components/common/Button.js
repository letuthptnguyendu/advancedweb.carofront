import React from 'react';
import MuiButton from '@material-ui/core/Button';

// eslint-disable-next-line import/prefer-default-export
export function Button({ children, disabled, fullWidth = true, ...rest }) {
  return (
    <MuiButton
      disabled={disabled}
      fullWidth={fullWidth}
      variant="contained"
      color="primary"
      {...rest}
    >
      {children}
    </MuiButton>
  );
}
