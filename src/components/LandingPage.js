import { Container } from "react-bootstrap";
import HeroLandingImage from "../assets/images/landing-page-image.jpeg";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Header from "./Header";
import Footer from "./Footer";

const LandingPage = ({ signingIn }) => {
	return (
		<div className="d-flex flex-column">
			<Header />
			<div className="my-5">
				<Container className="d-flex" style={{ height: "500px" }}>
					<div
						style={{ color: "#3EC167" }}
						className="landing-hero w-75 align-middle position-relative"
					>
						<h1
							style={{
								opacity: "1",
								zIndex: "3",
								fontSize: "60px",
								fontWeight: "600",
								top: "100px",
								left: "30px",
							}}
							className="position-absolute"
						>
							ClickEase
						</h1>
						<h4
							style={{ zIndex: "3", top: "175px", left: "70px" }}
							className="position-absolute"
						>
							Shop anything you need.
						</h4>
						<img
							src={HeroLandingImage}
							width={700}
							style={{ opacity: "0.7", left: "200px" }}
							className="position-absolute"
							alt="illustration of female hands holding discount cards coin stacks smartphone shopping bags"
						/>
					</div>
					{signingIn ? <LogIn /> : <SignUp />}
				</Container>
			</div>
			<Footer />
		</div>
	);
};

export default LandingPage;
