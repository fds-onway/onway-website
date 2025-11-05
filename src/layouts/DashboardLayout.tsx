import React from 'react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div>
    {/* Layout do dashboard para páginas privadas */}
    {children}
  </div>
);

export default DashboardLayout;
