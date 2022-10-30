import React from 'react';
import TaskItem from './TaskItem';
import TodoForm from './TodoForm';
import {getTasksList, addTask, updateTask, deleteTask} from '../js/TodoApiService'

export default class TodoList extends React.Component{


    constructor() {
        super();
        // Intermediate list mirroring the TaskItem components
        this.filterOptions=['All','Only Todo', 'Only done']
        this.state = {display:this.filterOptions[0], taskList:[],errorMsg:""}; 
    }

    componentDidMount(){
        getTasksList(this)        
    }

    render() {
        /* 
        Create a list of TaskItem components from taskList
            Add the following hooks:
                - updateMe : check on completed checkbox, cb from TaskItem to TodoList
                - deleteMe: click on trash icon, cb from TaskItem to TodoList
        */
        var tasks = []
        try{
            tasks = this.state.taskList.filter(t=>{
                switch (this.state.display) {
                    case this.filterOptions[1]:
                        return !t.completed
                    case this.filterOptions[2]:                    
                        return t.completed
                    default:
                        return true;
        }
        }).map(t=><TaskItem id={t.id} key={t.id} completed={t.completed} descr = {t.descr} updateMe={(taskId,val)=>updateTask(this,taskId,val)} deleteMe={taskId=>deleteTask(this,taskId)}/>);
    
        }catch(err){
            // Re-render with error message
            this.setState({taskList:[], errorMsg:"Could not retrieve tasks from the server"})
        }
        // Add callback addTask to TodoForm and render tasks created above. 
        // Task filtering is done on client side
        return (
            <div id='main-component' className='flex-column center'>
                <TodoForm id='new-task-form' addTask = {descr=>{descr!==null && descr!="" && addTask(this,{"descr": descr, "completed": false})}} />
                <div className="filter-container ">
                    <label className='text-regular-default'>Display:</label>
                    <select id="todo-filter" className='border-color-10' value={this.state.display} onChange={e=>this.setState({display:e.target.value})}>
                        {this.filterOptions.map(function(option) {
                            return ( <option key={option} value={option}>{option}</option> )
                        })}
                    </select>
                </div>

                {this.state.errorMsg &&   <div className = "error-field">{this.state.errorMsg}</div>}

                <div id='task-list'> 
                    {tasks}
                </div>
           </div>
        );
    }
}

