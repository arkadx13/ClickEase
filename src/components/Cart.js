import { Button, Container } from "react-bootstrap";
import Header from "./Header";

const Cart = () => {
	return (
		<div>
			<Header />
			<Container style={{ paddingTop: "100px" }}>
				<p>Cart is empty.</p>
				<Button>Empty cart</Button>
			</Container>
		</div>
	);
};

export default Cart;
