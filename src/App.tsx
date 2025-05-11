import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Link, Route, Routes } from 'react-router-dom';
import { DataGridDemo } from '@/pages/data-grid-demo';
import { ModalSystemDemo } from '@/pages/modal-system-demo';
import { Home } from '@/pages/home';
import { Button } from '@/components/ui/button';

const App = () => {
  return (
    <main className="min-h-screen">
      <header className="flex justify-between border-b bg-foreground/5 p-4">
        <nav>
          <Button variant="link" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/data-grid">Data Grid</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/modal-system">Modal System</Link>
          </Button>
        </nav>
        <ThemeSwitcher />
      </header>{' '}
      <Routes>
        <Route index element={<Home />} />
        <Route path="data-grid" element={<DataGridDemo />} />
        <Route path="modal-system" element={<ModalSystemDemo />} />
      </Routes>
    </main>
  );
};

export default App;
