<template>
  <div class="row">
    <div class="col-md-12" v-if="currentUser.role_id == 4">
      <HistoryDoctorDentistAll />
    </div>
    <div class="col-md-12" v-if="currentUser.role_id == 1 || currentUser.role_id == 7">
      <HistoryDoctorMasseuseAll />
    </div>
    <div class="col-md-12" v-if="currentUser.role_id == 5 || currentUser.role_id == 3">
      <HistoryDoctorMasseuseAll />
      <HistoryDoctorDentistAll />
    </div>
  </div>
</template>

<script>
import HistoryDoctorMasseuseAll from "./HistoryDoctorMasseuseAll.vue";
import HistoryDoctorDentistAll from "./HistoryDoctorDentistAll.vue";

export default {
  name: "Carlist",
  components: {
    HistoryDoctorMasseuseAll,
    HistoryDoctorDentistAll,
  },
  props: {
    msg: String,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: black;
  text-decoration: none;
}
#app {
  font-family: "Niramit";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
