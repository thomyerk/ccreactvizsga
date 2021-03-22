import React, { useState } from "react"
import LoadingMask from "./LoadingMask"

export default function Subscription({ name, setShowSub }) {
	const [input, setInput] = useState("")
	const [showLoad, setShowLoad] = useState(false)
	const [message, setMessage] = useState(false)

	const sendRequest = () => {
		setShowLoad(true)
		fetch("api/hotels/subscribe", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				email: input,
				hotel: name,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				data.success === true
					? setMessage("Subscribed")
					: setMessage("Already subscribed")
			})
			.catch((error) => {
				setMessage("Theres a problem with subscibing")
			})
			.finally(() => {
				setShowLoad(false)
				setTimeout(() => setShowSub(false), 5000)
			})
	}

	return (
		<div>
			<p>Request more info about {name}</p>
			{showLoad && <LoadingMask />}
			{!showLoad && !message && (
				<>
					<input
						onChange={(ev) => setInput(ev.target.value)}
						type="text"></input>
					<button
						onClick={() => sendRequest()}
						disabled={!input.includes("@") || !input.includes(".")}>
						Submit
					</button>
				</>
			)}
			{message}
		</div>
	)
}
