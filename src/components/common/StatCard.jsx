export default function StatCard({ label, value, icon, accent }) {
  return (
    <div className="stat-card" style={accent ? { borderTop: `3px solid ${accent}` } : {}}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  );
}
