const RegisterForm = () => {
    return (
        <div class = "objdefbig">
            <h2>Register</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input class = "objdef" type="text" id="username" name="username" />
            </div>
            <div>
                <label htmlFor="email">Email    : </label>
                <input class = "objdef" type="email" id="email" name="email" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input class = "objdef" type="password" id="password" name="password" />
            </div>
            <button class = "objdef" type="submit">Register</button>
        </div>
    );
}

export default RegisterForm;
