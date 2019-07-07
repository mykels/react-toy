import React from 'react';
import {Todo} from "../Todo/Todo";

import './index.css';

export const TodoList = ({todos, onToggle}) => {
    return (
        <div className="todo-list">
            {todos.map((todo) =>
                <Todo key={todo.index} todo={todo} onToggle={onToggle}/>
                )
            }
        </div>
    );
};