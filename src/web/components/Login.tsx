import * as React from 'react';

export const Login = () => {
  const params = new URLSearchParams(window.location.search);

  const err = params.get('error');
  if (err) {
    return <h1>{err}</h1>;
  }

  const code = params.get('code');
  return <h1>{code}</h1>;
};
