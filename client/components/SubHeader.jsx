import React from 'react'
import AutoComplete from './Autocomplete.jsx'
import '../styles/sub-header.less'

const SubHeader = ({ onPlaceSelected, onCurrentLocation }) => (
  <div className="subHeader">
	{/*
	<div className="inline" style={{ width: 10 + '%', paddingTop: 3 + 'px', position: 'relative', top: 2 + 'px' }}>
		<i className="fa fa-search inline" aria-hidden="true"></i>
	</div>
	<div className="inline" style={{ width: 90 + '%' }}>
		<AutoComplete onPlaceSelected={onPlaceSelected} />
	</div>
	*/}
	<div className="currentLocationBtn">
		<button onClick={onCurrentLocation}><p>Current Location</p></button>
	</div>
  </div>
)

export default SubHeader
