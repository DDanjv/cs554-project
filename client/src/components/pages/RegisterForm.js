import { fetchdata } from "../../main.js";
import {useState} from "react";
const RegisterForm = () => {
    const [user, setUser] = useState(
        {
            username: '',
            email: '',
            password: ''
        }
    )
    const { username, password, email } = user;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("All fields are required");
            return;
        }   
        // console.log("user:", user);
        try {
            const response = await fetchdata('/user/register', user, 'POST');
            if (response.success) {
                alert("Registration successful");
                window.location.href = '/login';
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("registration error:11", error.message);
            alert(`failed. try again.`);
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    return (
        <form onSubmit={onSubmit}>
            <div className = "objdefbig">
                <h2>Register</h2>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input className = "objdef" type="text" id="username" name="username" onChange={onChange} value={username} required />
                </div>
                <div>
                    <label htmlFor="email">Email    : </label>
                    <input className = "objdef" type="email" id="email" name="email" onChange={onChange} value={email} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className = "objdef" type="password" id="password" name="password" onChange={onChange} value={password} required />
                </div>
                <button className = "objdef" type="submit">Register</button>
            </div>
        </form>
    );
}

export default RegisterForm;
