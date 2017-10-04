import React from 'react'
import '../styles/header.less'

const Header = ({ info, onHeaderClick, onHomeClick }) => (
  <div className="header">
	<a onClick={onHeaderClick} className="inline">
		<h2>{info}</h2>
    </a>
    <a onClick={onHomeClick || ''} className={onHomeClick ? 'home' : 'hide'}>
		<h2><i className="fa fa-home" aria-hidden="true"></i></h2>
    </a>
  </div>
)

export default Header
