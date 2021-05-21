import Vue from 'vue'
import VueRouter from 'vue-router'
import Queries from '../views/Queries/Queries.vue'
import Tasks from '../views/Queries/Tasks.vue'
import Chat from '../views/ChatRoom.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/queries',
    name: 'Queries',
    component: Queries
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/queries/:name',
    name: 'Tasks',
    component: Tasks,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
