const content = document.querySelector('.content');
const taskinput = document.querySelector('#taskInput');
const addButton = document.querySelector('.icon');
const tasklist = document.querySelector('#taskList');

function addTask(){
    if (taskinput.value.trim() === '') {
        alert('Please enter a task');
    }
    else{
        let li= document.createElement('li');
        li.innerHTML= taskinput.value;
        tasklist.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    taskinput.value = '';
    savedata()
}

tasklist.addEventListener("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        savedata()
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata()
    }
}, false);

function savedata(){
    localStorage.setItem("data", tasklist.innerHTML);
}
function getdata(){
    tasklist.innerHTML=localStorage.getItem("data");
}
getdata();

const clearAllBtn = document.getElementById("clearAllBtn");

clearAllBtn.addEventListener("click", function () {
    if (tasklist.innerHTML===""){
        alert('Please enter a task first');
    }
    else if (confirm("Are you sure you want to delete all tasks?")) {
        tasklist.innerHTML = "";
        savedata();
    }
});

tasklist.addEventListener("dblclick", function (e){
    if(e.target.tagName === "LI" && !e.target.classList.contains("clearAllBtn")){
        const oldText = e.target.childNodes[0].nodeValue.trim();
        const newText = prompt("Edit Old Task", oldText);
        if(newText !==""  && newText !== null){
            e.target.childNodes[0].nodeValue= newText + " ";
            savedata(); 
        }
    }

})
