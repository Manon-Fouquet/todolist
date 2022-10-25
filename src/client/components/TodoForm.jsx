import React from 'react';
import TaskItem from './TaskItem';

export default class TodoForm extends React.Component{
    render() {
        return (
            <div>Test TodoForm
                <TaskItem id={1} descr = {"Task 1"} completed = {false}/>
                <TaskItem id={2} descr = {"Task 2"} completed = {true}/>
            </div>
        );
    }
}