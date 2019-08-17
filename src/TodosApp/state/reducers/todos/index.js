const INITIAL_TODOS = [
    {index: 0, title: "Learn App", checked: false},
    {index: 1, title: "Rock World", checked: false}

];

export const todosReducer = (state = INITIAL_TODOS, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return toggleTodo(state, action.payload);
        default:
            return state;
    }
};

const toggleTodo = (todos, toggledTodo) => {
    return todos.map((todo) => {
        return todo.style === toggledTodo.style ?
            {...todo, checked: !todo.checked} :
            todo
    });
};

export const toggleTodoCreator = (todo) => ({
    type: "TOGGLE",
    payload: todo
});

export const todosSelector = ({todos}) => todos;