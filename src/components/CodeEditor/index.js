import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/monokai';
import './codeEditor.css';
import {ResizableBox } from 'react-resizable';


class Editor extends React.Component {
    
    constructor(props) {
		super(props)
        this.state = {
            editorHeight: '250px'
        }
    }
    
    //get the value of code editor
    getValue (){
        return this.refs.textEditor.editor.getValue();
    };
    
    //get the Height to help the ResizableBox
    getHeight(){
        return parseFloat(this.refs.textEditor.editor.container.parentNode.style.height
            .replace('px',''));
    }   
    

    render() {
        return (
        // I've modified some monokai colors to match the design of prototype
        <ResizableBox
            height= {250}
            onResize = {this.props.onResize}
            minConstraints={[100, 100]}
            maxConstraints={[400, 400]}>
            <AceEditor ref="textEditor"
                placeholder="insert your JSON code here"
                mode="json"
                theme="monokai"
                value={this.props.value}
                fontSize={15}
                name="jsonEditor"
                width="100%"
                height="100%"
                editorProps={{$blockScrolling: true}}
                />
        </ResizableBox>
        );
    }
}

export default Editor;