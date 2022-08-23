import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authorization from "./authorization/Authorization";
import './app.css';
import { auth } from '../actions/user'
import Navbar from "./navbar/Navbar";
import Calendar from "./calendar/Calendar";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

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
            <Route exact path="/" element={<Calendar/>} />
            <Route path="/profile" element={null} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </React.Fragment>
      }
    </BrowserRouter>
  );
}

export default App;