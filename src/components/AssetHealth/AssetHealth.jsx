import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import Spinner from '../common/Spinner';
import ErrorState from '../common/ErrorState';
import './AssetHealth.css';

function FloorRow({ floor }) {
  const { healthy, warning, critical } = floor.assets;
  const total = healthy + warning + critical;
  return (
    <div className="floor-row">
      <div className="floor-name">{floor.name}</div>
      <div className="floor-badges">
        <span className="badge badge-healthy">{healthy} Healthy</span>
        <span className="badge badge-warning">{warning} Warning</span>
        <span className="badge badge-critical">{critical} Critical</span>
      </div>
      <div className="floor-energy">{floor.energy.consumption} {floor.energy.unit}</div>
      <div className="floor-bar">
        <div className="bar-segment bar-healthy" style={{ width: `${(healthy / total) * 100}%` }} />
        <div className="bar-segment bar-warning" style={{ width: `${(warning / total) * 100}%` }} />
        <div className="bar-segment bar-critical" style={{ width: `${(critical / total) * 100}%` }} />
      </div>
    </div>
  );
}

function BuildingAccordion({ building }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordion ${open ? 'accordion-open' : ''}`}>
      <button
        className="accordion-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        title={open ? 'Collapse' : 'Expand to see floors'}
      >
        <span className="building-name">{building.building}</span>
        <span className="accordion-meta">
          <span className="floor-count">{building.floors.length} floor{building.floors.length !== 1 ? 's' : ''}</span>
          <span className="accordion-arrow">{open ? '▲' : '▼'}</span>
        </span>
      </button>
      <div className="accordion-body">
        {building.floors.map(floor => (
          <FloorRow key={floor.name} floor={floor} />
        ))}
      </div>
    </div>
  );
}

export default function AssetHealth() {
  const { data, loading, error, retry } = useFetch('/data/assetHealth.json');

  return (
    <section className="widget asset-health-widget">
      <h2 className="widget-title">Asset Health Summary</h2>

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {data && (
        <div className="accordion-list">
          {data.map(building => (
            <BuildingAccordion key={building.building} building={building} />
          ))}
        </div>
      )}
    </section>
  );
}
