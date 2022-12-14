import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authorization from "./pages/authorization/Authorization";
import { auth } from './actions/user'
import Navbar from "./components/navbar/Navbar";
import Calendar from "./pages/calendar/Calendar";
import Task from "./components/task/Task";
import Profile from "./pages/profile/Profile";
import { getTags } from "./actions/tag";
import './app.css';

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  dispatch(getTags)

  useEffect(() => {
    if (isAuth) {
      dispatch(getTags)
    }
  }, [isAuth])

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
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/task/:id" element={<Task />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/calendar" />} />
          </Routes>
        </React.Fragment>
      }
    </BrowserRouter>
  );
}

export default App;