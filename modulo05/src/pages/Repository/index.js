import React from 'react';

// import { Container } from './styles';

export default function Repository({ match }) {
  return <h1> Repositório: {decodeURIComponent(match.params.repository)}</h1>;
}
