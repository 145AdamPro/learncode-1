import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, BookOpen, Code2 } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface ResourceSectionProps {
  course: string;
}

const ResourceSection = ({ course }: ResourceSectionProps) => {
  const resources = {
    javascript: {
      video: 'https://www.youtube.com/watch?v=lfmg-EJ8gm4',
      docs: 'https://devdocs.io/javascript/',
      title: 'JavaScript Resources'
    },
    react: {
      video: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA',
      docs: 'https://devdocs.io/react/',
      title: 'React Resources'
    }
  };

  const currentResource = resources[course as keyof typeof resources];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 mb-12"
    >
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {currentResource.title}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Youtube className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-800">Video Tutorial</h3>
            </div>
            <VideoPlayer url={currentResource.video} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">Documentation</h3>
            </div>
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-600 mb-4">
                Access comprehensive documentation to master {course === 'javascript' ? 'JavaScript' : 'React'}.
                The documentation includes detailed explanations, examples, and best practices.
              </p>
              <a
                href={currentResource.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Code2 className="w-5 h-5" />
                Open Documentation
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Tips</h3>
            <ul className="space-y-3">
              {course === 'javascript' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-gray-600">Use const by default, let when needed, avoid var</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-gray-600">Learn async/await for better async code handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-gray-600">Master array methods like map, filter, and reduce</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-gray-600">Keep components small and focused</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-gray-600">Use hooks for state and side effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-gray-600">Understand the component lifecycle</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceSection;