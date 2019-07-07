import React from 'react';
import {Checkbox} from "antd";

import './index.css';

export const Todo = ({todo, onToggle}) => {
    const {title, checked} = todo;

    return (
        <div className="todo">
            <Checkbox checked={checked} onChange={() => onToggle(todo)}>
                {title}
            </Checkbox>
        </div>
    );
};