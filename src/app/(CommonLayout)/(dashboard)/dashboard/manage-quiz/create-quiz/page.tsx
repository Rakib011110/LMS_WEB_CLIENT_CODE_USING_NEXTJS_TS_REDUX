"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, ImagePlus, ArrowLeft, CheckCircle, Circle } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  questionText: string;
  options: Option[];
  correctAnswerId: number | null;
  marks: number;
  feedback: string;
}

// --- REUSABLE UI COMPONENTS ---

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const Input = ({ label, type = 'text', placeholder, value, onChange }: { label: string, type?: string, placeholder?: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

// This is a placeholder for a real rich text editor component (like Tiptap, Quill, or TinyMCE)
const RichTextEditorPlaceholder = ({ label, placeholder }: { label: string, placeholder?: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="w-full border border-gray-300 rounded-md shadow-sm overflow-hidden">
      <div className="p-2 bg-gray-50 border-b border-gray-300 flex items-center gap-4">
        <button type="button" className="text-gray-600 hover:text-black"><strong>B</strong></button>
        <button type="button" className="text-gray-600 hover:text-black"><em>I</em></button>
        <button type="button" className="text-gray-600 hover:text-black"><u>U</u></button>
        <button type="button" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <ImagePlus size={18} />
          <span className="text-xs">Image</span>
        </button>
      </div>
      <textarea
        placeholder={placeholder}
        className="w-full p-3 border-0 focus:ring-0 min-h-[120px] text-sm"
      ></textarea>
    </div>
    <p className="text-xs text-gray-500 mt-1">You can add images and format your text here.</p>
  </div>
);


// --- MAIN PAGE COMPONENT ---

export default function CreateQuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      questionText: '',
      options: [],
      correctAnswerId: null,
      marks: 5,
      feedback: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: number) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const addOption = (questionId: number) => {
    const newOption: Option = { id: Date.now(), text: '' };
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, options: [...q.options, newOption] } : q
    ));
  };

  const removeOption = (questionId: number, optionId: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, options: q.options.filter(o => o.id !== optionId) } : q
    ));
  };

  const setCorrectAnswer = (questionId: number, optionId: number) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, correctAnswerId: optionId } : q
    ));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <a href="#/quizzes" className="p-2 rounded-full hover:bg-gray-200">
            <ArrowLeft size={20} className="text-gray-700" />
          </a>
          <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
        </div>

        <form className="space-y-8">
          {/* Quiz Details Card */}
          <Card>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Quiz Details</h2>
              <Input label="Quiz Title" placeholder="e.g., React Fundamentals" value="" onChange={() => {}} />
              <RichTextEditorPlaceholder label="Quiz Description" placeholder="Describe what this quiz is about..." />
              <RichTextEditorPlaceholder label="Overall Feedback" placeholder="General feedback after completing the quiz..." />
              <Input label="Negative Marking (%)" type="number" placeholder="e.g., 25" value={0} onChange={() => {}} />
            </div>
          </Card>

          {/* Questions Section */}
          <Card>
            <div className="flex justify-between items-center border-b pb-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Quiz Questions</h2>
                <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <PlusCircle size={20} />
                    Add Question
                </button>
            </div>
            
            <div className="space-y-6">
                <AnimatePresence>
                    {questions.map((question, index) => (
                        <motion.div
                            key={question.id}
                            layout
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -300, transition: { duration: 0.3 } }}
                            className="p-5 border border-gray-200 rounded-lg bg-gray-50/50"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg text-gray-800">Question {index + 1}</h3>
                                <button type="button" onClick={() => removeQuestion(question.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <RichTextEditorPlaceholder label="Question Text" placeholder="What is a React component?" />
                                
                                <div>
                                    <h4 className="block text-sm font-medium text-gray-700 mb-2">Options</h4>
                                    <div className="space-y-3">
                                        {question.options.map((option) => (
                                            <div key={option.id} className="flex items-center gap-3">
                                                <button type="button" onClick={() => setCorrectAnswer(question.id, option.id)} className="flex-shrink-0">
                                                    {question.correctAnswerId === option.id 
                                                        ? <CheckCircle size={22} className="text-green-600" /> 
                                                        : <Circle size={22} className="text-gray-400" />
                                                    }
                                                </button>
                                                <div className="flex-grow">
                                                    <RichTextEditorPlaceholder label="" />
                                                </div>
                                                <button type="button" onClick={() => removeOption(question.id, option.id)} className="text-gray-400 hover:text-red-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => addOption(question.id)}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-3 flex items-center gap-1"
                                    >
                                        <PlusCircle size={16} /> Add Option
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Marks" type="number" value={question.marks} onChange={() => {}} />
                                    <Input label="Feedback (Optional)" placeholder="Why this is correct/incorrect" value={question.feedback} onChange={() => {}} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Save as Draft</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Publish Quiz</button>
          </div>
        </form>
      </div>
    </div>
  );
}
