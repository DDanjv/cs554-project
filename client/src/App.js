import './App.css';
import Books from './components/Books.js';
import About from './components/pages/about.js';
import Navbar from './components/Navbar.js'
import LoginForm from './components/pages/LoginForm.js'
import RegisterForm from './components/pages/RegisterForm.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="grid-container">
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="books" element={<Books books={books} />} />
            <Route path="register" element={<RegisterForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
