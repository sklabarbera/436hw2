import { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";

export default function CreateTodo () {
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")

    const { state, dispatch } = useContext(StateContext);
    const { user } = state;

     const [todo, createTodo] = useResource(({ title, description }) => ({
        url: "/post",
        method: "post",
        headers: {"Authorization": `${state.user.access_token}`},
        data: { title, description, completed: false, dateCompleted: "", author: user.username }
      })); 

    function handleTitle (evt) { 
        setTitle(evt.target.value);
    }
    function handleDescription (evt) { 
        setDescription(evt.target.value);
    }
    function handleCreate () {
        const newTodo = { title, description, completed: false, dateCompleted: " ", author: user.username };
        createTodo({title, description});
        //dispatch({ type: "CREATE_TODO", ...newTodo });
    }

    useEffect(() => {
        if (todo.isLoading === false && todo.data) {
            dispatch({
                type: "CREATE_TODO",
                title: todo.data.title,
                description: todo.data.description,
                author: user.username,
                completed: todo.data.completed,
                dateCompleted: todo.data.dateCompleted,
                id: todo.data.id,  
            });
        }
    }, [todo]);
    
    return (
        <><form onSubmit={e => { e.preventDefault(); handleCreate(); } }>
            <div>Author: <b>{user.username}</b></div>
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