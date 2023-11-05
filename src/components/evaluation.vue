<template>
  <div class="row">
  <div class="container-fluid mt-5">
    <div class="container" v-if="savestatus">
      <h5 class="mt-3 mb-3">ระดับความพึงพอใจ</h5>
      <div class="row">
        <table width=100%>
          <tr>
            <td bgcolor="#ffffff" width=20% valign="top" align="center" v-for="(i,r) in radiolist" :key="r">
                <div class="form-check">
                  <label class="form-check-label" :for="i.name">
                    <img @click="select(i.value)" :src="i.src" :id="i.id" :style="size">
                  </label><br/>
                  {{ i.remark }}
          <!-- <td valign="middle">
            <input style="height:15px;" v-model="eva.score" class="form-check-input" type="radio" :name="i.id"
              :id="i.id" :value="i.value">
          </td> -->
          <!-- <img src="../assets/s2.jpg" id="exampleRadios" :style="size"> -->
      </div>
      </td>


              <!-- <td bgcolor="#ffffff" width=20% align="center">
                <div class="form-check">
                  <label class="form-check-label" for="exampleRadios1">
                    <img src="../assets/1.jpg" id="exampleRadios" :style="size">
                  </label>
          <td valign="middle">
            <input style="height:15px;" v-model="eva.score" class="form-check-input" type="radio" name="exampleRadios"
              id="exampleRadios1" value="1">
          </td>
      </div>
      </td>
      <td bgcolor="#ffffff" width=20% align="center">
        <div class="form-check">
          <label class="form-check-label" for="exampleRadios2">
            <img src="../assets/2.jpg" id="exampleRadios" :style="size">
          </label>
          <td valign="middle">
          <input v-model="eva.score" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
            value="2">
          </td>
        </div>
      </td>
      <td bgcolor="#ffffff" width=20% align="center">
        <div class="form-check">
          <label class="form-check-label" for="exampleRadios3">
            <img src="../assets/3.jpg" id="exampleRadios" :style="size">
          </label>
          <td valign="middle">
          <input v-model="eva.score" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3"
            value="3">
            </td>
        </div>
      </td>
      <td bgcolor="#ffffff" width=20% align="center">
        <div class="form-check">
          <label class="form-check-label" for="exampleRadios4">
            <img src="../assets/4.jpg" id="exampleRadios" :style="size">
          </label>
          <td valign="middle">
          <input v-model="eva.score" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4"
            value="4">
            </td>
        </div>
      </td>
      <td bgcolor="#ffffff" width=20% align="center">
        <div class="form-check">
          <label class="form-check-label" for="exampleRadios5">
            <img src="../assets/5.jpg" id="exampleRadios" :style="size">
          </label> <td valign="middle" align="center">
          <input v-model="eva.score" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5"
            value="5"></td>
        </div>
      </td> -->




      </tr>
      </table>
    </div>
    <div class="form-group mt-5">
      <label style="color: black;font-weight: normal;">ข้อเสนอแนะ</label>
      <textarea v-model="eva.suggestion" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="form-group row mt-3" style="text-align:center">
      <div class="col-sm-12">
        <button @click="save()" class="btn btn-success mt-3 mb-3 btn-sm">
          ส่งผลการประเมิน
        </button>
      </div>
    </div>
  </div>
  <div class="mt-5" v-else style="text-align:center" ><br/>
    <h6 style="text-align:center" class="mt-5"> ได้รับข้อมูลการประเมินของท่านเรียบร้อยแล้ว</h6>
    <button style="text-align:center" @click="close()" class="btn btn-success mt-3 mb-3 btn-sm">
          ตกลง
        </button>
  </div>
  </div>
</div>
</template>

<script>
import EvaluationService from '../services/EvaluationService'
import LinkImageService from '../services/LinkImageService'

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      type: '',
      statustable: false,
      data: {},
      path_image: '',
      id: '',
      savestatus: true,
      eva: {},
      size: 0,
      radiolist:[],
      header:{},
      shphId:0
    }
  },
  mounted() {
    this.shphId = this.$route.query.id
    console.log(this.shphId);
    var rx = (window.innerHeight * 0.7) / 5;
    // console.log(rx);
    this.size = 'width:' + rx * 0.5 + 'px'
    // this.sizeimg = 'width:' + rx * 2 + 'px'
    // console.log(this.size);
    // this.getstatus(this.type) 
    var list =[5,4,3,2,1]
    for (let e = 0; e < list.length; e++) {
      console.log(e);
      var img = ""
      var remark = ""
      if (list[e] == 1) {
        remark = 'น้อยที่สุด'
      }
      if (list[e] == 2) {
        remark = 'น้อย'
      }
      if (list[e] == 3) {
        remark = 'ปานกลาง'
      }
      if (list[e] == 4) {
        remark = 'มาก'
      }
      if (list[e] == 5) {
        remark = 'มากที่สุด'
      }
      img = LinkImageService.getLink()+'/uploads/'+(list[e])+'.jpg'
      this.radiolist.push({
        name:'exampleRadios',
        id:'exampleRadios'+list[e],
        src:img,
        value:list[e],
        remark:remark
      })
      
    }
    console.log(this.radiolist);
  },
  methods: {
    select(value){
      this.eva.score = value
      var img = ''
      var imgold = ""
for (let r = 0; r < this.radiolist.length; r++) {
  imgold = LinkImageService.getLink()+'/uploads/'+this.radiolist[r].value+'.jpg'
  img = LinkImageService.getLink()+'/uploads/s'+this.radiolist[r].value+'.jpg'
  this.radiolist[r].src = imgold
  if (this.radiolist[r].value == value) {
    this.radiolist[r].src = img
  }
  
}
    },
    close(){
      // window.location.href = '/';
      var win = window.open("about:blank", "_self");
win.close();
    },
    getstatus(type) {
      this.type = type
      if (this.type == 1) {
        this.statustable = true
      } else {
        this.statustable = false
      }
    },
    save() {
      if (this.eva.score == '' || this.eva.score == null) {
        alert('กรุณาเลือกคะแนนความพึงพอใจในการให้บริการ')
      } else {
        var off = {
          shphId: this.shphId,
          score: this.eva.score,
          suggestion: this.eva.suggestion,
          status:true
        }
        EvaluationService.createevaluation(off).then((res) => {
          console.log(res.data);
          this.savestatus = false
          // alert('ได้รับข้อมูลการประเมินของท่านเรียบร้อยแล้ว')
          // window.close();
          // setTimeout(function () {
          //     location.reload();
          //   }, 500);
        })

      }
    }
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
  background-color: #04AA6D;
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
