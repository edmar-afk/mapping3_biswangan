import React, { useState } from "react";
import { Modal } from "@mui/material";
import api from "../assets/api";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	backgroundColor: "white",
	borderRadius: "0.5rem",
	boxShadow: 24,
	padding: "1.5rem",
};

function FeedBack() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [feedback, setFeedback] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/api/feedback/submit/", { name, feedback });
			setName("");
			setFeedback("");
			handleClose();
		} catch (err) {
			handleClose();
			console.error(err);
		}
	};

	return (
		<>
			<button
				className="mx-auto text-center bg-green-600 text-white p-4 rounded-lg flex"
				onClick={handleOpen}>
				Send Feedback
			</button>

			<Modal
				open={open}
				onClose={handleClose}>
				<div style={modalStyle}>
				
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4">
						<input
							type="text"
							placeholder="Your Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="border rounded p-2 w-full"
						/>
						<textarea
							placeholder="Your Feedback"
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							required
							rows={4}
							className="border rounded p-2 w-full"></textarea>
						<button
							type="submit"
							className="bg-green-600 text-white py-2 px-4 rounded hover:bg-blue-700">
							Submit Feedback
						</button>
					</form>
				</div>
			</Modal>
		</>
	);
}

export default FeedBack;
