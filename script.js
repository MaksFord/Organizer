window.onload=function(){
        document.getElementById("task-list").innerHTML=localStorage.getItem("MyList")
        delButtons=document.querySelectorAll(".delButton");
        delButtons.forEach((delButton)=>{
                delButton.addEventListener("click",(e)=>delParent(e))
        })
}

const form0=document.getElementById("oneSittingTaskForm");
const taskInput0=document.getElementById("task-input0");
const taskList0=document.getElementById("task-list0");
const timeInput0=document.getElementById("time-input0")

form0.addEventListener("submit", 
(e)=>{
        e.preventDefault()
        const task=taskInput0.value;
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

//setting timers on task of first category
        const timer=timeInput0.value;
        const time=document.createElement("p");
        time.className="taskTimer"
        li.appendChild(time);

        let timeElapsed=0;
        const intervalId=setInterval(function() {
                timeElapsed++;
        if (timer*60-timeElapsed>=0){
        time.innerHTML=`Time to do: ${timer*60-timeElapsed} seconds`}
        else{ li.className="timeIsUp";
        timeElapsed.innerHTML="Time's Up"}

        }, 1000)

        taskList0.appendChild(li);

        taskInput0.value="";
        timeInput0.value="";
});


const form=document.getElementById("everydayTaskForm");
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







