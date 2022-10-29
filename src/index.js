const express = require('express');
const cors = require('cors');

const { v4: uuidv4, validate } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

/* 
  User for testing purposes.
users.push({
  id: uuidv4(),
  name: "Gleidson",
  username: "gleidsonlm",
  pro: false,
  todos: []
},{
  id: uuidv4(),
  name: "Gleidson",
  username: "gmedeiros",
  pro: true,
  todos: []
});
*/

function checksExistsUserAccount(request, response, next) {
  // find user by username in header and pass it to request.user
  const { username } = request.headers;
  const user = users.find(user => user.username === username);
  if (user){
    request.user = user;
    return next();
  } else {
  // find a non existing user by username in header
    return response.status(404).json({ error: 'User not found' });
  }
}

function checksCreateTodosUserAvailability(request, response, next) {
  // Let user create a new todo when is in free plan and have less than ten todos
  if (!request.user.pro) {
    if (request.user.todos.length < 10) {
      return next();
      // Don't let user create a new todo when is not Pro and already have ten todos
      } else {
        return response.status(403).json({ error: "You have "+ request.user.todos.length + "todo's created. /n You could delete other completed or go Pro and support us." })
      }
  } else if (request.user.pro) {
  // Let user create infinite new todos when is in Pro plan
  return next();
  } else {
    return response.status(500).json({ error: "We're unable to check your subscripion, please contact our client service team." })
  }
}

function checksTodoExists(request, response, next) {
  // put user and todo in request when both exits
  const { username } = request.headers;
  const { todoId } = request.params;
  const user = users.find(e => e.username === username);
  const todo = user.todos.find(e = e.id === todoId);
  
  
  /* todo: Probably better done with switch, refactor later. */
  // don't put user and todo in request when user does not exists  
  if (!user){
    return response.status(404).json({ error: 'User not found' });

  // don't put user and todo in request when todo id is not uuid
  // uuid.validate(str) - https://www.npmjs.com/package/uuid
  } else if (!validate(todoId)){
    return response.status(400).json({ error: 'Todo ID is not UUID' });
  
  // don't put user and todo in request when todo does not exists
  } else if (!todo){
    return response.status(404).json({ error: "Todo not found" });
  
  } else {
  // put user and todo in request when both exits
  user = request.user
  todo = request.todo
  return next();
  }

}


function findUserById(request, response, next) {
  // Find user by id route param -
  const { id } = request.params;
  const user = users.find(e => e.id === id);
  
  if (!user) {
    // Dont' pass user to request.user when it does not exists
    return response.status(404).json({ error: 'User not found' });
  } else {
    // - and pass it to request.user
    request.user = user;
    return next();
  }
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const usernameAlreadyExists = users.some((user) => user.username === username);

  if (usernameAlreadyExists) {
    return response.status(400).json({ error: 'Username already exists' });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    pro: false,
    todos: []
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get('/users/:id', findUserById, (request, response) => {
  const { user } = request;

  return response.json(user);
});

app.patch('/users/:id/pro', findUserById, (request, response) => {
  const { user } = request;

  if (user.pro) {
    return response.status(400).json({ error: 'Pro plan is already activated.' });
  }

  user.pro = true;

  return response.json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, checksCreateTodosUserAvailability, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const newTodo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline),
    done: false,
    created_at: new Date()
  };

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);
});

app.put('/todos/:id', checksTodoExists, (request, response) => {
  const { title, deadline } = request.body;
  const { todo } = request;

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);
});

app.patch('/todos/:id/done', checksTodoExists, (request, response) => {
  const { todo } = request;

  todo.done = true;

  return response.json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, checksTodoExists, (request, response) => {
  const { user, todo } = request;

  const todoIndex = user.todos.indexOf(todo);

  if (todoIndex === -1) {
    return response.status(404).json({ error: 'Todo not found' });
  }

  user.todos.splice(todoIndex, 1);

  return response.status(204).send();
});

module.exports = {
  app,
  users,
  checksExistsUserAccount,
  checksCreateTodosUserAvailability,
  checksTodoExists,
  findUserById
};