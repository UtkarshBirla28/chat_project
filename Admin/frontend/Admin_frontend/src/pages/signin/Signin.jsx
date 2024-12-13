import { useState, useEffect } from "react";
import { useSignIn } from "../../hooks/use-authentication.js";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [trigger, setTrigger] = useState(false); // To control the hook
  const { data, error, loading } = useSignIn(
    trigger,
    inputs.username,
    inputs.password
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token); // Corrected typo here
      console.log("Data stored in localStorage:", data);
      navigate("/dashboard");
    }
  }, [data, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    setTrigger((prev) => !prev);
    console.log("Inputs:", inputs);
    console.log("Response Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          Sign In <span className="text-blue-500">Admin</span>
        </h1>

        <form>
          <div className="mb-4">
            <label className="block text-lg text-gray-600 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg text-gray-600 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleClick}
              className="w-full py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {data && (
            <p className="text-green-500 text-center mt-4">Login successful!</p>
          )}
        </form>

        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
