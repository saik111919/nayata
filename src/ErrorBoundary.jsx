import React from "react";
import "./error-boundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate a unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorId: errorId,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo, errorId);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoBack = () => {
    window.history.back();
  };

  toggleErrorDetails = () => {
    const details = document.getElementById("error-details");
    const button = document.getElementById("toggle-details-btn");

    if (details.style.display === "none" || details.style.display === "") {
      details.style.display = "block";
      button.textContent = "Hide Error Details";
    } else {
      details.style.display = "none";
      button.textContent = "Show Error Details";
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <line
                  x1="15"
                  y1="9"
                  x2="9"
                  y2="15"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <line
                  x1="9"
                  y1="9"
                  x2="15"
                  y2="15"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <h1 className="error-boundary__title">
              Oops! Something went wrong
            </h1>

            <p className="error-boundary__message">
              We're sorry, but an unexpected error has occurred. This issue has
              been logged and our team will investigate it.
            </p>

            <div className="error-boundary__error-info">
              <p className="error-boundary__error-name">
                <strong>Error:</strong>{" "}
                {this.state.error?.name || "Unknown Error"}
              </p>
              <p className="error-boundary__error-message">
                <strong>Message:</strong>{" "}
                {this.state.error?.message || "No error message available"}
              </p>
              {this.state.errorId && (
                <p className="error-boundary__error-id">
                  <strong>Error ID:</strong> <code>{this.state.errorId}</code>
                </p>
              )}
            </div>

            <div className="error-boundary__actions">
              <button
                className="error-boundary__button error-boundary__button--primary"
                onClick={this.handleReload}
              >
                Reload Page
              </button>
              <button
                className="error-boundary__button error-boundary__button--secondary"
                onClick={this.handleGoBack}
              >
                Go Back
              </button>
            </div>

            <div className="error-boundary__details-section">
              <button
                id="toggle-details-btn"
                className="error-boundary__toggle-details"
                onClick={this.toggleErrorDetails}
              >
                Show Error Details
              </button>

              <div
                id="error-details"
                className="error-boundary__details"
                style={{ display: "none" }}
              >
                <h3>Technical Details</h3>
                {this.state.error && (
                  <div className="error-boundary__stack">
                    <h4>Stack Trace:</h4>
                    <pre className="error-boundary__stack-trace">
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}

                {this.state.errorInfo &&
                  this.state.errorInfo.componentStack && (
                    <div className="error-boundary__component-stack">
                      <h4>Component Stack:</h4>
                      <pre className="error-boundary__component-trace">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}

                <div className="error-boundary__browser-info">
                  <h4>Browser Information:</h4>
                  <ul>
                    <li>
                      <strong>User Agent:</strong> {navigator.userAgent}
                    </li>
                    <li>
                      <strong>URL:</strong> {window.location.href}
                    </li>
                    <li>
                      <strong>Timestamp:</strong> {new Date().toISOString()}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="error-boundary__help">
              <p>
                If this problem persists, please contact support with the Error
                ID above.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
