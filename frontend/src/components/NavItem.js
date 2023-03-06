import React from 'react'

const NavItem = (props) => {
  return (
    <li className="nav-item">
      <span className={"nav-link " + (props.link || '')} onClick={props.onClick || ''} style={props.style}>{props.text} </span>
    </li>
  )
}

export default NavItem