import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className="animate-rise flex w-full max-w-sm flex-col items-center">
			<div className="mb-5 flex flex-col items-center text-center">
				<span className="animate-pop mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
					<HiOutlineChatBubbleLeftRight className="h-7 w-7 text-white" />
				</span>
				<h1 className="text-2xl font-bold tracking-tight">
					Chatter<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Box</span>
				</h1>
				<p className="mt-1 text-sm text-base-content/60">Create your account</p>
			</div>

			<div className="glass w-full rounded-2xl p-6 shadow-xl">
				<form onSubmit={handleSubmit} className="space-y-3.5">
					<div>
						<label className="mb-1.5 block text-sm font-medium text-base-content/80">Full name</label>
						<input
							type="text"
							placeholder="John Doe"
							className="input input-bordered w-full bg-base-200/60"
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>
					<div>
						<label className="mb-1.5 block text-sm font-medium text-base-content/80">Username</label>
						<input
							type="text"
							placeholder="johndoe"
							className="input input-bordered w-full bg-base-200/60"
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>
					<div>
						<label className="mb-1.5 block text-sm font-medium text-base-content/80">Password</label>
						<input
							type="password"
							placeholder="At least 6 characters"
							className="input input-bordered w-full bg-base-200/60"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>
					<div>
						<label className="mb-1.5 block text-sm font-medium text-base-content/80">Confirm password</label>
						<input
							type="password"
							placeholder="Re-enter password"
							className="input input-bordered w-full bg-base-200/60"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<button
						className="btn btn-primary w-full border-none bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]"
						disabled={loading}
					>
						{loading ? <span className="loading loading-spinner loading-sm"></span> : "Create account"}
					</button>
				</form>

				<Link to="/login" className="mt-4 block text-center text-sm text-base-content/60 hover:text-primary">
					Already have an account? <span className="font-medium text-primary">Sign in</span>
				</Link>
			</div>
		</div>
	);
};

export default SignUp;
