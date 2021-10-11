<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input type="text" placeholder="验证码" v-model="param.code" maxLength="5"
                        @keyup.enter="submitForm()" style="width: 172px;float: left;">
                        <template #prepend>
                            <el-button icon="el-icon-mobile"></el-button>
                        </template>
                    </el-input>
                    <el-image :src=code.imgSrc class="captchaImg" @click="getcode"></el-image>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {
        ref,
        reactive
    } from "vue";
    import {
        useStore
    } from "vuex";
    import {
        useRouter
    } from "vue-router";
    import {
        ElMessage
    } from "element-plus";
    import loginApi from '../api/login'
    export default {
        data() {
            return {
                code: {
                    imgSrc: '',
                    codeUUid: ''
                },
                param: {
                    username: "admin",
                    password: "123456",
                    code: '',
                    key:'',
                },
                rules: {
                    username: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    }, ],
                    password: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }, ],
                    code: [{
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }, ],
                }
            };
        },
        created() {
            this.getcode();
        },
        methods: {
            getcode() {
                //获取图片验证码
                loginApi.getCaptcha().then(res => {
                    this.code.imgSrc = res.data.base64Img;
                    this.code.codeUUid = res.data.key;
                })
            },
            loginAction() {
                this.param.key = this.code.codeUUid;
                loginApi.login(this.param).then(res => {
                    console.log(res.data.token);
                    localStorage.setItem("token",res.data.token);
                    this.$router.push("/")
                }).catch(()=>{
                    this.getcode();
                })
            },
            submitForm() {
                this.$refs.login.validate((valid) => {
                    if (valid) {
                        this.loginAction();
                    } else {
                        return false;
                    }
                });
            }
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .captchaImg {
        height: 40px;
        width: 110px;
        margin-left: 5px;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>