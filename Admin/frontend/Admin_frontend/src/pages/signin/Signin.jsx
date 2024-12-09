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
      localStorage.setItem("toekn", JSON.stringify(data.token));
      console.log("Data stored in localStorage:", data);
      navigate("/dashboard");
    }
  }, [data]);

  const handleClick = async (e) => {
    e.preventDefault();
    setTrigger((prev) => !prev);
    console.log("Inputs:", inputs);
    console.log("Response Data:", data);
  };

  return (
    <div className="flex flex-col rounded-lg items-center justify-center w-[50%] bg-slate-400 mx-auto my-52">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign In <span className="text-blue-500"> Admin</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-center">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <button
              onClick={handleClick}
              className="btn btn-block btn-sm mt-6 border mx-60 w-20 rounded-lg bg-white border-white7"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {data && (
            <p className="text-green-500 text-center mt-4">Login successful!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
