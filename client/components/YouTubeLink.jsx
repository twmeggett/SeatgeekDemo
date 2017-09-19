import React from 'react'
import createYouTubeQuery from '../util/createYouTubeQuery'
import '../styles/youtube-link.less'
require("font-awesome-webpack");

const YouTubeLink = (props) => (
	<div className="youtube-link">
	  	<a href={createYouTubeQuery(props.name)} target="_blank">
	  		<i className="fa fa-youtube-play" aria-hidden="true"></i>
	  		{props.name}
	  	</a>
  	</div>
)

export default YouTubeLink