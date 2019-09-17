//Makes the first letter uppercase
function upperFirstLetter(str){
	return str = str.charAt(0).toUpperCase() + str.slice(1);
}

// takes the "_" out, and make the first letter UpperCase, then bring the words back again.
function refactorLabelName(str){
  var arr = str.split("_");
  for (let i=0; i<arr.length; i++) {
	arr[i]= upperFirstLetter(arr[i]);
  }
  return arr.join(" ");
}

//Receive the name then adds the groupname refactored and a blank space at the end
const rightLabelHelper = (str,groupName) => str += (refactorLabelName(groupName) + " ")
//receive an array joins with the result of the function above and adds the selectName
const rightLabelName = (inputParsed,groups,selectName)=> groups.map(x=>inputParsed[x])
					   .reduce(rightLabelHelper," ")+refactorLabelName(selectName)


//Convert JSON into an object to generate data to populate the chart
const dataParser = (JSONinput) => {
	let inputParsed,select, group, begin, end, chartDataArr, dataMap, i
	try{
		//parse the JSON into an object to manipulate
		inputParsed = JSON.parse(JSONinput)
	}catch(e){
		//if the JSON input is incorrect throw an error
		throw Error("JSON input is incorrect")
	}
	//verifys if code is an array
	if(! (inputParsed instanceof Array) ) throw Error("Input is expected to have more than one event")
	
	//Checking the last start event, to avoid mismatching data, after that, we start to read the next data
	for (i = inputParsed.length - 1; i >= 0; i--) {
		if(!inputParsed[i]) throw Error("Index out of boundaries")
		//When start event is found start all variables and get the index
		if (inputParsed[i].type === 'start') {	
			select = inputParsed[i].select
			group = inputParsed[i].group
			chartDataArr = []
			dataMap = {}
			break;
		}
	}
	if (i < 0) throw Error("No start event found")
	for (i ; i < inputParsed.length; i++) {
		if(!inputParsed[i]) throw Error("Index out of boundaries")
		//checking if the type and timestamp are informed, since they are mandatory
		if(!inputParsed[i].type) throw Error("No event type found, please inform one of the following: start, span, data or stop.")
		if(!inputParsed[i].timestamp) throw Error("No timestamp found at a "+ inputParsed[i].type.toUpperCase() + " event")

		switch (inputParsed[i].type) {
			case 'start':
				//data validation
				if(!inputParsed[i].select) throw Error('Start events should have a select array')
				if(!inputParsed[i].group) throw Error('Start events should have a group array')
				select = inputParsed[i].select
				group = inputParsed[i].group
				chartDataArr = []
				dataMap = {}
				break;
			case 'data':
			//filtering values between the time window set at span event 
			if (inputParsed[i].timestamp >= begin && inputParsed[i].timestamp <= end) {
				select.forEach(x => { // eslint-disable-line
					let lineName = rightLabelName(inputParsed[i],group,x)
					//if its a new data point
					if (!dataMap[lineName]) {
						dataMap[lineName] = { name: lineName, data: {} }
						chartDataArr.push(dataMap[lineName])
					}
					//if its not new, just add
					dataMap[lineName].data[inputParsed[i].timestamp - begin] = inputParsed[i][x]
					})
				}
				break;
			case 'span':
				//data validation
				if(!inputParsed[i].end) throw Error("No End value found")
				if(!inputParsed[i].begin) throw Error("No Begin value found")
				if(inputParsed[i].end <= inputParsed[i].begin) throw Error("End value should be bigger than begin")
				begin = inputParsed[i].begin
				end = inputParsed[i].end
				break;
			case 'stop':
				i = inputParsed.length;
				break;
			default:
				//if the type isn't start,stop,span or data
				throw Error("The event type informed isn't a valid one")
		}
	}

	if(chartDataArr.length===0)throw Error("No valid data events were found after the last start event")

	let dataPoints = Object.keys(chartDataArr[0].data)
	dataPoints.sort()
	//check if all data are matching in chart and legend
	if(chartDataArr.find(event=>{
		let eventKeys = Object.keys(event.data)
		if(eventKeys.length !== dataPoints.length) return true
		eventKeys.sort()
		for(let i=0; i<eventKeys.length; i++){
			if(eventKeys[i]!==dataPoints[i])return true
		}
		return false
	}))throw Error("To generate the graph, all lines must have the same data points on the X axis")

	return {
		inputParsed: JSONinput,
		data: chartDataArr,
		dataMap: dataMap,
		begin,
		end,
	}
}

export default dataParser