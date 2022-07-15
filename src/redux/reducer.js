import {combineReducers, createStore} from 'redux';
import {ADD_USER_TYPE, REMOVE_USER, LOADER_ON, LOADER_OFF, ADD_USER, ADD_AD} from './action';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};
const INITIAL_STATE = {
  token: null,
  userType: null,
  loader: false,
  user:[],
  add:[]
};
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_USER_TYPE:
      return {
        ...state,
        token: action.payload.token,
        userType: action.payload.userType,
      };
    case ADD_AD:
      return {...state,add:[...state.add,action.payload]}
    case ADD_USER:
      return {...state,user:[...state.user,action.payload]}
    case REMOVE_USER:
      return {...state, token: null, userType: null};
    case LOADER_ON:
      return {...state, loader: true};
    case LOADER_OFF:
      return {...state, loader: false};
    default:
      return state;
  }
}
const CombineRedcuer = combineReducers({
  user: persistReducer(persistConfig, reducer),
});
export const store = createStore(CombineRedcuer);
export const persistor = persistStore(store);
