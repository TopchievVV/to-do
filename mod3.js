// klickFunction = () => {
//   alert(`bom`);
// }

// window.onload = function init () {
// const x = document.getElementById(`vvod`);
// x.addEventListener(`change` ,tFunction);
// }

// tFunction = (event) => {
//   console.log(`glya`, event.target.value)
// }


let allTask = JSON.parse(localStorage.getItem(`task`)) || [];
let valueInput = ``;
let input = null;
let activeEditTask = null;

window.onload = functionInit = () => {
  input = document.getElementById(`vvod`);
  input.addEventListener(`change`, updateValue);
  render();
  
}

onClickButton = () => {
  allTask.push({
    text: valueInput,
    isChek: false
  });
  localStorage.setItem(`task`, JSON.stringify(allTask));
  valueInput = ``;
  input.value = ``;
  render();
}

updateValue = (event) => {
  valueInput = event.target.value;
}

render = () => {
  const content = document.getElementById(`content-page`);
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allTask.map((item, index) => {
    const container = document.createElement(`div`);
    container.id = `task-${index}`;
    container.className = `task-container`;
    const checkbox = document.createElement(`input`);
    checkbox.type = `checkbox`;
    checkbox.checked = item.isCheck;
    checkbox.onchange = CheckboxPozition = () => {
      onChangeCheckbox(index);
    };
    container.appendChild(checkbox);

    if (index === activeEditTask) { // если редактируем сейчас эту таску
      const inputTask = document.createElement(`input`);
      inputTask.type = `text`;
      inputTask.value = item.text;
      inputTask.addEventListener(`change`, updateTaskText);
      inputTask.addEventListener(`blur`, doneEditTask);
      container.appendChild(inputTask);
      const imageDone = document.createElement(`img`);
      imageDone.src = `pikcha3.png`;
      imageDone.className = `pikcha`;
      imageDone.onclick = TaskСondition = () => {
        doneEditTask();
      };
      container.appendChild(imageDone);
    } else { // если не редактируем сейчас эту таску
      const text = document.createElement(`p`);
      text.innerText = item.text;
      text.className = item.isCheck ? `text-task done-text` : `text-task`;
      container.appendChild(text);
      const imageEdit = document.createElement(`img`)
      imageEdit.src = `pikcha1.png`;
      imageEdit.className = `pikcha`;
      imageEdit.onclick = TaskEdit = () => {
        startEditTask(index);
      };
      container.appendChild(imageEdit);
    }
    const imageDelete = document.createElement(`img`);
    imageDelete.src = `pikcha2.png`;
    imageDelete.className = `pikcha`;
    imageDelete.onclick = TaskDelete = () => {
      onDeleteTask(index);
    }
    container.appendChild(imageDelete);

    content.appendChild(container);
  });
}

onChangeCheckbox = (index) => {
  allTask[index].isCheck = !allTask[index].isCheck;
  localStorage.setItem(`task`, JSON.stringify(allTask));
  render();
}

onDeleteTask = (index) => {
  allTask.splice(index, 1);
  localStorage.setItem(`task`, JSON.stringify(allTask));
  render();
}

updateTaskText = (event) => {
  allTask[activeEditTask].text = event.target.value;
  localStorage.setItem(`task`, JSON.stringify(allTask));
  render();
}

startEditTask = (index) => {
  activeEditTask = index;
  render();
}

doneEditTask = () => {
  activeEditTask = null;
  render();
}

clearStorage = () => {
  localStorage.clear();
  
  render();
}