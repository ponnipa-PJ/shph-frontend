<template>
  <div class="row">
    <div class="container-fluid">
      <div class="row mt-5">
        <div
          class="col-md-4"
          style="width: 100%; overflow-y: scroll; height: 600px"
        >
          <div class="card">
            <div class="card-body">
              <h5 style="text-align: center" class="mt-3">ส่วนของลูกค้า</h5>
              <ul class="list-group list-group-unbordered mb-3 mt-5">
                <li class="list-group-item">
                  <b>วันที่เข้ารับการบริการ</b>
                  <a class="float-right"
                    >{{ convertdate(data.date) }} {{ data.time }}</a
                  >
                </li>
                <li class="list-group-item">
                  <b>UID</b> <a class="float-right">{{ data.UID }}</a>
                </li>
                <li class="list-group-item">
                  <b>ชื่อ-นามสกุล</b>
                  <a class="float-right"
                    >{{ data.firstname }} {{ data.lastname }}</a
                  >
                </li>
                <li
                  class="list-group-item"
                  v-for="(h, r) in history_users"
                  :key="r"
                >
                  <b>{{ h.name }}</b> <a class="float-right">{{ h.detail }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="col-md-8"
          style="width: 100%; overflow-y: scroll; height: 600px"
        >
          <div class="card">
            <div class="card-body">
              <h5 style="text-align: center" class="mt-3">ส่วนของหมอ</h5>
              <div class="card-header p-2" v-if="doctor">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#activity"
                      data-toggle="tab"
                      >รายละเอียด</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#timeline" data-toggle="tab"
                      >ประวัติการตรวจ</a
                    >
                  </li>
                </ul>
              </div>
              <div class="card-body" v-if="doctor">
                <div class="tab-content">
                  <div class="tab-pane active" id="activity">
                    <div
                      class="form-group row"
                      v-for="(h, r) in history_doctor"
                      :key="r"
                    >
                      <label for="inputName" class="col-sm-4 col-form-label">{{
                        h.name
                      }}</label>
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="inputName"
                          :placeholder="h.name"
                          v-model="h.detail"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="offset-sm-4 col-sm-8">
                        <button @click="save()" class="btn btn-success">
                          บันทึก
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane" id="timeline">
                    <div id="accordion">
                      <div class="card" v-for="(h,i) in hiscases" :key="i">
                        <div class="card-header" :id="h.idtab">
                          <div class="modal-header">
                            <!-- <button
                              class="btn btn-link show"
                              data-toggle="collapse"
                              :data-target="h.target"
                              aria-expanded="true"
                              :aria-controls="h.controls"
                            >
                           <div style="text-align:left">{{changedate(h.date)}} </div> 
                           <div style="text-align:left">{{h.time}}</div>
                            </button> -->
                            <h5 class="modal-title"><div style="text-align:left">{{changedate(h.date)}} {{h.time}} </div> </h5>

                            <button type="button" class="close" data-toggle="collapse" :data-target="h.target" aria-expanded="true"  :aria-controls="h.controls">
          <i class="fa fa-angle-down"></i>
        </button>
      </div>
                        </div>

                        <div
                          :id="h.controls"
                          class="collapse"
                          :aria-labelledby="h.idtab"
                          data-parent="#accordion"
                        >
                          <div>
                            <ul class="list-group mb-3">
<li class="list-group-item" v-for="(m, r) in mapcase" :key="r">
  <b>{{ m.name }}</b> <a class="float-right">{{h.case[m.historyuserdentistId]}}</a>
</li>
</ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <a target="_blank" :href="urlAuth">เชื่อมต่อ LINE</a> -->
    </div>
  </div>
</template>

<script>
import MapHistoryDentistService from "../services/MapHistoryDentistService";
import MapEventsDentistService from "../services/MapEventsDentistService";
import HistorydentistService from "../services/HistorydentistService";
import EventDentistService from "../services/EventDentistService";
import MapHistoryDoctorDentistService from "../services/MapHistoryDoctorDentistService";

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
      history_doctor: [],
      doctor: false,
      hiscases:[],
      mapcase:[],
      userId:0
    };
  },
  async mounted() {
    this.mapId = this.$route.query.id;
    MapEventsDentistService.getmap_events_dentist(this.mapId).then((res) => {
        this.userId = res.data.userId

        this.gethistorycases()
    });

    // console.log(this.$route.query.id);
    this.gethistoryuser();
  },
  methods: {
    changedate(date){
      var d = new Date(date)
      var result = d.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return result
    },
    gethistorycases(){
      console.log(this.userId);
      MapHistoryDoctorDentistService.gethistory_doctor_dentist(this.userId,'').then((res)=>{
        console.log(res.data);
        this.hiscases = res.data
      })
    },
    getmapcases() {
      MapHistoryDoctorDentistService.getmap_history_doctor_dentists(1).then((res) => {
        this.mapcase = res.data
        // console.log(this.mapcase);
        // this.getmap()
      })
    },
    save() {
      var txt = ''
      var statushis = false
      for (let h = 0; h < this.history_doctor.length; h++) {
        if (this.history_doctor[h].detail == null || this.history_doctor[h].detail == "") {
          statushis = true
          txt = this.history_doctor[h].name
          break;
        }
      }
      if (statushis == true) {
            alert('กรุณากรอก' + txt)
          }else{
      HistorydentistService.getdoctorhistory(this.mapId).then((res) => {
        var his = "UPDATE history_doctor_dentist SET ";
        for (let h = 0; h < this.history_doctor.length; h++) {
          if (!this.history_doctor[h].detail) {
            this.history_doctor[h].detail = "";
          }
          if (
            this.history_doctor[h].detail != " " ||
            this.history_doctor[h].detail != null ||
            this.history_doctor[h].detail != "null"
          ) {
            his +=
              this.history_doctor[h].historyuserdentistId +
              " = " +
              "'" +
              this.history_doctor[h].detail +
              "'" +
              ",";
          }
        }
        his = his.slice(0, -1);
        // his = his + ') '
        // console.log(his);
        // console.log(value);
        var sql = his + ` WHERE id = ${res.data.id}`;
        console.log(sql);
        EventDentistService.createsql(sql).then(() => {
          alert("บันทึกสำเร็จ");
          location.reload();
        });
      });
   
     }
     },
    convertdate(date) {
      var d = new Date(date);
      var result = "";
      result = d.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return result;
    },
    gethistoryuser() {
      this.gethistorydoctor();
      MapHistoryDentistService.getmap_history_user_dentists(1).then((res) => {
        this.history_users = res.data;
        // console.log(this.history_users);
        this.getmap();
      });
    },
    gethistorydoctor() {
      MapHistoryDoctorDentistService.getmap_history_doctor_dentists(1).then(
        (res) => {
          this.history_doctor = res.data;
          // console.log(this.history_doctor);
          // this.getmap()
        }
      );
    },
    getmap() {
      MapEventsDentistService.getmap_events_dentist(this.mapId).then((res) => {

    this.getmapcases()
        // console.log(this.history_users);
        if (res.data) {
          this.data = res.data;
          for (let h = 0; h < this.history_users.length; h++) {
            this.history_users[h].detail =
              res.data[this.history_users[h].historyuserdentistId];
          }
          HistorydentistService.getdoctorhistory(this.mapId).then((res) => {
            console.log(res.data);
            if (res.data.length == 0) {
              var his = "INSERT INTO history_doctor_dentist (id, eventId,";
              var value = "VALUES (NULL, " + this.mapId + ",";
              for (let h = 0; h < this.history_users.length; h++) {
                his += this.history_users[h].historyuserdentistId + ",";
                value += "'" + this.history_users[h].detail + "'" + ",";
              }
              his = his.slice(0, -1);
              his = his + ") ";
              value = value.slice(0, -1);
              value = value + ") ";
              // console.log(his);
              // console.log(value);
              var sql = his + value;
              console.log(sql);
              EventDentistService.createsql(sql).then(() => {
                HistorydentistService.getdoctorhistory(this.mapId).then((res) => {
                for (let h = 0; h < this.history_doctor.length; h++) {
                this.history_doctor[h].detail =
                  res.data[this.history_doctor[h].historyuserdentistId];
              if (h+1 == this.history_doctor.length) {
          this.doctor = true
              
            }
          }
              });
            });
            } else {
              for (let h = 0; h < this.history_doctor.length; h++) {
                this.history_doctor[h].detail =
                  res.data[this.history_doctor[h].historyuserdentistId];
              if (h+1 == this.history_doctor.length) {
          this.doctor = true
              
            }
              }
            }
          });
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
