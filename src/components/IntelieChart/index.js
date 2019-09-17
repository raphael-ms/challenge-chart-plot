import React, { Component } from 'react';
import Chart from 'chart.js' // eslint-disable-line no-unused-vars
import { LineChart } from 'react-chartkick'
import './chart.css';


//get the timestamp and convert for MM:SS format
function formatingTime(timestamp) {
	let date = new Date(Number(timestamp))
	return `${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`
}

const libraryOptions = {
	scales: {
		xAxes: [{
			ticks: {
				callback: function (value) {
					return formatingTime(value);
				}
			}
		}]
	},
	layout: {
		padding: {
			top: 30,
			bottom: 30
		}
	}
}



class IntelieChart extends Component {

	//There's an IF checking if the Chart is empty, if it is the message bellow are showed
	render() {
		return (
			<div className="IntelieChart" style={{height: this.props.height }}>
				{this.props.data.length > 0 ?
					<LineChart						
						data={this.props.data}
						legend={"right"}
						height={this.props.height}
						curve={false}
						library={libraryOptions}						
					/>
					:
					<span>NO DATA AVAIABLE</span>	
				}
			</div>
		);
	}
}

export default IntelieChart;
