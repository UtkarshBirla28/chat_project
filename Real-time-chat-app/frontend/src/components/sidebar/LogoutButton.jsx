import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<button
			onClick={logout}
			disabled={loading}
			className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-base-content/60 transition-colors hover:bg-error/15 hover:text-error"
		>
			{loading ? (
				<span className="loading loading-spinner loading-sm"></span>
			) : (
				<>
					<BiLogOut className="h-5 w-5" />
					Sign out
				</>
			)}
		</button>
	);
};
export default LogoutButton;
