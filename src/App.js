import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import MenteesList from "./components/dashboard/admin/mentees/MenteesList";
import MentorsList from "./components/dashboard/admin/mentors/MentorsList";
import FormList from "./components/dashboard/admin/forms/FormList";
import MenteeForm from "./components/dashboard/mentee/forms/MenteeForm";
import Login from "./components/Login";
import RegistrationForm from "./components/dashboard/mentor/registration/RegistrationForm";
import PrivateRoute from "./routes/PrivateRoute";
import FormResponses from "./components/dashboard/admin/forms/FormResponses";
import MeetingList from "./components/dashboard/Meetings/MeetingList";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" Component={LoginPage} />
            <Route path="/google-login" element={<Login />} />
            {/*------------------- Mentor BELOW--------------------------------*/}
            <Route
              path="/dashboard/mentor/profile"
              element={
                <PrivateRoute
                  path="/dashboard/mentor/profile"
                  allowedRole={"mentor"}
                  requiredStatus={5}
                >
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/mentor/Meetings"
              element={
                <PrivateRoute
                  path="/dashboard/mentor/Meetings"
                  allowedRole={"mentor"}
                  requiredStatus={5}
                >
                  <MeetingList />
                </PrivateRoute>
              }
            />
            <Route
              path="/registration"
              element={
                <PrivateRoute path="/registration" allowedRole={"mentor"}>
                  <RegistrationForm />
                </PrivateRoute>
              }
            />
            {/*------------------- Mentee BELOW--------------------------------*/}
            <Route
              path="/dashboard/mentee/profile"
              element={
                <PrivateRoute
                  path="/dashboard/mentee/profile"
                  allowedRole={"mentee"}
                >
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/mentee/Meetings"
              element={
                <PrivateRoute
                  path="/dashboard/mentee/Meetings"
                  allowedRole={"mentee"}
                >
                  <MeetingList />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/mentee/form"
              element={
                <PrivateRoute
                  path="/dashboard/mentee/form"
                  allowedRole={"mentee"}
                >
                  <MenteeForm />
                </PrivateRoute>
              }
            />
            {/*------------------- ADMIN BELOW--------------------------------*/}
            <Route
              path="/dashboard/admin/profile"
              element={
                <PrivateRoute
                  path="/dashboard/admin/profile"
                  allowedRole={"admin"}
                >
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/admin/Meetings"
              element={
                <PrivateRoute
                  path="/dashboard/admin/Meetings"
                  allowedRole={"admin"}
                >
                  <MeetingList />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/admin/mentors"
              element={
                <PrivateRoute
                  path="/dashboard/admin/mentors"
                  allowedRole={"admin"}
                >
                  <MentorsList />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/admin/mentees"
              element={
                <PrivateRoute
                  path="/dashboard/admin/mentees"
                  allowedRole={"admin"}
                >
                  <MenteesList />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/admin/form"
              element={
                <PrivateRoute
                  path="/dashboard/admin/form"
                  allowedRole={"admin"}
                >
                  <FormList />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/admin/form-responses"
              element={
                <PrivateRoute
                  path="/dashboard/admin/form-responses"
                  allowedRole={"admin"}
                >
                  <FormResponses />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/dashboard/admin/mentors/:mentorId"
              component={MentorProfile}
            />
            <Route
              path="/dashboard/admin/mentors/:menteeId"
              component={MenteeProfile}
            /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
