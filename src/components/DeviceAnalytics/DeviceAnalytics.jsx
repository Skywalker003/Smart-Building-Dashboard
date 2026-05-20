import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useFetch } from '../../hooks/useFetch';
import Spinner from '../common/Spinner';
import ErrorState from '../common/ErrorState';
import './DeviceAnalytics.css';

const LEGEND_ITEMS = [
  { key: 'healthy',  label: 'Healthy',  color: '#22c55e' },
  { key: 'warning',  label: 'Warning',  color: '#eab308' },
  { key: 'critical', label: 'Critical', color: '#ef4444' },
];

function CustomLegend() {
  return (
    <div className="chart-legend">
      {LEGEND_ITEMS.map(({ key, label, color }) => (
        <span key={key} className="chart-legend-item">
          <span className="chart-legend-dot" style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}

export default function DeviceAnalytics() {
  const { data, loading, error, retry } = useFetch('/data/deviceHealth.json', {
    simulateError: true,
  });

  return (
    <section className="widget analytics-widget">
      <h2 className="widget-title">Device Health Analytics</h2>

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {data && (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
              <YAxis
                tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                label={{
                  value: 'Devices',
                  angle: -90,
                  position: 'insideLeft',
                  offset: -2,
                  style: { fill: 'var(--text-muted)', fontSize: 11 },
                }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  color: 'var(--text-primary)',
                }}
              />
              <Legend content={<CustomLegend />} />
              <Bar dataKey="healthy"  name="Healthy"  stackId="a" fill="#22c55e" />
              <Bar dataKey="warning"  name="Warning"  stackId="a" fill="#eab308" />
              <Bar dataKey="critical" name="Critical" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
