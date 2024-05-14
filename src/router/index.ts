import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";
import Welcome from "../views/Welcome.vue";
import WelcomeOneAction from "../components/welcome/WelcomeAction/WelcomeOneAction.vue";
import WelcomeOneCard from "../components/welcome/WelcomeCard/WelcomeOneCard.vue";
import WelcomeTwoAction from "../components/welcome/WelcomeAction/WelcomeTwoAction.vue";
import WelcomeTwoCard from "../components/welcome/WelcomeCard/WelcomeTwoCard.vue";
import WelcomeThreeAction from "../components/welcome/WelcomeAction/WelcomeThreeAction.vue";
import WelcomeThreeCard from "../components/welcome/WelcomeCard/WelcomeThreeCard.vue";
import WelcomeFourAction from "../components/welcome/WelcomeAction/WelcomeFourAction.vue";
import WelcomeFourCard from "../components/welcome/WelcomeCard/WelcomeFourCard.vue";
import Start from "../views/Start.vue";
import ItemPage from "../views/ItemPage.vue";
import ItemList from "../components/Item/ItemList.vue";
import ItemCreate from "../components/Item/ItemCreate.vue";
import TagPage from "../views/TagPage.vue";
import TagCreate from "../components/Tag/TagCreate.vue";
import TagEdit from "../components/Tag/TagEdit.vue";
import SignInPageVue from "../views/SignInPage.vue";
import StatisticsPageVue from "../views/StatisticsPage.vue";
import { refreshMe } from "../service/login/refreshMe";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/welcome" },
    {
      path: "/welcome",
      component: Welcome,
      beforeEnter: (to, from, next) => {
        localStorage.getItem("skip") === "yes" ? next("/start") : next();
      },
      children: [
        { path: "", redirect: "/welcome/1" },
        {
          path: "1",
          components: { main: WelcomeOneCard, footer: WelcomeOneAction },
        },
        {
          path: "2",
          components: { main: WelcomeTwoCard, footer: WelcomeTwoAction },
        },
        {
          path: "3",
          components: { main: WelcomeThreeCard, footer: WelcomeThreeAction },
        },
        {
          path: "4",
          components: { main: WelcomeFourCard, footer: WelcomeFourAction },
        },
      ],
    },
    { path: "/start", component: Start },
    {
      path: "/items",
      component: ItemPage,
      children: [
        { path: "", redirect: "/items/list" },
        { path: "list", component: ItemList },
        { path: "create", component: ItemCreate },
      ],
    },
    {
      path: "/tags",
      component: TagPage,
      children: [
        { path: "create", component: TagCreate },
        { path: ":id/edit", component: TagEdit },
      ],
    },
    { path: "/sign_in", component: SignInPageVue },
    { path: "/statistics", component: StatisticsPageVue },
  ],
});

router.beforeEach(async (to, from) => {
  if (
    to.path === "/" ||
    to.path.startsWith("/welcome") ||
    to.path === "/start" ||
    to.path === "/sign_in"
    // 路由守卫白名单
  ) {
    return true;
  } else {
    await refreshMe().catch(() => {
      localStorage.removeItem("jwt");
      // 如果refreshMe失败 移除jwt
    });

    if (!localStorage.getItem("jwt")) {
      return "sign_in?return_to=" + to.path;
      // 如果没有jwt 跳转到登录页
    } else {
      return true;
    }
  }
});

export default router;
