<template>
    <div class="todos">
        <div class="todo-list">
            <input type="text" class="text-input" 
            placeholder="What needs to be done"  
            v-model="newTodo" 
            @keyup.enter="addTodo">
            <div class="todos-area">
                <transition-group
                enter-active-class="animate__animated animate__fadeInDown"
                leave-active-class="animate__animated animate__fadeOutDown"
                >
                    <TodoItem v-for="(todo, index) in todos"
                    :todo="todo" 
                    :index="index" 
                    :key="todo.id" />
                </transition-group>
            </div>
        </div>
        <div v-dspace="'between'" class="underListİnfo">
            <CheckAll />
            <ClearCompleted />
        </div>
    </div>
</template>

<script>
import TodoItem from "./TodoItem";
import CheckAll from "./CheckAll.vue";
import ClearCompleted from "./ClearCompleted";
import { mapActions } from 'vuex'

export default {
    name: "TodoList",
    components: {
        TodoItem,
        CheckAll,
        ClearCompleted
    },
    data() {
        return {
            newTodo: "",
            newTodoId: 4
        }
    },
    methods: {
        ...mapActions(['setTodo']),
        addTodo(){
            if(this.newTodo.trim().length == 0) return 

            let newTodoInfo = {
                id: this.newTodoId,
                title: this.newTodo,
            }
            this.newTodo = ""
            this.newTodoId++

            this.setTodo(newTodoInfo)
        }
    },
    computed: {
        todos() {
            return this.$store.getters.setTodos
        }
    },
    created() {
        this.$store.dispatch('retrieveTodos')
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

.todos-area {
    max-height: 250px;
    overflow-x: hidden;
}

.todos-area::-webkit-scrollbar-track{
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.todos-area::-webkit-scrollbar{
	width: 12px;
	background-color: #F5F5F5;
}

.todos-area::-webkit-scrollbar-thumb{
	border-radius: 10px;
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #41B883;
}

.todos {
    min-height: 200px;
}
.text-input {
    width: 100%;
    height: 35px;
    font-size: 1.3rem;
    padding: 20px 20px 20px 10px;
    margin-top: 20px;
}
.underListİnfo {
    border-top: 1px solid gray;
    margin-top: 15px;
    padding: 15px 1px 0 3px;
}
</style>
