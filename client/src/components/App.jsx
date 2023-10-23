
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";

export const App = () => {

  return (
    <>
    
    <Router>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </>
  );
};
