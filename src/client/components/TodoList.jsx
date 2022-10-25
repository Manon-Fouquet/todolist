import React from 'react';
import TodoForm from './TodoForm';

export default class TodoList extends React.Component{
    constructor() {
        super();
        this.taskList={}
    }

    
    deleteNode(nodeId) {
        if(nodeId in taskList.keys()){
            taskList.remove(nodeId)
            console.log("Removed task ",nodeId)
        }
    }
    
    render() {
        return (
           <TodoForm>
                Test TodoList
           </TodoForm>
        );
    }
}