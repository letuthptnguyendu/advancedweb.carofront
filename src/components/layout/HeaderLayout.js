import React from 'react';
import Header from '../Header';

export const HeaderLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
