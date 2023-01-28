window.onload=function(){
        document.getElementById("task-list").innerHTML=localStorage.getItem("MyList")
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
        delButton.addEventListener("click", function(){
                let parent=delButton.parentNode;
                parent.parentNode.removeChild(parent);
        })
        li.appendChild(delButton);

        taskList.appendChild(li);

        taskInput.value="";

        localStorage.setItem("MyList",
        document.getElementById("task-list").innerHTML);
});




function delLi (){

}







