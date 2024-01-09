<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-md-4 mt-3"
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
                <!-- <b>เลขบัตรประชาชน</b> <a class="float-right">{{ data.UID }}</a> -->
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
        class="col-md-8 mt-3 mb-5"
        style="width: 100%; overflow-y: scroll; height: 600px"
      >
        <div class="card">
          <div class="card-body">
            <h5 style="text-align: center" class="mt-3">ส่วนของหมอ</h5>
            <div class="card-header p-2">
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link active" href="#activity" data-toggle="tab"
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
            <div class="card-body">
              <div class="tab-content" v-if="doctor">
                <div class="tab-pane active" id="activity">
                  <label>ประเภทการ{{ nametype.masseuse }}</label
                  ><br />
                  <div class="form-group">
                    <div
                      class="custom-control custom-checkbox"
                      v-for="(i, r) in masseusetypes"
                      :key="r"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="'checkbox' + i.id"
                        :value="i.id"
                        :name="'checkbox' + i.id"
                        v-model="masseusetype"
                        disabled
                      />
                      <label
                        :for="'checkbox' + i.id"
                        class="form-check-label"
                        >{{ i.name }}</label
                      >
                    </div>
                  </div>
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

                  <div
                    class="form-group row"
                    v-if="currentUser.role_id == 1 || currentUser.role_id == 7"
                  >
                    <div class="offset-sm-4 col-sm-8 mb-5">
                      <button @click="save()" class="btn btn-success">
                        บันทึก
                      </button>&nbsp;
                      <a :href="'/BookMakingAppointmentMasseuse?id='+currentUser.id+'&&userId='+userId" >
                      <button class="btn btn-warning">
                        นัดหมาย
                      </button>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="tab-pane" id="timeline">
                  <div id="accordion">
                    <div v-if="hiscases.length > 0">
                      <div class="card" v-for="(h, i) in hiscases" :key="i">
                        <div class="card-header" :id="h.idtab">
                          <h5 class="mb-0">
                            <button
                              class="btn btn-link show"
                              data-toggle="collapse"
                              :data-target="h.target"
                              aria-expanded="true"
                              :aria-controls="h.controls"
                            >
                              <div style="text-align: left">
                                {{ changedate(h.date) }}
                              </div>
                              <div style="text-align: left">{{ h.time }}</div>
                            </button>
                          </h5>
                        </div>

                        <div
                          :id="h.controls"
                          class="collapse"
                          :aria-labelledby="h.idtab"
                          data-parent="#accordion"
                        >
                          <div>
                            <div class="form-group mt-3">
                              <label
                                >&nbsp;&nbsp;&nbsp;ประเภทการ{{
                                  nametype.masseuse
                                }}</label
                              ><br />
                              <div class="form-group">
                                <div
                                  class="custom-control custom-checkbox"
                                  v-for="(i, r) in masseusetypes"
                                  :key="r"
                                >
                                  &nbsp;&nbsp;&nbsp;<input
                                    class="form-check-input"
                                    type="checkbox"
                                    :id="'checkbox' + i.id"
                                    :value="i.id"
                                    :name="'checkbox' + i.id"
                                    v-model="h.case.type"
                                    disabled
                                  />
                                  <label
                                    :for="'checkbox' + i.id"
                                    class="form-check-label"
                                    >{{ i.name }}</label
                                  >
                                </div>
                              </div>
                            </div>
                            <ul class="list-group mb-3">
                              <li
                                class="list-group-item"
                                v-for="(m, r) in mapcase"
                                :key="r"
                              >
                                <b>{{ m.name }}</b>
                                <a class="float-right">{{
                                  h.case[m.historyuserdentistId]
                                }}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 mt-5" v-else>
                      <h5 style="text-align: center">
                        ไม่พบประวัติการรับบริการ{{ nametype.masseuse }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <a  :href="urlAuth">เชื่อมต่อ LINE</a> -->
  </div>
</template>

<script>
import MapHistoryMasseuseService from "../services/MapHistoryMasseuseService.js";
import MapEventsService from "../services/MapEventsService.js";
import HistorymasseuseService from "../services/HistorymasseuseService";
import EventService from "../services/EventService";
import MapHistoryDoctorMasseuseService from "../services/MapHistoryDoctorMasseuseService";
import MasseuseTypeService from "../services/MasseuseTypeService";

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
      mapdata: {},
      hiscases: [],
      mapcase: [],
      userId: 0,
      masseusetypes: [],
      masseusetype: [],
      nametype: {},
    };
  },
  async mounted() {
    this.nametype = JSON.parse(localStorage.getItem("types"));

    this.mapId = this.$route.query.id;
    // console.log(this.$route.query.id);
    this.gethistoryuser();
    MapEventsService.getmap_event(this.mapId).then((res) => {
      this.userId = res.data.userId;

      this.gethistorycases();
    });
    this.getmapcases();
    this.getmasseusetypes();
  },
  methods: {
    getmasseusetypes() {
      MasseuseTypeService.getmasseusetypes(1).then((res) => {
        // console.log(res.data);
        this.masseusetypes = res.data;
      });
    },
    changedate(date) {
      var d = new Date(date);
      var result = d.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return result;
    },
    gethistorycases() {
      MapHistoryDoctorMasseuseService.gethistory_doctor_masseuse(
        this.userId,
        ""
      ).then((res) => {
        // console.log(res.data);
        this.hiscases = res.data;
      });
    },
    save() {
      var txt = "";
      var statushis = false;
      for (let h = 0; h < this.history_doctor.length; h++) {
        if (
          this.history_doctor[h].detail == null ||
          this.history_doctor[h].detail == ""
        ) {
          statushis = true;
          txt = this.history_doctor[h].name;
          break;
        }
      }
      if (statushis == true) {
        alert("กรุณากรอก" + txt);
      } else {
        HistorymasseuseService.getdoctorhistory(this.mapId).then((res) => {
          var his = "UPDATE history_doctor_masseuse SET status = 1 ,";
          for (let h = 0; h < this.history_doctor.length; h++) {
            his +=
              this.history_doctor[h].historyuserdentistId +
              " = " +
              "'" +
              this.history_doctor[h].detail +
              "'" +
              ",";
          }
          his = his.slice(0, -1);
          var sql = his + ` WHERE id = ${res.data.id}`;
          console.log(sql);
          EventService.createsql(sql).then(() => {
            var eventId = JSON.parse(this.mapdata.eventIdlist);
            for (let m = 0; m < eventId.length; m++) {
              var updateevent =
                'UPDATE events SET title = "ตรวจแล้ว" where id = ' + eventId[m];
              EventService.createsql(updateevent).then(() => {
                var le = JSON.parse(this.mapdata.eventIdlist).length;
                if (m + 1 == le) {
                  alert("บันทึกสำเร็จ");
                  this.gethistorycases();
                }
              });
            }
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
      MapHistoryMasseuseService.getmap_history_user_masseuses(1).then((res) => {
        this.history_users = res.data;
        console.log(this.history_users);
        this.getmap();
      });
    },
    getmapcases() {
      MapHistoryDoctorMasseuseService.getmap_history_doctor_masseuses(1).then(
        (res) => {
          this.mapcase = res.data;
          // console.log(this.history_doctor);
          // this.getmap()
        }
      );
    },
    gethistorydoctor() {
      MapHistoryDoctorMasseuseService.getmap_history_doctor_masseuses(1).then(
        (res) => {
          this.history_doctor = res.data;
          // console.log(this.history_doctor);
          // this.getmap()
        }
      );
    },
    getmap() {
      MapEventsService.getmap_event(this.mapId).then((res) => {
        console.log(res.data);
        // console.log(this.history_users);
        this.mapdata = res.data;
        this.masseusetype = res.data.type;
        if (res.data) {
          this.data = res.data;
          for (let h = 0; h < this.history_users.length; h++) {
            this.history_users[h].detail =
              res.data[this.history_users[h].historyuserdentistId];
          }
          HistorymasseuseService.getdoctorhistory(this.mapId).then((res) => {
            console.log(res.data);
            if (res.data.length == 0) {
              var his = "INSERT INTO history_doctor_masseuse (id, eventId,";
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
              EventService.createsql(sql).then(() => {
                HistorymasseuseService.getdoctorhistory(this.mapId).then(
                  (res) => {
                    for (let h = 0; h < this.history_doctor.length; h++) {
                      this.history_doctor[h].detail =
                        res.data[this.history_doctor[h].historyuserdentistId];
                      if (h + 1 == this.history_doctor.length) {
                        this.doctor = true;
                      }
                    }
                  }
                );
              });
            } else {
              for (let h = 0; h < this.history_doctor.length; h++) {
                this.history_doctor[h].detail =
                  res.data[this.history_doctor[h].historyuserdentistId];
                if (h + 1 == this.history_doctor.length) {
                  this.doctor = true;
                }
              }
              console.log(this.history_doctor);
            }
          });
        }
      });
    },
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
