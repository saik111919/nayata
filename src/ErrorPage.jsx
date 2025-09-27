import React from 'react';
import { useRouteError } from 'react-router';
import './error-boundary.css';

const ErrorPage = () => {
  const error = useRouteError();
  const errorId = `route_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Log error details for debugging
  console.error('Route Error caught:', error);

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const toggleErrorDetails = () => {
    const details = document.getElementById('error-details');
    const button = document.getElementById('toggle-details-btn');
    
    if (details.style.display === 'none' || details.style.display === '') {
      details.style.display = 'block';
      button.textContent = 'Hide Error Details';
    } else {
      details.style.display = 'none';
      button.textContent = 'Show Error Details';
    }
  };

  return (
    <div className="error-boundary">
      <div className="error-boundary__container">
        <div className="error-boundary__icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="#ef4444" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="#ef4444" strokeWidth="2"/>
          </svg>
        </div>
        
        <h1 className="error-boundary__title">Oops! Something went wrong</h1>
        
        <p className="error-boundary__message">
          We're sorry, but an unexpected error has occurred in the application routing. This issue has been logged and our team will investigate it.
        </p>

        <div className="error-boundary__error-info">
          <p className="error-boundary__error-name">
            <strong>Error:</strong> {error?.name || error?.status || 'Route Error'}
          </p>
          <p className="error-boundary__error-message">
            <strong>Message:</strong> {error?.message || error?.statusText || error?.data || 'An error occurred while navigating'}
          </p>
          <p className="error-boundary__error-id">
            <strong>Error ID:</strong> <code>{errorId}</code>
          </p>
        </div>

        <div className="error-boundary__actions">
          <button 
            className="error-boundary__button error-boundary__button--primary"
            onClick={handleReload}
          >
            Reload Page
          </button>
          <button 
            className="error-boundary__button error-boundary__button--secondary"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>

        <div className="error-boundary__details-section">
          <button 
            id="toggle-details-btn"
            className="error-boundary__toggle-details"
            onClick={toggleErrorDetails}
          >
            Show Error Details
          </button>
          
          <div id="error-details" className="error-boundary__details" style={{ display: 'none' }}>
            <h3>Technical Details</h3>
            
            <div className="error-boundary__stack">
              <h4>Error Object:</h4>
              <pre className="error-boundary__stack-trace">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
            
            {error?.stack && (
              <div className="error-boundary__component-stack">
                <h4>Stack Trace:</h4>
                <pre className="error-boundary__component-trace">
                  {error.stack}
                </pre>
              </div>
            )}
            
            <div className="error-boundary__browser-info">
              <h4>Browser Information:</h4>
              <ul>
                <li><strong>User Agent:</strong> {navigator.userAgent}</li>
                <li><strong>URL:</strong> {window.location.href}</li>
                <li><strong>Timestamp:</strong> {new Date().toISOString()}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="error-boundary__help">
          <p>If this problem persists, please contact support with the Error ID above.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;