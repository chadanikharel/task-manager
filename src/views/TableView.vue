<template>
<div class="custom-body"> 
<div class="container">
  <button type="button" class="btn btn-position btn-primary" @click="this.$router.push(`/add`)">Add Task</button>
    <table>
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
	taskList:[],
  
  };
},

created(){
  this.getTaskList();
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
      title: 'Are you sure ?',
      text: "You won't be able revert it!",
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

.custom-body {
  min-height: 100vh;
  background: linear-gradient(270deg, #6c5c81, #5d6c99);
}

.container {
  position: relative;
  top: 100px;
  max-width: 700px;
  padding: 20px;
  background-color: #ebe8eb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  min-height: 400px;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

button{
  background:linear-gradient(270deg, #5c3199, #556cac);
  border: none;
}

.icon-color{
  color: #5c3199;
}
.btn-position{
  cursor: pointer;
  position: relative;
  left: 566px;
  margin-bottom: 16px;
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
background-color: #d3d1d1;

}

th {
background-color: #b6b4b4;
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

.cursor{
  cursor: pointer;
}
</style>
