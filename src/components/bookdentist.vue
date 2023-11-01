<template>
  <div class="row">
    <div class="container">
      <h5 class="mt-5" style="text-align: center">{{ shphName }}</h5>
      <h5 class="mb-5" style="text-align: center">จองคิวหมอ{{nametype.dentist}}ประจำเดือน</h5>
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ converttime(arg.timeText) }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
      <div class="col mb-3 mt-3" style="text-align: right">
        <a>
          <button
            style="display: none"
            type="button"
            id="AddEvent"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#AddUser"
          >
            <i class="fa fa-plus"></i> จองคิวเข้ารับการบริการ
          </button></a
        >
      </div>
      <div
        class="modal fade"
        id="AddUser"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
            </div>
            <div class="modal-body">
              <div class="col-12 col-sm-12">
                <div class="card card-primary card-tabs">
                  <div class="card-header p-0 pt-1">
                    <ul
                      class="nav nav-tabs"
                      id="custom-tabs-one-tab"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          @click="selectbook()"
                          id="custom-tabs-one-home-tab"
                          data-toggle="pill"
                          href="#custom-tabs-one-home"
                          role="tab"
                          aria-controls="custom-tabs-one-home"
                          aria-selected="true"
                          >จองคิว</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          @click="selecthistory()"
                          id="booktab"
                          data-toggle="pill"
                          href="#custom-tabs-one-profile"
                          role="tab"
                          aria-controls="custom-tabs-one-profile"
                          aria-selected="false"
                          >ประวัติการจอง</a
                        >
                      </li>
                      <!-- <li class="nav-item">
                      <a class="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill"
                        href="#custom-tabs-one-messages" role="tab" aria-controls="custom-tabs-one-messages"
                        aria-selected="false">Messages</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="custom-tabs-one-settings-tab" data-toggle="pill"
                        href="#custom-tabs-one-settings" role="tab" aria-controls="custom-tabs-one-settings"
                        aria-selected="false">Settings</a>
                    </li> -->
                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" id="custom-tabs-one-tabContent">
                      <div
                        class="tab-pane fade active show"
                        id="custom-tabs-one-home"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-one-home-tab"
                      >
                        <form>
                          <div class="card-body" style="padding: 0px">
                            <div class="form-group mt-3">
                              <label for="password">ประเภทการจอง</label>
                              <div class="form-group">
                                <div
                                  class="custom-control custom-checkbox"
                                  v-for="(i, r) in booktype"
                                  :key="r"
                                  :value="i.id"
                                  @change="gettype()"
                                >
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="radio1"
                                    :id="i.id"
                                    :value="i.id"
                                    v-model="typebook"
                                  />
                                  <label :for="i.id" class="form-check-label">{{
                                    i.name
                                  }}</label>
                                </div>
                              </div>
                            </div>
                            <div
                              class="form-group mt-3"
                              style="margin-bottom: 0px"
                              v-if="typebook == 2"
                            >
                              <label for="password">เลขบัตรประชาชน</label>
                            </div>

                            <div
                              class="input-group input-group-sm"
                              v-if="typebook == 2"
                            >
                              <input
                                type="text"
                                class="form-control"
                                v-model="uid"
                              />
                              <span class="input-group-append">
                                <button
                                  type="button"
                                  class="btn btn-info btn-flat"
                                  @click="searchuid()"
                                >
                                  ค้นหา
                                </button>
                              </span>
                            </div>
                            <div
                              class="form-group mt-3"
                              style="margin-bottom: 0px"
                              v-if="cusname != {}"
                            >
                              <label for="password">
                                <span v-if="cusname"
                                  >{{ cusname.UID }} {{ cusname.firstname }}
                                  {{ cusname.lastname }}</span
                                >
                                <span v-else>ไม่พบข้อมูล</span></label
                              >
                            </div>

                            <div class="form-group">
                              <label>หมอ{{nametype.dentist}}</label><br />
                              <div class="form-group">
                                <div
                                  class="custom-control custom-checkbox"
                                  v-for="(i, r) in doctors"
                                  :key="r"
                                >
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    :name="'radio' + i.id"
                                    :id="i.id"
                                    :value="i.id"
                                    v-model="doctor_id"
                                  />
                                  <label :for="i.id" class="form-check-label"
                                    >{{ i.firstname }} {{ i.lastname }}</label
                                  >
                                </div>
                                <div v-if="doctors.length == 0">
                                  ไม่พบหมอที่ให้บริการวันที่เลือก
                                </div>
                              </div>
                              <label>ประเภท{{nametype.dentist}}</label><br />
                              <div class="form-group">
                              <div class="custom-control custom-checkbox" v-for="(i, r) in dentisttype" :key="r">
                                <input class="form-check-input" type="checkbox" :id="'checkbox' + i.id" :value="i.id" :name="'checkbox' + i.id"
                                  v-model="dentisttypeuser">
                                <label :for="'checkbox' + i.id" class="form-check-label">{{ i.name }}</label>
                              </div>
                            </div>
                              <div
                                class="form-group"
                                v-for="(h, r) in history"
                                :key="r"
                              >
                                <label>{{ h.name }}</label>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="h.detail"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                        <button
                          type="button"
                          class="btn btn-success"
                          @click="save()"
                        >
                          จองคิว
                        </button>
                        <!-- <button id="closeduser" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              ปิด
            </button> -->
                      </div>
                      <div
                        class="tab-pane fade"
                        id="custom-tabs-one-profile"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-one-profile-tab"
                      >
                        <table class="table table-bordered" v-if="showbook">
                          <thead>
                            <tr>
                              <th style="width: 10px">#</th>
                              <th>ชื่อ-นามสกุล</th>
                              <th>ประเภทการจอง</th>
                              <th>หมอ</th>
                              <th>เวลา</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(b, i) in booklist" :key="i">
                              <td>{{ i + 1 }}</td>
                              <td>{{ b.firstname }} {{ b.lastname }}</td>
                              <td>
                                {{ b.type }}
                              </td>
                              <td>
                                {{ b.docfirstname }} {{ b.doclastname }}
                              </td>
                              <td>
                                {{ b.time }}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  class="btn btn-warning"
                                  @click="edit(b.id)"
                                >
                                  แก้ไข
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div v-else>
                          <form>
                            <div class="card-body" style="padding: 0px">
                              <div class="form-group mt-3">
                                <label for="password">ประเภทการจอง</label>
                                <div class="form-group">
                                  <div
                                    class="custom-control custom-checkbox"
                                    v-for="(i, r) in booktype"
                                    :key="r"
                                    :value="i.id"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="radio1"
                                      :id="i.id"
                                      disabled
                                      :value="i.id"
                                      v-model="typebookupdate"
                                    />
                                    <label
                                      :for="i.id"
                                      class="form-check-label"
                                      >{{ i.name }}</label
                                    >
                                  </div>
                                </div>
                              </div>
                              <div
                                class="form-group mt-3"
                                v-if="book.typebook == 2"
                              >
                                <label for="password">ชื่อลูกค้า</label><br />
                                <label for="password"
                                  >{{ book.firstname }}
                                  {{ book.lastname }}</label
                                >
                              </div>
                              <div class="form-group">
                                <label>หมอ{{nametype.dentist}}</label><br />
                                <div class="form-group">
                                  <div
                                    class="custom-control custom-checkbox"
                                    v-for="(i, r) in doctorsupdate"
                                    :key="r"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      :name="'radio' + i.id"
                                      :id="i.id"
                                      :value="i.id"
                                      v-model="doctor_id"
                                    />
                                    <label :for="i.id" class="form-check-label"
                                      >{{ i.firstname }} {{ i.lastname }}</label
                                    >
                                  </div>
                                  <div v-if="doctorsupdate.length == 0">
                                    ไม่พบหมอที่ให้บริการวันที่เลือก
                                  </div>
                                </div>
                                <label>ประเภท{{nametype.dentist}}</label><br />
                              <div class="form-group">
                              <div class="custom-control custom-checkbox" v-for="(i, r) in dentisttype" :key="r">
                                <input class="form-check-input" type="checkbox" :id="'checkboxupdate' + i.id" :value="i.id" :name="'checkbox' + i.id"
                                  v-model="dentisttypeuserupdate">
                                <label :for="'checkboxupdate' + i.id" class="form-check-label">{{ i.name }}</label>
                              </div>
                            </div>
                                <div
                                  class="form-group"
                                  v-for="(h, r) in history_update"
                                  :key="r"
                                >
                                  <label>{{ h.name }}</label>
                                  <div class="input-group">
                                    <input
                                      type="text"
                                      class="form-control form-control-sm"
                                      v-model="h.detail"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          <button
                            type="button"
                            class="btn btn-success"
                            @click="update()"
                          >
                            บันทึก</button
                          >&nbsp;
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="deleteque()"
                          >
                            ยกเลิกการจอง</button
                          >&nbsp;
                          <button
                            type="button"
                            class="btn btn-info"
                            @click="back()"
                          >
                            ย้อนกลับ
                          </button>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="custom-tabs-one-messages"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-one-messages-tab"
                      >
                        Morbi turpis dolor, vulputate vitae felis non, tincidunt
                        congue mauris. Phasellus volutpat augue id mi placerat
                        mollis. Vivamus faucibus eu massa eget condimentum.
                        Fusce nec hendrerit sem, ac tristique nulla. Integer
                        vestibulum orci odio. Cras nec augue ipsum. Suspendisse
                        ut velit condimentum, mattis urna a, malesuada nunc.
                        Curabitur eleifend facilisis velit finibus tristique.
                        Nam vulputate, eros non luctus efficitur, ipsum odio
                        volutpat massa, sit amet sollicitudin est libero sed
                        ipsum. Nulla lacinia, ex vitae gravida fermentum, lectus
                        ipsum gravida arcu, id fermentum metus arcu vel metus.
                        Curabitur eget sem eu risus tincidunt eleifend ac ornare
                        magna.
                      </div>
                      <div
                        class="tab-pane fade"
                        id="custom-tabs-one-settings"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-one-settings-tab"
                      >
                        Pellentesque vestibulum commodo nibh nec blandit.
                        Maecenas neque magna, iaculis tempus turpis ac, ornare
                        sodales tellus. Mauris eget blandit dolor. Quisque
                        tincidunt venenatis vulputate. Morbi euismod molestie
                        tristique. Vestibulum consectetur dolor a vestibulum
                        pharetra. Donec interdum placerat urna nec pharetra.
                        Etiam eget dapibus orci, eget aliquet urna. Nunc at
                        consequat diam. Nunc et felis ut nisl commodo dignissim.
                        In hac habitasse platea dictumst. Praesent imperdiet
                        accumsan ex sit amet facilisis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer mt-3">
              <!-- <button type="button" class="btn btn-danger" @click="deleteque()" v-if="!allday">
              ยกเลิกการจอง
            </button>
            <button type="button" class="btn btn-success" @click="save()" v-if="allday && doctors.length > 0">
              ยืนยันการจอง
            </button> -->

              <button
              @click="close()"
                id="closeduser"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src='../assets/locale/th'></script>

