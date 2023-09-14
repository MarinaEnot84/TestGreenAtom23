function changeColor1(){
    const evens = document.querySelectorAll('ul > li:nth-child(even)');
    for(let even of evens){        even.style.backgroundColor ="Turquoise";
    }
  };
  function changeColor2(){
    const odds = document.querySelectorAll('ul > li:nth-child(odd)');
    for(let odd of odds) {
      odd.style.backgroundColor = "Plum";
    }
  };

function deleteLast() {
  const last = document.querySelector('ul > li:last-child');
  last.remove();
};

function deleteFirst() {
  const first = document.querySelector('li:first-child');
  first.remove();
};

const todoList = {
  action(event) {
  const target = event.target;
  if (target.classList.contains('todo__action')) {
    const action = target.dataset.todoAction;
    const elemItem = target.closest('.todo__item');
    if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
      elemItem.remove();
    } else {
      elemItem.dataset.todoState = action;
    }
    this.save();
  } else if (target.classList.contains('todo__add')) {
    this.add();
    this.save();
  }
},
  add() {
    const elemText = document.querySelector('.todo__text');
    if(elemText.disabled || !elemText.value.length) {
      return;
    }
    document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemText.value));
    elemText.value='';
  },
  create(text) {
    return `<li class="todo__item" data-todo-state="active">
    <span class="todo__task">${text}</span>
    <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
    <span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
    </li>`;
  },
  initial() {
    const saved = localStorage.getItem('todo');
    if(saved) {
      document.querySelector ('.todo__items').innerHTML = saved;
    }
    document.querySelector('.todo__case') .addEventListener('change', this.update);
    document.addEventListener('click', this.action.bind(this));
  },
  update() {
    const option = document.querySelector('.todo__case').value;   document.querySelector('.todo__items').dataset.todoOption = option;
document.querySelector('.todo__text').disabled = option !== 'active';
  },
  save() {
    localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
  }
  };
todoList.initial();
