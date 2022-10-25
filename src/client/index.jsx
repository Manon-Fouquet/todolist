import React from 'react';
import {createRoot} from 'react-dom/client';
import TodoList from './components/TodoList';

// Styles
import "./styles/main.scss";

const root = createRoot(document.getElementById('app'));
root.render(<TodoList />);
