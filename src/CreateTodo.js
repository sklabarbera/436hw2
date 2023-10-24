import { useState } from "react";
import TodoList from "./TodoList";

export default function CreateTodo ( { user, todo, handleAddTodo }) {
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")

    function handleTitle (evt) { 
        setTitle(evt.target.value);
    }
    function handleDescription (evt) { 
        setDescription(evt.target.value) ;
    }
    function handleCreate () {
        handleAddTodo({ title, description, author: user });
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
        <TodoList todo={todo} /></>
    )
}