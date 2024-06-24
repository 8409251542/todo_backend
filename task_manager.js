const fs =require('fs');
const path=require('path');
const readLine=require('readline');

const taskFilePath=path.join(__dirname,"task.json")

if(!fs.existsSync(taskFilePath)){
    console.log("File does not Exist, Creating it now!");
    fs.writeFileSync(taskFilePath,'[]');
}

const rl=readLine.createInterface({
    input:process.stdin,
    output:process.stdout
})
const getMyTask=()=>{
    const tasks=fs.readFileSync(taskFilePath,'utf-8');
    return JSON.parse(tasks);
}
const saveMytask=(tasks)=>{
    fs.writeFileSync(taskFilePath,JSON.stringify(tasks));
}
const addTask=(task)=>{
    const tasks =getMyTask();
    tasks.push({description:task,completed:false});
    saveMytask(tasks);
    console.info("Added!");
    todoManager();
}
const showTask=()=>{
    const tasks=getMyTask();
    tasks.forEach((task,index) => {
        console.log(`${index+1}. ${task.description} - ${task.completed? "completed":"not completed"}`);
    });
    todoManager();
}
const removeTask=(index)=>{
    const tasks=getMyTask();
    const fltTask=tasks.filter((task,i)=>i!==index-1);
    saveMytask(fltTask);
    console.log("deleted");
    todoManager();
}
const comapleteTask=(index)=>{
    const tasks=getMyTask();
    tasks[index-1].completed=true;
    saveMytask(tasks);
    console.log("Marked");
    todoManager();
}
function todoManager(){
    rl.question("what would you like to do.\n1. Add a task.\n2. Remove a Task.\n3. Show the list.\n4. Mark as Done.\nX. Close.\n" ,(ans)=>{
        switch (ans) {
            case "1":
                rl.question("Enter the Task you want to Add.\n",(task)=>{
                    console.log(`Adding Task ${task}`);
                    addTask(task);
                })
                break;
            case "3":
                showTask();
                break;
            case "2":
                rl.question("Which position tasks you want remove.\n",(index)=>{
                    removeTask(index);
                })
                break;
            case "4":
                rl.question("Which position tasks you want complete.\n",(index)=>{
                    comapleteTask(index);
                })
                break;
            case "X":
                rl.close();
                break;
            default:
                console.log("Invalid Input");
                todoManager();
        }
    })
}
todoManager();

//const taskFilepath=path.join();//to join my data file
//"_dirname" it is a current dirctory.