import { fetchdata } from "../../main.js";
import { useUserGlobal } from '../../UserGlobal.js';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const { username, password } = credentials;
    const { login } = useUserGlobal();
    const navigate = useNavigate(); 

    const onSubmit = async (e) => {
         e.preventDefault();
         if(!username || !password) {
            alert("Both fields are required");
            return;
        }
        try{
            const response = await fetchdata('/user/login', credentials, 'POST');
            if(response.success) {
                login(response.user); 
                alert("Login successful");
                navigate('/dashboard'); 
            } else {
                alert(response.message || "eeeee");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            alert(`Fail to log in, try again ${error.message}`);
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <form onSubmit={onSubmit}>
            <div className = "objdefbig">
                <h2>Login</h2>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input className = "objdef" type="text" id="username" name="username" onChange={onChange} value={username} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className = "objdef" type="password" id="password" name="password" onChange={onChange} value={password} required />
                </div>
                <button className = "objdef" type="submit">Login</button>
            </div>
        </form>
    );
}

export default LoginForm;