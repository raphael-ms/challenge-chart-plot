import dataParser from './dataParser.js'

//Testing all validations made at dataParser
it('Right Value', () => {
    dataParser(`[
        {"type":"start","timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]},
        {"type":"span","timestamp":1519780251293,"begin":1519780250293,"end":1519780260201},
        {"type":"data","timestamp":1519780251000,"x":"linux","browser":"chrome","min_response_time":0.1,"max_response_time":1.3},
        {"type":"data","timestamp":1519780258002,"x":"linux","browser":"chrome","min_response_time":0.5,"max_response_time":1.5},
        {"type":"data","timestamp":1519780251000,"x":"linux","browser":"chrome","min_response_time":0.1,"max_response_time":1.3},
        {"type":"data","timestamp":1519780258002,"x":"linux","browser":"chrome","min_response_time":0.5,"max_response_time":1.5},
        {"type":"stop","timestamp":1519780251293}]`)
});

 
it('fails because of the wrong JSON format',() => {
    expect(()=>dataParser(`[{type:"start","timestamp":1519780251293}]`)
    .toThrowError('JSON input is incorrect')
)});

it('fails because it supose to be an array',() => {
    expect(()=>dataParser(`[{"type":"start","timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]}]`)
    .toThrowError('Input is expected to have more than one event')
)});

it('fails because it has no start event',() => {
    expect(()=>dataParser(`[{"type":"span","timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]}],
    [{"type":"span","timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]}]`)
    .toThrowError('No start event found')
)});

it('fails because it has no event type',() => {
    expect(()=>dataParser(`[{"timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]}]`)
    .toThrowError('No event type found, please inform one of the following: start, span, data or stop.')
)});

it('fails because it has no timestamp',() => {
    expect(()=>dataParser(`[{"type":"start","select":["min_response_time","max_response_time"],"group":["x","browser"]}]`)
    .toThrowError("No timestamp found at a "+ inputParsed[i].type.toUpperCase() + " event")
)});

it('fails to parse start events without select',() => {
    expect(()=>dataParser(`[{"type":"start","timestamp":1519780251293}]`)
    .toThrowError('Start events should have a select array')
)});

it('fails to parse start events without group',() => {
    expect(()=>dataParser(`[{"type":"start","timestamp":1519780251293}],"select":["min_response_time","max_response_time"]`)
    .toThrowError('Start events should have a group array')
)});

it('fails to parse span event without end value',() => {
    expect(()=>dataParser(`[{"type":"start","timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]},
    {"type":"span","timestamp":1519780251293,"begin":1519780250293}]`)
    .toThrowError("No End value found")
)});

it('fails to parse span event without begin value',() => {
    expect(()=>dataParser(`[{"type":"start","timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]},
    {"type":"span","timestamp":1519780251293,"end":1519780250293}]`)
    .toThrowError("No Begin value found")
)});

it('fails to parse span when begin is bigger than end',() => {
    expect(()=>dataParser(`[{"type":"start","timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]},
    {"type":"span","timestamp":1519780251293,"begin":1519780269293,"end":1519780260293}]`)
    .toThrowError("End value should be bigger than begin")
)});

it('fails to parse when type is not on of the valids',() => {
    expect(()=>dataParser(`[{"type":"intelie","timestamp":1519780251293,"select":["min_response_time","max_response_time"],"group":["x","browser"]}]`)
    .toThrowError("The event type informed isn't a valid one")
)});

it('fails cause some events has more data than others',() => {
    expect(()=>dataParser(`[{"type":"start","timestamp":1519780251000,"select":["min_response_time","max_response_time"],"group":["os","browser"]},
	{"type":"span","timestamp":1519780251000,"begin":1519780251000,"end":1519780260201},
	{"type":"data","timestamp":1519780251000,"os":"linux","browser":"chrome","min_response_time":0.1,"max_response_time":1.3},
	{"type":"data","timestamp":1519780260201,"os":"linux","browser":"chrome","min_response_time":0.5,"max_response_time":1.5},
	{"type":"data","timestamp":1519780251000,"os":"linux","browser":"opera","min_response_time":0.2,"max_response_time":1.7},
	{"type":"data","timestamp":1519780260201,"os":"linux","browser":"opera","min_response_time":0.7,"max_response_time":1.8},
	{"type":"data","timestamp":1519780251000,"os":"windows","browser":"opera","min_response_time":0.9,"max_response_time":1.3},
	{"type":"data","timestamp":1519780260201,"os":"windows","browser":"opera","min_response_time":0.8,"max_response_time":1.2},
	{"type":"data","timestamp":1519780260201,"os":"windows","browser":"chrome","min_response_time":0.2,"max_response_time":1.9},
	{"type":"stop","timestamp":1519780260201}]`)
    .toThrowError("The event type informed isn't a valid one")
)});




