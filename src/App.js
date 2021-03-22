import React, { useState, useEffect } from "react"
import "./App.css"
import LoadingMask from "./components/LoadingMask"
import Hotel from "./components/Hotel"

const App = () => {
	const [showLoad, setShowLoad] = useState(false)
	const [hotels, setHotels] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		setShowLoad(true)
		fetch("api/hotels")
			.then((response) => response.json())
			.then((data) => {
				setHotels(data)
			})
			.catch((error) => {
				setError("Theres a problem with the fetch")
			})
			.finally(() => setShowLoad(false))
	}, [])

	return (
		<div className="App">
			<h1>Hotels</h1>
			{showLoad && <LoadingMask />}
			{!error &&
				hotels &&
				hotels.map((hotel) => (
					<Hotel
						name={hotel.name}
						city={hotel.city}
						stars={hotel.stars}
					/>
				))}
		</div>
	)
}

export default App
