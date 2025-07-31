"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCreateQuizMutation, useUploadQuizImageMutation, Quiz, Question } from '@/app/redux/api/QuizApi/quizApi';
import RichTextEditor from '@/components/shared/RichTextEditor';
import ImageUpload from '@/components/shared/ImageUpload';

// --- TYPE DEFINITIONS ---
interface LocalOption {
  id: string;
  text: string;
  image?: string;
}

interface LocalQuestion {
  id: string;
  questionText: string;
  questionImage?: string;
  options: LocalOption[];
  correctAnswerId: string;
  marks: number;
  feedback: string;
}

interface LocalQuiz {
  title: string;
  description: string;
  descriptionImage?: string;
  overallFeedback: string;
  negativeMarkingPercentage: number;
}

// --- REUSABLE UI COMPONENTS ---

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const Input = ({ label, type = 'text', placeholder, value, onChange }: { 
  label: string, 
  type?: string, 
  placeholder?: string, 
  value: string | number, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}) => (
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

const TextArea = ({ label, placeholder, value, onChange }: { 
  label: string, 
  placeholder?: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function CreateQuizPage() {
  const router = useRouter();
  const [createQuiz, { isLoading }] = useCreateQuizMutation();
  
  const [quiz, setQuiz] = useState<LocalQuiz>({
    title: '',
    description: '',
    overallFeedback: '',
    negativeMarkingPercentage: 0
  });
  
  const [questions, setQuestions] = useState<LocalQuestion[]>([]);

  const addQuestion = () => {
    const newQuestion: LocalQuestion = {
      id: Date.now().toString(),
      questionText: '',
      options: [],
      correctAnswerId: '',
      marks: 5,
      feedback: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const updateQuestion = (questionId: string, field: keyof LocalQuestion, value: any) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const addOption = (questionId: string) => {
    const newOption: LocalOption = { 
      id: Date.now().toString(), 
      text: '' 
    };
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, options: [...q.options, newOption] } : q
    ));
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { 
        ...q, 
        options: q.options.filter(o => o.id !== optionId),
        correctAnswerId: q.correctAnswerId === optionId ? '' : q.correctAnswerId
      } : q
    ));
  };

  const updateOption = (questionId: string, optionId: string, field: keyof LocalOption, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? {
        ...q,
        options: q.options.map(o => 
          o.id === optionId ? { ...o, [field]: value } : o
        )
      } : q
    ));
  };

  const setCorrectAnswer = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, correctAnswerId: optionId } : q
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!quiz.title.trim() || !quiz.description.trim()) {
      toast.error('Please fill in quiz title and description');
      return;
    }
    
    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }
    
    for (const question of questions) {
      if (!question.questionText.trim()) {
        toast.error('Please fill in all question texts');
        return;
      }
      if (question.options.length < 2) {
        toast.error('Each question must have at least 2 options');
        return;
      }
      if (!question.correctAnswerId) {
        toast.error('Please select a correct answer for each question');
        return;
      }
    }

    try {
      const quizData: Quiz = {
        title: quiz.title,
        description: quiz.description,
        descriptionImage: quiz.descriptionImage,
        overallFeedback: quiz.overallFeedback,
        negativeMarkingPercentage: quiz.negativeMarkingPercentage
      };

      const questionsData: Omit<Question, '_id' | 'quizId'>[] = questions.map(q => ({
        questionText: q.questionText,
        questionImage: q.questionImage,
        options: q.options,
        correctAnswerId: q.correctAnswerId,
        marks: q.marks,
        feedback: q.feedback
      }));

      await createQuiz({ 
        quiz: quizData, 
        questions: questionsData as Question[] 
      }).unwrap();
      
      toast.success('Quiz created successfully!');
      router.push('/dashboard/manage-quiz');
    } catch (error) {
      toast.error('Failed to create quiz');
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Details Card */}
          <Card>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Quiz Details</h2>
              
              <Input 
                label="Quiz Title" 
                placeholder="e.g., React Fundamentals" 
                value={quiz.title} 
                onChange={(e) => setQuiz({...quiz, title: e.target.value})} 
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Description</label>
                <RichTextEditor
                  value={quiz.description}
                  onChange={(value) => setQuiz({...quiz, description: value})}
                  placeholder="Describe what this quiz is about..."
                  onImageUpload={async (file) => {
                    const formData = new FormData();
                    formData.append('image', file);
                    const response = await fetch('http://localhost:5000/api/quizzes/upload-image', {
                      method: 'POST',
                      body: formData,
                    });
                    const result = await response.json();
                    return `http://localhost:5000/${result.data.imagePath}`;
                  }}
                />
              </div>
              
              <ImageUpload 
                label="Description Image (Optional)"
                onImageUpload={(imagePath) => setQuiz({...quiz, descriptionImage: imagePath})}
                currentImage={quiz.descriptionImage}
              />
              
              <TextArea 
                label="Overall Feedback" 
                placeholder="General feedback after completing the quiz..." 
                value={quiz.overallFeedback}
                onChange={(e) => setQuiz({...quiz, overallFeedback: e.target.value})}
              />
              
              <Input 
                label="Negative Marking (%)" 
                type="number" 
                placeholder="e.g., 25" 
                value={quiz.negativeMarkingPercentage} 
                onChange={(e) => setQuiz({...quiz, negativeMarkingPercentage: Number(e.target.value)})} 
              />
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
                      <button 
                        type="button" 
                        onClick={() => removeQuestion(question.id)} 
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                        <RichTextEditor
                          value={question.questionText}
                          onChange={(value) => updateQuestion(question.id, 'questionText', value)}
                          placeholder="What is a React component?"
                          onImageUpload={async (file) => {
                            const formData = new FormData();
                            formData.append('image', file);
                            const response = await fetch('http://localhost:5000/api/quizzes/upload-image', {
                              method: 'POST',
                              body: formData,
                            });
                            const result = await response.json();
                            return `http://localhost:5000/${result.data.imagePath}`;
                          }}
                        />
                      </div>
                      
                      <ImageUpload 
                        label="Question Image (Optional)"
                        onImageUpload={(imagePath) => updateQuestion(question.id, 'questionImage', imagePath)}
                        currentImage={question.questionImage}
                      />
                      
                      <div>
                        <h4 className="block text-sm font-medium text-gray-700 mb-2">Options</h4>
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <div key={option.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                              <button 
                                type="button" 
                                onClick={() => setCorrectAnswer(question.id, option.id)} 
                                className="flex-shrink-0 mt-1"
                              >
                                {question.correctAnswerId === option.id 
                                  ? <CheckCircle size={22} className="text-green-600" /> 
                                  : <Circle size={22} className="text-gray-400" />
                                }
                              </button>
                              
                              <div className="flex-grow space-y-2">
                                <div>
                                  <RichTextEditor
                                    value={option.text}
                                    onChange={(value) => updateOption(question.id, option.id, 'text', value)}
                                    placeholder="Option text..."
                                    onImageUpload={async (file) => {
                                      const formData = new FormData();
                                      formData.append('image', file);
                                      const response = await fetch('/api/quizzes/upload-image', {
                                        method: 'POST',
                                        body: formData,
                                      });
                                      const result = await response.json();
                                      return `http://localhost:5000/${result.data.imagePath}`;
                                    }}
                                  />
                                </div>
                                
                                <ImageUpload 
                                  label="Option Image (Optional)"
                                  onImageUpload={(imagePath) => updateOption(question.id, option.id, 'image', imagePath)}
                                  currentImage={option.image}
                                />
                              </div>
                              
                              <button 
                                type="button" 
                                onClick={() => removeOption(question.id, option.id)} 
                                className="text-gray-400 hover:text-red-600 mt-1"
                              >
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
                        <Input 
                          label="Marks" 
                          type="number" 
                          value={question.marks} 
                          onChange={(e) => updateQuestion(question.id, 'marks', Number(e.target.value))} 
                        />
                        <Input 
                          label="Feedback (Optional)" 
                          placeholder="Why this is correct/incorrect" 
                          value={question.feedback} 
                          onChange={(e) => updateQuestion(question.id, 'feedback', e.target.value)} 
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}