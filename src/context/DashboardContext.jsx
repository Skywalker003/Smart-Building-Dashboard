import { createContext, useContext, useState, useCallback } from 'react';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAll = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <DashboardContext.Provider value={{ refreshKey, refreshAll }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
