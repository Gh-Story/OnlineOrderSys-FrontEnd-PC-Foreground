<template>
    <div class="login">
		<!--
        <div class="top">
			<!--
            <div style="width: 90%;height: 500px;padding-left: 50px;padding-top: 10px">
                <el-carousel height="460px">
                    <el-carousel-item v-for="(item,index) in imgList" :key="item.id" style="border-radius: 30px">
                        <img ref="imgHeight"
                             :src="item.idView"
                             class="avatar"
                             width=100%
                             height=100%
                             style="margin-top: 5px;float: right;margin-right: 5px">
                    </el-carousel-item>
                </el-carousel>
            </div>
			
        </div>
		-->
        <div class="midium">
            <div class="loginForm" >
				<div  class="bg">
					<img v-if="flag" src="../../../../static/userName.png"></src>
					<img v-if="flag2" src="../../../../static/pwd.png"></src>
				</div>
				<el-card>
					<el-form :model="login">
					        <el-form-item style="margin-left: 10%;" label="用户昵称" label-width="80px">
					            <el-row style="display: flex;flex-direction: row;">
					                <el-input style="width: 400px" v-model="login.username" placeholder="请输入您的用户昵称" autocomplete="off"></el-input>
					            </el-row>
					        </el-form-item>
					        <el-form-item style="margin-left: 10%;font-size: 20px"  label="用户密码" label-width="80px">
					            <el-row style="display: flex;flex-direction: row;">
					                <el-input
					                        type="password"
					                        v-model="login.passwd"
					                        style="width: 400px;"
					                        placeholder="请输入您的用户密码"
					                        autocomplete="off"
											@blur="changeFlag"
											@focus="changeFlag"
					                >
					                    <i
					                            :class="passFormShow ?'el-icon-remove-outline el-input__icon':'el-icon-view el-input__icon'"
					                            slot="suffix"
					                            @click="passFormShow=!passFormShow">
					                    </i>
					                </el-input>
					            </el-row>
					        </el-form-item>
					    </el-form>
					    <el-button type="primary" @click="loginSubmit" round>登录</el-button>
					
				</el-card>
                </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {

            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                    if (!myreg.test(value)) {
                        callback(new Error('手机号必须为11位有效数字'));
                    }
                }
            };
            var validateValid= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    if (value!='666') {
                        callback(new Error('验证码必须为666'));
                    }
                }
            };
            var validateUsername= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    var myreg=/^[a-z0-9]{8,16}$/;
                    if (!myreg.test(value)) {
                        callback(new Error('账号必须为8-16位的小写字母或数字组成'));
                    }
                }
            };
            var validatePassword= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    var myreg=/^[a-z0-9]{8,16}$/;
                    if (!myreg.test(value)) {
                        callback(new Error('密码必须为8-16位的小写字母或数字组成'));
                    }
                }
            };
            var validateChecked= (rule, value, callback) => {
                if(!value){
                    callback(new Error('未同意协议'));
                }
            };
            return {
				flag2:false,
				flag:true,
                passFormShow:false,
                activeName: 'second',
                dialogFormVisible: false,
                loginVisible:false,
                login:{
                    username:'',
                    passwd:'',
                },
                //显示图片部分图片地址
                imgList: [
                    {id: 0, idView: require('../../../../static/FOOD.jpg')},
                    {id: 1, idView: require('../../../../static/MSR.jpg')},
                    {id: 2, idView: require('../../../../static/MERCH.jpg')},
                ],
                checked: false,
                active: 0,
                form: {
                    customer_username:'',
                    customer_password:'',
                    phonenum_mes:'',
                    valid:'',
                    checked:false
                },
                rules: {
                    customer_username: [
                        {  validator: validateUsername, trigger: 'blur'}
                    ],
                    customer_password: [
                        {  validator: validatePassword, trigger: 'blur'}
                    ],
                    checked: [
                        {  validator: validateChecked, trigger: 'blur'}
                    ],
                },
                ruletwo:{
                    phonenum_mes: [
                        {  validator: validatePhone, trigger: 'blur'}
                    ],
                    valid:[
                        {  validator: validateValid, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
			changeFlag(){
				let tmp=this.flag;
				this.flag=this.flag2;
				this.flag2=tmp;
			},
            loginSubmit(){
                this.axios.post(`http://localhost:8080/login/customerLogin`,
                    {
                        customer_username:this.login.username,
                        customer_password:this.login.passwd,
                    }).then(r=>{
                   
                    if(r.data.detail=="登陆成功"){
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
						this.$store.commit('changeLogin',true);
						this.$store.commit('changeUser',r.data.customer);
                        this.$router.push('Food');
                    }else{
                        this.$message({
                            message: '登录失败，用户名或者密码错误',
                            type: 'warning'
                        });
                    }
                });
                this.loginVisible = false;
            },
        },
    }
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    
    
    .midium{
        .loginForm{
            width: 450px;
            height: 200px;
            padding: 50px;
                //overflow-y:scroll;
            position: absolute;
            right: 25%;
            top: 25%;
            text-align: center;
			.bg{
				margin: auto;
				height: 60px;
				width: 110px;
				
			}
			
        }
    }
	/*background:
	        url("../../../../static/bg.jpg")
	        no-repeat center/cover;
    */
}
</style>