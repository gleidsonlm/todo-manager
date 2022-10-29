## About ##

My submission for "Challenge #2 - Middlewares", from the @RocketSeatEducation Ignite Node.js learning path.

## Success Criteria ##

Unit tests:

  - [ X ] Should be able to list all user's todo;
  - [ X ] Should be able to create a new todo;
  - [ X ] Should be able to create a new user;
  - [ X ] Should be able to delete a todo;
  - [ X ] Should be able to find user by id route param and pass it to request.user;
  - [ X ] Should be able to find user by username in header and pass it to request.user;
  - [ X ] Should be able to let user create a new todo when is in free plan and have less than ten todos;
  - [ X ] Should be able to let user create infinite new todos when is in Pro plan;
  - [ X ] Should be able to mark a todo as done;
  - [ X ] Should be able to put user and todo in request when both exits;
  - [ X ] Should be able to show user data;
  - [ X ] Should be able to update a todo;
  - [ X ] Should not be able to create a new user when username already exists;
  - [ X ] Should not be able to delete a non existing todo;
  - [ X ] Should not be able to find a non existing user by username in header;
  - [ X ] Should not be able to let user create a new todo when is not Pro and already have ten todos;
  - [ X ] Should not be able to mark a non existing todo as done;
  - [ X ] Should not be able to pass user to request.user when it does not exists;
  - [ X ] Should not be able to put user and todo in request when todo does not exists;
  - [ X ] Should not be able to put user and todo in request when todo id is not uuid;
  - [ X ] Should not be able to put user and todo in request when user does not exists;
  - [ X ] Should not be able to update a non existing todo.

  ## Test Results ##

      > desafio@1.0.0 test
      > jest

      PASS  src/__tests__/middlewares/checksTodoExists.spec.js (5.623 s)
      PASS  src/__tests__/users.spec.js (6.162 s)
      PASS  src/__tests__/todos.spec.js (6.78 s)
      PASS  src/__tests__/middlewares/findUserById.spec.js
      PASS  src/__tests__/middlewares/checksCreateTodosUserAvailability.spec.js
      PASS  src/__tests__/middlewares/checksExistsUserAccount.spec.js

      Test Suites: 6 passed, 6 total
      Tests:       22 passed, 22 total
      Snapshots:   0 total
      Time:        9.826 s
      Ran all test suites.