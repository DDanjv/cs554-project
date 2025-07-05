const LoginForm = () => {
    return (
        <div class = "objdefbig">
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input class = "objdef" type="text" id="username" name="username" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input class = "objdef" type="password" id="password" name="password" />
            </div>
            <button class = "objdef" type="submit">Login</button>
        </div>
    );
}

export default LoginForm;