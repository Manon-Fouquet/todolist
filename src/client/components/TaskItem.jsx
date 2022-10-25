import React from 'react';
import TrashIcon from "../images/trash-can.png"
export default class TaskItem extends React.Component{

    constructor(props){
        super(props);
        this.completed = React.createRef();
        this.descr=null;
    }


    render() {
        return (
            <div>
                <label htmlFor={this.props.id}>
                    <input type="checkbox" id={this.props.id} /> {this.props.descr}
                    <img className="trash-button" src={TrashIcon}/>
                </label>
            </div>
        );
    }
}