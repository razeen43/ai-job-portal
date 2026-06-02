import { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await fetch(
                "https://ai-job-portal-m5pz.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (data.token) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                 localStorage.setItem("role", data.role);
                 localStorage.setItem("userId", data.userId);
                 localStorage.setItem("name", data.name);

                window.location.href =
                    "/";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    );
}

export default Login;