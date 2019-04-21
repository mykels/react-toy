import {useEffect, useState} from 'react';
import axios from "axios";

export const useResources = (resource) => {
    const [resources, setResources] = useState([]);

    const resourceEffect = () => {
        (async resource => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);

            setResources(response.data);
        })(resource);

    };

    useEffect(resourceEffect, [resource]);

    return resources;
};