<script>
import DoctorService from "../services/DoctorService";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventDentistService from "../services/EventDentistService";
import UserService from "../services/UserService";
import LinkImageService from "../services/LinkImageService";
import NotificationService from "../services/NotificationService";
import esLocale from "@fullcalendar/core/locales/th";
import shphService from "../services/shphService";
import HistorydentistService from "../services/HistorydentistService";
import MapEventsDentistService from "../services/MapEventsDentistService";
import MapHistoryDentistService from "../services/MapHistoryDentistService";
import DentistTypeService from "../services/DentistTypeService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        weekends: true,
        eventClick: this.handleEventClick,
        views: {
          dayGridMonth: {
            dayHeaderFormat: {
              weekday: "long",
            },
          },
        },
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "timeGridWeek,dayGridMonth",
        },
        height: 850,
        locale: esLocale,
        scrollTime: "08:00",
        omitZeroMinute: false,
        slotLabelFormat: {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        },
        events: [],
      },
      event_id: 0,
      alltoken: [],
      book: {},
      events: [],
      list: [],
      user_id: 0,
      title: "",
      courses: [],
      course_id: [],
      days: [],
      doctor_id: "",
      day: [
        {
          id: 1,
          nameth: "วันจันทร์",
          nameen: "MON",
        },
        {
          id: 2,
          nameth: "วันอังคาร",
          nameen: "TUE",
        },
        {
          id: 3,
          nameth: "วันพุธ",
          nameen: "WED",
        },
        {
          id: 4,
          nameth: "วันพฤหัสบดี",
          nameen: "THUR",
        },
        {
          id: 5,
          nameth: "วันศุกร์",
          nameen: "FRI",
        },
      ],
      doctors: [],
      header: "",
      allday: true,
      noti: {},
      limitdoc: [],
      date: "",
      shphId: 0,
      shphName: "",
      userId: "",
      showbook: true,
      booktype: [],
      booklist: [],
      typebook: 1,
      typebookupdate: 1,
      doctorsupdate: [],
      event_id_update: 0,
      history_update: [],
      eventId_update: 0,
      userId: 0,
      uid: "",
      cusname: {},
      history: [],
      eventId: 0,
      timeline: "",
      timelineupdate: "",
      mapId: 0,
      docname:'',
      dentisttype:[],
      dentisttypeuser:[],
      dentisttypeuserupdate:[],
      nametype:{}
    };
  },
  mounted() {
    this.nametype = JSON.parse(localStorage.getItem('types'));

    this.shphId = this.$route.query.id;
    // console.log(this.$route.query.id);
    this.userId = this.currentUser.id;

    shphService.getShph(this.shphId).then((res) => {
      this.shphName = res.data.name;
    });
    this.getEvents();
    this.getUsers();
    this.gettypebook();
    this.gethistory();
    this.getDentisttypes()
    NotificationService.getnotification(1).then((res) => {
      this.noti = res.data;
    });
  },
  methods: {
    gettype(){
      if (this.typebook == 2) {
this.userId = ""
        
      }else{
        this.userId = this.currentUser.id
      }
    },
    getDentisttypes(){
      DentistTypeService.getdentisttypes(1).then((res) => {
      this.dentisttype = res.data;
    });
    },
    close(){
      this.getEvents();
    },
    selecthistory() {
      this.gethistory();
      this.getalleventbycreatedBy();

      this.showbook = true;
    },
    update() {
      UserService.getUser(this.doctor_id).then((res)=>{
        this.docname = res.data.firstname +' '+res.data.lastname
      })
      var statushis = false;
      var txt = "";
      for (let h = 0; h < this.history_update.length; h++) {
        if (
          this.history_update[h].detail == null ||
          this.history_update[h].detail == ""
        ) {
          statushis = true;
          txt = this.history_update[h].name;
          break;
        }
      }
      EventDentistService.geteventbydocanddate(
        this.date,
        this.doctor_id,
        this.shphId
      ).then((res) => {
        this.event_id_update = res.data.id;
        // console.log(res.data);
        this.gettimelineupdate();
        // console.log(res.data);
        if (this.doctor_id == "" || this.doctor_id == null) {
          alert("กรุณาเลือกหมอ"+this.nametype.dentist);
        } else if (1 + res.data.length > this.no_dentist) {
          alert(
            "ไม่สามารถจองคิวหมอ"+this.nametype.dentist+"เกิน " + this.no_dentist + " ครั้งต่อวัน"
          );
        } else if (statushis == true) {
          alert("กรุณากรอก" + txt);
        } else {
          var userdatanull = {
            bookstatus: 1,
            title: "ว่าง",
            userId: null,
            remark: null,
          };

          var userdata = {
            bookstatus: 0,
            title: "จองแล้ว",
            userId: this.userId,
          };
          // console.log(userdata);
          // console.log(res.data);
          EventDentistService.updateuser(this.eventIdupdate, userdatanull).then(
            () => {
              // UserService.getUser(this.book.doctorId).then((res)=>{

  // var message = this.noti.cancel_dentist + ' หมอ' + res.data.firstname + ' '+ res.data.lastname + ' วันที่ ' + this.header + ' ที่' + this.shphName
      // console.log(message);
      // LinkImageService.sendNotify(message, this.currentUser.line_token)
// })
            }
          );
          //             console.log(this.eventIdupdate);
          // console.log(this.event_id_update);
          EventDentistService.updateuser(this.event_id_update, userdata).then(
            () => {
              // console.log(res.data);
              // UserService.getUser(this.event_id)
              var his = {
                eventId: this.eventIdupdate,
                title: "ลบคิว",
                createdBy: this.currentUser.id,
              };
              HistorydentistService.createhistoryhistorydentist(his).then(
                () => {
                  var his = "UPDATE history_user_dentist set ";
                  for (let h = 0; h < this.history_update.length; h++) {
                    his +=
                      this.history_update[h].historyuserdentistId +
                      " = " +
                      "'" +
                      this.history_update[h].detail +
                      "'" +
                      ",";
                  }
                  his = his.slice(0, -1);

                  var sql = his + ` WHERE eventId = ${this.mapId}`;
                  // console.log(sql);
                  EventDentistService.createsql(sql).then(() => {
                    // var message = this.noti.message_dentist + ' หมอ' + this.docname + ' วันที่ ' + this.header + this.timeline + ' ที่' + this.shphName
                    // LinkImageService.sendNotify(this.noti.message_dentist+' หมอ'+ res.data.firstname +' '+ res.data.lastname+' วันที่ ' + this.header, this.currentUser.line_token)
                    var map_events =
                      "UPDATE map_events_dentist SET eventId = " +
                      this.event_id_update +
                      " , time = " +
                      '"' +
                      this.timelineupdate +
                      '"' +
                      " , doctorId = " +
                      '"' +
                      this.doctor_id +
                      '"' 
                      +', type = '+
                      "'[" + this.dentisttypeuserupdate + "]'"
                    map_events = map_events + ` WHERE id = ${this.mapId}`;
                    // console.log(map_events);
                    EventDentistService.createsql(map_events).then(() => {
                      var message =
                        this.noti.message_dentist +
                        " หมอ" +
                        this.docname +
                        " วันที่ " +
                        this.header +
                        " ที่" +
                        this.shphName;
                      // console.log(message);
                      LinkImageService.sendNotify(message, this.currentUser.line_token)
                      // document.getElementById("closeduser").click();
                      this.showbook = true;
                      this.getalleventbycreatedBy();
                      //  location.reload();
                    });

                    // this.getalleventbycreatedBy()
                  });
                }
              );
            }
          );
          //       setTimeout(function () {
          //   location.reload();
          // }, 500);
          // window.scrollTo(0, 0);

          //
        }
      });
    },
    edit(id) {
      this.gethistoryupdate();
      this.showbook = false;
      this.getmap(id);
    },
    getmap(id) {
      // console.log(id);
      this.mapId = id;
      // console.log(this.doctors);
      // console.log(this.book);

      MapEventsDentistService.getmap_events_dentist(id).then((res) => {
        // console.log(res.data);

        this.eventIdupdate = res.data.eventIdlist;
        if (res.data) {
          this.book = res.data;
          this.doctor_id = res.data.doctorId;
          this.userId = res.data.userId;
          this.eventId_update = res.data.eventIdlist;
          this.allday = false;
          this.typebookupdate = res.data.typebook;
          this.dentisttypeuserupdate = JSON.parse(res.data.type)
          // console.log(this.typebookupdate);
          for (let h = 0; h < this.history_update.length; h++) {
            this.history_update[h].detail =
              res.data[this.history_update[h].historyuserdentistId];
          }
        }
        var arrayWithout = [];

        for (let i = 0; i < this.limitdoc.length; i++) {
          // console.log(this.limitdoc[i] , this.doctor_id);
          if (this.limitdoc[i] != this.doctor_id) {
            // console.log(1);
            arrayWithout.push(this.limitdoc[i]);
          }
        }
        // console.log(arrayWithout);
        EventDentistService.getdoctorbydate(
          this.date,
          this.currentUser.id,
          this.doctor_id,
          this.shphId,
          2
        ).then((res) => {
          this.doctorsupdate = res.data;
        });
      });
    },
    gettimeline() {
      // var docname = ''
      // console.log(this.event_id);
      EventDentistService.getevent(this.event_id).then((res) => {
        // console.log(res.data);
        var date = new Date(res.data.date);
        // console.log(end);
        this.timeline =
          "เวลา " +
          date.getHours().toString().padStart(2, "0") +
          ":" +
          date.getMinutes().toString().padStart(2, "0") +
          " น.";
        // }
      });
    },
    gettimelineupdate() {
      // var docname = ''
      // console.log(this.event_id);
      EventDentistService.getevent(this.event_id_update).then((res) => {
        // console.log(res.data);
        var date = new Date(res.data.date);
        // console.log(end);
        this.timelineupdate =
          "เวลา " +
          date.getHours().toString().padStart(2, "0") +
          ":" +
          date.getMinutes().toString().padStart(2, "0") +
          " น.";
        // }
      });
    },
    gethistoryupdate() {
      MapHistoryDentistService.getmap_history_user_dentists(1).then((res) => {
        this.history_update = res.data;
        // console.log(this.history);
      });
    },
    gethistory() {
      MapHistoryDentistService.getmap_history_user_dentists(1).then((res) => {
        this.history = res.data;
        // console.log(this.history);
      });
    },
    back() {
      this.showbook = true;
    },
    selectbook() {
      this.getid();
    },
    searchuid() {
      this.cusname = {};
      UserService.searchuid(this.uid).then((res) => {
        this.cusname = res.data;
        if (this.cusname) {
          this.userId = res.data.id;
        }
      });
    },
    getalleventbycreatedBy() {
      MapEventsDentistService.geteventbycreatedBy(
        this.date,
        this.doctor_id,
        this.currentUser.id,
        this.shphId
      ).then((res) => {
        // console.log(res.data);
        this.booklist = res.data;
      });
    },
    gettypebook() {
      MapEventsDentistService.gettypesbook().then((res) => {
        this.booktype = res.data;
      });
    },
    deleteque() {
      var userdatak = {
        bookstatus: 1,
        title: "ว่าง",
        userId: null,
        remark: null,
      };
      // console.log(this.eventId_update);
      EventDentistService.updateuser(this.eventId_update, userdatak).then (() => {
        // UserService.getUser(this.book.doctorId).then((res)=>{

        //   var message = this.noti.cancel_dentist + ' หมอ' + res.data.firstname + ' '+ res.data.lastname + ' วันที่ ' + this.header + ' ที่' + this.shphName
        //       // console.log(message);
        //       LinkImageService.sendNotify(message, this.currentUser.line_token)
        // })
       
          var his = {
            eventId: this.eventId_update,
            title: "ลบคิว",
            createdBy: this.currentUser.id,
          };
          HistorydentistService.createhistoryhistorydentist(his).then(() => {
            var his = "UPDATE map_events_dentist SET status = 0";

            var sql = his + ` WHERE id = ${this.mapId}`;
            // console.log(sql);
            EventDentistService.createsql(sql).then(() => {
              var message = this.noti.cancel_dentist + ' หมอ' + this.docname + ' วันที่ ' + this.header + ' ที่' + this.shphName
              // console.log(message);
              LinkImageService.sendNotify(message, this.currentUser.line_token)
              this.showbook = true;
              this.getalleventbycreatedBy();
            });
          });
        }
      );
    },
    sentline() {
      UserService.getUser(this.book.userId).then((res) => {
        // console.log(res.data.line_token);
        LinkImageService.sendNotify(
          this.book.noti + " วันที่ " + this.header,
          res.data.line_token
        );
        this.save();
      });
    },
    converttime(time) {
      // console.log(time);
      // console.log(time.length);
      if (time.length == 2 || time.length == 3) {
        time = time.split("a");
        time = time[0] + ":00 น.";
      } else if (time == "") {
        time = "";
      } else {
        time = time.replace("a", " น.");
      }
      return time;
    },
    getEvents() {
      EventDentistService.getbooks("", this.userId, this.shphId).then((res) => {
        // console.log(res.data);
        this.calendarOptions.events = res.data;
        // this.calendarOptions.events = this.events
        //   this.calendarOptions.events.push({
        //   title:'test',
        //   date:'2023-09-01'
        // })
        // console.log(this.calendarOptions.events);
      });
    },
    getdocbook() {
      EventDentistService.geteventbyuseranddate(
        this.date,
        "",
        this.shphId
      ).then((res) => {
        // console.log(res.data);
        this.limitdoc = res.data;
      });
    },
    handleEventClick(clickInfo) {
      this.limitdoc = [];
      // console.log(clickInfo.event);
      // if (clickInfo.event.groupId == false) {
        var id = clickInfo.event.id;
      var breaktime = new Date(clickInfo.event.start);

      var d =
        breaktime.getFullYear() +
        "-" +
        (parseInt(breaktime.getMonth()) + 1).toString().padStart(2, "0") +
        "-" +
        breaktime.getDate().toString().padStart(2, "0");

      EventDentistService.getevent(id).then((res) => {
        this.date = res.data.date;
        // console.log(this.date);
        // this.getdocbook()

        var now = new Date();
        var selectdate = new Date(d);

        now =
          now.getFullYear() +
          "-" +
          (parseInt(now.getMonth()) + 1) +
          "-" +
          now.getDate();
        now = new Date(now);

        // console.log(selectdate,now);

        if (selectdate < now || breaktime.getHours() == 12) {
          // console.log(1);
        } else {
          this.header = breaktime.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          this.getid();
          this.title =
            "จองคิวหมอ"+this.nametype.dentist+" วันที่ " +
            breaktime.toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          if (breaktime.getHours() != 0) {
            this.title +=
              " เวลา " + this.timeformat(breaktime.toLocaleTimeString("th-TH"));
            this.header +=
              " เวลา " + this.timeformat(breaktime.toLocaleTimeString("th-TH"));
            this.allday = false;
          } else {
            this.allday = true;
          }
          this.getid();
          document.getElementById("AddEvent").click();
        }
        // const result = date.toLocaleDateString('th-TH', {
        //   year: 'numeric',
        //   month: 'long',
        //   day: 'numeric',
        // })
        //       if (confirm(`ยืนการการลบ '${result}'`)) {
        //         // clickInfo.event.remove()
        //         var event = {
        //         status:0
        //       }
        //       EventDentistService.updateevent(clickInfo.event.id,event).then(()=>{
        //         this.getEvents()
        //       })
        //       }
      });
      // }
      
    },
    timeformat(time) {
      time = time.split(":");
      return time[0] + "." + time[1] + " น.";
    },
    searchtime() {
      // console.log(this.doctor_id);
      DoctorService.gettimebydoctor(this.doctor_id).then((res) => {
        // console.log(res.data);
        this.courses = res.data;
      });
    },
    gettime(start, end) {
      var s = start.split(":");
      var e = end.split(":");
      var value = s[0] + "." + s[1] + "-" + e[0] + "." + e[1] + " น.";
      return value;
    },
    getid() {
      // console.log(this.date);
      this.doctor_id = "";

      this.getalleventbycreatedBy();
      EventDentistService.getquebyuserid(
        this.date,
        this.userId,
        this.shphId
      ).then((res) => {
        // console.log(this.limitdoc);

        EventDentistService.getdoctorbydate(
          this.date,
          this.currentUser.id,
          JSON.stringify(this.limitdoc),
          this.shphId,
          1
        ).then((res) => {
          this.doctors = res.data;
          // console.log(this.doctors);
          // console.log(this.book);
          EventDentistService.getquebyuserid(
            this.date,
            this.currentUser.id,
            this.shphId
          ).then(() => {
            // if (res.data.length !=0) {
            //   this.doctor_id = res.data.doctorId
            // }
            // console.log(res.data);
            if (this.doctor_id) {
              this.allday = false;
            } else {
              this.allday = true;
            }
          });
        });
        // console.log(this.allday);
      });
      // console.log( this.course_id);
    },
    save() {
      // console.log(this.event_id);
      UserService.getUser(this.doctor_id).then((res)=>{
        this.docname = res.data.firstname +' '+res.data.lastname
      })
      var statushis = false;
      var txt = "";
      for (let h = 0; h < this.history.length; h++) {
        if (this.history[h].detail == null || this.history[h].detail == "") {
          statushis = true;
          txt = this.history[h].name;
          break;
        }
      }
      EventDentistService.geteventbydocanddate(
        this.date,
        this.doctor_id,
        this.shphId
      ).then((res) => {
        this.event_id = res.data.id;
        // console.log(res.data);
        if (this.currentUser.role_id == 6 && res.data.length > this.noti.no_dentist_worker || (res.data.length+1) > this.noti.no_dentist_worker) {
          alert('ไม่สามารถจองคิวหมอ'+this.nametype.dentist+'เกิน ' + this.noti.no_dentist_worker + ' ชั่วโมงต่อวัน')
        }
        else if (this.currentUser.role_id != 6 && res.data.length > this.noti.no_dentist || (res.data.length+1) > this.noti.no_dentist) {
          alert('ไม่สามารถจองคิวหมอ'+this.nametype.dentist+'เกิน ' + this.noti.no_dentist + ' ชั่วโมงต่อวัน')
        } else if(this.typebook == 2 && this.userId == null ||this.userId == ''){
alert('กรุณาเลือกประเภทการจองและกรอกข้อมูลให้ถูกต้อง')
        } else if (this.doctor_id == "" || this.doctor_id == null) {
          alert("กรุณาเลือกหมอ"+this.nametype.dentist);
        } 
        else if(this.dentisttypeuser.length == 0){
          alert("กรุณาเลือกประเภท"+this.nametype.dentist);
        }
        else if (statushis == true) {
          alert("กรุณากรอก" + txt);
        } else {
          var userdata = {
            bookstatus: 0,
            title: "จองแล้ว",
            userId: this.userId,
            remark: this.book.remark,
          };

          this.gettimeline();
          // console.log(res.data);

          EventDentistService.updateuser(res.data.id, userdata).then(() => {
            // console.log(res.data);
            // UserService.getUser(this.event_id)
            var his = {
              eventId: res.data.id,
              title: "จองแล้ว",
              createdBy: this.currentUser.id,
            };
            HistorydentistService.createhistoryhistorydentist(his).then(() => {
              var map = {
                date: res.data.date,
                shphId: this.shphId,
                doctorId: this.doctor_id,
                eventId: this.event_id,
                userId: this.userId,
                createdBy: this.currentUser.id,
                time: this.timeline,
                typebook: this.typebook,
                type:this.dentisttypeuser
              };
              // console.log(map);
              MapEventsDentistService.createmap_event(map).then((res) => {
                var his = "INSERT INTO history_user_dentist (id, eventId,";
                var value = "VALUES (NULL, " + res.data.id + ",";
                for (let h = 0; h < this.history.length; h++) {
                  his += this.history[h].historyuserdentistId + ",";
                  value += "'" + this.history[h].detail + "'" + ",";
                }
                his = his.slice(0, -1);
                his = his + ") ";
                value = value.slice(0, -1);
                value = value + ") ";
                // console.log(his);
                // console.log(value);
                var sql = his + value;
                // console.log(sql);
                EventDentistService.createsql(sql).then(() => {
                  var message = this.noti.message_dentist + ' หมอ' + this.docname + ' วันที่ ' + this.header + ' ที่' + this.shphName
                  LinkImageService.sendNotify(message, this.currentUser.line_token)
                  document.getElementById("booktab").click();

                  // this.getalleventbycreatedBy()
                });
              });
            });
          });
          //       setTimeout(function () {
          //   location.reload();
          // }, 500);
          // window.scrollTo(0, 0);

          //
        }
      });
    },
    getUsers() {
      DoctorService.getdoctors("").then((res) => {
        this.list = res.data;
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
