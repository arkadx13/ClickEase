import { useSelector } from "react-redux";

const Footer = () => {
	const user = useSelector((store) => store?.user);
	return (
		<footer className="text-center bg-light p-4 mt-5 w-100 align-self-end">
			{/* Only show image credit when logged out */}
			{!user && (
				<p style={{ fontSize: "0.8rem" }}>
					<a href="https://www.freepik.com/free-vector/hands-with-money-flat-composition-with-female-hands-holding-discount-cards-coin-stacks-smartphone-shopping-bags-vector-illustration_37917159.htm#query=online%20shopping&position=7&from_view=keyword&track=ais&uuid=dd09d2fb-aeda-408e-88e3-0e125ab216bd">
						Image by macrovector
					</a>{" "}
					on Freepik
				</p>
			)}
			<p style={{ fontSize: "0.8rem" }}>
				&copy; 2024 ClickEase. All Rights Reserved.
			</p>
		</footer>
	);
};

export default Footer;
