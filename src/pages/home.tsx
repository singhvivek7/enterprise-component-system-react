import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Blocks, Code } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

const techStack = [
  {
    name: 'React.js',
    description: 'A JavaScript library for building user interfaces',
  },
  {
    name: 'Webpack',
    description: 'A module bundler to bundle JavaScript and assets',
  },
  {
    name: 'Babel',
    description:
      'A JavaScript compiler to convert modern JS into backward-compatible versions',
  },
  {
    name: 'TypeScript',
    description: 'A strongly typed superset of JavaScript',
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for building modern UIs',
  },
  {
    name: 'Zustand',
    description: 'A lightweight state management library for React',
  },
];

export const Home = () => {
  return (
    <div className="h-[calc(100dvh-69px)] bg-background flex flex-col justify-between">
      <main className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row gap-8">
        <div className="flex flex-1 justify-center items-start flex-col w-full">
          <div className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
            Traya Health Assignment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Hi, I'm <span className="text-emerald-600">Vivek Kumar</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-lg">
            This is a{' '}
            <span className="text-orange-600 bg-orange-50 py-0.5 px-2 rounded-full text-base">
              Frontend Architecture Challenge: Enterprise Component System
            </span>{' '}
            assignment provided by{' '}
            <span className="text-emerald-600 underline">Traya Health</span>.
          </p>

          <h3 className="text-2xl mb-4 font-bold flex items-center gap-2">
            <Blocks className="text-emerald-600" size={24} />
            Components
          </h3>
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {ROUTES.slice(1).map(({ href, label }, idx) => (
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 gap-2 px-5 py-6"
                size="lg">
                <Link to={href}>
                  {idx + 1}. {label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 flex items-center">
          <div className="p-6 bg-muted/50 rounded-lg w-full border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Code className="text-emerald-600" size={22} />
              Tech Stack Used
            </h2>
            <div className="space-y-3">
              {techStack.map(({ name, description }) => (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  <div className="text-foreground flex-1">
                    <span className="font-medium">{name}</span>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground">
            © 2025 Vivek Kumar | Traya Health Assignment
          </p>
          <a
            href="https://www.thevivek.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 text-sm hover:underline flex items-center gap-1">
            www.thevivek.tech
          </a>
        </div>
      </footer>
    </div>
  );
};
