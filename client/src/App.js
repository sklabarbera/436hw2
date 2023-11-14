import { useReducer, useEffect, useState } from "react";

import './App.css';

import Userbar from './Userbar';
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

import appReducer from "./reducers";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

function App() {

  /* const initialTodo = [
    {
      title: "Test1",
      description: "fdskalf fdsaie ewa[jifoxjvk fdsjaoewa",
      author: "me"
    }, 
    {
      title: "Test2",
      description: "fdska fdsahjfk dfjsaklf e4uia;fkndsoa",
      author: "me"
    },
    {
      title: "Test3",
      description: "ieuwaiocneiowah cjewioa[nc eiewafji[vbneuoa[hf3eiwafds ds fdaiew fdiaofjwei fdjsioaf",
      author: "me"
    }
  ] */

     const [ todoResponse, getTodos ] = useResource(() => ({
      url: "/todos",
      method: "get",
    }));

    useEffect(getTodos, []);

    useEffect(() => {
      if (todoResponse && todoResponse.data) {
        dispatch({ type: "FETCH_TODOS", todos: todoResponse.data.reverse() });
      }
    }, [todoResponse]); 

    const [ state, dispatch ] = useReducer(appReducer, {
      user: "",
      todos: [],
    });

    const { user, todos } = state;
      

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
