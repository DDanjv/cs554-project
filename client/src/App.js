import './App.css';
import Books from './components/Books.js';
import About from './components/about.js';
import Navbar from './components/Navbar.js'
import LoginForm from './components/LoginForm.js'
import RegisterForm from './components/RegisterForm.js';

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
      <Navbar />
      <div className="grid-container">
        <About/>
        <LoginForm/>
        <RegisterForm/>
      </div>
    </div>
  );
}

export default App;
