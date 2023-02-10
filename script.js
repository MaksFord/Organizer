window.onload=function(){
        document.getElementById("task-list").innerHTML=localStorage.getItem("MyList")
        delButtons=document.querySelectorAll(".delButton");
        delButtons.forEach((delButton)=>{
                delButton.addEventListener("click",(e)=>delParent(e))
        })
        const currentDate = defCurrentDate();
        const taskListD=document.getElementById("task-listD");

        var onDateTasks=JSON.parse(localStorage.getItem("onDateTasks")) || [];  //retrieving task for Date
        for (let i=0; i<onDateTasks.length; i++) {
        let onDateTask = onDateTasks[i].onDateTask;
        alert (onDateTask);
        let dateOfTask = onDateTasks[i].dateOfTask;
        alert (dateOfTask);
        if (currentDate===dateOfTask){  
        addNewTask(onDateTask, taskListD)              
        }
        else if (currentDate<dateOfTask) {alert (onDateTask+ " is planned for "+ dateOfTask+"so not yet")}
        else {alert(onDateTask+ " was planned for "+ dateOfTask+", too late now:(");
        onDateTasks.splice(i,1);
        i--;
        localStorage.setItem("onDateTasks", JSON.stringify(onDateTasks));     
        }
        };
        
}
        

        
var onDateTasks=JSON.parse(localStorage.getItem("onDateTasks")) || [];
        
function addNewTask(taskNameInput, taskList, timeInput){  // function which will add new task with deletion element
        const task=taskNameInput.value||taskNameInput;
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

// set timer for the task if function is called with timeInput parameter
        if (typeof timeInput !== 'undefined'){ 
        const timer=timeInput.value;
        const time=document.createElement("p");
        time.className="taskTimer"
        li.appendChild(time); //timer element added to HTML


        let timeElapsed=0;
        const intervalId=setInterval(function() {
        if (checkbox.checked===false){
        timeElapsed++; //timer is counting only if checkbox is not checked

        if (timer*60-timeElapsed>=0){
        time.innerHTML=`Time to do: ${timer*60-timeElapsed} seconds`}
        else{ li.className="timeIsUp";
        time.innerHTML="Time's Up"}}
        else{
        time.innerHTML=`Done in ${timeElapsed} seconds`
        }  //timer representaion in HTML: how much time left or how fast was task done;

        }, 1000) //1 sec
        }

        taskList.appendChild(li); //appending whole task element 
}

function delParent (event){     
        let clicked=event.target;
        let parent=clicked.parentNode;
//for the date tasks
        let li=clicked.closest("li");
        let labelOfDel=li.querySelector("label").textContent;
        onDateTasks=onDateTasks.filter(function(onDateTasks) {
        return !(onDateTasks.onDateTask===labelOfDel && onDateTasks.dateOfTask===currentDate)});
        localStorage.setItem("onDateTasks", JSON.stringify(onDateTasks));

        parent.parentNode.removeChild(parent);
        localStorage.setItem("MyList", document.getElementById("task-list").innerHTML);
}  




//1st form and first list. Tasks are not saved in local storage but have a timer
const form0=document.getElementById("oneSittingTaskForm");
const taskInput0=document.getElementById("task-input0");
const taskList0=document.getElementById("task-list0");
const timeInput0=document.getElementById("time-input0");

form0.addEventListener("submit", 
(e)=>{
        e.preventDefault()
        addNewTask(taskInput0,taskList0,timeInput0);
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
        addNewTask (taskInput, taskList);
        taskInput.value="";
        localStorage.setItem("MyList",
        document.getElementById("task-list").innerHTML);
});

//3rd form, tasks on date
const formD=document.getElementById("onDateTaskForm");
const taskInputD=document.getElementById("task-inputD");
const taskListD=document.getElementById("task-listD");
const dateInput=document.getElementById("date-input");

function defCurrentDate() {
const cD = new Date();
const year = cD.getFullYear();
const month = (cD.getMonth() + 1).toString().padStart(2, '0');
const day = cD.getDate().toString().padStart(2, '0');
return `${year}-${month}-${day}`;
}

const currentDate = defCurrentDate();

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
        addNewTask (taskInputD,taskListD)
        taskInputD.value="";
        dateInput.value="";
}
}
else {alert ("Enter correct date")}
});



