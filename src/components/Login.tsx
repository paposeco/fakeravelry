import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../Firebase";

const Login = function() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handlerOfChange = function(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const elementId = event.target.id;
        if (elementId === "email") {
            setEmail(event.target.value);
        } else if (elementId === "password") {
            setPassword(event.target.value);
        } else {
            console.log("Something went wrong");
        }
    };
    const navigate = useNavigate();
    const handlerOfSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        await signIn(email, password);
        navigate("/");
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handlerOfSubmit}>
                <label htmlFor="email">
                    E-mail:{" "}
                    <input
                        name="email"
                        id="email"
                        type="email"
                        onChange={handlerOfChange}
                    />
                </label>
                <label htmlFor="password">
                    Password:{" "}
                    <input
                        name="password"
                        id="password"
                        type="text"
                        onChange={handlerOfChange}
                    />
                </label>
                <input type="submit" value="Sign in" />
            </form>
            <h3>Don't have an account?</h3>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
};

export default Login;
