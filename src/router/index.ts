import { createWebHistory } from "vue-router"
import { createRouter } from "vue-router"
import Welcome from '../views/Welcome.vue'
import WelcomeOneAction from "../components/welcome/WelcomeAction/WelcomeOneAction.vue"
import WelcomeOneCard from '../components/welcome/WelcomeCard/WelcomeOneCard.vue'
import WelcomeTwoAction from '../components/welcome/WelcomeAction/WelcomeTwoAction.vue'
import WelcomeTwoCard from '../components/welcome/WelcomeCard/WelcomeTwoCard.vue'
import WelcomeThreeAction from '../components/welcome/WelcomeAction/WelcomeThreeAction.vue'
import WelcomeThreeCard from '../components/welcome/WelcomeCard/WelcomeThreeCard.vue'
import WelcomeFourAction from '../components/welcome/WelcomeAction/WelcomeFourAction.vue'
import WelcomeFourCard from '../components/welcome/WelcomeCard/WelcomeFourCard.vue'
import Start from "../views/Start.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/welcome'},
        {path: '/welcome',component: Welcome, children: [
            { path: '', redirect: '/welcome/1'},
            { path: '1', name: 'Welcome1', components: {main: WelcomeOneCard, footer: WelcomeOneAction}},
            { path: '2', components: {main: WelcomeTwoCard, footer: WelcomeTwoAction}},
            { path: '3', components: {main: WelcomeThreeCard, footer: WelcomeThreeAction}},
            { path: '4', components: {main: WelcomeFourCard, footer: WelcomeFourAction}}
        ]},
        {path: '/start', component: Start}
    ]
})

export default router