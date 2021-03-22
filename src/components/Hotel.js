import React, { useState } from "react"
import Subscription from "./Subscription"

export default function Hotel({ name, city, stars }) {
	const [details, setDetails] = useState(false)
	const [showSub, setShowSub] = useState(false)

	return (
		<div style={{ border: "1px solid black" }}>
			<h1>{name}</h1>
			{details && (
				<>
					<p>
						{city} {stars} stars
						<br />
						<button onClick={() => setShowSub(true)}>
							Request more info
						</button>
					</p>
				</>
			)}
			{showSub && details && (
				<Subscription name={name} setShowSub={setShowSub} />
			)}
			<button onClick={() => setDetails(!details)}>
				{details ? "Show less" : "Show more"}
			</button>
		</div>
	)
}
