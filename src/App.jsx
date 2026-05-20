import Overview from './components/Overview/Overview';
import ProductUpdates from './components/ProductUpdates/ProductUpdates';
import AssetHealth from './components/AssetHealth/AssetHealth';
import BuildingMap from './components/BuildingMap/BuildingMap';
import DeviceAnalytics from './components/DeviceAnalytics/DeviceAnalytics';
import { useDashboard } from './context/DashboardContext';
import './App.css';

export default function App() {
  const { refreshKey, refreshAll } = useDashboard();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <span className="header-logo">🏢</span>
          <div>
            <h1 className="header-title">Smart Building Dashboard</h1>
            <p className="header-subtitle">Admin Control Panel</p>
          </div>
        </div>
        <div className="header-right">
          <button className="refresh-btn" onClick={refreshAll} aria-label="Refresh all widgets">
            ↻ <span className="refresh-label">Refresh</span>
          </button>
          <span className="live-badge">● Live</span>
        </div>
      </header>

      <main className="dashboard-body" key={refreshKey}>
        <div className="row row-full">
          <Overview />
        </div>

        <div className="row row-split">
          <div className="col col-wide">
            <BuildingMap />
          </div>
          <div className="col col-narrow">
            <ProductUpdates />
          </div>
        </div>

        <div className="row row-split">
          <div className="col col-half">
            <AssetHealth />
          </div>
          <div className="col col-half">
            <DeviceAnalytics />
          </div>
        </div>
      </main>
    </div>
  );
}
