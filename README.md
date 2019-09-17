# Raphael Coments

## Tests

I did two test:
* App.test.js, was created when I used the create-react-app lib, he's responsible to test the App rendering;
* dataParser.test.js, is responsible to test all the validations that was made at my dataParser class, forcing all conditions. This one are focused in prevent some wrong input by the user, or misunderstanding of mandatory fields.

## General Notes

In order to make all the requirements done, I used some libraries to help me, such as:
* [Ace-Editor](https://github.com/securingsincity/react-ace)    
* [chartkick](https://chartkick.com/react)
* [resizable-box](https://www.npmjs.com/package/react-resizable-box)
* [create-react-app](https://create-react-app.dev/docs/getting-started)
* A lot of hours at React Docs, and some google searchs. - It's not a lib but was as useful as one

## Huge Data Amount

To prevent the huge data amount there's a lot of ways, such as limit the data input(not a good one, but its possible), search for libs bests praticces, use some lazy loadings, use paginators, avoid useless rerenders.

In this case I used an algorithm that searchs for the last start event, and ignore the ones that was before, avoind to spend time processing an array of events that will not be ploted. I did some data validation while the data are parsing, it can save some time when user insert wrong input, since the parse will be stop before the end.

But the most important thing, in all cases is to understand the main goal of the project, after that you can choose which technique will use. For example, as Intelie is known for your real time systems, keep it in real time is the main goal, there's no way to acept a lazy application, since it can mean a loss of an important information.

## Real JSON x Challenge JSON

At the very beginning of challenge definitions you guys asked to represent data input as a JSON, but gave an example right bellow of some code that wasn't, so I used the real JSON.
To prevent misunderstanding you can copy the code bellow:

```
    [   {"type":"start","timestamp":1519780251000,"select":["min_response_time","max_response_time"],"group":["os","browser"]},
	{"type":"span","timestamp":1519780251000,"begin":1519780250000,"end":1519780270201},
	{"type":"data","timestamp":1519780251000,"os":"windows","browser":"opera","min_response_time":0.7,"max_response_time":1.8},
	{"type":"data","timestamp":1519780260201,"os":"windows","browser":"opera","min_response_time":0.8,"max_response_time":1.4},
	{"type":"data","timestamp":1519780251000,"os":"windows","browser":"chrome","min_response_time":0.6,"max_response_time":2},
	{"type":"data","timestamp":1519780260201,"os":"windows","browser":"chrome","min_response_time":0.3,"max_response_time":1.7},
	{"type":"data","timestamp":1519780251000,"os":"linux","browser":"chrome","min_response_time":0.2,"max_response_time":1.5},
	{"type":"data","timestamp":1519780260201,"os":"linux","browser":"chrome","min_response_time":0.3,"max_response_time":1.4},
	{"type":"data","timestamp":1519780251000,"os":"linux","browser":"opera","min_response_time":0.4,"max_response_time":1.7},
	{"type":"data","timestamp":1519780260201,"os":"linux","browser":"opera","min_response_time":0.7,"max_response_time":1.8},
	{"type":"data","timestamp":1519780251000,"os":"mac","browser":"opera","min_response_time":0.1,"max_response_time":5.3},
	{"type":"data","timestamp":1519780260201,"os":"mac","browser":"opera","min_response_time":1.1,"max_response_time":3.2},
	{"type":"data","timestamp":1519780251000,"os":"mac","browser":"chrome","min_response_time":1.2,"max_response_time":4},
	{"type":"data","timestamp":1519780260201,"os":"mac","browser":"chrome","min_response_time":1.5,"max_response_time":2.9},
	{"type":"data","timestamp":1519780269201,"os":"linux","browser":"chrome","min_response_time":0.3,"max_response_time":1.4},
	{"type":"data","timestamp":1519780269201,"os":"linux","browser":"opera","min_response_time":0.7,"max_response_time":1.8},
	{"type":"data","timestamp":1519780269201,"os":"windows","browser":"opera","min_response_time":0.8,"max_response_time":1.4},
	{"type":"data","timestamp":1519780269201,"os":"mac","browser":"opera","min_response_time":1.1,"max_response_time":3.2},
	{"type":"data","timestamp":1519780269201,"os":"mac","browser":"chrome","min_response_time":1.5,"max_response_time":2.9},
	{"type":"data","timestamp":1519780269201,"os":"windows","browser":"chrome","min_response_time":0.3,"max_response_time":1.7},
	{"type":"stop","timestamp":1519780260201}]

 ```
