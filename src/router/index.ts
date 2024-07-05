import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import TabsPageMarketing from "../views/marketing/TabsPageM.vue";
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
      {
        path: "tab3",
        component: () => import("@/views/ArrivedHub.vue"),
      },
      {
        path: "tab4",
        component: () => import("@/views/WithCourier.vue"),
      },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/marketing/tabs/",
    component: TabsPageMarketing,
    children: [
      {
        path: "",
        redirect: "marketing/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/marketing/Tab1PageM.vue"),
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
    path: "/POD",
    component: () => import("@/views/POD.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/marketing/prospek",
    component: () => import("@/views/marketing/prospek/ProspekData.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/marketing/kunjungan",
    component: () => import("@/views/marketing/kunjungan/KunjunganData.vue"),
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
    path: "/delivery",
    component: () => import("@/views/DeliveryOrder.vue"),
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
  {
    path: "/marketing/detail-prospek",
    component: () => import("@/views/marketing/prospek/DetailProspek.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/marketing/detail-kunjungan",
    component: () => import("@/views/marketing/kunjungan/DetailKunjungan.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/checkpoint",
    component: () => import("@/views/DetCheckPoint.vue"),
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

  const auth = store.getters["auth/get"]('isAuth');
  const group = localStorage.getItem("group_id");

  if ((to.path === "/login" || to.path === "/") && auth) {
    if (group === '6') {
      next({ path: "/marketing/tabs/" });
    } else {
      next({ path: "/tabs/" });
    }
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
