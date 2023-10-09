<template>
  <div><HistoryUserMesseuseAll/>
  
    <HistoryUserDentistAll/></div>

  
</template>

<script>
import HistoryUserMesseuseAll from '../components/HistoryUserMesseuseAll.vue'
import HistoryUserDentistAll from '../components/HistoryUserDentistAll.vue'

export default {
  name: "Carlist",
  components: {
    HistoryUserMesseuseAll,
    HistoryUserDentistAll
  },
  props: {
    msg: String,
  },
  data() {
    return {
    };
  },
  methods: {
   
  },
  mounted() {
  },
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
