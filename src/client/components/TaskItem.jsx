import React from 'react';
import TrashIcon from "../images/trash-can.png"
export default class TaskItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {completed:this.props.completed};
    }


    switch=()=>{
        // updates the internal state and cb to parent to update the DB
        // NB : not really useful as the TaskItem list is rebuilt on render
        let next = !this.state.completed
        this.setState({completed: next})
        this.props.updateStatus(this.props.id,{"descr":this.props.descr,"completed":next})
    }

    render() {
        return (
            <div id={"task-"+this.props.id} className="task flex-row">
                <input className='task-check-box' type="checkbox" id={"checked-"+this.props.id}  defaultChecked = {this.props.completed} onChange={this.switch} />
                {this.state.completed?<label className='task-descr text-regular-default striked' htmlFor={this.props.id} id={'task-descr-'+this.props.id}>
                   {this.props.descr} 
                </label>:
                <label className='task-descr text-regular-default' htmlFor={this.props.id} id={'task-descr-'+this.props.id}>
                {this.props.descr} 
             </label>}
                <img className="task-delete small-circle-icon" src={TrashIcon}  id={"delete-"+this.props.id} onClick = {()=>this.props.deleteMe(this.props.id)}/>
            </div>
        );
    }
}