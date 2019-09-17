import React from "react";
import './header.css'

class Header extends React.Component {
    render() {
      return (
        <div className="header"  style={{ height: this.props.height }}>
            <p>{this.props.name}' Challenge</p>
        </div>
      );
    }
  }

export default Header;