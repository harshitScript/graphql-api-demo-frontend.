import PostsPage from "./Pages/PostsPage";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import ViewPostPage from "./Pages/ViewPostPage";
import EditPostPage from "./Pages/EditPost";
import PostProvider from "./Pages/EditPost/PostProvider";
import AuthenticationPage from "./Pages/AuthenticationPage";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/posts/1" replace />} />
        <Route
          path="/posts/:page"
          element={
            isAuthenticated() ? (
              <PostsPage />
            ) : (
              <Navigate to="/auth/sign-in" replace />
            )
          }
        />
        <Route
          path="/view-post/:id"
          element={
            isAuthenticated() ? (
              <ViewPostPage />
            ) : (
              <Navigate to="/auth/sign-in" replace />
            )
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            isAuthenticated() ? (
              <PostProvider>
                <EditPostPage />
              </PostProvider>
            ) : (
              <Navigate to="/auth/sign-in" replace />
            )
          }
        />
        <Route
          path="/auth/*"
          element={
            isAuthenticated() ? (
              <Navigate to="/posts/1" replace />
            ) : (
              <AuthenticationPage />
            )
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
