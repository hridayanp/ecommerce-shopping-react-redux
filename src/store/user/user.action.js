import { USER_ACTION_TYPES } from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = (user) => (
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION, user)
)

export const googleSigninStart = () => (
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
)

export const emailSigninStart = (email, password) => (
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
)

export const signinSuccess = (user) => (
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
)

export const signinFailed = (error) => (
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
)