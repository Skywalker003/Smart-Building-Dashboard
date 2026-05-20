import { useFetch } from '../../hooks/useFetch';
import Spinner from '../common/Spinner';
import ErrorState from '../common/ErrorState';
import './ProductUpdates.css';

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function ProductUpdates() {
  const { data, loading, error, retry } = useFetch('/data/updates.json');

  return (
    <section className="widget updates-widget">
      <h2 className="widget-title">Product Updates</h2>

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {data && (
        <ul className="timeline" aria-label="Product update timeline">
          {data.map((item, index) => (
            <li
              key={item.id}
              className="timeline-item"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="version-badge">v{item.version}</span>
                  <span className="timeline-date">{formatDate(item.releaseDate)}</span>
                </div>
                <p className="timeline-title">{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
