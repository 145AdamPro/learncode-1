import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Rocket, Sparkles, GraduationCap } from 'lucide-react';
import Quiz from './components/Quiz';
import ResourceSection from './components/ResourceSection';

function App() {
  const [selectedCourse, setSelectedCourse] = useState('javascript');
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-white shadow-lg backdrop-blur-lg bg-opacity-90 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Rocket className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CodeMaster Pro
              </span>
            </div>
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuiz(false)}
                className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                Resources
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuiz(true)}
                className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
              >
                <Brain className="w-5 h-5" />
                Practice
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Master {selectedCourse === 'javascript' ? 'JavaScript' : 'React'}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Level up your development skills with interactive challenges, AI-powered explanations,
            and comprehensive resources.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCourse('javascript')}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              selectedCourse === 'javascript'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <span className="text-xl">🚀</span>
            JavaScript
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCourse('react')}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              selectedCourse === 'react'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <span className="text-xl">⚛️</span>
            React
          </motion.button>
        </div>

        {!showQuiz ? (
          <ResourceSection course={selectedCourse} />
        ) : (
          <Quiz course={selectedCourse} onClose={() => setShowQuiz(false)} />
        )}
      </main>
    </div>
  );
}

export default App;