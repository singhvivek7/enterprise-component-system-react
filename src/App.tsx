import { useCounterStore } from './stores/counterStore';
import ThemeSwitcher from './components/ThemeSwitcher';
import { Button } from './components/ui/button';

const App = () => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
      <div className="space-x-4 mb-6">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default App;
