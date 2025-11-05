import React from 'react';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    {/* Layout limpo para páginas públicas */}
    {children}
  </>
);

export default PublicLayout;
