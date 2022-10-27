import React from 'react';
import TaskItem from './TaskItem';
import TodoForm from './TodoForm';

export default class TodoList extends React.Component{


    constructor() {
        super();
        this.taskList=[],
        this.state = { i: 0 };
        this.addTask.bind(this.addTask)
    }

    deleteTask(taskId) {
        this.taskList = this.taskList.filter(t => t.id !== taskId)
    }
    
    increment(){
        this.setState({i: this.state.i+1});
        this.forceUpdate()
    }

    // Arrow function needed here
    //https://bobbyhadz.com/blog/react-cannot-read-property-props-of-undefined
    addTask=(descr)=>{
        if(descr!==null && descr!=""){
            let newTask = {
                "id": this.state.i + 1,
                "descr": descr,
                "completed": true,
            };
            
            this.taskList.push(newTask) 
            this.increment()
        }
    }

    render() {
        var tasks = this.taskList.map(t=><TaskItem id={'task-'+t.id} completed={t.completed} descr = {t.descr}/>);
        return (
            <div id='main-component'>
                <TodoForm addTask = {this.addTask}  id='new-task-form'/>
                <div id='task-list'> 
                    {tasks}
                </div>
           </div>
        );
    }
}