const staticMapSrc = (event) => {
	return `https://maps.googleapis.com/maps/api/staticmap?center=${event.venue.display_location}&zoom=11&size=300x200&maptype=roadmap
&markers=color:red%7Clabel:C%7C${event.venue.location.lat},${event.venue.location.lon}&key=AIzaSyCiZMcPCto2ZQ4-XfLWSYVnYGwaeIiExjc`
}

export default staticMapSrc
