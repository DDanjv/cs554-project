import { fetchdata } from "../../main.js";
import { useState } from "react";
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
        try {
            const response = await fetchdata('/register', user, 'POST');
            if (response.success) {
                alert("Registration successful");
                window.location.href = '/login';
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("registration error:", error);
            alert("failed. try again.");
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    return (
        <form onSubmit={onSubmit}>
            <div class = "objdefbig">
                <h2>Register</h2>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input class = "objdef" type="text" id="username" name="username" onchange={onChange} value={username} required />
                </div>
                <div>
                    <label htmlFor="email">Email    : </label>
                    <input class = "objdef" type="email" id="email" name="email" onchange={onChange} value={email} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input class = "objdef" type="password" id="password" name="password" onchange={onChange} value={password} required />
                </div>
                <button class = "objdef" type="submit">Register</button>
            </div>
        </form>
    );
}

export default RegisterForm;
