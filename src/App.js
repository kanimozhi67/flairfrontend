import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuizPage from "./pages/QuizPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import QuizCategories from "./pages/QuizCategories";
import Layout from "./components/Layout";
import api from "./api/axiosClient";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import OnlinePage from "./pages/OnlinePage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const userId = localStorage.getItem("userId");


  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingUser(false);
      return;
    }
    try {
      const res = await api.get("/auth/getMe");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };
  fetchUser();
}, []);


  if (loadingUser) return <div>Loading user...</div>;



  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/onlinepage" element={<OnlinePage /> } />
        <Route path="/auth/login" element={<Login setUser={setUser} />} />
        <Route path="/auth/signup" element={<Signup setUser={setUser} />} />

        {/* Protected routes with Layout */}
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route
            path="/categories"
            element={
              <PrivateRoute user={user}>
                <QuizCategories user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/progress"
            element={
              <PrivateRoute user={user}>
                <Dashboard user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/auth/getMe"
            element={
              <PrivateRoute user={user}>
                <Profile user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:category"
            element={
              <PrivateRoute user={user}>
                <QuizPage user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
