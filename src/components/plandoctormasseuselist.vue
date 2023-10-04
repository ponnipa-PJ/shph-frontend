<template>
  <div class="row">

    <div class="col-md-12">

      <div class="card card-widget widget-user-2">

        <div class="widget-user-header bg-warning">
          <div class="widget-user-image">
            <img src="../assets/icon.png" alt="">
          </div>

          <h5 class="widget-user-desc">จัดการคิวหมอนวดแผนไทยประจำเดือน</h5>
          <h5 class="widget-user-desc">โรงพยาบาลส่งเสริมสุขภาพ</h5>
          <!-- <h5 class="widget-user-desc">Lead Developer</h5> -->

        </div>
        <div class="card-footer p-0" v-if="currentUser.role_id == 5">
          <ul class="nav flex-column">
            <li class="nav-item" v-for="u in shphlist" :key="u.id">

              <a class="nav-link" style="color:black">
                {{ u.firstname }} {{ u.lastname }}
              </a>
              <ul style="list-style-type: circle;" class="mb-3">
                <li class="nav-item" v-for="s in u.shph" :key="s.id">
                  <a :href="'/plandoctor?id=' + u.id + '&&shphId=' + s.id" target="_blank" class="nav-link" style="margin: 0px;
    padding: 0px;">
                    {{ s.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="card-footer p-0" v-if="currentUser.role_id == 1">
          <ul class="nav flex-column">
            <li class="nav-item">

              <a class="nav-link" style="color:black">
              </a>
              <ul style="list-style-type: circle;" class="mb-3">
                <li class="nav-item mb-3" v-for="s in shphlist" :key="s.id">
                  <a :href="'/plandoctor?id=' + currentUser.id + '&&shphId=' + s.id" target="_blank" class="nav-link" style="margin: 0px;
    padding: 0px;">
                    {{ s.name }}
                  </a>
                  <hr>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorShphService from "../services/DoctorShphService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      concert_id: 0,
      list: [],
      user: {},
      user_id: 0,
      hash: 0,
      title: "",
      roles: [],
      shphlist: []
    };
  },
  mounted() {
    this.getshph()
    if (this.currentUser.firstname == null || this.currentUser.firstname == '') {
      alert('กรุณากรอกข้อมูลส่วนตัวให้ครบ')
      this.$router.push('/profile')
    }
  },
  methods: {
    getshph() {
      if (this.currentUser.role_id == 5) {
        // shphId = this.currentUser.shphId
        DoctorShphService.getdoctorandshphmasseuse(this.currentUser.role_id, '').then((res) => {
          this.shphlist = res.data
          console.log(this.shphlist);

        })
      }
      if (this.currentUser.role_id == 1) {
        // shphId = this.currentUser.shphId
        DoctorShphService.getdoctorandshphmasseuse('', this.currentUser.id).then((res) => {
          this.shphlist = res.data
          console.log(this.shphlist);

        })
      }
      //   if (this.currentUser.role_id == 1) {
      //       this.$router.push('/plandoctor?id='+this.currentUser.id)
      //     }else if (this.shphlist.length == 1) {
      //       this.$router.push('/plandoctor?id='+this.shphlist[0].id)
      //     }
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vertical-menu {
  background-color: #eee;
}

.vertical-menu a {
  background-color: #eee;
  color: black;
  display: block;
  padding: 12px;
  text-decoration: none;
}

.vertical-menu a:hover {
  background-color: #ccc;
}

.vertical-menu a.active {
  background-color: #04aa6d;
  color: white;
}

.card {
  margin: 0 auto;
  /* Added */
  float: none;
  /* Added */
  margin-bottom: 10px;
  /* Added */
}

body {
  background-color: gray;
}</style>
