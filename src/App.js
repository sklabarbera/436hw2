import { useState, useReducer } from "react";
import './App.css';
import UserBar from './Userbar';
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

function App() {
    //const [ user, setUser ] = useState("");

    function userReducer(state, action) {
        switch (action.type) {
          case "LOGIN":
          case "REGISTER":
            return action.username;
          case "LOGOUT":
            return "";
          default:
        return state;
      }
    }

    function todoReducer(state, action) {
      switch (action.type) {
        case "CREATE_POST":
          const newTodo = {
            title: action.title,
            description: action.description,
            author: action.author,
          };
          return [newTodo, ...state];

        default:
          return state;
      }
    }
      

    const [ user, dispatchUser ] = useReducer(userReducer, "");

    const initialTodo = [
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
    ]

    const [ todo, dispatchTodo ] = useReducer(todoReducer, initialTodo);

    //const [todo, setTodo] = useState(initialTodo);

    const handleAddTodo = (newTodo) => {
      //setTodo([newTodo, ...todo]);
      dispatchTodo({ type: "CREATE_POST", ...newTodo});
    }

  return (
    <div>
      <UserBar user={user} dispatch={dispatchUser} />
      { user && <CreateTodo user={user} todo={todo} handleAddTodo={handleAddTodo} /> }
      <TodoList todo={initialTodo} />
    </div>
  );
}

export default App;
