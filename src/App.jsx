import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				{/* Optional: Redirect unknown routes */}
				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
