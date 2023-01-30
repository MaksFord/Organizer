window.onload=function(){
        document.getElementById("task-list").innerHTML=localStorage.getItem("MyList")
        delButtons=document.querySelectorAll(".delButton");
        delButtons.forEach((delButton)=>{
                delButton.addEventListener("click",(e)=>delParent(e))
        })
        const cD = new Date();
        const year = cD.getFullYear();
        const month = (cD.getMonth() + 1).toString().padStart(2, '0');
        const day = cD.getDate().toString().padStart(2, '0');
        
        const currentDate = `${year}-${month}-${day}`;
        const taskListD=document.getElementById("task-listD");

        var onDateTasks=JSON.parse(localStorage.getItem("onDateTasks")) || [];
        onDateTasks.forEach(taskObject => {
        let onDateTask = taskObject.onDateTask;
        let dateOfTask = taskObject.dateOfTask;
        if (currentDate===dateOfTask){
                
        const li= document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className="checkbox";
        li.appendChild(checkbox);
        
        const label = document.createElement("label");
        label.textContent = onDateTask;
        li.appendChild(label);

        const delButton= document.createElement("button");   //button deleting whole element on click
        delButton.className="delButton";
        delButton.textContent="X";
        delButton.addEventListener("click", (e)=>delParent(e))
        li.appendChild(delButton);
        taskListD.appendChild(li);

        }
        else {alert (onDateTask+ " is planned for "+ dateOfTask+"so not yet")}
              });
        
}

//1st form and first list. Tasks are not saved in local storage but have a timer
const form0=document.getElementById("oneSittingTaskForm");
const taskInput0=document.getElementById("task-input0");
const taskList0=document.getElementById("task-list0");
const timeInput0=document.getElementById("time-input0");

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

        const delButton= document.createElement("button");   //button deleting whole element on click
        delButton.className="delButton";
        delButton.textContent="X";
        delButton.addEventListener("click", (e)=>delParent(e))
        li.appendChild(delButton);

//setting timers on tasks of first category
        const timer=timeInput0.value;
        const time=document.createElement("p");
        time.className="taskTimer"
        li.appendChild(time);



        let timeElapsed=0;
        const intervalId=setInterval(function() {
        if (checkbox.checked===false){
        timeElapsed++;

        if (timer*60-timeElapsed>=0){
        time.innerHTML=`Time to do: ${timer*60-timeElapsed} seconds`}
        else{ li.className="timeIsUp";
        time.innerHTML="Time's Up"}}
        else{
        time.innerHTML=`Done in ${timeElapsed} seconds`
        }

        }, 1000)

        taskList0.appendChild(li);

        taskInput0.value="";
        timeInput0.value="";
});

//2nd form, persistent tasks, saved in local storage, not lost on refresh
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

//3rd form, tasks on date
const formD=document.getElementById("onDateTaskForm");
const taskInputD=document.getElementById("task-inputD");
const taskListD=document.getElementById("task-listD");
const dateInput=document.getElementById("date-input");

const cD = new Date();
const year = cD.getFullYear();
const month = (cD.getMonth() + 1).toString().padStart(2, '0');
const day = cD.getDate().toString().padStart(2, '0');

const currentDate = `${year}-${month}-${day}`;



formD.addEventListener("submit", 
(e)=>{
e.preventDefault()
const task=taskInputD.value;
alert (task)
const taskDate=dateInput.value;
alert (taskDate)
if (taskDate>=currentDate){
        var onDateTasks=JSON.parse(localStorage.getItem("onDateTasks")) || [];      
        onDateTasks.push({
                onDateTask:task,
                dateOfTask:taskDate
                });
        // Save the updated onDateTasks array to local storage
        localStorage.setItem("onDateTasks", JSON.stringify(onDateTasks));        
if (currentDate===taskDate) {
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

        taskListD.appendChild(li);

        taskInputD.value="";
        dateInput.value="";
}
}
else {alert ("Enter correct date")}
});



