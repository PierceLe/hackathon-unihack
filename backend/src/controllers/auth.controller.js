const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, taskService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const data = [
    {
      name: 'Get student information',
      description: 'Retrieve all students information in the database',
      type: 'Back-end',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'Search student by their ID',
      description: "Get student's information by their specific ID",
      type: 'Back-end',
      dependencies: [],
      tsp: 0,
      spLeft: 0,
      status: 'todo',
      spPredicted: 0,
      assignee: null,
      modelId: null,
      path: '',
    },
    {
      name: 'Add student information',
      description: 'Add a new student to the database',
      type: 'Back-end',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'Make edit form',
      description: "Render form for user to edit a specific student's information",
      type: 'Back-end',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'Updating student information',
      description: 'Make change to a specific student',
      type: 'Back-end',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'Delete student information',
      description: 'Delete a specific student of database',
      type: 'Back-end',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'Search student name',
      description: "Get student's information by their specific name",
      type: 'Back-end',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'Clear student information',
      description: 'Delete all students in the database',
      type: 'Back-end',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'UX/UI',
      description: 'Design and implement visualization to the web',
      type: 'Front-end',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'Define model',
      description: 'Define model structure of student for the application',
      type: 'Specialist',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
    {
      name: 'Documentation',
      description: 'Write docstring and readme for the program',
      type: 'Pitcher',
      dependencies: [],
      tsp: 0,
      path: '',
      spPredicted: 0,
      spLeft: 0,
      status: 'todo',
      assignee: null,
      modelId: null,
    },
  ];
  await taskService.initManyTasks(data, user._id);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
