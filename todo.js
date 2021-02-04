const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    // filter는 toDo array를 전부 돌면서 true로 판단된것만 다시 array로 반환
    // toDo.id와 li.id를 비교해서 삭제된 항목을 골라냄 (li.id는 string이므로 정수로 바꿔줘야함)
    return toDo.id !== parseInt(li.id);
  });
  // 삭제된 것을 걸러낸 cleanToDos로 바꿔줌
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  // localStorage는 무조건 string으로 저장하기 때문에 Json.stringify 해야함
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

let idNumbers =1;

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  delBtn.innerText="✖";
  delBtn.style.border="2px solid white";
  delBtn.style.margin="3px";
  
  delBtn.addEventListener("click", deleteToDo);
  span.innerText =`  ${text}`;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = { text: text, id: newId };
  toDos.push(toDoObj);
  idNumbers+=1;
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
    // String으로 저장된 것을 다시 되돌리기
    const parsedToDos = JSON.parse(loadedToDos);
    // 각각 paintToDo 함수로 restore
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
