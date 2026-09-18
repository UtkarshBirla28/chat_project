import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiSparkles } from "react-icons/hi2";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	const handleDemo = async (e) => {
		e.preventDefault();
		setUsername("demo");
		setPassword("demo1234");
		await login("demo", "demo1234");
	};

	return (
		<div className="animate-rise flex w-full max-w-sm flex-col items-center">
			{/* Brand */}
			<div className="mb-6 flex flex-col items-center text-center">
				<span className="animate-pop mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
					<HiOutlineChatBubbleLeftRight className="h-7 w-7 text-white" />
				</span>
				<h1 className="text-2xl font-bold tracking-tight">
					Chatter<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Box</span>
				</h1>
				<p className="mt-1 text-sm text-base-content/60">Real-time chat, reimagined</p>
			</div>

			{/* Card */}
			<div className="glass w-full rounded-2xl p-6 shadow-xl">
				<h2 className="text-lg font-semibold">Welcome back</h2>
				<p className="mb-4 text-sm text-base-content/60">Sign in to continue chatting</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="mb-1.5 block text-sm font-medium text-base-content/80">Username</label>
						<input
							type="text"
							placeholder="Enter username"
							className="input input-bordered w-full bg-base-200/60"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label className="mb-1.5 block text-sm font-medium text-base-content/80">Password</label>
						<input
							type="password"
							placeholder="Enter password"
							className="input input-bordered w-full bg-base-200/60"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button
						className="btn btn-primary w-full border-none bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]"
						disabled={loading}
					>
						{loading ? <span className="loading loading-spinner loading-sm"></span> : "Sign in"}
					</button>
				</form>

				<Link to="/signup" className="mt-4 block text-center text-sm text-base-content/60 hover:text-primary">
					Don&apos;t have an account? <span className="font-medium text-primary">Sign up</span>
				</Link>
			</div>

			{/* Demo box for recruiters */}
			<div className="glass mt-4 w-full rounded-2xl border-primary/25 p-4">
				<p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
					<HiSparkles className="h-4 w-4" /> Just looking around?
				</p>
				<p className="mt-1 text-sm text-base-content/70">
					Jump in with a demo account preloaded with conversations — no signup needed.
				</p>
				<p className="mt-2 text-xs text-base-content/50">
					Username <span className="font-medium text-base-content/80">demo</span> · Password{" "}
					<span className="font-medium text-base-content/80">demo1234</span>
				</p>
				<button
					onClick={handleDemo}
					disabled={loading}
					className="btn btn-sm mt-3 w-full border-primary/40 bg-transparent text-primary hover:bg-primary hover:text-white"
				>
					Try the demo account
				</button>
			</div>
		</div>
	);
};

export default Login;
