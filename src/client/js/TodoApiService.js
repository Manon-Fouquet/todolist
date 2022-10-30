// TODO FIXME USE PROXY AND HOSTNAME

/**
 * Returns the current task list
 * @param {TodoList}    comp        The parent component
 * @param {string}      hostName    <host:port> adress        
 */


function getTasksList(comp,hostName = 'http:/localhost:8000'){

    fetch('http://localhost:8000/todo/tasks')
        .then(response=>response.json()).catch(res=>console.log("Could not convert res to json in getTasksList",res))
        .then(res=>comp.setState({taskList:res})).catch(res=>console.log("Could not update task list in TodoList component", res))
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
        .then(response=>response.json()).catch(res=>console.log("Could not convert res to json in addTask"))
        .then(getTasksList(comp,hostName)).catch(res=>console.log("Failed getting updated task list in addTask"))
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
        .then(getTasksList(comp,hostName)).catch(console.log("Failed getting updated task list in deleteTask"))
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
            .then(getTasksList(comp,hostName))
            .catch(console.log("Failded updating task ",task_id," with value ",JSON.stringify(new_val)))
}

module.exports = {getTasksList,addTask,updateTask,deleteTask}