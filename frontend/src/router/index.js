import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Reservation from '../views/Reservation.vue';
import RemoveReservation from "../views/RemoveReservation";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/rezerwacja',
    name: 'Reservation',
    component: Reservation,
  },
  {
    path: '/anuluj-rezerwacje',
    name: 'RemoveReservation',
    component: RemoveReservation,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
