import baseApi from "../baseApi";

export interface Quiz {
  _id?: string;
  title: string;
  description: string;
  descriptionImage?: string;
  overallFeedback: string;
  negativeMarkingPercentage: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Option {
  id: string;
  text: string;
  image?: string;
}

export interface Question {
  _id?: string;
  quizId: string;
  questionText: string;
  questionImage?: string;
  options: Option[];
  correctAnswerId: string;
  marks: number;
  feedback?: string;
}

export interface QuizAttempt {
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalMarks: number;
  obtainedMarks: number;
  negativeMarks: number;
  percentage: number;
  results: {
    questionId: string;
    questionText: string;
    selectedOptionId: string;
    correctOptionId: string;
    isCorrect: boolean;
    marksAwarded: number;
    feedback?: string;
  }[];
}

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadQuizImage: builder.mutation<{ imagePath: string; url: string }, FormData>({
      query: (formData) => ({
        url: "/quizzes/upload-image", // Fixed to match backend
        method: "POST",
        body: formData,
      }),
    }),

    uploadMultipleQuizImages: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/quizzes/upload-multiple-images",
        method: "POST",
        body: formData,
      }),
    }),
    
    createQuiz: builder.mutation<{ quiz: Quiz; questions: Question[] }, { quiz: Quiz; questions: Question[] }>({
      query: (data) => ({
        url: "/quizzes", // Fixed to match backend
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
    
    getQuizzes: builder.query<{ quizzes: Quiz[] }, void>({
      query: () => "/quizzes", // Fixed to match backend
      providesTags: ["Quiz"],
      transformResponse: (response: any) => response.data, // Extract data from backend response
    }),
    
    getQuizById: builder.query<{ quiz: Quiz; questions: Question[] }, string>({
      query: (id) => `/quizzes/${id}`, // Fixed to match backend
      providesTags: (_result, _error, id) => [{ type: "Quiz", id }],
      transformResponse: (response: any) => response.data, // Extract data from backend response
    }),
    
    submitQuizAnswers: builder.mutation<{ result: QuizResult }, { quizId: string; answers: QuizAttempt["answers"] }>({
      query: ({ quizId, answers }) => ({
        url: `/quizzes/${quizId}/attempt`, // Fixed to match backend
        method: "POST",
        body: { answers },
      }),
      transformResponse: (response: any) => response.data, // Extract data from backend response
    }),
    
    deleteQuiz: builder.mutation<void, string>({
      query: (id) => ({
        url: `/quizzes/${id}`, // Fixed to match backend
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});
export const {
  useUploadQuizImageMutation,
  useUploadMultipleQuizImagesMutation,
  useCreateQuizMutation,
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useSubmitQuizAnswersMutation,
  useDeleteQuizMutation,
} = quizApi;