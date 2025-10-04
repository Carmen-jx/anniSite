import './App.css';
import { useNavigate, Routes, Route } from "react-router-dom";
import Home from './page/Home';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import Admin from './page/Admin';
function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
