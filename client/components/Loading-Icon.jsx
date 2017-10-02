import React from 'react'
import '../styles/loading-icon.less'

const LoadingIcon = ({ hide }) => (
  <div className={hide ? 'hide' : 'loadingIcon'}>
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  </div>
)

export default LoadingIcon
