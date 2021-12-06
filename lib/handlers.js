// ----------------------------------------------------------- //
// import
const db = require("./database/db");

module.exports = {
  // handlers related to TodoList
  getAllTodoList: async (req, res) => {
    const todoLists = await db.getAllTodoList();
    res.status(200).json(todoLists);
  },
  getTodoListById: async (req, res) => {
    const todoList = await db.getTodoListById(req.params.id);
    res.status(200).json(todoList);
  },
  deleteTodoListById: async (req, res) => {
    const deletedTodoList = await db.deleteTodoListById(req.params.id);
    res.status(200).json(deletedTodoList);
  },
  createTodoList: async (req, res) => {
    const todoList = await db.createTodoList(req.body.title);
    res.status(200).json(todoList);
  },
  updateTodoListById: async (req, res) => {
    const updatedTodoList = await db.updateTodoListById(
      req.params.id,
      req.body.title,
      req.body.todo
    );
    res.status(200).json(updatedTodoList);
  },

  // handlers related to Todo
  createTodo: async (req, res) => {
    const todo = await db.createTodo(
      req.body.title,
      req.body.due,
      req.body.completed
    );

    // we need to add the todo to the associated todoList
    const updateTodoList = await db.addTodoToTodoList(
      req.params.todoListId,
      todo._id
    );
    // We return the updated todos list
    res.status(200).json(updateTodoList);
  },
  deleteTodoById: async (req, res) => {
    const deletedTodo = await db.deleteTodoById(req.params.todoId);

    // we need to delete the todo from the associated todoList
    const updateTodoList = await db.deleteTodoFromTodoList(
      req.params.todoListId,
      deletedTodo
    );

    // We return the updated todos list
    await res.status(200).json(updateTodoList);
  },
  updateTodoById: async (req, res) => {
    // in this case we don't need to update the associated TodoList
    // as TodoList contains only the id of the Todo's
    const updatedTodo = await db.updateTodoById(req.params.id, req.body);
    res.status(200).json(updatedTodo);
  },
};
