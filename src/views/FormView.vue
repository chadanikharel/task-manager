<template>
    <div class="container">
	<h1 class="label-bold">Task Manager</h1>
  <button type="button" class="btn btn-primary btn-position" @click="this.$router.push('/tasklist')">View Task</button>
	<form>
	<label class="label-bold">Task Name:</label>
	<input type="text" v-model="taskname" name="task" placeholder="Enter task name..." />
	<span class="text-danger" v-if="v$.taskname.$error">{{ v$.taskname.$errors[0].$message }}</span><br>
	<label class="label-bold">Details:</label>
	<textarea  name="notes" v-model="details" placeholder="Enter task details..."  ></textarea>
	<span class="text-danger" v-if="v$.details.$error">{{ v$.details.$errors[0].$message }}</span>
	</form>
	<div>
	<button type="button" class="btn btn-primary" @click="submitTask">{{ buttonName }}</button> 
	</div>
  </div>  
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';
const localStorageKey = 'tasks';
export default{	
data() {
  return {
    v$: useValidate(),
    taskname:'',
    details:'',
    taskList:[],
    buttonName: "Add Task",
    editIndex: -1
  };
},

validations(){
  return{
	taskname: {required},
	details: {required},
  }
  },

mounted(){
  let index = this.$route?.params?.index || -1; 
  this.getTaskDetails(index)
},    

methods: {
  submitTask() {
    this.v$.$validate()
    if(!this.v$.$error){
		if (this.editIndex !== -1) {
    const editedTask = {
      taskname: this.taskname,
      details: this.details,
    };
    
    this.taskList.splice(this.editIndex,1,editedTask);
    this.saveTaskList()

  }
   else {
    const newTask = {
          taskname: this.taskname,
          details: this.details,
        };

      
        
        this.taskList.push(newTask);
        this.saveTaskList()
      }
      this.taskname = '';
        this.details = '';
        this.getTaskList();
      this.$router.push('/tasklist');
}
},

  saveTaskList() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.taskList));
  },

  getTaskList(){
    this.taskList = JSON.parse(localStorage.getItem(localStorageKey))
  },

  getTaskDetails(index) {
    console.log('index',index)
    this.editIndex = index;
    this.taskList = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const task = this.taskList[index];
    this.updateButtonName(task)
    this.taskname = task?.taskname;
    this.details = task?.details;
  },

  updateButtonName(task){
    if(task){
      this.buttonName = "Update Task"
    }
    else {
      this.buttonName ="Add Task"
    }
  }
},
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f1f1f1;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 20px;
  flex-direction: column;
}

form input[type="text"],
form textarea {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #d9d9d9;
  margin-bottom: 10px;
}

form textarea {
  min-height: 50px;
}

.label-bold{
  font-weight: bold;
  color: #4d4d4d;
  margin-bottom: 20px;
}

.btn-position{
  cursor: pointer;
  position: relative;
  left: 665px;
  margin-bottom: 20px;
}
.invalid-input {
border: 1px solid red;
}
</style>