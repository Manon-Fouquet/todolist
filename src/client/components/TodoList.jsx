import React from 'react';
import TaskItem from './TaskItem';
import TodoForm from './TodoForm';

export default class TodoList extends React.Component{


    constructor() {
        super();
        // Intermediate list mirroring the TaskItem components
        this.taskList=[],
        this.filterOptions=['All','Only Todo', 'Only done']
        this.state = { i: 0 ,display:this.filterOptions[0]}; 
        this.addTask.bind(this.addTask)
    }

   
    deleteTask(taskId) {
        this.taskList = this.taskList.filter(t => t.id !== taskId)
    }
    
    // Unique id for new tasks
    increment(){
        this.setState({i: this.state.i+1});
        this.forceUpdate()
    }

    // Arrow function needed here, see
    //https://bobbyhadz.com/blog/react-cannot-read-property-props-of-undefined
    addTask=(descr)=>{
        if(descr!==null && descr!=""){
            let newTask = {
                "id": this.state.i + 1,
                "descr": descr,
                "completed": false,
            };
            this.taskList.push(newTask) 
            this.increment()
        }
    }

    // Task status must be handled here
    updateStatus=(taskId,val)=>{
        this.taskList.filter(t=>t.id==taskId).forEach(t=>t.completed=val)
    }

    render() {
        // create a list of TaskItem components from taskList
        var tasks = this.taskList.filter(t=>{
            switch (this.state.display) {
                case this.filterOptions[1]:
                    return !t.completed
                case this.filterOptions[2]:                    
                    return t.completed
                default:
                    return true;
            }
        }).map(t=><TaskItem id={t.id} key={t.id} completed={t.completed} descr = {t.descr} updateStatus={this.updateStatus}/>);

        return (
            <div id='main-component' className='flex-column center'>
                <TodoForm addTask = {this.addTask}  id='new-task-form'/>
                

                <div className="filter-container ">
                    <label className='text-regular-default'>Display:</label>
                    <select id="todo-filter" className='border-color-10' value={this.state.display} onChange={e=>this.setState({display:e.target.value})}>
                        {this.filterOptions.map(function(option) {
                            return ( <option id={option} value={option}>{option}</option> )
                        })}
                    </select>
                </div>


                <div id='task-list'> 
                    {tasks}
                </div>
           </div>
        );
    }
}