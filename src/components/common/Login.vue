<template>
<div class="container">
    <div class="top"></div>

    <div class="wrapper">
        
        <div class="logo-wrapper">
          <img src="../../assets/캡처.png" class="logo">
        </div>

        <div class="input-wrapper">
          <input class="id-input" placeholder="ID" v-model="id_string"/>
          <input type="password" class="pw-input" v-model="encrypted_password" placeholder="PASSWORD"/>
        </div>

       
        <div class="button-wrapper">
          <!-- <router-link to="/main"> -->
            <button class="loginbutton" v-on:click="getLogin(id_string,encrypted_password)">
              <span class="login-text">LOGIN</span>
            </button>
          <!-- </router-link> -->
        </div>

    </div>
    <div class="bottom"></div>

</div>
</template>
<script>
import axios from 'axios';
import {mapMutations} from 'vuex'

export default {
    components:{

    },
    data(){
      return{
        id_string:'',
        encrypted_password:''
      }
    },
    created(){
      console.log(this.$store);
    },
    methods:{
      ...mapMutations(['setID','setRank','setRole'])
      ,
          getLogin(id_string,encrypted_password){
            axios.post('http://localhost:8888/api/state/login', {
            //백에 있는 vo랑 맞춰주기
            idString : id_string,
            password : encrypted_password
            },)
            .then((res) => {
              console.log(res.data.data);
              //주석풀기
             if(res.data.data.role ==="Admin"){
               //슈퍼주석
                this.setID(res.data.data.idString)
                this.setRank(res.data.data.rank)
                this.setRole(res.data.data.role)

                console.log(this.$store);
                // this.$router.push('main')
              }
              //
              this.$router.push('main')
            })
        },
        // setID(){
        //   // console.log(idState);
        //   // console.log(this.$store);
        // },
        // setRank(){

        // },
        // setRole(){

        // }
    }
}
</script>
<style lang="css" scoped>
body {
  margin-left: 0px;
}
.top {
  width: 100%;
  height: 41px;
  background-color: #0b6ad5;
}
.bottom {
  width: 100%;
  height: 41px;
  background-color: #5a595e;
}
.wrapper {
  width: 447px;
  height: 371px;
  background-color: #f8f8f8;
  border: 1px solid #e3e3e3;
  margin: 0 auto;
  margin-top : 150px;
  margin-bottom : 150px;
  display: block;
  text-align: center;
}

.logo-wrapper {
  margin-top: 40px;
}
.button-wrapper {
  margin: 30px;

}
.loginbutton {
  width: 336px;
  height: 55px;
  border-radius: 5px;
  background-color: #0b6ad5;
  border: 1px solid #2f906e;
}
.login-text {
  font-size: 20px;
  letter-spacing: -1px;
  color: #ffffff;
  font-family: "Noto Sans CJ Kkr";
  text-align: center;
}

input {
  width: 336px;
  height: 50px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  margin: 10px 0 10px 0;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 30px;
  text-indent: 50px;
}
.pw-input {
  background-image: url("../../assets/lock.png");
}
.id-input {
  background-image: url("../../assets/usericon.png");
}

</style>
