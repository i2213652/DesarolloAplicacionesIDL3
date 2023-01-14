import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";

const routes = [
  {
    path: "/",
    name: "App",
    component: Login,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/datos_personales",
    name: "datos_personales",
    component: () => import("@/views/datos_personales.vue"),
  },
  {
    path: "/historial_creditos",
    name: "historial_creditos",
    component: () => import("@/views/historial_creditos.vue"),
  },
  {
    path: "/generar_solicitud",
    name: "generar_solicitud",
    component: () => import("@/views/generar_solicitud.vue"),
  },
  {
    path: "/mis_solicitudes",
    name: "mis_solicitudes",
    component: () => import("@/views/mis_solicitudes.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
