import { useState, useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";
import { v4 as uuidv4 } from 'uuid';

export default function CreateTodo () {
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")

    const { state, dispatch } = useContext(StateContext);
    const { user } = state;

    const newID = uuidv4();

     const [todo, createTodo] = useResource(({ title, description, author }) => ({
        url: "/todos",
        method: "post",
        data: { title, description, author, completed: false, dateCompleted: "", id: newID },
      }));

    function handleTitle (evt) { 
        setTitle(evt.target.value);
    }
    function handleDescription (evt) { 
        setDescription(evt.target.value);
    }
    function handleCreate () {
        const newTodo = { title, description, author: user, completed: false, dateCompleted: "", id: newID };
        createTodo(newTodo);
        dispatch({ type: "CREATE_TODO", ...newTodo });
    }
    
    return (
        <><form onSubmit={e => { e.preventDefault(); handleCreate(); } }>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title: </label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    name="create-title"
                    id="create-title" />
            </div>
            <label htmlFor="create-title">Description: </label>
            <input
                type="text"
                value={description}
                onChange={handleDescription}
                name="create-description"
                id="create-description" />
            <input type="submit" value="Create" onSubmit={handleCreate} />
            </form>
        </>
    )
} 