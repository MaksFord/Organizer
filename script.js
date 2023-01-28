window.onload=function(){
        document.getElementById("task-list").innerHTML=localStorage.getItem("MyList")
        delButtons=document.querySelectorAll(".delButton");
        delButtons.forEach((delButton)=>{
                delButton.addEventListener("click",(e)=>delParent(e))
        })
}

const form=document.getElementById("newTaskForm");
const taskInput=document.getElementById("task-input");
const taskList=document.getElementById("task-list");

form.addEventListener("submit", 
(e)=>{
        e.preventDefault()
        const task=taskInput.value;
        const li= document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className="checkbox";
        li.appendChild(checkbox);
        
        const label = document.createElement("label");
        label.textContent = task;
        li.appendChild(label);

        const delButton= document.createElement("button");
        delButton.className="delButton";
        delButton.textContent="X";
        delButton.addEventListener("click", (e)=>delParent(e))
        li.appendChild(delButton);

        taskList.appendChild(li);

        taskInput.value="";

        localStorage.setItem("MyList",
        document.getElementById("task-list").innerHTML);
});




function delParent (event){
        let clicked=event.target;
        let parent=clicked.parentNode;
        parent.parentNode.removeChild(parent);

        localStorage.setItem("MyList",
        document.getElementById("task-list").innerHTML);
}







