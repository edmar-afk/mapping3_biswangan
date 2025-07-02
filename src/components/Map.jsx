import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../assets/api";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import FeedBack from "./FeedBack";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const redIcon = new L.Icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

function ClickHandler({ onClick }) {
	useMapEvents({
		click(e) {
			onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
		},
	});
	return null;
}

function Map() {
	const [, setIsVisible] = useState(false);
	const [coords, setCoords] = useState(null);
	const [categoryPins, setCategoryPins] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		const text = `${coords?.lat}, ${coords?.lng}`;
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // revert after 2 seconds
		});
	};

	const handleClick = (clickedCoords) => {
		setCoords(clickedCoords);
		setIsVisible(true);
	};

	const handleCategorySelect = async (categoryKey) => {
		setActiveCategory(categoryKey);
		try {
			const response = await api.get(`/api/${categoryKey}/`);
			setCategoryPins(response.data);
		} catch (error) {
			console.error(`Error fetching ${categoryKey} data:`, error);
			setCategoryPins([]);
		}
	};

	return (
		<div className="grid grid-cols-2 gap-4 h-screen px-8 py-6 pb-14">
			<div className="pl-4 bg-white p-8 order-2 h-full overflow-y-auto rounded-lg shadow-lg">
				<div>
					<TopBar
						isVisible={true}
						onCategorySelect={handleCategorySelect}
						activeCategory={activeCategory}
					/>
				</div>
				<Sidebar
					lat={coords?.lat}
					lng={coords?.lng}
					isVisible={true}
					onClose={() => setIsVisible(false)}
					categoryKey={activeCategory}
				/>
			</div>

			<div className="flex flex-col space-y-4 h-full bg-white rounded-lg shadow-lg p-8 order-1 overflow-hidden">
				<div className="flex flex-col">
					<p className="text-gray-800 text-center  text-4xl font-extrabold mb-3">BISWANGAN, LAKEWOOD</p>
					<FeedBack />
				</div>

				<div className="flex-1 relative">
					<MapContainer
						center={[7.852878, 123.190707]}
						zoom={16}
						className="w-full h-full"
						style={{ height: "100%", width: "100%", borderRadius: "8px" }}>
						<TileLayer
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
							attribution="Tiles &copy; Esri &mdash; Source: Esri, Earthstar Geographics"
						/>
						<ClickHandler onClick={handleClick} />

						{coords && (
							<Marker
								position={[coords.lat, coords.lng]}
								icon={redIcon}>
								<Popup>
									Lat: {coords.lat.toFixed(5)}, Lng: {coords.lng.toFixed(5)}
								</Popup>
							</Marker>
						)}

						{activeCategory &&
							categoryPins
								.filter((item) => item.location && item.location.includes(","))
								.map((item) => {
									const [latStr, lngStr] = item.location.split(",");
									const lat = parseFloat(latStr);
									const lng = parseFloat(lngStr);
									if (isNaN(lat) || isNaN(lng)) return null;

									return (
										<Marker
											key={item.id}
											position={[lat, lng]}
											eventHandlers={{
												mouseover: (e) => e.target.openPopup(),
												mouseout: (e) => e.target.closePopup(),
											}}>
											<Popup>
												{activeCategory === "pwds" ? (
													<>
														Name: {item.people} <br />
														Age: {item.age} <br />
														Gender: {item.gender}
													</>
												) : activeCategory === "infras" ? (
													<>
														Name: {item.name} <br />
														Type: {item.type} <br />
														<img
															src={item.image || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"}
															alt={item.name}
															style={{ width: "100%", height: "auto", marginTop: "5px" }}
														/>
													</>
												) : activeCategory === "seniors" ? (
													<>
														Name: {item.people} <br />
														Age: {item.age} <br />
														Gender: {item.gender}
													</>
												) : (
													"Unknown category"
												)}
											</Popup>
										</Marker>
									);
								})}
					</MapContainer>
					<div
						className="flex items-center justify-center cursor-pointer"
						onClick={handleCopy}>
						<p>
							{!coords?.lat || !coords?.lng
								? "Click anywhere on the map"
								: copied
								? "Location Copied"
								: `${coords.lat}, ${coords.lng}`}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Map;
