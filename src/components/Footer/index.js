import React from "react";

import './footer.css';

class Footer extends React.Component {
    render() {
      return (
        <div className="footer" style={{ height: this.props.height }}>
            <button onClick={this.props.submit}>GENERATE CHART</button>
        </div>
      );
    }
  }

export default Footer;