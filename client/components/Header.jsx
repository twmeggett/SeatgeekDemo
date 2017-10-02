import React from 'react'
import '../styles/header.less'

const Header = ({ info, onHeaderClick }) => (
  <div className="header">
	<a onClick={onHeaderClick}>
		<h2>{info}</h2>
    </a>
  </div>
)

export default Header
