import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyFriends from "./views/MyFriends.vue";
import AddFriends from "./views/AddFriends.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import ExerciseLog from "./views/ExerciseLog.vue";
import AddExercise from "./views/AddExercise.vue";
import AddSteps from "./views/AddSteps.vue";
import AccountDetails from "./views/AccountDetails.vue";
import { Globals } from '@/models/api';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/myfriends',
      name: 'myfriends',
      component: MyFriends
    },
    {
      path: '/myfriends/addfriends',
      name: 'addfriends',
      component: AddFriends
    },
    {
      path: '/exerciselog',
      name: 'myexerciselog',
      component: ExerciseLog
    },
    {
      path: '/exerciselog/:userID',
      name: 'exerciselog',
      component: ExerciseLog
    },
    {
      path: '/exerciselog/addexercise',
      name: 'addexercise',
      component: AddExercise
    },
    {
      path: '/exerciselog/addsteps',
      name: 'addsteps',
      component: AddSteps
    },
    {
      path: '/accountdetails',
      name: 'accountdetails',
      component: AccountDetails
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

// Redirect routes if there is no logged in user..
router.beforeEach((to, from, next)=>{
  const publicRoutes = ['home', 'login', 'register'];
  if(!publicRoutes.includes( to.name ) && !Globals.user){
      Globals.redirectRoute = { name: to.name, path: to.path, params: to.params, query: to.query, hash: to.hash  }
      return next('login');
  }
  next();
})

export default router;
