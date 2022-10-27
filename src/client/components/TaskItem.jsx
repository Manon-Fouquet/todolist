import React from 'react';
import TrashIcon from "../images/trash-can.png"
export default class TaskItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {completed:this.props.completed};
    }


    switch=()=>{
        let next = !this.state.completed
        this.setState({completed: next})
        this.props.updateStatus(this.props.id,next)
    }

    render() {
        return (
            <div id={"task-"+this.props.id}>
                <input type="checkbox" id={"checked-"+this.props.id}  defaultChecked = {this.props.completed} onChange={this.switch} />
                <label className='text-regular-default' htmlFor={this.props.id} id={'task-descr-'+this.props.id}>
                   {this.props.descr} 
                   </label>
                <img className="small-circle-icon" src={TrashIcon}  id={"delete-"+this.props.id} />
  
            </div>
        );
    }
}