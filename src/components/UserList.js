import {useResources} from "./useResources";
import React from 'react';

export const UserList = () => {
    const users = useResources('users');

    return (
        <ul>
            {users.map(user => <li key={user.id}>
                {user.name}
            </li>)}
        </ul>
    )
};