"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistor = exports.store = void 0;

var _redux = require("redux");

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _rootReducer = require("./root-reducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import logger from 'redux-logger';
var loggerMiddleware = function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      if (!action.type) {
        return next(action);
      }

      console.log('type: ', action.type);
      console.log('payload: ', action.payload);
      console.log('currentState: ', store.getState());
      next(action);
      console.log('next state: ', store.getState());
    };
  };
};

var persistConfig = {
  key: 'root',
  storage: _storage["default"],
  blacklist: ['user']
};
var persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, _rootReducer.rootReducer);
var middleWares = [loggerMiddleware];
var composedEnhancers = (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, middleWares));
var store = (0, _redux.createStore)(persistedReducer, undefined, composedEnhancers);
exports.store = store;
var persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;