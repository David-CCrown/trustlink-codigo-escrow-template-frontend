import { useState } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';

interface ErrorInfo {
  message: string;
  stack?: string;
  status?: number;
  statusText?: string;
  data?: any;
}

const PageError = () => {
  const error = useRouteError();
  const [showDetails, setShowDetails] = useState(false);
  const [showStack, setShowStack] = useState(false);

  // Parse different types of errors
  const getErrorInfo = (): ErrorInfo => {
    if (isRouteErrorResponse(error)) {
      return {
        message: error.statusText || 'An error occurred',
        status: error.status,
        statusText: error.statusText,
        data: error.data,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        stack: error.stack,
      };
    }

    if (typeof error === 'string') {
      return {
        message: error,
      };
    }

    return {
      message: 'An unknown error occurred',
    };
  };

  const errorInfo = getErrorInfo();
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Error Display */}
        <div className="bg-white rounded-lg shadow-lg border border-red-200 overflow-hidden">
          {/* Header */}
          <div className="bg-red-50 border-b border-red-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 18.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-900">
                  {errorInfo.status
                    ? `Error ${errorInfo.status}`
                    : 'Application Error'}
                </h1>
                <p className="text-red-700 mt-1">
                  {errorInfo.statusText && errorInfo.status
                    ? errorInfo.statusText
                    : 'Something went wrong'}
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="p-6">
            <div className="bg-gray-50 rounded-md p-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Error Details
              </h2>
              <p className="text-gray-700 font-mono text-sm break-words">
                {errorInfo.message}
              </p>
            </div>

            {/* Development Mode Extra Info */}
            {isDevelopment && (
              <div className="space-y-4">
                {/* Toggle Details Button */}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {showDetails ? 'Hide' : 'Show'} Error Details
                  <svg
                    className={`ml-2 w-4 h-4 transform transition-transform ${showDetails ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Detailed Error Info */}
                {showDetails && (
                  <div className="bg-gray-900 rounded-md p-4 text-white text-sm">
                    <div className="space-y-4">
                      {/* Error Object Details */}
                      <div>
                        <h3 className="font-semibold text-gray-300 mb-2">
                          Error Object:
                        </h3>
                        <pre className="whitespace-pre-wrap break-words text-xs">
                          {JSON.stringify(error, null, 2)}
                        </pre>
                      </div>

                      {/* Additional Data */}
                      {errorInfo.data && (
                        <div>
                          <h3 className="font-semibold text-gray-300 mb-2">
                            Additional Data:
                          </h3>
                          <pre className="whitespace-pre-wrap break-words text-xs">
                            {JSON.stringify(errorInfo.data, null, 2)}
                          </pre>
                        </div>
                      )}

                      {/* Stack Trace */}
                      {errorInfo.stack && (
                        <div>
                          <button
                            onClick={() => setShowStack(!showStack)}
                            className="flex items-center text-gray-300 hover:text-white mb-2"
                          >
                            <span className="font-semibold">Stack Trace</span>
                            <svg
                              className={`ml-2 w-4 h-4 transform transition-transform ${showStack ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          {showStack && (
                            <pre className="whitespace-pre-wrap break-words text-xs text-red-300 bg-gray-800 p-3 rounded border">
                              {errorInfo.stack}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reload Page
              </button>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>

              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </a>
            </div>
          </div>
        </div>

        {/* Development Footer */}
        {isDevelopment && (
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              This detailed error information is only shown in development mode.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageError;
