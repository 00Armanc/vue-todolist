import Vue from 'vue'

Vue.directive('dcenter', {
    bind(el) {
        el.style.display = "flex"
        el.style.alignItems = "center"
        el.style.justifyContent = "center"
    }
})
Vue.directive('dspace', {
    bind(el, binding) {
        el.style.display = "flex"
        el.style.alignItems = "center"
        el.style.justifyContent = "space-"+binding.value
    }
})