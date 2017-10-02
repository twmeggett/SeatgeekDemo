function addEvent(callback) {
	window.onscroll = function () {
	    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
	        callback();
	    }
	};
}

function removeEvent() {
	window.onscroll = function () { };
}

export default { addEvent, removeEvent }
