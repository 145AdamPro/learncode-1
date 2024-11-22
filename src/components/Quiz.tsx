import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, BookOpen, Youtube, Lightbulb, Trophy, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Confetti from 'react-confetti';
import { getExplanation } from '../lib/gemini';
import { jsQuestions, reactQuestions } from '../data/questions';

interface QuizProps {
  course: string;
  onClose: () => void;
}

const Quiz = ({ course, onClose }: QuizProps) => {
  const questions = course === 'javascript' ? jsQuestions : reactQuestions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setShowExplanation(true);
  };

  const handleDontKnow = async () => {
    setLoading(true);
    try {
      const explanation = await getExplanation(
        course,
        questions[currentQuestion].concept
      );
      setAiExplanation(explanation);
    } catch (error) {
      console.error('Error getting AI explanation:', error);
      setAiExplanation('Sorry, I could not get an explanation at this time.');
    }
    setLoading(false);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
      setAiExplanation('');
    }
  };

  const openResource = (type: 'video' | 'docs') => {
    const resources = {
      javascript: {
        video: 'https://www.youtube.com/watch?v=lfmg-EJ8gm4',
        docs: 'https://devdocs.io/javascript/'
      },
      react: {
        video: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA',
        docs: 'https://devdocs.io/react/'
      }
    };
    window.open(resources[course][type], '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
    >
      {showConfetti && <Confetti />}
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {course === 'javascript' ? 'JavaScript' : 'React'} Mastery Quiz
          </h2>
          <p className="text-gray-600 mt-2">
            Level: {questions[currentQuestion].difficulty}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => openResource('video')}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2 text-indigo-600"
          >
            <Youtube className="w-5 h-5" />
            <span>Tutorial</span>
          </button>
          <button
            onClick={() => openResource('docs')}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2 text-indigo-600"
          >
            <BookOpen className="w-5 h-5" />
            <span>Docs</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-medium text-gray-700">
              Score: {score}/{questions.length}
            </span>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <ReactMarkdown
            className="text-xl font-medium text-gray-800"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {questions[currentQuestion].question}
          </ReactMarkdown>
        </div>
      </div>

      <div className="grid gap-3 mb-8">
        <AnimatePresence mode="wait">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-xl transition-all ${
                showExplanation
                  ? index === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-500 shadow-green-100'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500 shadow-red-100'
                    : 'bg-gray-50'
                  : 'bg-white hover:bg-gray -50 hover:shadow-md'
            } border-2 ${
              showExplanation &&
              (index === questions[currentQuestion].correct ||
                index === selectedAnswer)
                ? 'border-2'
                : 'border-gray-100'
            }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
          
          {!showExplanation && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleDontKnow}
              className="w-full p-4 text-left rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors border-2 border-indigo-100 flex items-center gap-2"
            >
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span className="text-indigo-600 font-medium">I need help understanding this</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Explanation</h3>
              <ReactMarkdown
                className="text-blue-700 prose prose-blue max-w-none"
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {questions[currentQuestion].explanation}
              </ReactMarkdown>
            </div>

            {aiExplanation && (
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-800">AI Explanation</h3>
                </div>
                {loading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                    <div className="h-4 bg-purple-200 rounded w-1/2"></div>
                    <div className="h-4 bg-purple-200 rounded w-2/3"></div>
                  </div>
                ) : (
                  <ReactMarkdown
                    className="prose prose-purple max-w-none"
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {aiExplanation}
                  </ReactMarkdown>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex justify-end">
        {showExplanation && currentQuestion < questions.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextQuestion}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg shadow-indigo-200 flex items-center gap-2"
          >
            Next Question
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Quiz;