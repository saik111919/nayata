import React, { useState, useEffect } from 'react';

const TestErrorComponent = () => {
  const [shouldThrowRenderError, setShouldThrowRenderError] = useState(false);
  const [shouldThrowAsyncError, setShouldThrowAsyncError] = useState(false);

  // This will be caught by ErrorBoundary (render error)
  if (shouldThrowRenderError) {
    throw new Error('Render Error: This error occurs during component rendering and WILL be caught by ErrorBoundary!');
  }

  // This will NOT be caught by ErrorBoundary (async error)
  useEffect(() => {
    if (shouldThrowAsyncError) {
      setTimeout(() => {
        throw new Error('Async Error: This error occurs in setTimeout and will NOT be caught by ErrorBoundary!');
      }, 1000);
    }
  }, [shouldThrowAsyncError]);

  // Event handler error - NOT caught by ErrorBoundary
  const handleEventError = () => {
    throw new Error('Event Handler Error: This error occurs in an event handler and will NOT be caught by ErrorBoundary!');
  };

  // Promise rejection error - NOT caught by ErrorBoundary
  const handlePromiseError = () => {
    Promise.reject(new Error('Promise Error: This error occurs in a promise and will NOT be caught by ErrorBoundary!'));
  };

  return (
    <div style={{ 
      padding: '30px', 
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      margin: '20px 0',
      border: '2px solid #e9ecef'
    }}>
      <h2 style={{ color: '#495057', marginBottom: '20px' }}>🧪 Error Boundary Test Lab</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <p style={{ color: '#6c757d', fontSize: '16px', lineHeight: '1.5' }}>
          Test different types of errors to see which ones are caught by the ErrorBoundary:
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        
        {/* Render Error - WILL be caught */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          border: '2px solid #28a745'
        }}>
          <h3 style={{ color: '#28a745', fontSize: '18px', marginBottom: '10px' }}>
            ✅ Render Error
          </h3>
          <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '15px' }}>
            This WILL be caught by ErrorBoundary
          </p>
          <button 
            onClick={() => setShouldThrowRenderError(true)}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Trigger Render Error
          </button>
        </div>

        {/* Event Handler Error - NOT caught */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          border: '2px solid #dc3545'
        }}>
          <h3 style={{ color: '#dc3545', fontSize: '18px', marginBottom: '10px' }}>
            ❌ Event Handler Error
          </h3>
          <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '15px' }}>
            This will NOT be caught by ErrorBoundary
          </p>
          <button 
            onClick={handleEventError}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Trigger Event Error
          </button>
        </div>

        {/* Async Error - NOT caught */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          border: '2px solid #fd7e14'
        }}>
          <h3 style={{ color: '#fd7e14', fontSize: '18px', marginBottom: '10px' }}>
            ⏰ Async Error
          </h3>
          <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '15px' }}>
            This will NOT be caught by ErrorBoundary
          </p>
          <button 
            onClick={() => setShouldThrowAsyncError(true)}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              backgroundColor: '#fd7e14',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Trigger Async Error
          </button>
        </div>

        {/* Promise Error - NOT caught */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          border: '2px solid #6f42c1'
        }}>
          <h3 style={{ color: '#6f42c1', fontSize: '18px', marginBottom: '10px' }}>
            🔮 Promise Error
          </h3>
          <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '15px' }}>
            This will NOT be caught by ErrorBoundary
          </p>
          <button 
            onClick={handlePromiseError}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Trigger Promise Error
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>📝 Instructions:</h4>
        <ul style={{ 
          textAlign: 'left', 
          color: '#424242', 
          fontSize: '14px',
          lineHeight: '1.6',
          paddingLeft: '20px'
        }}>
          <li><strong>Green button:</strong> Will show the ErrorBoundary page</li>
          <li><strong>Red/Orange/Purple buttons:</strong> Will show browser console errors only</li>
          <li>Open browser DevTools (F12) to see console errors for uncaught errors</li>
          <li>Only the green button will trigger our custom ErrorBoundary UI</li>
        </ul>
      </div>
    </div>
  );
};

export default TestErrorComponent;