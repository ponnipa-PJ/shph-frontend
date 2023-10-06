<template>
  <div class="container">

    <div class="row mt-5">
      <div class="col-md-6" style="width: 100%; overflow-y: scroll; height: 600px">
        <div class="card">
          <div class="card-body">
            <h5 style="text-align: center" class="mt-3">
              ส่วนของลูกค้า
            </h5>
            <ul class="list-group list-group-unbordered mb-3 mt-5">

              <li class="list-group-item">
                <b>วันที่เข้ารับการบริการ</b> <a class="float-right">{{ convertdate(data.date) }} {{ data.time }}</a>
              </li>
              <li class="list-group-item">
                <b>UID</b> <a class="float-right">{{ data.UID }}</a>
              </li>
              <li class="list-group-item">
                <b>ชื่อ-นามสกุล</b> <a class="float-right">{{ data.firstname }} {{ data.lastname }}</a>
              </li>
              <li class="list-group-item" v-for="(h, r) in history_users" :key="r">
                <b>{{ h.name }}</b> <a class="float-right">{{ h.detail }}</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div class="col-md-6" style="width: 100%; overflow-y: scroll; height: 600px">
        <div class="card">
          <div class="card-body">
            <h5 style="text-align: center" class="mt-3">
              ส่วนของหมอ
            </h5>
              <div class="card-header p-2" v-if="doctor">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">รายละเอียด</a></li>
                  <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab">ประวัติการตรวจ</a></li>
                </ul>
              </div>
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane active" id="activity">
                      <div class="form-group row" v-for="(h, r) in history_doctor" :key="r">
                        <label for="inputName" class="col-sm-4 col-form-label">{{ h.name }}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="inputName" placeholder="Name" v-model="h.detail">
                        </div>
                      </div>

                      <div class="form-group row">
                        <div class="offset-sm-4 col-sm-8">
                          <button @click="save()" class="btn btn-success">บันทึก</button>
                        </div>
                      </div>

                  </div>

                  <div class="tab-pane" id="timeline">
                    <div class="card">
  <div class="card-header">
    <h3 class="card-title">Collapsible Card Example</h3>
    <div class="card-tools">
      <!-- Collapse Button -->
      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
    </div>
    <!-- /.card-tools -->
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    The body of the card
  </div>
  <!-- /.card-body -->
</div>
<!-- /.card -->

<table class="table table-striped">
<thead>
<tr>
<th style="width: 10px">#</th>
<th>Task</th>
<th>Progress</th>
<th style="width: 40px">Label</th>
</tr>
</thead>
<tbody>
<tr>
<td>1.</td>
<td>Update software</td>
<td>
<div class="progress progress-xs">
<div class="progress-bar progress-bar-danger" style="width: 55%"></div>
</div>
</td>
<td><span class="badge bg-danger">55%</span></td>
</tr>
<tr>
<td>2.</td>
<td>Clean database</td>
<td>
<div class="progress progress-xs">
<div class="progress-bar bg-warning" style="width: 70%"></div>
</div>
</td>
<td><span class="badge bg-warning">70%</span></td>
</tr>
<tr>
<td>3.</td>
<td>Cron job running</td>
<td>
<div class="progress progress-xs progress-striped active">
<div class="progress-bar bg-primary" style="width: 30%"></div>
</div>
</td>
<td><span class="badge bg-primary">30%</span></td>
</tr>
<tr>
<td>4.</td>
<td>Fix and squish bugs</td>
<td>
<div class="progress progress-xs progress-striped active">
<div class="progress-bar bg-success" style="width: 90%"></div>
</div>
</td>
<td><span class="badge bg-success">90%</span></td>
</tr>
</tbody>
</table>

                  </div>


                </div>

              </div>
            </div>

        </div>
      </div>
    </div>
    <!-- <a target="_blank" :href="urlAuth">เชื่อมต่อ LINE</a> -->
  </div>
</template>

<script>

import MapHistoryMasseuseService from '../services/MapHistoryMasseuseService.js'
import MapEventsService from '../services/MapEventsService.js'
import HistorymasseuseService from '../services/HistorymasseuseService'
import EventService from '../services/EventService'
import MapHistoryDoctorMasseuseService from '../services/MapHistoryDoctorMasseuseService'

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      mapId: 0,
      history_users: [],
      data: {},
      history_doctor:[],
      doctor:true
    };
  },
  async mounted() {
    this.mapId = this.$route.query.id
    // console.log(this.$route.query.id);
    this.gethistoryuser()

  },
  methods: {
    save(){
      var his = 'UPDATE history_doctor_masseuse SET '
                          for (let h = 0; h < this.history_doctor.length; h++) {
                            his += this.history_doctor[h].historyuserdentistId + " = " + "'" + this.history_doctor[h].detail + "'" + ','
                          }
                          his = his.slice(0, -1)
                          // his = his + ') '
                          // console.log(his);
                          // console.log(value);
                          var sql = his + ` WHERE id = ${this.mapId}`
                          console.log(sql);
                          EventService.createsql(sql).then(() => {
                          });
    },
    convertdate(date) {
      var d = new Date(date)
      var result = ''
      result = d.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return result
    },
    gethistoryuser() {
      this.gethistorydoctor()
      MapHistoryMasseuseService.getmap_history_user_masseuses(1).then((res) => {
        this.history_users = res.data
        console.log(this.history_users);
        this.getmap()
      })
    },
    gethistorydoctor() {
      MapHistoryDoctorMasseuseService.getmap_history_doctor_masseuses(1).then((res) => {
        this.history_doctor = res.data
        // console.log(this.history_doctor);
        // this.getmap()
      })
    },
    getmap() {
      MapEventsService.getmap_event(this.mapId).then((res) => {
        console.log(res.data);
        console.log(this.history_users);
        if (res.data) {
          this.data = res.data
          for (let h = 0; h < this.history_users.length; h++) {
            this.history_users[h].detail = res.data[this.history_users[h].historyuserdentistId]
          }
          HistorymasseuseService.getdoctorhistory(this.mapId).then((res)=>{
            console.log(res.data);
            if (res.data.length == 0) {
              var his = 'INSERT INTO history_doctor_masseuse (id, eventId,'
                      var value = "VALUES (NULL, " + this.mapId +  ","
                      for (let h = 0; h < this.history_users.length; h++) {
                        his += this.history_users[h].historyuserdentistId + ','
                        value += "'" + this.history_users[h].detail + "'" + ','
                      }
                      his = his.slice(0, -1)
                      his = his + ') '
                      value = value.slice(0, -1);
                      value = value + ') '
                      // console.log(his);
                      // console.log(value);
                      var sql = his + value
                      console.log(sql);
                      EventService.createsql(sql).then(() => {
                      })
            }else{
              for (let h = 0; h < this.history_doctor.length; h++) {
            this.history_doctor[h].detail = res.data[this.history_doctor[h].historyuserdentistId]
          }
          this.doctor = false
          console.log(this.history_doctor);
            }
          })
        }
      });

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
}
</style>
