import { useState } from "react";

export default function CreateTodo ( { user, todo, setTodo }) {
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")

    function handleTitle (evt) { 
        setTitle(evt.target.value);
    }
    function handleDescription (evt) { 
        setDescription(evt.target.value) ;
    }
    function handleCreate () {
        const newTodo = { title, description, author: user };
        setTodo([ newTodo, ...todo ]);
    }
    
    return (
        <form onSubmit={e => { e.preventDefault(); handleCreate(); }}>
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
            <textarea value={description} onChange={handleDescription} />
            <input type="submit" value="Create" />
        </form>
    )
}