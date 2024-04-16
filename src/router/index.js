import { createWebHistory } from "vue-router"
import { createRouter } from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: () => import('../views/Home.vue')},
        {path: '/About', component: () => import('../views/About.vue')}
    ]
})

export default router