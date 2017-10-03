const staticMapSrc = (event) => {
	return `https://maps.googleapis.com/maps/api/staticmap?center=${event.venue.address} ${event.venue.city} ${event.venue.postal_code} ${event.venue.country}&zoom=11&size=300x200&maptype=roadmap
&markers=color:red%7Clabel:A%7C${event.venue.location.lat},${event.venue.location.lon}&key=AIzaSyCiZMcPCto2ZQ4-XfLWSYVnYGwaeIiExjc`
}

export default staticMapSrc
