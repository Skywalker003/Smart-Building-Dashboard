export default function SkeletonCard({ height = '80px' }) {
  return (
    <div className="skeleton-card" style={{ height }} aria-hidden="true">
      <div className="skeleton-line short" />
      <div className="skeleton-line long" />
    </div>
  );
}
