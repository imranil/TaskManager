import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authorization from "./authorization/Authorization";
import './app.css';
import { auth } from '../actions/user'
import Navbar from "./navbar/Navbar";
import Calendar from "./calendar/Calendar";
import CreateTask from "./task/CreateTask";
import Task from "./task/Task";
import Profile from "./profile/Profile";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    <BrowserRouter>
      {!isAuth ?
        <Routes>
          <Route path="/auth" element={<Authorization />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
        :
        <React.Fragment>
          <Navbar />
          <Routes>
            <Route path="/calendar" element={<Calendar/>} />
            <Route path="/task/create" element={<CreateTask/>} />
            <Route path="/task/:id" element={<Task />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="*" element={<Navigate to="/calendar" />} />
          </Routes>
        </React.Fragment>
      }
    </BrowserRouter>
  );
}

export default App;