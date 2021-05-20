<template>
  <div class="loginPage">
    <div class="materialContainer">
      <div class="box">
        <div class="title">登录</div>
        <div class="input">
          <label for="name">用户名</label>
          <input type="text" name="name" id="name" v-model="l_username"/>
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="pass">密码</label>
          <input type="password" name="pass" id="pass" v-model="l_password"/>
          <span class="spin"></span>
        </div>
        <div class="button login" @click="login">
          <button>
            <span>登录</span>
            <i class="fa fa-check"></i>
          </button>
        </div>
        <!-- <a href="javascript:" class="pass-forgot">忘记密码？</a> -->
      </div>

      <div class="overbox">
        <div class="material-button alt-2">
          <span class="shape"></span>
        </div>
        <div class="title">注册</div>
        <div class="input">
          <label for="regname">用户名</label>
          <input type="text" name="regname" id="regname" v-model="r_username"/>
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="regpass">密码</label>
          <input type="password" name="regpass" id="regpass" v-model="r_password"/>
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="reregpass">确认密码</label>
          <input type="password" name="reregpass" id="reregpass" v-model="r_confirmPassword"/>
          <span class="spin"></span>
        </div>
        <div class="button" @click="register">
          <button>
            <span>注册</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _$ from "jquery";
import {  getItem, setItem, clearAllItem } from '../utils/storageTools'
export default {
  name: "Login",
  created(){
    if(getItem('name')) {
      this.$router.replace('/')
    }
  },
  mounted() {
    this.$nextTick(() => {
      _$(function () {
        _$(".input input")
          .focus(function () {
            _$(this)
              .parent(".input")
              .each(function () {
                _$("label", this).css({
                  "line-height": "18px",
                  "font-size": "18px",
                  "font-weight": "100",
                  top: "0px",
                });
                _$(".spin", this).css({
                  width: "100%",
                });
              });
          })
          .blur(function () {
            _$(".spin").css({
              width: "0px",
            });
            if (_$(this).val() == "") {
              _$(this)
                .parent(".input")
                .each(function () {
                  _$("label", this).css({
                    "line-height": "60px",
                    "font-size": "24px",
                    "font-weight": "300",
                    top: "10px",
                  });
                });
            }
          });

        _$(".alt-2").click(function () {
          if (!_$(this).hasClass("material-button")) {
            _$(".shape").css({
              width: "100%",
              height: "100%",
              transform: "rotate(0deg)",
            });

            setTimeout(function () {
              _$(".overbox").css({
                overflow: "initial",
              });
            }, 600);

            _$(this).animate(
              {
                width: "140px",
                height: "140px",
              },
              500,
              function () {
                _$(".box").removeClass("back");

                _$(this).removeClass("active");
              }
            );

            _$(".overbox .title").fadeOut(300);
            _$(".overbox .input").fadeOut(300);
            _$(".overbox .button").fadeOut(300);

            _$(".alt-2").addClass("material-buton");
          }
        });

        _$(".material-button").click(function () {
          if (_$(this).hasClass("material-button")) {
            setTimeout(function () {
              _$(".overbox").css({
                overflow: "hidden",
              });
              _$(".box").addClass("back");
            }, 200);
            _$(this).addClass("active").animate({
              width: "700px",
              height: "700px",
            });

            setTimeout(function () {
              _$(".shape").css({
                width: "50%",
                height: "50%",
                transform: "rotate(45deg)",
              });

              _$(".overbox .title").fadeIn(300);
              _$(".overbox .input").fadeIn(300);
              _$(".overbox .button").fadeIn(300);
            }, 700);

            _$(this).removeClass("material-button");
          }

          if (_$(".alt-2").hasClass("material-buton")) {
            _$(".alt-2").removeClass("material-buton");
            _$(".alt-2").addClass("material-button");
          }
        });
      });
    });
  },
  data(){
    return {
      l_username: '',
      l_password: '',
      r_username: '',
      r_password: '',
      r_confirmPassword: '',
    }
  },
  methods:{
    login(){
      console.log('点击登录---')
      this.$store.dispatch('loginSys', {
        name: this.l_username,
        password: this.l_password,
      }).then((res)=>{
        if (res.data === '') {
          console.log('登录失败，检查用户名密码是否正确')
          clearAllItem()
          return
        }
        console.log('登陆成功返回对象', res)
        clearAllItem()
        setItem('name', res.data.name)
        this.$router.replace('/')
      })
    },
    register() {
      console.log('点击注册---')
      this.$store.commit('registerSys', {
        name: this.r_username,
        password: this.r_password,
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.loginPage {
  height: 100%;
  width: 100%;
  // background-image: url(https://z3.ax1x.com/2021/05/16/gghRBt.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
}
.box {
  position: relative;
  top: 0;
  opacity: 1;
  float: left;
  padding: 60px 50px 40px 50px;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  transform: scale(1);
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  z-index: 5;
}

.box.back {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -ms-transform: scale(0.95);
  top: -20px;
  opacity: 0.8;
  z-index: -1;
}

.box:before {
  content: "";
  width: 100%;
  height: 30px;
  border-radius: 10px;
  position: absolute;
  top: -10px;
  background: rgba(255, 255, 255, 0.6);
  left: 0;
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -ms-transform: scale(0.95);
  z-index: -1;
}

.overbox .title {
  color: #fff;
}

.overbox .title:before {
  background: #fff;
}

.title {
  width: 100%;
  float: left;
  line-height: 46px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ed2553;
  position: relative;
}

.title:before {
  content: "";
  width: 5px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -50px;
  background: #ed2553;
}

.input,
.input label,
.input input,
.input .spin,
.button,
.button button .button.login button i.fa,
.material-button .shape:before,
.material-button .shape:after,
.button.login button {
  transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  -ms-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.material-button,
.alt-2,
.material-button .shape,
.alt-2 .shape,
.box {
  transition: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  -ms-transition: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.input,
.input label,
.input input,
.input .spin,
.button,
.button button {
  width: 100%;
  float: left;
}

.input,
.button {
  margin-top: 30px;
  height: 70px;
}

.input,
.input input,
.button,
.button button {
  position: relative;
}

.input input {
  height: 60px;
  top: 10px;
  border: none;
  background: transparent;
}

.input input,
.input label,
.button button {
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 300;
}

.input:before,
.input .spin {
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.input:before {
  content: "";
  background: rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.input .spin {
  background: #ed2553;
  z-index: 4;
  width: 0;
}

.overbox .input .spin {
  background: rgba(255, 255, 255, 1);
}

.overbox .input:before {
  background: rgba(255, 255, 255, 0.5);
}

.input label {
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 2;
  cursor: pointer;
  line-height: 60px;
}

.button.login {
  width: 60%;
  left: 20%;
}

.button.login button,
.button button {
  width: 100%;
  line-height: 64px;
  left: 0%;
  background-color: transparent;
  border: 3px solid rgba(0, 0, 0, 0.1);
  font-weight: 900;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.2);
}

.button.login {
  margin-top: 30px;
}

.button {
  margin-top: 20px;
}

.button button {
  background-color: #fff;
  color: #ed2553;
  border: none;
}

.button.login button.active {
  border: 3px solid transparent;
  color: #fff !important;
}

.button.login button.active span {
  opacity: 0;
  transform: scale(0);
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
}

.button.login button.active i.fa {
  opacity: 1;
  transform: scale(1) rotate(-0deg);
  -webkit-transform: scale(1) rotate(-0deg);
  -ms-transform: scale(1) rotate(-0deg);
}

.button.login button i.fa {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  line-height: 60px;
  transform: scale(0) rotate(-45deg);
  -webkit-transform: scale(0) rotate(-45deg);
  -ms-transform: scale(0) rotate(-45deg);
}

.button.login button:hover {
  color: #ed2553;
  border-color: #ed2553;
}

.button {
  margin: 40px 0;
  overflow: hidden;
  z-index: 2;
}

.button button {
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.pass-forgot {
  width: 100%;
  float: left;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 18px;
}

.click-efect {
  position: absolute;
  top: 0;
  left: 0;
  background: #ed2553;
  border-radius: 50%;
}

.overbox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: inherit;
  border-radius: 10px;
  padding: 60px 50px 40px 50px;
}

.overbox .title,
.overbox .button,
.overbox .input {
  z-index: 111;
  position: relative;
  color: #fff !important;
  display: none;
}

.overbox .title {
  width: 80%;
}

.overbox .input {
  margin-top: 20px;
}

.overbox .input input,
.overbox .input label {
  color: #fff;
}

.overbox .material-button,
.overbox .material-button .shape,
.overbox .alt-2,
.overbox .alt-2 .shape {
  display: block;
}

.material-button,
.alt-2 {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #ed2553;
  position: absolute;
  top: 40px;
  right: -70px;
  cursor: pointer;
  z-index: 100;
  transform: translate(0%, 0%);
  -webkit-transform: translate(0%, 0%);
  -ms-transform: translate(0%, 0%);
}

.material-button .shape,
.alt-2 .shape {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.material-button .shape:before,
.alt-2 .shape:before,
.material-button .shape:after,
.alt-2 .shape:after {
  content: "";
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(360deg);
  -webkit-transform: translate(-50%, -50%) rotate(360deg);
  -ms-transform: translate(-50%, -50%) rotate(360deg);
}

.material-button .shape:before,
.alt-2 .shape:before {
  width: 25px;
  height: 4px;
}

.material-button .shape:after,
.alt-2 .shape:after {
  height: 25px;
  width: 4px;
}

.material-button.active,
.alt-2.active {
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%) rotate(0deg);
  -webkit-transform: translate(50%, -50%) rotate(0deg);
  -ms-transform: translate(50%, -50%) rotate(0deg);
}

.materialContainer {
  width: 100%;
  max-width: 460px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

*,
*:after,
*::before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style-type: none;
  outline: none;
}
</style>