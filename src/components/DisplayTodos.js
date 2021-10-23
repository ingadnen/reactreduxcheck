import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  doneTodos,
  deleteTodos,
  editTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    deleteTodo: (id) => dispatch(deleteTodos(id)),
    editTodo: (obj) => dispatch(editTodos(obj)),
    doneTodo: (id) => dispatch(doneTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("in progress");
  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("in progress")}
        >
          In progress
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("done")}
        >
          Done
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>

      <ul className="list-group">
        <li className="list-group-item">
        <AnimatePresence>
          {props.todos.length > 0 && sort === "in progress"
            ? props.todos.map((item) => {
                return (
                  item.done === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      deleteTodo={props.deleteTodo}
                      editTodo={props.editTodo}
                      doneTodo={props.doneTodo}
                    />
                  )
                );
              })
            : null}

          {props.todos.length > 0 && sort === "done"
            ? props.todos.map((item) => {
                return (
                  item.done === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      deleteTodo={props.deleteTodo}
                      editTodo={props.editTodo}
                      doneTodo={props.doneTodo}
                    />
                  )
                );
              })
            : null}

          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    deleteTodo={props.deleteTodo}
                    editTodo={props.editTodo}
                    doneTodo={props.doneTodo}
                  />
                );
              })
            : null}
        </AnimatePresence>
        </li>
      </ul>

    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
