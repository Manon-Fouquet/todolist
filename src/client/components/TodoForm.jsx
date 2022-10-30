import React from 'react';
import PlusIcon from "../images/plus.png"

export default class TodoForm extends React.Component{

    constructor(props){
        super(props);
        this.state={descr:null};
        this.submitTask = this.submitTask.bind(this);
    }
    
    submitTask() {
        this.props.addTask(this.state.descr);
        this._inputElement.value=""
    }

    render() {
        return (
            <div className='flex-row input-form overflow-hidden'>
                <input className='form-input form-label'   ref={(a) => this._inputElement = a} placeholder="Enter task" onChange={(e)=>this.setState({descr: e.target.value})}/>
                <img className='circle-button' src={PlusIcon} onClick={this.submitTask}/>
            </div>
        );
    }
}