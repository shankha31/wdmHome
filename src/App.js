import "./App.css";
import AboutPage from "./components/about";
import Contact from "./components/contact";
import Home from "./components/home";
import Service from "./components/service/service";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./graduate/pages/Register/register";
import Login from "./graduate/pages/Login/login";
import MyTasks from "./graduate/pages/MyTasks/mytasks";
import LayoutComponent from "./graduate/pages/LayoutComponent/layoutComponent";
import UpcomingDeadLines from "./graduate/pages/UpComingDeadLines/upcomingDeadLines";
import WeeklyReports from "./graduate/pages/WeeklyReports/weeklyReports";
import Message from "./graduate/pages/Messages/messages";
import NotFound from "./graduate/components/notFound/notfound";
import ProtectedRoute from "./graduate/components/protectedRoute/protectedRoute";

import RegisterProf from "./pro/pages/RegisterProf/register";
import LoginProf from "./pro/pages/LoginProf/login";
import LayoutComponentProf from "./pro/pages/LayoutComponentProf/layoutComponent";
import SupervisedStudents from "./pro/pages/SupervisedStudents/supervisedStudents";
import TaskAssignment from "./pro/pages/TaskAssignment/taskAssignment";
import ReportsReview from "./pro/pages/ReportsReview/reportsReview";
import MessagesProf from "./pro/pages/MessagesProf/messages";
import TaskDetails from "./pro/components/taskDeatils/taskDeatils";
import ProtectedRouteProf from "./pro/components/ProtectedRouteProf/protectedRoute";
import SubmitedTask from "./pro/pages/SubmitedTask/submitedTask";
import TaskCallender from "./graduate/pages/TaskCallender/TaskCallender";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Shared routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />

          {/* Graduate routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/graduate" element={<LayoutComponent />}>
              <Route path="tasks" element={<MyTasks />} />
              <Route path="deadlines" element={<UpcomingDeadLines />} />
              <Route path="weekly_reports" element={<WeeklyReports />} />
              <Route path="messages" element={<Message />} />
              <Route path="task-calender" element={<TaskCallender />} />
            </Route>
          </Route>

          {/* Professor routes */}
          <Route path="/professor/register" element={<RegisterProf />} />
          <Route path="/professor/login" element={<LoginProf />} />
          <Route element={<ProtectedRouteProf />}>
            <Route path="/professor" element={<LayoutComponentProf />}>
              <Route path="students" element={<SupervisedStudents />} />
              <Route path="taskassignment" element={<TaskAssignment />} />
              <Route path="submitedTasks" element={<SubmitedTask />} />
              <Route path="reportsreview" element={<ReportsReview />} />
              <Route path="messages" element={<MessagesProf />} />
              <Route path="taskDetails" element={<TaskDetails />} />
            </Route>
          </Route>

          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
