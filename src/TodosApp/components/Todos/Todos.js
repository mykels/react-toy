import React, {useCallback} from 'react';
import './index.css';
import 'antd/dist/antd.css';

import {todosSelector, toggleTodoCreator} from "../../state/reducers/todos";

import {TodoList} from "../TodoList/TodoList";
import {useDispatch, useSelector} from "react-redux";

export const Todos = ({}) => {
    const todos = useSelector(todosSelector);
    const dispatch = useDispatch();

    const onToggle = (todo) => dispatch(toggleTodoCreator(todo));

    return (
        <div className="todos">
            <div className="header">
                This is todos app!
            </div>
            <TodoList todos={todos} onToggle={onToggle}/>
        </div>
    );
};

export default Todos;