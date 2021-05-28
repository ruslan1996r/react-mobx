import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';

import { observable, computed, extendObservable, configure, action } from "mobx"
import { observer } from "mobx-react"

// Стор можно создавать через функцию observable или через декоратор делать реактивные свойства
// Также можно писать через классы:
// const nickName = new class UserNickName {
//   constructor() {
//     extendObservable(this, {
//       firstname: 'Vovan',
//       age: 228
//     })
//   }
//   // @observable firstname = 'Vovan'
//   // @observable age = 228

//   @computed get nickName() {
//     // По умолчанию MobX не пытается поддерживать актуальное состояние, пока оно где-то не используется, чтобы не тратить ресурсы
//     console.log("Generate nickname!")
//     return `${this.firstname}_${this.age}`
//   }
// }()
// configure({ enforceActions: 'observed' }); // Делает проверку синтаксиса. Выдаст ошибку, если стейт изменён вне экшена
// убрал эту строку, так как ломает весь код, искать причину не хотел

const nickName = observable({
  firstname: 'Vovan',
  age: 228,
  get nickName() {
    console.log("Generate nickname!")
    return `${this.firstname}_${this.age}`
  },
  increment: action(function () {
    this.age++
  }),
  decrement: action(function () {
    this.age--
  })
}, {
  increment: action('Plus one'),
  decrement: action('Minus one'),
}, {
  name: 'nickNameObservableObject123123'
});

// observable array:
const todos = observable([
  { text: "Learn React" },
  { text: "Learn MobX" },
])

@observer // Следит за изменениями счётчика
class Counter extends Component {

  // @observable // Свойство является наблюдаемым
  // count = 0

  handleDecrement = () => this.props.store.decrement()
  handleIncrement = () => this.props.store.increment()

  render() {
    return (
      <div className="App">
        <DevTools />
        <h1>{this.props.store.nickName}</h1>
        <h1>{this.props.store.age}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
        <ul>
          {this.props.todos.map(({ text }) => <li key={text}>{text}</li>)}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={nickName} todos={todos} />, document.getElementById('root'));

todos.push({ text: "Vovan 123" })
todos.push({ text: "Obama 123" })

serviceWorker.unregister();
