import { useAppSelector } from "@/hooks/use-app-selector";
import { RootState } from "@/redux/store";
import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

export const LoadingPage = lazy(() => import("../pages/shared/LoadingPage"));
export const IndexPage = lazy(() => import("../pages/home"));

export const CourseLibraryPage = lazy(() => import("../pages/courselib"));
export const CoursePage = lazy(() => import("../pages/category"));
export const LessonPage = lazy(() => import("../pages/lesson"));
export const VocabPage = lazy(() => import("../pages/vocab"));
export const ProfilePage = lazy(() => import("../pages/profile"));
export const ApproachPage = lazy(() => import("../pages/approach"));

export const LoginPage = lazy(() => import("../pages/auth/Login"));
export const Page404 = lazy(() => import("../pages/shared/NotFoundPage"));
export const Layout = lazy(() => import("../layout"));

// ----------------------------------------------------------------------

const useAuth = () => {
  return useAppSelector((state: RootState) => state.auth.isAuthenticated);
};

export default function Router() {
  const isAuthenticated = useAuth();

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
        { path: "course/:id", element: <CoursePage /> },
        { path: "lesson/:id", element: <LessonPage /> },
        { path: "vocab/:id", element: <VocabPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "approach", element: <ApproachPage /> },
      ],
    },
    {
      path: "login",
      element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return routes;
}
