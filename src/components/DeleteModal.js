import React from "react";
import { Button, Modal } from "react-bootstrap";
import {
	toggleDeleteItemModal,
	toggleShowEmptyCartModal,
} from "../utils/modalSlice";
import { useDispatch } from "react-redux";

const DeleteModal = ({ show, deleteAction, message }) => {
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(toggleShowEmptyCartModal(false));
		dispatch(toggleDeleteItemModal(false));
	};

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Delete</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="danger" onClick={() => deleteAction()}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteModal;
