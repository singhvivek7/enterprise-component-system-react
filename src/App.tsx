import { lazy, Suspense } from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Link, Route, Routes } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES, ROUTES_ENUM } from '@/lib/routes';
import ErrorBoundary from '@/components/ErrorBoundary';

const DataGridDemo = lazy(() => import('@/pages/data-grid-demo'));
const ModalSystemDemo = lazy(() => import('@/pages/modal-system-demo'));
const MultiStepFormDemo = lazy(() => import('@/pages/multi-step-form-demo'));
const HierarchicalTreeDemo = lazy(
  () => import('@/pages/hierarchical-tree-demo')
);
const DashboardDemo = lazy(() => import('@/pages/dashboard-demo'));
const Home = lazy(() => import('@/pages/home'));

const App = () => {
  return (
    <ErrorBoundary componentName="App">
      <main className="min-h-screen">
        <header className="flex justify-between border-b bg-foreground/5 p-4">
          <nav>
            {ROUTES.map(({ href, label }) => (
              <Button variant="link" asChild>
                <Link to={href}>{label}</Link>
              </Button>
            ))}
          </nav>
          <ThemeSwitcher />
        </header>

        <Routes>
          <Route index element={<Home />} />
          <Route
            path={ROUTES_ENUM.DATA_GRID}
            element={
              <Suspense fallback={<div>Loading Data Grid...</div>}>
                <ErrorBoundary componentName="Data Grid">
                  <DataGridDemo />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route
            path={ROUTES_ENUM.MODAL_SYSTEM}
            element={
              <Suspense fallback={<div>Loading Modal System...</div>}>
                <ErrorBoundary componentName="Modal System">
                  <ModalSystemDemo />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route
            path={ROUTES_ENUM.MULTI_STEP_FORM}
            element={
              <Suspense fallback={<div>Loading Multi Step Form...</div>}>
                <ErrorBoundary componentName="Multi Step Form">
                  <MultiStepFormDemo />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route
            path={ROUTES_ENUM.HIERARCHICAL_TREE}
            element={
              <Suspense fallback={<div>Loading Hierarchical Tree...</div>}>
                <ErrorBoundary componentName="Hierarchical Tree">
                  <HierarchicalTreeDemo />
                </ErrorBoundary>
              </Suspense>
            }
          />
          <Route
            path={ROUTES_ENUM.DASHBOARD}
            element={
              <Suspense fallback={<div>Loading Dashboard...</div>}>
                <ErrorBoundary componentName="Dashboard">
                  <DashboardDemo />
                </ErrorBoundary>
              </Suspense>
            }
          />
        </Routes>
      </main>
    </ErrorBoundary>
  );
};

export default App;
