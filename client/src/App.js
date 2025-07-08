import './App.css';
import About from './components/pages/about.js';
import Navbar from './components/Navbar.js'
import LoginForm from './components/pages/LoginForm.js'
import RegisterForm from './components/pages/RegisterForm.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/pages/Dashboard.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css'; 
import SettingForm from './components/pages/SettingFrom.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="grid-container">
          <Routes>
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<SettingForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


const user = {
  id: 12345,
  username: "John Doe",
}

const books = [
    {
        id : 12345,
        title: "The Great Gatsby",

    },
    {
        id : 67890,
        title: "To Kill a Mockingbird",

    },
    {
        id : 11223,
        title: "1984",
    }
]


export default App;
