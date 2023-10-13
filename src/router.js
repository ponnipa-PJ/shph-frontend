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
import Shph from './components/Shph.vue';
import Confirmmasseuse from './components//Confirmmasseuse.vue';
import Confirmdentist from './components/Confirmdentist.vue';
import plandoctordentistlist from './components/plandoctordentistlist.vue';
import plandoctormasseuselist from './components/plandoctormasseuselist.vue';
import dashboard from './components/dashboard.vue';
import HistoryUserDentist from './components/HistoryUserDentist.vue';
import ShphDoctor from './components/ShphDoctor.vue';
import HistoryUserMasseuse from './components/HistoryUserMasseuse.vue';
import HistoryMasseuse from './components/HistoryMasseuse.vue';
import HistoryDentist from './components/HistoryDentist.vue';
import HistoryUser from './components/HistoryUser.vue';
import HistoryDoctor from './components/HistoryDoctor.vue';
import DetailHistoryDoctorDentist from './components/DetailHistoryDoctorDentist.vue';
import DetailHistoryDoctorMasseuse from './components/DetailHistoryDoctorMasseuse.vue';
import DentistTypes from './components/DentistTypes.vue';
import MasseuseType from './components/MasseuseType.vue';
import ShphUsers from './components/ShphUsers.vue';
import evaluation from './components/evaluation.vue';
import Evaluationlist from './components/Evaluationlist.vue';
import ShphMasseuseTime from './components/ShphMasseuseTime.vue';
import HistoryUserDentistAll from './components/HistoryUserDentistAll.vue';
import HistoryUserMasseuseAll from './components/HistoryUserMasseuseAll.vue';
import HistoryDoctorDentistAll from './components/HistoryDoctorDentistAll.vue';
import HistoryDoctorMasseuseAll from './components/HistoryDoctorMasseuseAll.vue';
import QrcodeEva from './components/QrcodeEva.vue';
import Types from './components/Types.vue';


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
  {
    path: "/Shph",
    alias: "/Shph",
    name: "Shph",
    component: Shph
  },
  {
    path: "/Confirmmasseuse",
    alias: "/Confirmmasseuse",
    name: "Confirmmasseuse",
    component: Confirmmasseuse
  },
  {
    path: "/Confirmdentist",
    alias: "/Confirmdentist",
    name: "Confirmdentist",
    component: Confirmdentist
  },
  {
    path: "/plandoctordentistlist",
    alias: "/plandoctordentistlist",
    name: "plandoctordentistlist",
    component: plandoctordentistlist
  },
  {
    path: "/plandoctormasseuselist",
    alias: "/plandoctormasseuselist",
    name: "plandoctormasseuselist",
    component: plandoctormasseuselist
  },
  {
    path: "/dashboard",
    alias: "/dashboard",
    name: "dashboard",
    component: dashboard
  },
  {
    path: "/HistoryUserDentist",
    alias: "/HistoryUserDentist",
    name: "HistoryUserDentist",
    component: HistoryUserDentist
  },
  {
    path: "/ShphDoctor",
    alias: "/ShphDoctor",
    name: "ShphDoctor",
    component: ShphDoctor
  },
  {
    path: "/HistoryUserMasseuse",
    alias: "/HistoryUserMasseuse",
    name: "HistoryUserMasseuse",
    component: HistoryUserMasseuse
  },
  {
    path: "/HistoryMasseuse",
    alias: "/HistoryMasseuse",
    name: "HistoryMasseuse",
    component: HistoryMasseuse
  },
  {
    path: "/HistoryDentist",
    alias: "/HistoryDentist",
    name: "HistoryDentist",
    component: HistoryDentist
  },
  {
    path: "/HistoryUser",
    alias: "/HistoryUser",
    name: "HistoryUser",
    component: HistoryUser
  },
  {
    path: "/HistoryDoctor",
    alias: "/HistoryDoctor",
    name: "HistoryDoctor",
    component: HistoryDoctor
  },
  {
    path: "/DetailHistoryDoctorDentist",
    alias: "/DetailHistoryDoctorDentist",
    name: "DetailHistoryDoctorDentist",
    component: DetailHistoryDoctorDentist
  },
  {
    path: "/DetailHistoryDoctorMasseuse",
    alias: "/DetailHistoryDoctorMasseuse",
    name: "DetailHistoryDoctorMasseuse",
    component: DetailHistoryDoctorMasseuse
  },
  {
    path: "/DentistType",
    alias: "/DentistType",
    name: "DentistType",
    component: DentistTypes
  },
  {
    path: "/MasseuseType",
    alias: "/MasseuseType",
    name: "MasseuseType",
    component: MasseuseType
  },
  {
    path: "/ShphUsers",
    alias: "/ShphUsers",
    name: "ShphUsers",
    component: ShphUsers
  },
  {
    path: "/evaluation",
    alias: "/evaluation",
    name: "evaluation",
    component: evaluation
  },
  {
    path: "/evaluationlist",
    alias: "/evaluationlist",
    name: "evaluationlist",
    component: Evaluationlist
  },
  {
    path: "/ShphMasseuseTime",
    alias: "/ShphMasseuseTime",
    name: "ShphMasseuseTime",
    component: ShphMasseuseTime
  },
  {
    path: "/HistoryUserDentistAll",
    alias: "/HistoryUserDentistAll",
    name: "HistoryUserDentistAll",
    component: HistoryUserDentistAll
  },
  {
    path: "/HistoryUserMasseuseAll",
    alias: "/HistoryUserMasseuseAll",
    name: "HistoryUserMasseuseAll",
    component: HistoryUserMasseuseAll
  },
  {
    path: "/HistoryDoctorDentistAll",
    alias: "/HistoryDoctorDentistAll",
    name: "HistoryDoctorDentistAll",
    component: HistoryDoctorDentistAll
  },
  {
    path: "/HistoryDoctorMasseuseAll",
    alias: "/HistoryDoctorMasseuseAll",
    name: "HistoryDoctorMasseuseAll",
    component: HistoryDoctorMasseuseAll
  },
  {
    path: "/QrcodeEva",
    alias: "/QrcodeEva",
    name: "QrcodeEva",
    component: QrcodeEva
  },
  {
    path: "/types",
    alias: "/types",
    name: "types",
    component: Types
  },
  ]
});

Vue.use(Router);

router.beforeEach((to, from, next) => {
  var page = to.path.split("/")
  var qrcode = ''
  if (page[1] == 'activateemail' || page[1] == 'line' || page[1] ==  'Confirmdentist' || page[1] ==  'Confirmmasseuse' || page[1] ==  'evaluation') {
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
