import React from 'react';
import '../Components/ErrorPage.css';
const ErrorPage = ({ errorCode }) => {
  let errorMessage;

  switch (errorCode) {
    case 404:
      errorMessage = 'Please try again later.';
      break;
    case 500:
      errorMessage = 'There was an internal server error.';
      break;
    default:
      errorMessage = 'An unexpected error has occurred.';
  }

  return (
    <div className='errormsg'>
      <h1>Oops! Something Went Wrong</h1>
      <p>Please try again later.</p>
      <p>{errorMessage}</p>
      <div className='erroricon'>⚠️</div>
    </div>
  );
};

export default ErrorPage;
