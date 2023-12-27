import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/LoginPage.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/arrived-hub",
    component: () => import("@/views/ArrivedHub.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/with-courier",
    component: () => import("@/views/WithCourier.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/shipment-delivered",
    component: () => import("@/views/ShipmentDelivered.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/shipment-delivered/section-city",
    component: () => import("@/views/components/SectionCity.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/select-room",
    component: () => import("@/views/SelectRoom.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("user")) {
    store.commit("auth/SET", ["isAuth", true]);
  }

  // if (localStorage.getItem("account") && localStorage.getItem("email")) {
  //   const account = localStorage.getItem("account");
  //   const email = localStorage.getItem("email");

  //   store.commit("auth/SET", ["account", account]);
  //   store.commit("auth/SET", ["email", email]);
  // }

  const auth = store.getters["auth/get"]('isAuth');
  if ((to.path === "/login" || to.path === "/") && auth) {
    next({ path: "/tabs/" });
  } else if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!auth) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
