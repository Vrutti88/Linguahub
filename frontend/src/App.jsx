import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Welcome from "./pages/Welcome.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Lessons from "./pages/Lessons.jsx";
import LessonView from "./pages/LessonView.jsx";
import LessonOverview from "./pages/LessonOverview.jsx";
import Quiz from "./pages/Quiz.jsx";
import QuizReview from "./pages/QuizReview.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import OnboardingFlow from "./pages/OnboardingFlow.jsx";

// --- NEW teacher pages ---
import AddLesson from "./pages/teacher/AddLesson.jsx";
import AddQuiz from "./pages/teacher/AddQuiz.jsx";
import ManageLessons from "./pages/teacher/ManageLessons.jsx";
import ManageQuizzes from "./pages/teacher/ManageQuizzes.jsx";

// ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/onboarding" element={<OnboardingFlow />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* STUDENT ROUTES */}
        <Route index element={<Dashboard />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/:id/overview" element={<LessonOverview />} />
        <Route path="lessons/:id/start" element={<LessonView />} />
        <Route path="quiz/:lessonId" element={<Quiz />} />
        <Route path="/quiz-review/:lessonId" element={<QuizReview />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />

        {/* TEACHER ROUTES */}
        <Route path="teacher" element={<Dashboard />} />
        <Route path="teacher/add-lesson" element={<AddLesson />} />
        <Route path="teacher/add-quiz" element={<AddQuiz />} />
        <Route path="teacher/manage-lessons" element={<ManageLessons />} />
        <Route path="teacher/manage-quizzes" element={<ManageQuizzes />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
