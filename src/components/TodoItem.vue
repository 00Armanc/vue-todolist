<template>
    <div v-dspace="'evenly'" class="todo">
        <input type="checkbox" @change="doneEdit" :checked="todo.completed">
        <h4 v-if="!todo.editing" :class="{ isCompleted : todo.completed}"
        @dblclick="editTodo"
        >{{ todo.title }}</h4>
        <input v-else type="text" 
        class="edit-todo" 
        v-model="todo.title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus>
        <button @click="delTodo">&times;</button>
    </div>
</template>

<script>
export default {
    name: "TodoItem",
    props: {
        todo: {
            type: Object,
            require: true
        },
        index: {
            type: Number,
            require: true
        }
    },
    directives: {
        focus: {
            inserted(event) {
                event.focus()
            }
        }
    },
    data() {
        return {
            beforeEditTitle: ""
        }
    },
    methods: {
        delTodo() {
            return this.$store.dispatch('deleteTodo', this.todo.id)
        },
        // selectRemove() {
        //     const index = this.$store.state.todos[this.index]
        //     index.completed = !index.completed
        // },
        editTodo() {
            console.log('it is working man')
            this.beforeEditTitle = this.todo.title
            this.todo.editing = true
            
        },
        doneEdit() {
            if (this.todo.title.trim() == '') {
                this.todo.title = this.beforeEditTitle
            }
            this.todo.editing = false
            this.$store.dispatch('updateTodo', {
                'id': this.todo.id,
                'title': this.todo.title,
                'completed': this.todo.completed,
                'timesStamp': this.todo.timesStamp,
                'editing': this.todo.editing
            })
        },
        cancelEdit() {
            this.todo.editing = false
            this.todo.title = this.beforeEditTitle
            console.log(this.beforeEditTitle)
        }
    }
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Antic+Slab&family=Open+Sans+Condensed:wght@300&display=swap');

.todo {
    width: 100%;
    height: 40px;
    margin-top: 15px;
    animation-duration: .3s;
}
.todo > input[type=checkbox] {
    flex: 1;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-left: -25px;
}
.todo > h4 {
    flex: 6;
    padding-left: 5px;
    height: 100%;
    font-size: 1.6rem;
    font-family: 'Antic Slab', serif;
    color: rgb(117, 116, 116);

    display: flex;
    align-items: center;
}
.todo > button {
    border: none;
    background: none;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 2rem;
    color: rgb(187, 179, 179);
    margin-right:  5px;
    transition: .5s;
}
.todo > button:hover {
    color: #000;
}
.edit-todo {
    flex: 6;
    height: 35px;
    font-size: 1.3rem;
    padding: 20px 20px 20px 10px;
    color: gray;
}

.isCompleted {
    text-decoration: line-through;
    color: rgb(255, 0, 0) !important;
}
</style>