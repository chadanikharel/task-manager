<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <h1>helloworld</h1>
        <input type="text" placeholder="search" v-model="querySearch">
        <button @click="filterTask">search</button>
        <ul>
  <li v-for="task in tasks" :key="task.id">
    <input type="checkbox" v-model="task.completed" @change="markTaskAsCompleted(task)">
    <span :class="{ 'completed': task.completed }">{{ task.title }}</span>
  </li>
</ul>

<p><del>my name is chadani</del></p>
    </div>
</template>
   
<script>
     export default({
        data() {
  return {
    tasks: [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false },
    ],
  };
},
methods: {
  markTaskAsCompleted(task) {
    task.completed = true;
  },
},
    })
</script>

<style>
 
    
</style>