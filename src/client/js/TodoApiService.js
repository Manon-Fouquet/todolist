// TODO FIXME USE PROXY AND HOSTNAME

/**
 * Returns the current task list
 * @param {TodoList}    comp        The parent component
 * @param {string}      hostName    <host:port> adress        
 */


function getTasksList(comp,hostName = 'http:/localhost:8000'){

    fetch('http://localhost:8000/todo/tasks')
        .then(response=>response.json()).catch(res=>console.log("Could not convert res to json in getTasksList",res))
        .then(res=>comp.setState({taskList:res}))
        .catch(err=>console.log("Could not update task list in TodoList component", err))
}


/**
 * Adds a task, then update the component with updated task list
 * @param {TodoList}    comp        The parent component
 * @param {json}        new_task    json {"descr":<DESCRIPTION>, "completed":<true/false>}
 * @param {string}      hostName    <host:port> adress   
 */
function addTask(comp, new_task,hostName = 'http:/localhost:8000'){
    fetch('http://localhost:8000/todo/tasks', 
        {
            method: 'POST',
            headers: 
            {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_task)
        })
        .then(response=>response.json())
        .catch(err=>console.log("Could not convert res to json in addTask",err))
        .then(getTasksList(comp,hostName))
        .catch(err=>console.log("Failed getting updated task list in addTask: ",err))
}


/**
 * Deletes a task, then update the component with updated task list
 * @param {TodoList}    comp        The parent component
 * @param {int}         task_id     The task id
 * @param {string}      hostName    <host:port> adress   
 */
function deleteTask(comp,  task_id,hostName = 'http:/localhost:8000'){
    fetch('http://localhost:8000/todo/task/'+task_id, 
        {
            method: 'DELETE'
        })
        .then(async response => {
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = response.status;
                return Promise.reject(error);
            }
        })
        .then(()=>getTasksList(comp,hostName))
        .catch(error=>console.log("Failed getting updated task list in deleteTask",error))
    }

 
/**
 * Modifies a task (completed status), then update the component with updated task list
 * @param {TodoList}    comp        The parent component
 * @param {int}         task_id     The task id
 * @param {json}        new_val     json {"descr":<DESCRIPTION>, "completed":<true/false>}
 * @param {string}      hostName    <host:port> adress   
 */   
function updateTask(comp,  task_id, new_val,hostName = 'http:/localhost:8000'){

    fetch('http://localhost:8000/todo/task/'+task_id, 
        {
            method: 'PUT',
            headers: 
            {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify(new_val)
        })
        .then(response => response.json())
        .then(()=>getTasksList(comp,hostName))
        .catch(err=>console.log("Failded updating task ",task_id," with value ",JSON.stringify(new_val),": ",err))
}

module.exports = {getTasksList,addTask,updateTask,deleteTask}