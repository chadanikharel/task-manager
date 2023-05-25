<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <h1>helloworld</h1>
        <input type="text" placeholder="search" v-model="querySearch">
        <button @click="filterTask">search</button>
        <ul>
            <li v-for="task in filteredTask" v-bind:key="task.id">{{ task.name }}</li>
        </ul> 
    </div>
</template>
   
<script>
     export default({
        data(){
            return{
                querySearch: '',
                tasks:[{
                    id:1,
                    name: 'task1',
                },
                {
                    id:1, 
                    name: 'task 2'
                },
                {
                    id:3,
                    name: 'task 3'
                }
                ],
                filteredTask: [],
            }
            
        },
        methods: {
            filterTask(){
                const query = this.querySearch;
                this.filteredTask= this.tasks.filter(task => task.name.includes(query))
            }
        }
    })
</script>