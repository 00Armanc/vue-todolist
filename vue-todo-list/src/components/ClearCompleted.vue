<template>
    <div>
        <button @click="clearCompleted" class="clearCompleted">Clear Completed</button>
    </div>
</template>

<script>
export default {
    name: "ClearCompleted",
    methods: {
        clearCompleted() {
            return this.$store.dispatch('clearCompleted')
        }
    }
}
</script>

<style>
.clearCompleted {
    padding: 5px;
    font-size: 1.2rem;

    border: none;
    background: #002fff;
    opacity: 0.8;
    color: rgb(252, 245, 245);
    outline: none;
    position: relative;
    border-radius: 3px;
    z-index: 1;
    font-family: 'Playfair Display', serif;
    
}
.clearCompleted::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: rgb(255, 0, 0);
    opacity: none;
    
    transition: width .2s;
}
.clearCompleted:hover::after{
    content: "X";
    font-size: 1.3rem;
    width: 100%;
    color: white;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
}
</style>