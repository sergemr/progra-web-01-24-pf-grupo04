import React, { lazy, Suspense } from 'react';

const LazyAppBar = lazy(() => import('./AppBar'));

const AppBar = props => (
  <Suspense fallback={null}>
    <LazyAppBar {...props} />
  </Suspense>
);

export default AppBar;
