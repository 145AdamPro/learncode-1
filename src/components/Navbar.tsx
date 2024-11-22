import React from 'react';
import { Rocket } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl text-gray-800">CodeMaster</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Progress</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Resources</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;