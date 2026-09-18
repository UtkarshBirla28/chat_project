import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className="animate-rise glass flex h-[85vh] max-h-[640px] w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
