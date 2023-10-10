<template>
  <div class="container">
    <div class="container">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="card mt-5">
          <div class="card-body login-card-body mt-3">
            <h3 class="login-box-msg" style="text-align: center">
              ตั้งค่าระบบ
            </h3>
            <form ref="form">
              <div class="card-body mt-3">
                <div class="row">
                  <div class="col-md-6">
                   
                <div class="form-group">
<label>แจ้งเตือนล่วงหน้า (วัน) <span style="color: red">*</span> </label>
<div class="input-group my-colorpicker2 colorpicker-element" data-colorpicker-id="2">
<input v-model="data.day" type="number" class="form-control " data-original-title="" title="">
<div class="input-group-append">
<span class="input-group-text">วัน</span>
</div>
</div>

</div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                  <label for="username">เวลา<span style="color: red">*</span> </label>
                  <input v-model="data.time" type="time"
                    class="form-control" id="username" />
                </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                  <label for="username">จำนวนชั่วโมงหมอนวดแผนไทย<span style="color: red">*</span> </label>
                  <div class="input-group my-colorpicker2 colorpicker-element" data-colorpicker-id="2">
<input v-model="data.hour" type="number" class="form-control " data-original-title="" title="">
<div class="input-group-append">
<span class="input-group-text">ชั่วโมง</span>
</div>
</div>
                </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                  <label for="username">จำนวนคนต่อวันหมอฟัน<span style="color: red">*</span> </label>
                  <div class="input-group my-colorpicker2 colorpicker-element" data-colorpicker-id="2">
<input v-model="data.no_dentist" type="number" class="form-control " data-original-title="" title="">
<div class="input-group-append">
<span class="input-group-text">คน</span>
</div>
</div>
                </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                  <label for="username">จำนวนชั่วโมงหมอนวดแผนไทยของอสม.<span style="color: red">*</span> </label>
                  <div class="input-group my-colorpicker2 colorpicker-element" data-colorpicker-id="2">
<input v-model="data.no_masseuse_worker" type="number" class="form-control " data-original-title="" title="">
<div class="input-group-append">
<span class="input-group-text">ชั่วโมง</span>
</div>
</div>
                </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                  <label for="username">จำนวนคนต่อวันหมอฟันของอสม.<span style="color: red">*</span> </label>
                  <div class="input-group my-colorpicker2 colorpicker-element" data-colorpicker-id="2">
<input v-model="data.no_dentist_worker" type="number" class="form-control " data-original-title="" title="">
<div class="input-group-append">
<span class="input-group-text">ชั่วโมง</span>
</div>
</div>
                </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                  <label for="username">ข้อความแจ้งเตือนการจองคิวหมอนวดแผนไทย<span style="color: red">*</span> </label>
<input v-model="data.message_chiropractor" type="text" class="form-control " data-original-title="" title="">
                </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                  <label for="username">ข้อความแจ้งเตือนการยกเลิกคิวหมอนวดแผนไทย<span style="color: red">*</span> </label>
<input v-model="data.cancel_chiropractor" type="text" class="form-control " data-original-title="" title="">

                </div>
                
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                  <label for="username">ข้อความแจ้งเตือนการจองคิวหมอฟัน<span style="color: red">*</span> </label>
<input v-model="data.message_dentist" type="text" class="form-control " data-original-title="" title="">
                </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                  <label for="username">ข้อความแจ้งเตือนการยกเลิกคิวหมอฟัน<span style="color: red">*</span> </label>
<input v-model="data.cancel_dentist" type="text" class="form-control " data-original-title="" title="">

                </div>
                
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-3"></div>
                  <div class="col-md-6 text-center">
                    <button @click="save()" type="button" class="btn btn-success btn-md">
                      บันทึก
                    </button>
                  </div>
                  <div class="col-md-3"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
    <!-- <a target="_blank" :href="urlAuth">เชื่อมต่อ LINE</a> -->
  </div>
  </div>
</template>

<script>
import NotificationService from "../services/NotificationService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      data:{}
    };
  },
  mounted() {
    this.getNoti();
  },
  methods: {
    getNoti(){
      NotificationService.getnotification(1).then((res)=>{
        this.data = res.data
      })
    },
    save() {
      if (this.data.email == "") {
        alert("กรุณากรอกจำนวนวันล่วงหน้า");
      } else if (this.data.role_id == "") {
        alert("กรุณากรอกเวลา");
      }else if (this.data.hour == "") {
        alert("กรุณากรอกจำนวนชั่วโมง");
      }else if (this.data.no_dentist == "") {
        alert("กรุณากรอกจำนวนคน");
      }else {
        var data = {
          day: this.data.day,
          time: this.data.time,
          no_dentist:this.data.no_dentist,
          hour:this.data.hour,
          message_chiropractor: this.data.message_chiropractor,
          cancel_chiropractor: this.data.cancel_chiropractor,
          message_dentist:this.data.message_dentist,
          cancel_dentist:this.data.cancel_dentist,
        };
          NotificationService.updatenotification(1, data).then(() => {
            // console.log(res.data);
            alert('บันทึกสำเร็จ')
            this.getNoti();
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        
      }
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
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
body {
  background-color: gray;
}
</style>
