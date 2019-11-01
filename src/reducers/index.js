import { combineReducers } from 'redux';

import { gameReducer } from './game';
import { authReducer } from './auth';

const rootReducer = combineReducers({ gameReducer, authReducer });

export { gameReducer, authReducer, rootReducer };
