import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/home/Finance';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from './hooks/useAuthContext';
import Dashboard from './components/Dashboard';
import {ProtectedRoute} from './components/ProtectedRoute';
import Finance from './pages/home/Finance';

function App() {

  const {authIsReady, user}  = useAuthContext()

  return (
    <div className="App">
     
      
         <BrowserRouter>
         <Navbar />
         <Routes>
           <Route path='/finance' element={<Finance />}></Route>
           <Route path='/login' element={<Login />}></Route>
           <Route path='/signup' element={<Signup />}></Route>
           

           <Route path='/dashboard' element={
           <ProtectedRoute>
            <Dashboard />
           
           </ProtectedRoute>
           
           
           }>
            
            </Route>
            
           
           
   
         </Routes>
         </BrowserRouter>
     
     
      <ToastContainer />
    </div>
  );
}

export default App
