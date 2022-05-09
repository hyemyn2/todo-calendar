import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoContent from '../components/todolist/TodoContent.vue'
import CalendarContent from '../components/calendar/CalendarContent.vue'

Vue.use(VueRouter)
const route = [
    {path: '/', component: CalendarContent},
    {path: '/todo', component: TodoContent},
]


const router = new VueRouter({
    mode: 'history',
    routes: route
})

export default router