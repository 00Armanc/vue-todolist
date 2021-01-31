<template>
    <div><label><input type="checkbox" @change="checkAll" :checked="check"> Check All</label></div>
</template>

<script>
export default {
    name: "CheckAll",
    methods: {
        checkAll(event) {
            return this.$store.dispatch('checkAll', event.target.checked)
        },
    },
    computed: {
        check() {
            return this.$store.getters.checkAllTodo
        }
    }

}
</script>

<style>
input[type=checkbox] {
    width: 15px; 
    height: 15px;
}
label {
    font-size: 1.1rem;
    font-weight: bold;
    font-family: 'Playfair Display', serif;
}
</style>