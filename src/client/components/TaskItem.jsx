import React from 'react';
import TrashIcon from "../images/trash-can.png"
export default class TaskItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {completed:this.props.completed};
    }


    render() {
        return (
            <div id={"task-"+this.props.id}>
                <input type="checkbox" id={"checked-"+this.props.id} defaultChecked={this.state.completed} onClick={()=>this.state.completed = !this.state.completed} />
                <label className='text-regular-default' htmlFor={this.props.id} id={'task-descr-'+this.props.id}>
                   {this.props.descr} 
                   </label>
                <img className="trash-button" src={TrashIcon}  id={"delete-"+this.props.id} />
               
            </div>
        );
    }
}