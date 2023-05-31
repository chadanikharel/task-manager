<template>
<div class="custom-body"> 
<div class="container">
  <button type="button" class="btn btn-position btn-primary" @click="this.$router.push(`/add`)">Add Task</button>
  <button type="button" class="btn btn-primary btn-position" @click="showCompletedTasks">Completed Tasks({{ completedTaskCounter }})</button>
  <button type="button" class="btn btn-position btn-primary" @click="showPendingTasks">Pending Tasks({{ pendingTaskCounter }})</button>
  <table >
    <tbody v-if="displayFilteredTask">
      <tr v-for="(task, index) in filteredTaskList" :key="index">
      <td> {{ task.taskname }} </td>
      <td>{{ task.details }}</td> 
    </tr>
    </tbody>
  </table>

    <table>
	<thead>
	<tr>
    <th class="width"></th>
		<th class="name-width">Name</th>
		<th class="details-width">Details</th>
    <th>Due Date</th>
		<th class="action-width" colspan="2">Actions </th>
	</tr>
	</thead>
	<tbody>
	<tr v-for="(task, index) in taskList"  v-bind:key="index" >
    <td>
      <input class="form-check-input" type="checkbox"  :checked="task.completed"  @change="toggleTask(index)">
    </td>
    <td :class="{'checkbox-checked':task.completed}">{{ task.taskname }}</td>
		<td :class="{'checkbox-checked':task.completed}">{{ task.details }}</td>
    <td>{{ task.dueDate }}</td>
		<td class="cursor"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon-color" @click="editTask(index)" /> </td>
		<td class="cursor" ><font-awesome-icon icon="fa-trash" class="icon-color" @click="showConfirmation(index)"/></td>
	</tr>
	</tbody> 
  </table>
</div>
</div>
</template>

<script>
import  Swal  from "sweetalert2";
const localStorageKey ='tasks';
export default{	
 
data() {
  return {
	taskname:'',
	details:'',
  dueDate: '',
	taskList:[],
  displayFilteredTask: false,
  showCompleted : false,
  completedTaskCounter: 0,
  pendingTaskCounter: ''
  };
},

created(){
  this.getTaskList();
  this.initialTaskCompletionStatus();
  this.sortTaskListByDueDate();
  this.pendingTaskCounter = this.taskList.filter(task=>!task.completed).length;
},

computed: {
  filteredTaskList(){
    if(this.showCompleted){
      return this.taskList.filter(task => task.completed)
    }
  else{
    return this.taskList.filter(task => !task.completed);
  }
},
},

methods: {
  editTask(index) {
    const taskListLength = this.taskList.length;
    if (taskListLength >= 1) {
    this.$router.push(`/edit/${index}`)
    }
    else{
      this.$router.push(`/add`);
    }
  },

  showConfirmation(index){
    Swal.fire({
      title: 'Are you sure you want to delete it ?',
      icon: 'warning',    
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes !!",
      cancelButtonColor: "#d33",
}).then((result)=>{
  if(result.isConfirmed){
    this.taskList.splice(index,1);
    this.saveTaskList()
  }
}
)  
},

  saveTaskList() {
	localStorage.setItem(localStorageKey, JSON.stringify(this.taskList));
  },

  getTaskList() {
      this.taskList = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      this.sortTaskListByDueDate;
    },

  toggleTask(index){
    this.taskList[index].completed = !this.taskList[index].completed;
    if(this.taskList[index].completed){
      this.completedTaskCounter++;
      this.pendingTaskCounter--;
    }
    else{
      this.completedTaskCounter --;
      this.pendingTaskCounter++;
    }
    this.saveTaskList();
    },

 initialTaskCompletionStatus(){
  this.taskList.forEach(task=>{
  task.completed=false;
  })
   },

   showCompletedTasks(){
    this.displayFilteredTask = true
    this.showCompleted = true
  },

  showPendingTasks(){
    this.displayFilteredTask = true
    this.showCompleted = false
  },

  
  sortTaskListByDueDate() {
    this.taskList.sort((a,b)=>{
      const dateA = new Date(a.dueDate)
      const dateB = new Date(b.dueDate)
      return dateA-dateB
    });
    this.saveTaskList();
  },
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

.checked{
  background-color: #5c3199;
}

.custom-body {
  min-height: 100vh;
  background: linear-gradient(270deg, #6c5c81, #5d6c99);
}

.container {
  position: relative;
  top: 100px;
  max-width: 800px;
  padding: 20px;
  background-color: #ebe8eb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  min-height: 400px;
}

input[type="text"] {
  padding: 7px;
  border: none;
  border-radius: 5px;
  background-color: #b6b4b4;
  outline: none;
}

.input-position{
  position: relative;
  top: 2px;
  right: 5px;
}

button{
  background:linear-gradient(270deg, #5c3199, #556cac);
  border: none;
}

.icon-color{
  color: #5c3199;
}
.btn-position{
    position: relative;
    left: 330px;
    margin: 2px 5px;
}

.filter-btn-position{
  position: relative;
  left: 383px;
  bottom: 5px;
  margin: 0 4px
}
table {
width: 100%;
margin-bottom: 20px;
border-collapse: collapse;
}

th {
  padding: 8px;
  background-color: #b6b4b4;
  font-weight: bold;
  color: #333;

}

td{
  padding: 8px;
  border: 1px solid #d9d9d9;
  background-color: #d3d1d1;
}

input[type=checkbox]{
background-color:  #78777a;  
border: none;
border-radius: 50px;
  }

input[type=checkbox]:checked{
background-color:  #5c3199;  
  }

.checkbox-checked{
  text-decoration: line-through;
}
.name-width{
  width: 20%;
}
.details-width{
  width: 54%;
}

.action-width{
  width: 10%;
}

.cursor{
  cursor: pointer;
}
</style>
