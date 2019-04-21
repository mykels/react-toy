import React from 'react';
import {useResources} from "./useResources";

export const ResourceList = ({resource}) => {
    const resources = useResources(resource);

    return (
        <ul>
            {resources.map(record => (
                <li key={record.id}>{record.title}</li>
            ))}
        </ul>
    );
};