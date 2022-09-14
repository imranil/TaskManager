import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authorization from "./authorization/Authorization";
import { auth } from '../actions/user'
import Navbar from "./navbar/Navbar";
import Calendar from "./calendar/Calendar";
import Task from "./task/Task";
import Profile from "./profile/Profile";
import { io } from "socket.io-client";
import { API_URL } from "../config";
import './app.css';

function App() {
  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(() => {
    if(isAuth) {
      const socket = io(API_URL);
      socket.emit('user', {email: "test@mail.ru"})

      return () => socket.close();
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