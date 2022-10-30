// TODO FIXME USE PROXY AND HOSTNAME

/**
 * Returns the current task list
 * @param {TodoList}    comp        The parent component
 * @param {string}      hostName    <host:port> adress        
 */


function getTasksList(comp){

    fetch('./todo/tasks')
        .then(response=>{
            if(response.ok){
                return response.json()
            }else{
                throw new Error("Error "+response.status+": Could not fetch task list")
            }})
        .catch(err=>comp.setState({taskList:[],errorMsg:err.message}))    
        .then(res=>comp.setState({taskList:res,errorMsg:""}))
}


/**
 * Adds a task, then update the component with updated task list
 * @param {TodoList}    comp        The parent component
 * @param {json}        new_task    json {"descr":<DESCRIPTION>, "completed":<true/false>}
 */
function addTask(comp, new_task){
    fetch('./todo/tasks', 
        {
            method: 'POST',
            headers: 
            {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_task)
        })
        
        .then(response=>{
            if(response.ok){
                return response.json()
            }else{
                throw new Error("Error "+response.status+": Could not add task")
            }})
        .catch(err=>comp.setState({taskList:[],errorMsg:err.message}))  
        .then(()=>getTasksList(comp))
}


/**
 * Deletes a task, then update the component with updated task list
 * @param {TodoList}    comp        The parent component
 * @param {int}         task_id     The task id
 */
function deleteTask(comp,  task_id){
    fetch('./todo/task/'+task_id, 
        {
            method: 'DELETE'
        })
        .then(response=>{
            if(!response.ok){
                throw new Error("Error "+response.status+": Could not delete task #"+task_id)
            }})
        .catch(err=>comp.setState({taskList:[],errorMsg:err.message})) 
        .then(()=>getTasksList(comp))
        
    }

 
/**
 * Modifies a task (completed status), then update the component with updated task list
 * @param {TodoList}    comp        The parent component
 * @param {int}         task_id     The task id
 * @param {json}        new_val     json {"descr":<DESCRIPTION>, "completed":<true/false>}
 * @param {string}      hostName    <host:port> adress   
 */   
function updateTask(comp,  task_id, new_val,hostName = 'http:/localhost:8000'){

    fetch('./todo/task/'+task_id, 
        {
            method: 'PUT',
            headers: 
            {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify(new_val)
        })
        .then(response=>{
            if(response.ok){
                return  response.json()
            }else{
                throw new Error("Error "+response.status+": Failded updating task "+task_id+" with value "+JSON.stringify(new_val))
            }})
        
        .catch(err=>comp.setState({taskList:[],errorMsg:err.message})) 
        .then(()=>getTasksList(comp))
}

module.exports = {getTasksList,addTask,updateTask,deleteTask}