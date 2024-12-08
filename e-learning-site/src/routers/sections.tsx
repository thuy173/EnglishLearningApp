import { useAppSelector } from "@/hooks/use-app-selector";
import { RootState } from "@/redux/store";
import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes, useLocation } from "react-router-dom";

export const LoadingPage = lazy(() => import("../pages/shared/LoadingPage"));
export const IndexPage = lazy(() => import("../pages/home"));

export const CourseLibraryPage = lazy(() => import("../pages/courselib"));
export const CoursePage = lazy(() => import("../pages/category"));
export const LessonPage = lazy(() => import("../pages/lesson"));
export const VocabPage = lazy(() => import("../pages/vocab"));
export const ProfilePage = lazy(() => import("../pages/profile"));
export const LevelChoicePage = lazy(() => import("../pages/quiz/sections/LevelChoice"));
export const QuizPage = lazy(() => import("../pages/quiz"));
export const QuestionItems = lazy(() => import("../pages/quiz/sections/QuestionItem"));
export const ResultQuizPage = lazy(() => import("../pages/result"));
export const ApproachPage = lazy(() => import("../pages/approach"));

export const LoginPage = lazy(() => import("../pages/auth/Login"));
export const RegisterPage = lazy(() => import("../pages/auth/Register"));
export const Page404 = lazy(() => import("../pages/shared/NotFoundPage"));
export const CheckMailPage = lazy(() => import("../pages/shared/CheckMailPage"));
export const ResetPasswordPage = lazy(() => import("../pages/auth/Reset"));
export const Layout = lazy(() => import("../layout"));

// ----------------------------------------------------------------------

const useAuth = () => {
  return useAppSelector((state: RootState) => state.auth.isAuthenticated);
};

export default function Router() {
  const isAuthenticated = useAuth();
  const location = useLocation();

  const routes = useRoutes([
    {
      element: (
        <Layout>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </Layout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: "library", element: <CourseLibraryPage /> },
        { path: "course/:id", element:isAuthenticated ? <CoursePage /> : <Navigate to="/login" state={{ from: location }}/>},
        { path: "lesson/:id", element: <LessonPage /> },
        { path: "vocab/:id", element: <VocabPage /> },
        { path: "profile/:section", element: isAuthenticated ? <ProfilePage /> : <Navigate to="/login" state={{ from: location }}/>},
        { path: "level-choice", element: isAuthenticated ? <LevelChoicePage /> : <Navigate to="/login" state={{ from: location }}/> },
        { path: "level-choice/:id/quiz", element: isAuthenticated ? <QuizPage /> : <Navigate to="/login" state={{ from: location }}/>},
        { path: "quiz/:id", element: isAuthenticated ? <QuestionItems /> : <Navigate to="/login" state={{ from: location }}/>},
        { path: "attempt/:id/result", element: isAuthenticated ? <ResultQuizPage /> : <Navigate to="/login" state={{ from: location }}/>},
        { path: "approach", element: <ApproachPage /> },
      ],
    },
    {
      path: "login",
      element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "register",
      element: isAuthenticated ? <Navigate to="/" /> : <RegisterPage />,
    },
    {
      path: "check-mail",
      element: <CheckMailPage />,
    },
    {
      path: "reset-password",
      element: <ResetPasswordPage />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return routes;
}
