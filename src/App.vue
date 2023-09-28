<template>
  <div id="app">
    <div v-if="!statuseva">
      <Nav  msg="Welcome to Your Vue.js App"/>

    <router-view />
    <!-- <div id="google_translate_element"></div> -->

    </div>
    <div v-else>
      <table width=100%>
      <tr>
        <td width=3%></td>
        <td width=0.1% bgcolor="#ffffff"></td>


        <td width=93.8% bgcolor="#of1527">
          <table width=100%>
            <tr>
              <td width=5%></td>
              <td><br><br><br><br>
                <font size="5" color="#1099f0">ระบบประเมินความพึงพอใจการให้บริการ</font>
                <br><br>
                <font size="5" color="#ffffff">สำนักงานขนส่งจังหวัดเชียงราย</font>

              </td>
            </tr>

            <tr>
              <td width=5%></td>
              <td height=100 valign="top">
                <font>
                  <br><br><span v-html="header.title"></span></font>
              </td>
            </tr>

            <tr>
              <td width=5%></td>
              <td>
<div style="background-color:#5472cc" >
                <router-view />
              </div>
              </td>
            </tr>
          </table>
        </td>



        <td width=0.1% bgcolor="#ffffff"></td>
        <td width=3%></td>


      </tr>

    </table>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  components: {
    Nav
  },
  data() {
    return {
      statuseva:false,
      header:{}
    }
  },
  mounted() {
  },
}

</script>

<style>
div{
  font-family: 'Niramit', sans-serif;
  font-size: 14px;
}
</style>