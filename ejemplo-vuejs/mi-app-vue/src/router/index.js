import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import EstudiantesList from "../views/EstudiantesList.vue";
import EstudianteDetail from "../views/EstudianteDetail.vue";
import EstudianteEdit from "../views/EstudianteEdit.vue";
import EstudianteAgregar from "../views/EstudianteAgregar.vue";

import TelefonoAgregar from "../views/TelefonoAgregar.vue";
import TelefonoEdit from "../views/TelefonoEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/estudiantes",
    name: "EstudiantesList",
    component: EstudiantesList,
    meta: { requiresAuth: true },
  },

  {
    path: "/estudiantes/nuevo",
    name: "EstudianteAgregar",
    component: EstudianteAgregar,
    meta: { requiresAuth: true },
  },

  {
    path: "/estudiantes/detail/:estudianteUrl*",
    name: "EstudianteDetail",
    component: EstudianteDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/estudiantes/edit/:id",
    name: "EstudianteEdit",
    component: EstudianteEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/telefonos/nuevo",
    name: "TelefonoAgregar",
    component: TelefonoAgregar,
    meta: { requiresAuth: true },
  },
  {
    path: "/telefonos/edit/:id",
    name: "TelefonoEdit",
    component: TelefonoEdit,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guarda de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("authToken")) {
    next("/login");
  } else {
    next();
  }
});

export default router;
