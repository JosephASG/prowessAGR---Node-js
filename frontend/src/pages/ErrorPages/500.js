import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const InternalServerErrorPage = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" color="red" />
    <h1>500 Error Interno</h1>
    <p>Te pedimos disculpas por este inconveniente</p>
  </div>
);

export default InternalServerErrorPage;