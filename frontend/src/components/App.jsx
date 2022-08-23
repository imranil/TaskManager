import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authorization from "./authorization/Authorization";
import './app.css';
import { auth } from '../actions/user'

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  })

  return (
    <BrowserRouter>
      {!isAuth ?
        <Routes>
          <Route path="/auth" element={<Authorization />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
        :
        <Routes>
          <Route exact path="/" element={null} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      }
    </BrowserRouter>
  );
}

export default App;