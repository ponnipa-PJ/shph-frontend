import Vue from "vue";
import Router from "vue-router";
import Login from './components/Login.vue';
import Users from './components/Users.vue';
import Menu from './components/Menu.vue';
import Roles from './components/Roles.vue';
import Register from './components/Register.vue';
import ActivateEmail from './components/ActivateEmail.vue';
import line from './components/Line.vue';
import LoginLine from './components/LoginLine.vue';
import doctors from './components/doctors.vue';
import course from './components/course.vue';
import book from './components/book';
import plandoctor from './components/plandoctor.vue';
import Profile from './components/Profile.vue';
import Menumanage from './components/Menumanage.vue';
import plandoctordentist from './components/plandoctordentist.vue';
import bookdentist from './components/bookdentist.vue';
import notification from './components/notification.vue';
import shphmasseuse from './components/shphmasseuse.vue';
import shphdentist from './components/shphdentist.vue';

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/user",
      alias: "/user",
      name: "user",
      component: Users
    },
    {
      path: "/menu",
      alias: "/menu",
      name: "menu",
      component: Menu
    },
    {
      path: "/roles",
      alias: "/roles",
      name: "roles",
      component: Roles
    },
    {
      path: "/register",
      alias: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/activateemail/:id",
      alias: "/activateemail",
      name: "activateemail",
      component: ActivateEmail
    },
  {
    path: "/line",
    alias: "/line",
    name: "line",
    component: line
  },
  {
    path: "/loginline",
    alias: "/loginline",
    name: "loginline",
    component: LoginLine
  },
  
  {
    path: "/doctors",
    alias: "/doctors",
    name: "doctors",
    component: doctors
  },
  {
    path: "/course",
    alias: "/course",
    name: "course",
    component: course
  },
  {
    path: "/book",
    alias: "/book",
    name: "book",
    component: book
  },
  
  {
    path: "/plandoctor",
    alias: "/plandoctor",
    name: "plandoctor",
    component: plandoctor
  },
  {
    path: "/profile",
    alias: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/Menumanage",
    alias: "/Menumanage",
    name: "Menumanage",
    component: Menumanage
  },
  {
    path: "/plandoctordentist",
    alias: "/plandoctordentist",
    name: "plandoctordentist",
    component: plandoctordentist
  },
  {
    path: "/bookdentist",
    alias: "/bookdentist",
    name: "bookdentist",
    component: bookdentist
  },
  {
    path: "/setting",
    alias: "/setting",
    name: "setting",
    component: notification
  },
  {
    path: "/shphmasseuse",
    alias: "/shphmasseuse",
    name: "shphmasseuse",
    component: shphmasseuse
  },
  {
    path: "/shphdentist",
    alias: "/shphdentist",
    name: "shphdentist",
    component: shphdentist
  },
  ]
});

Vue.use(Router);

router.beforeEach((to, from, next) => {
  var page = to.path.split("/")
  var qrcode = ''
  if (page[1] == 'activateemail' || page[1] == 'line' || page[1] ==  'permissiondocpb') {
    qrcode = to.path
  }
  // console.log(page[1]);
  // console.log(qrcode);
  const publicPages = ['/', '/login', '/register', qrcode];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('usershph');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/book');
  } else {
    next();
  }

});

export default router;
