import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [step, setStep] = useState(token ? "dashboard" : "register");

  const handleRegistered = () => setStep("login");
  const handleLogin = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
    setStep("dashboard");
  };
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setStep("login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center">
      <ToastContainer position="top-right" />
      {step === "register" && <Register onRegistered={handleRegistered} />}
      {step === "login" && <Login onLogin={handleLogin} />}
      {step === "dashboard" && token && (
        <Dashboard token={token} onLogout={handleLogout} />
      )}
      {/* Modern Toggle Buttons */}
      {(step === "login" || step === "register") && (
        <div className="flex justify-center mt-6">
          {step === "login" ? (
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow hover:bg-indigo-50 transition text-indigo-700 font-medium border border-indigo-200"
              onClick={() => setStep("register")}
            >
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New user?{" "}
              <span className="underline" onClick={() => setStep("register")}>
                Register here
              </span>
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow hover:bg-indigo-50 transition text-indigo-700 font-medium border border-indigo-200"
              onClick={() => setStep("login")}
            >
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
              Already registered?{" "}
              <span className="underline" onClick={() => setStep("login")}>
                Login here
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
