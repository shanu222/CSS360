import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Home from "./pages/Home";
import ExamProcess from "./pages/ExamProcess";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import Books from "./pages/Books";
import PastPapers from "./pages/PastPapers";
import Practice from "./pages/Practice";
import AIAssistant from "./pages/AIAssistant";
import StudyPlanner from "./pages/StudyPlanner";
import CurrentAffairs from "./pages/CurrentAffairs";
import Notes from "./pages/Notes";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

// Wrapper for protected routes
const Protected = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: <Protected><Layout /></Protected>,
    children: [
      { index: true, Component: Home },
      { path: "exam-process", Component: ExamProcess },
      { path: "subjects", Component: Subjects },
      { path: "subjects/:subjectId", Component: SubjectDetail },
      { path: "books", Component: Books },
      { path: "past-papers", Component: PastPapers },
      { path: "practice", Component: Practice },
      { path: "ai-assistant", Component: AIAssistant },
      { path: "study-planner", Component: StudyPlanner },
      { path: "current-affairs", Component: CurrentAffairs },
      { path: "notes", Component: Notes },
      { path: "community", Component: Community },
      { path: "admin", Component: Admin },
    ],
  },
]);
