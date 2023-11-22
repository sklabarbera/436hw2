import { useReducer, useEffect, useState } from "react";

import './App.css';

import Userbar from './Userbar';
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

import appReducer from "./reducers";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

function App() {

    const [ state, dispatch ] = useReducer(appReducer, {
      user: "",
      todos: [],
    });

    const { user, todos } = state;

    const [ todoResponse, getTodos ] = useResource(() => ({
      url: "/post",
      method: "get",
      headers: { Authorization: `${state?.user?.access_token}` },
    }));

    useEffect(() => {
          getTodos();
      }, [state?.user?.access_token]);

      useEffect(() => {
        if (todoResponse && todoResponse.isLoading === false && todoResponse.data) {
          dispatch({ type: "FETCH_TODOS", todos: todoResponse.data.reverse() });
        }
      }, [todoResponse]);
      
      console.log(todos);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <h1>Todo List</h1>
        <Userbar />
        { user && <CreateTodo /> }
        <TodoList todo={todos} />
      </StateContext.Provider>
    </div>
  );
}

export default App;
