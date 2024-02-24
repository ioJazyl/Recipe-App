/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function auth() {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
}

export default auth;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("registration completed, now Login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
}

function Form({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) {
  return (
    <div className="flex justify-center">
      <form className="my-3 grid gap-2" onSubmit={onSubmit}>
        <h2 className="text-center text-xl font-bold">{label}</h2>
        <div className="flex gap-2">
          <label htmlFor="username">Username</label>
          <input
            className="w-full rounded-md bg-slate-200 px-2"
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="w-full rounded-md bg-slate-200 px-2"
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="ml-auto inline w-40 rounded-sm bg-orange-500 text-white"
        >
          {label}
        </button>
      </form>
    </div>
  );
}
