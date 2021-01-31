import Vue from "vue"
import Vuex from "vuex"
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        todos: []
    },
    getters: {
        setTodos(state) {
            return state.todos
        },
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        checkAllTodo(state, getters) {
            return getters.remaining == 0
        },
    },
    mutations: {
        addTodo: (state, todo) => state.todos.unshift({
            id: todo.id,
            title: todo.title,
            completed: false,
            timestamp: new Date(),
            editing: false
        }),
        delTodo: (state, index) => state.todos.splice(index, 1),
        checkAllTodos: (state, check) => {
            state.todos.forEach(todo => (todo.completed = check))
        },
        retrieveTodos: (state, todos) => state.todos = todos,
        updateTodo: (state, todo) => {
            const index = state.todos.findIndex(item => item.id == todo.id)
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'completed': todo.completed,
                'editing': todo.editing,
            })
        },
        clearCompleted: (state) => state.todos = state.todos.filter(todo => !todo.completed)
    },
    actions: {
        retrieveTodos({ commit }) {
            db.collection('todoList').get()
            .then(querySnapshot => {
                let tempTodos = []
                querySnapshot.forEach(el => {
                    // console.log(el.data())
                    const data = {
                        id: el.id,
                        title: el.data().title,
                        completed: el.data().completed,
                        timesStamp: el.data().timesStamp,
                        editing: false   
                    }
                    tempTodos.push(data)
                })
                commit('retrieveTodos', tempTodos)
            })
        },
        setTodo({ commit }, todo) {
            db.collection('todoList').add({
                title: todo.title,
                completed: false,
                timesStamp: new Date()
            })
            .then(doc => {
                commit('addTodo', {
                    id: doc.id,
                    title: todo.title,
                    completed: false
                }) 
            })
        },
        updateTodo({ commit }, todo) {
            db.collection('todoList').doc(todo.id).set({
                title: todo.title,
                completed: todo.completed,
              }, { merge: true })
              .then(() => {
                commit('updateTodo', todo)
              })
        },
        deleteTodo({ commit }, id) {
            db.collection('todoList').doc(id).delete()
            .then(() => {
                commit('delTodo', id)
            })
        },
        checkAll({ commit }, check) {
            db.collection('todoList').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        completed: check
                    })
                    .then(() => {
                        commit('checkAllTodos', check)
                    })
                })
            })
        },
        clearCompleted({ commit }) {
            db.collection('todoList').where('completed', '==', true).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete()
                    .then(() => {
                        commit('clearCompleted')
                    })
                })
            })
        }
    }
})