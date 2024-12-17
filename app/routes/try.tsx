// app/components/Layout.jsx
import { Link } from '@remix-run/react';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative h-screen">
      {/* Side Navigation */}
      <nav className="absolute top-0 left-0 w-64 h-full bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">My App</h1>
        </div>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700">Home</Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 px-4 hover:bg-gray-700">About</Link>
          </li>
          {/* Add more links here */}
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="ml-64 p-6 bg-gray-100 h-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
