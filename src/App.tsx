import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Link, Route, Routes } from 'react-router-dom';
import { DataGridDemo } from '@/pages/data-grid-demo';
import { ModalSystemDemo } from '@/pages/modal-system-demo';
import { MultiStepFormDemo } from '@/pages/multi-step-form-demo';
import { Home } from '@/pages/home';
import { HierarchicalTreeDemo } from '@/pages/hierarchical-tree-demo';
import { DashboardDemo } from '@/pages/dashboard-demo';
import { Button } from '@/components/ui/button';
import { ROUTES, ROUTES_ENUM } from '@/lib/routes';

const App = () => {
  return (
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
        <Route path={ROUTES_ENUM.DATA_GRID} element={<DataGridDemo />} />
        <Route path={ROUTES_ENUM.MODAL_SYSTEM} element={<ModalSystemDemo />} />
        <Route
          path={ROUTES_ENUM.MULTI_STEP_FORM}
          element={<MultiStepFormDemo />}
        />
        <Route
          path={ROUTES_ENUM.HIERARCHICAL_TREE}
          element={<HierarchicalTreeDemo />}
        />
        <Route path={ROUTES_ENUM.DASHBOARD} element={<DashboardDemo />} />
      </Routes>
    </main>
  );
};

export default App;
