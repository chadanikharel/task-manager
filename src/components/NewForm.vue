<template> 
      <div class="container">
		<h1 class="label-bold">Task Manager</h1>
		<form>
			<!-- <div class="form-group" :class="{ 'form-group--error': $v.name.$error }"> -->
			<label class="label-bold  ">Task Name:</label>
			<input type="text" c v-model="taskname"  name="task" placeholder="Enter task name..." />	
			<!-- </div> -->
			<!-- <div class="error" v-if="!$v.taskname.required">Field is required</div> -->
			<label for="notes" class="label-bold">Details:</label>
			<textarea  name="notes" v-model="details" placeholder="Enter task details..."></textarea>
			<button  @click="submitTask" type="button">Add Task</button>
		</form>
	</div>
	<table class="container">
		<thead>
		<tr>
			<th class="name-width">Name</th>
			<th class="details-width">Details</th>
			<th class="action-width" colspan="2">Actions </th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="(task, index) in taskList"  v-bind:key="index" >
			<td>{{ task.taskname }}</td>
			<td>{{ task.details }}</td>
			<td><button @click="editTask(index)">Edit</button></td>
			<td ><button @click="deleteTask(index)">Delete</button></td>
		</tr>
		
		</tbody>
	</table>
</template>

<script>


const localStorageKey = 'key';
export default{	
  data() {
    return {
		taskname:'',
		details:'',
		taskList:[],
    };
  },

  created(){
	this.taskList = JSON.parse(localStorage.getItem(localStorageKey))
  },

  methods: {
    // submitTask() {
	// 	this.taskList.push({
	// 		taskname: this.taskname,
	// 		details: this.details,
	// 	});

	// 	this.taskname = '';
	// 	this.details='';
	// 	this.saveTaskList()
    // },

	submitTask() {
		if (this.editIndex !== -1) {
    // Update existing task
    const editedTask = {
      taskname: this.taskname,
      details: this.details,
    };
    this.taskList.splice(this.editIndex, 1, editedTask);
    this.editIndex = -1;
  } else {
    // Add new task
    const newTask = {
      taskname: this.taskname,
      details: this.details,
    };
    this.taskList.push(newTask);
  }
  this.taskname = '';
  this.details = '';
  this.saveTaskList();
},
	

	deleteTask(index){
		this.taskList.splice(index,1);
		this.saveTaskList()
	},

	editTask(index) {
      this.editIndex = index;
      const task = this.taskList[index];
      this.taskname = task.taskname;
      this.details = task.details;
    },

	saveTaskList() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.taskList));
	},

  }}
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
	flex-wrap: wrap;
	margin-bottom: 20px;
}


form input[type="text"],
form textarea {
	flex: 1 1 100%;
	padding: 10px;
	border: none;
	border-radius: 5px;
	background-color: #f1f1f1;
	margin-bottom: 10px;
}

form textarea {
	min-height: 50px;
}

form button[type="button"] {
	background-color: #4CAF50;
	color: #fff;
	border: none;
	border-radius: 5px;
	padding: 10px 20px;
	cursor: pointer;
}

.task-actions {
	display: flex;
	justify-content: flex-end;
}

.task-actions button {
	background-color: #4CAF50;
	color: #fff;
	border:1px solid brown;
}
.label-bold{
	font-weight: bold;
	color: #4d4d4d;
	margin-bottom: 10px;
}
table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
  border: 1px solid #d9d9d9;
  
}

th {
  background-color: #d9d9d9;
  font-weight: bold;
  color: #333;
}

.name-width{
	width: 20%;
}
.details-width{
	width: 60%;
}

.action-width{
	width: 10%;
}
</style>
