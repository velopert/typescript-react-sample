import * as React from 'react';
import TodoItem from './TodoItem';

interface Props {

}

interface TodoItemData {
  id: number;
  text: string;
  done: boolean;
}

interface State {
  todoItems: TodoItemData[]; // TodoItemData 로 이뤄진 배열
  input: string;
}

class TodoList extends React.Component<Props, State> {

  id: number = 0;

  state: State = {
    todoItems: [],
    input: '',
  };

  onToggle = (id: number): void => {
    const { todoItems } = this.state;
    const index = todoItems.findIndex(todo => todo.id === id); // id 로 인덱스 찾기
    const selectedItem = todoItems[index]; //  아이템 선택
    const nextItems = [ ...todoItems ]; // 배열 내용을 복사
    
    const nextItem = {
      ...selectedItem,
      done: !selectedItem.done,
    };

    nextItems[index] = nextItem; // 교체 처리

    this.setState({
      todoItems: nextItems
    });
  }

  onRemove = (id: number): void => {
    this.setState(
      ({ todoItems }) => ({
        todoItems: todoItems.filter(todo => todo.id !== id)
      })
    );
  }

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      input: value
    });
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // 페이지 전환 막기
    // input 비우고, todoItems 추가
    this.setState(
      ({ todoItems, input }) => ({
        input: '',
        todoItems: todoItems.concat({
          id: this.id++,
          text: input,
          done: false
        })
      })
    );
  }

  render() {
    const { onSubmit, onChange, onToggle, onRemove } = this;
    const { input, todoItems } = this.state;

    const todoItemList = todoItems.map(
      todo => (
        <TodoItem
          key={todo.id}
          done={todo.done}
          onToggle={() => onToggle(todo.id)}
          onRemove={() => onRemove(todo.id)}
          text={todo.text}
        />
      )
    );
    
    return (
      <div>
        <h1>오늘 뭐하지?</h1>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={input} />
          <button type="submit">추가하기</button>
        </form>
        <ul>
          {todoItemList}
        </ul>
      </div>
    );
  }
}

export default TodoList;