
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { message } from "antd";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuizPage from "./pages/QuizPage";
import DashboardWrapper from "./pages/DadhboardWrapper";
import PrivateRoute from "./components/PrivateRoute";
import QuizCategories from "./pages/QuizCategories";
import Layout from "./components/Layout";
import api from "./api/axiosClient";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import OnlinePage from "./pages/OnlinePage";
import Mystickers from "./pages/Mystickers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import MyTask from "./pages/MyTask";
import SchoolLoginPage from "./pages/SchoolLoginPage";
import SchoolAdminDashboard from "./pages/schooladmins/SchoolAdminDashboard"
import SchoolAdminRoute from "./components/SchoolAdminRoute";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import PaymentWrapper from "./pages/PaymentWrapper";

const App = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const[completedLevel,setCompletedLevel]=useState([])
  const[completedSelectedLevel,setCompletedSelectedLevel]=useState([])
  const[completedCategory,setCompletedCategory]=useState([])
  const[completedPoints,setCompletedPoints]=useState([])
const[todayTaskCount,setTodayTaskCount]=useState(0);
  // Fetch tasks assigned to the user
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/users/todaytask`);
      setTasks(res.data);
    } catch (err) {
      //message.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Mark a task as completed (single category & level)
  const taskCompleted = (taskId, category, selectedLevel) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task._id !== taskId) return task;
        return { ...task, completed: true };
      })
    );
  };

  // Fetch user info on mount
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
              localStorage.setItem("user", JSON.stringify(res.data));
      
      } catch (err) {
        console.error(err);
        setUser(null);
         localStorage.removeItem("token");
      localStorage.removeItem("user");
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
   // fetchTasks();
  }, []);

// useEffect(() => {
//   const savedUser = localStorage.getItem("user");
//   if (savedUser) {
//     setUser(JSON.parse(savedUser));
//   }
// }, []);


  if (loadingUser) return <div>Loading user...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage user={user} setUser={setUser}/>} />
        <Route path="/onlinepage" element={<OnlinePage />} />
        <Route path="/auth/login" element={<Login setUser={setUser} />} />
      
        <Route path="/auth/signup" element={<Signup setUser={setUser} />} />

        {/* Protected routes */}
        <Route element={<Layout user={user} setUser={setUser} todayTaskCount={todayTaskCount} />}>
          <Route
            path="/categories"
            element={
              <PrivateRoute user={user}>
                <QuizCategories user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute user={user}>
                <PaymentWrapper user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/mystickers"
            element={
              <PrivateRoute user={user}>
                <Mystickers user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/progress"
            element={
              <PrivateRoute user={user}>
                <DashboardWrapper user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
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
                <QuizPage
                  user={user}
                  setUser={setUser}
                  fetchTasks={fetchTasks}
                  loading={loading}
                  tasks={tasks}
                  taskcompleted={taskCompleted}
                   setCompletedLevel={setCompletedLevel}
                  setCompletedCategory={setCompletedCategory}
                  setCompletedSelectedLevel={setCompletedSelectedLevel}
                     completedLevel={completedLevel}
                  completedCategory={completedCategory}
                  completedSelectedLevel={completedSelectedLevel}
                  setCompletedPoints={setCompletedPoints}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/task"
            element={
              <PrivateRoute user={user}>
                <MyTask
                  user={user}
                  setUser={setUser}
                  fetchTasks={fetchTasks}
                  taskcompleted={taskCompleted}
                  todayTaskCount={todayTaskCount}
                  setTodayTaskCount={setTodayTaskCount}
                  completedLevel={completedLevel}
                  completedCategory={completedCategory}
                  completedSelectedLevel={completedSelectedLevel}
                   completedPoints={completedPoints}
                />
              </PrivateRoute>
            }
          />
       
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
            <Route
          path="/teacher"
          element={
              <PrivateRoute user={user}>
              <TeacherDashboard user={user} />
         </PrivateRoute>
          }
        />
        <Route
          path="/schooladmin"
          element={
            <SchoolAdminRoute user={user}>
              <SchoolAdminDashboard user={user} />
            </SchoolAdminRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
