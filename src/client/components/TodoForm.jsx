import React from 'react';
import TaskItem from './TaskItem';

export default class TodoForm extends React.Component{
    render() {
        return (
            <div>Test TodoForm
                <TaskItem/>
                <TaskItem/>
            </div>
        );
    }
}