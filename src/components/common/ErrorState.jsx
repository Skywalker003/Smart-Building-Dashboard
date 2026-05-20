export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <span className="error-icon">⚠</span>
      <p className="error-message">{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
