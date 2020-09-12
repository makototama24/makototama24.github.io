const btn = document.getElementById("addBtn")
const lists = document.getElementById("lists")
const todo = document.getElementById("todo")

btn.addEventListener("click", function(){
    const todo_value = todo.value
    if(todo_value !== ""){
        const list = document.createElement("li")
        list.innerText = todo_value
        lists.appendChild(list)
    }
    else inputAlert()
})

function inputAlert(){
    console.log("入力エラー")
}