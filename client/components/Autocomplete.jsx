import React from 'react'
import Autocomplete from 'react-google-autocomplete'

const AutoComplete = ({ onPlaceSelected }) => (
	<Autocomplete
		style={{ width: '100%' }}
	    onPlaceSelected={(place) => {
	      onPlaceSelected(place);
	    }}
	    types={['(cities)']}
	/>
)

export default AutoComplete;
