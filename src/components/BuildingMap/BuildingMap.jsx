import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useFetch } from '../../hooks/useFetch';
import Spinner from '../common/Spinner';
import ErrorState from '../common/ErrorState';
import './BuildingMap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function healthLabel(score) {
  if (score >= 70) return { text: 'Good', color: '#22c55e' };
  if (score >= 50) return { text: 'Fair', color: '#eab308' };
  return { text: 'Poor', color: '#ef4444' };
}

export default function BuildingMap() {
  const { data, loading, error, retry } = useFetch('/data/buildings.json');

  const center = [12.9152, 77.5977];

  return (
    <section className="widget map-widget">
      <h2 className="widget-title">Building Locations</h2>

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {data && (
        <div className="map-container">
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map(building => {
              const hl = healthLabel(building.healthScore);
              return (
                <Marker key={building.id} position={building.geoLocation}>
                  <Popup>
                    <div className="map-popup">
                      <strong>{building.name}</strong>
                      <span>{building.city}</span>
                      <span>Area: {building.area.toLocaleString()} sq ft</span>
                      <span>Floors: {building.totalFloors}</span>
                      <span style={{ color: hl.color }}>
                        Health: {building.healthScore}% ({hl.text})
                      </span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}
    </section>
  );
}
