import { createWebHistory } from "vue-router"
import { createRouter } from "vue-router"
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Welcome from '../views/Welcome.vue'
import WelcomeOne from '../components/welcome/WelcomeOne.vue'
import WelcomeTwo from '../components/welcome/WelcomeTwo.vue'
import WelcomeThree from '../components/welcome/WelcomeThree.vue'
import WelcomeFour from '../components/welcome/WelcomeFour.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/About', component: About},
        {path: '/welcome',component: Welcome, children: [
            { path: 1, component: WelcomeOne},
            { path: 2, component: WelcomeTwo},
            { path: 3, component: WelcomeThree},
            { path: 4, component: WelcomeFour}
        ]}
    ]
})

export default router