<template>
  <div class="custom-body">
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
  <label class="label-bold">Task Name:</label>
  <input type="date" v-model="dueDate">
	</form>
	<button type="button" class="btn btn-primary btn-width" @click="submitTask">{{ buttonName }}</button> 
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
    editIndex: -1,
    dueDate:'',
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
    const dateObj = new Date(this.dueDate);
    const options = {month: 'long', day: 'numeric'}
    const formattedDueDate = dateObj.toLocaleDateString(undefined, options)
    this.v$.$validate()
    if(!this.v$.$error){
		if (this.editIndex !== -1) {
    const editedTask = {
      taskname: this.taskname,
      details: this.details,
      dueDate: formattedDueDate,
    };
    
    this.taskList.splice(this.editIndex,1,editedTask);
    this.saveTaskList()

  }
   else {
    const newTask = {
          taskname: this.taskname,
          details: this.details,
          dueDate: formattedDueDate
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
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Ubuntu', sans-serif;
}

.custom-body {
  min-height: 100vh;
  background: linear-gradient(270deg, #6c5c81, #5d6c99);
}
.container {
  position: relative;
  top: 50px;
  max-width: 600px;
  background-color: #faf5f5;
  box-shadow:  rgb(6, 15, 24) 0px 20px 30px -10px;
  border-radius: 10px;
} 

.label-bold{
  font-weight: bold;
  color: #4d4d4d;
  margin: 10px 0 13px 0;
}

h1 {
  padding: 10px;
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 20px;
  flex-direction: column;
}

form input[type="text"], input[type = "date"],
form textarea {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #d9d9d9;
  outline: none;
}

form textarea {
  min-height: 50px;
}

button{
  background:linear-gradient(270deg, #5c3199, #556cac);
  border: none;
}

.btn-width{
  width: 575px;
  margin-bottom: 20px;
}

.btn-position{
  cursor: pointer;
  position: relative;
  left: 478px;
}
.invalid-input {
border: 1px solid red;
}
</style>
