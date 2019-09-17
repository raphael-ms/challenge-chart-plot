import React, { Component } from 'react';
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'
import Editor from './components/CodeEditor/index.js'
import IntelieChart from './components/IntelieChart/index.js'
import dataParser from './dataParser.js'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			code: "",
			data: [],
			dataMap: {},
      errorMessage: null,
      textValue: "",
      headerHeight: '60px',
      footerHeight: '60px',
      chartHeight: '370px',
      editorHeight: '250px',
		}
  }
  

  //Function that populates the chart, inserting the JSON from Editor at the dataParser
  generateChart = () => {
    try {
      this.setState(dataParser(this.textInput.getValue()), )
      this.setState({textValue: this.textInput.getValue()})
		} catch (e) {
			alert(e.message)
		}
  }
  
  //Function that makes Charts resizable
  //BUG.: There's a fix to make at the textSize, since it's not updating, making only the Chart resizable
  resize = () => {
    var textSize = this.textInput.getHeight();
    var chartSize = window.screen.height - textSize - 250;
    this.setState({chartHeight: chartSize + 'px'})
}

  render() {
    return (    
      <div className="App">
        <Header 
          name="Raphael Marques" 
          height={this.state.headerHeight}/>
        <Editor 
          onResize={this.resize} 
          height={this.state.editorHeight}
          value={this.state.textValue} 
          ref={instance => {this.textInput = instance;}}
          />
        <IntelieChart  
          data={this.state.data} 
          height={this.state.chartHeight}
          ref={instance => {this.chart = instance;}}/>
        <Footer 
          height={this.state.footerHeight}
          submit={this.generateChart}/>
      </div>
    );
  }
}
export default App;
