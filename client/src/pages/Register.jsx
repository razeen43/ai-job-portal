import { useState } from "react";

function Register() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const handleRegister = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            alert(data.message);

            window.location.href = "/login";

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>
            <h2>Register</h2>

            <input
                placeholder="Name"
                onChange={(e) =>
                    setForm({
                        ...form,
                        name: e.target.value
                    })
                }
            />

            <br /><br />

            <input
                placeholder="Email"
                onChange={(e) =>
                    setForm({
                        ...form,
                        email: e.target.value
                    })
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setForm({
                        ...form,
                        password: e.target.value
                    })
                }
            />

            <br /><br />

            <button onClick={handleRegister}>
                Register
            </button>

        </div>
    );
}

export default Register;