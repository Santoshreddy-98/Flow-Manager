import React from "react";
import { ToastContainer } from "react-toastify";
import DirForm from "./Components/DirForm";
// import Footer from "./Components/Footer";
import InputVariables from "./Components/InputVariables";
import View from "./Components/View";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<DirForm />} />
        <Route path="/InputVariables" element={<InputVariables />} />
        <Route path="/view-data" element={<View/>}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
