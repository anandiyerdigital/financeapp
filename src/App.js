import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Finance";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./components/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Finance from "./pages/home/Finance";
import ImageGeneration  from './components/ImageGeneration'
import TextGeneration from "./components/TextGeneration";
import DigitalGPT from "./components/DigitalGPT";
import DigitalImageClassifier from "./components/DigitalImageClassifier";
import DigitalCropScience from "./components/DigitalCropScience";
import DigitalCropScienceHealth from "./components/DigitalCropScienceHealth";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/finance" element={<Finance />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/aiimage" element={<ImageGeneration />}></Route>
          <Route path="/aitext" element={<TextGeneration />}></Route>
          <Route path="/aigpt" element={<DigitalGPT />}></Route>
          <Route path="/aiimageclassifier" element={<DigitalImageClassifier />}></Route>
          <Route path="/aiDigitalcropscience" element={<DigitalCropScience />}></Route>
          <Route path="/aiDigitalcropsciencehealth" element={<DigitalCropScienceHealth />}></Route>
          <Route
            path="/aitools"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
