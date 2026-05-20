import { useFetch } from '../../hooks/useFetch';
import StatCard from '../common/StatCard';
import SkeletonCard from '../common/SkeletonCard';
import ErrorState from '../common/ErrorState';
import './Overview.css';

const STATS_CONFIG = [
  { key: 'campuses',        label: 'Campuses',          icon: '🏙️',  accent: '#6366f1' },
  { key: 'buildings',       label: 'Buildings',         icon: '🏢',  accent: '#6366f1' },
  { key: 'floors',          label: 'Floors',            icon: '🪜',  accent: '#6366f1' },
  { key: 'rooms',           label: 'Rooms',             icon: '🚪',  accent: '#6366f1' },
  { key: 'users',           label: 'Users',             icon: '👤',  accent: '#0ea5e9' },
  { key: 'assets',          label: 'Assets',            icon: '📦',  accent: '#0ea5e9' },
  { key: 'workOrders',      label: 'Work Orders',       icon: '🔧',  accent: '#f59e0b' },
  { key: 'workRequests',    label: 'Work Requests',     icon: '📋',  accent: '#f59e0b' },
  { key: 'alarms',          label: 'Alarms',            icon: '🚨',  accent: '#ef4444' },
  { key: 'gateways',        label: 'Gateways',          icon: '📡',  accent: '#8b5cf6' },
  { key: 'wiredDevices',    label: 'Wired Devices',     icon: '🔌',  accent: '#8b5cf6' },
  { key: 'wirelessDevices', label: 'Wireless Devices',  icon: '📶',  accent: '#8b5cf6' },
  { key: 'areaSqFt',        label: 'Area (sq ft)',       icon: '📐',  accent: '#10b981' },
  { key: 'healthScore',     label: 'Health Score',      icon: '💚',  accent: '#10b981' },
];

function healthColor(score) {
  if (score >= 70) return '#10b981';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function healthIcon(score) {
  if (score >= 70) return '💚';
  if (score >= 50) return '🟡';
  return '🔴';
}

function formatValue(key, value) {
  if (key === 'healthScore') return `${value.toFixed(1)}%`;
  if (typeof value === 'number' && value >= 1000) return value.toLocaleString();
  return value;
}

export default function Overview() {
  const { data, loading, error, retry } = useFetch('/data/overview.json');

  return (
    <section className="widget overview-widget">
      <h2 className="widget-title">Organization Overview</h2>

      {error && <ErrorState message={error} onRetry={retry} />}

      <div className="stats-grid">
        {loading
          ? STATS_CONFIG.map((_, i) => <SkeletonCard key={i} height="90px" />)
          : data && STATS_CONFIG.map(({ key, label, icon, accent }) => (
              <StatCard
                key={key}
                label={label}
                icon={key === 'healthScore' ? healthIcon(data[key]) : icon}
                accent={key === 'healthScore' ? healthColor(data[key]) : accent}
                value={formatValue(key, data[key])}
              />
            ))
        }
      </div>
    </section>
  );
}
