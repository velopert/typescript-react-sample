import { combineReducers } from 'redux';
import counter, { CounterState } from './counter';
import todos, { TodosState } from './todos';

export default combineReducers({
  counter,
  todos,
});

// 스토어의 상태 타입 정의
export interface StoreState {
  counter: CounterState;
  todos: TodosState;
}