import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Goscraplogin from "../assets/Goscraplogin4.jpg"

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      alert(response.data.message);

      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    navigate("/dashboard", { replace: true });
  }
}, []);



  // const handleLogout = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   navigate("/");
  // };

  return (
    <div
  className="login-container"
  style={{
    backgroundImage: `linear-gradient(
      rgba(0,0,0,0.55),
      rgba(0,0,0,0.55)
    ), url(${Goscraplogin})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
      <div className="login-box">

        <h1>Hii Admin</h1>
        <p>Login to access...</p>

        <form onSubmit={handleSubmit}
        autoComplete="off">
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter Email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter Password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;