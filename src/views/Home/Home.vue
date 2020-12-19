<template>
	<div class="home">
		<div class="left">
			<el-tabs class="mytabs" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane @click="push()">
					<span slot="label" style="padding:none; margin: none;" ><img src="../../../static/logo-blue.png" style="padding-left: 10px;height: 50px; vertical-align:middle;"></img></span>
					<div class="welcomePage">
							<h3 style="padding-bottom: 15px">欢迎来到魏老板的小吃店</h3>
							<el-col :span="8":offset="4" >
								<el-button type="primary" @click="loginopen" size="small" round>登录</el-button>
							</el-col>
							<el-col :span="8">
								<el-button type="primary" plain @click="open" size="small" round>注册</el-button>
							</el-col>
					</div>
				</el-tab-pane>
				<el-tab-pane label="菜单" name="first" @click="this.$router.push('Food')">
					<div class="paneBody">
						<div class="bottom" style="padding-top: 40%;padding-left: 10%; width: 80%;">
							<span style="font-family:'微软雅黑';font-weight:bold;font-size: 28px;padding-left: 20%;" >菜单</span>
							<el-menu
								class="el-menu-vertical-demo"
								default-active="foodTypeNum"
								style="text-align: center;"
								@select="changeFoodMenu"
								>
								<el-menu-item index="1">
									<span slot="title">火锅</span>
								</el-menu-item>
								<el-menu-item index="2">
									<span slot="title">家常菜</span>
								</el-menu-item>
								<el-menu-item index="3">
									<span slot="title">汤</span>
								</el-menu-item>
								<el-menu-item index="4">
									<span slot="title">甜品</span>
								</el-menu-item>
								<el-menu-item index="5">
									<span slot="title">炸鸡</span>
								</el-menu-item>
								<el-menu-item index="6">
									<span slot="title">饮品</span>
								</el-menu-item>
							</el-menu>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="我的" name="second">
					<div>
						<div class="bottom" style="padding-top: 40%;padding-left: 10%; width: 80%;">
							<el-menu
								class="el-menu-vertical-demo"
								router
								unique-opened
								>
								<el-menu-item index="/Home/Order">
									<i class="el-icon-s-order"></i>
									<span slot="title">我的订单</span>
								</el-menu-item>
								<el-menu-item index="/Home/RedPacketManage">
									<i class="el-icon-present"></i>
									<span slot="title">我的红包</span>
								</el-menu-item>
								<el-menu-item index="/Home/Activity">
									<i class="el-icon-date"></i>
									<span slot="title">今日活动</span>
								</el-menu-item>
								<el-menu-item index="/Home/TaskManage">
									<i class="el-icon-s-flag"></i>
									<span slot="title">任务中心</span>
								</el-menu-item>
								<el-menu-item index="/Home/MyCenter">
									<i class="el-icon-s-custom"></i>
									<span slot="title">个人中心</span>
								</el-menu-item>
							</el-menu>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="店铺" name="third">
					<div>
						<div class="bottom" style="padding-top: 40%;padding-left: 10%; width: 80%;">
							<el-menu
								class="el-menu-vertical-demo"
								router
								unique-opened
								>
								<el-menu-item index="/Home/Evaluation">
									<i class="el-icon-s-comment"></i>
									<span slot="title">评价查看</span>
								</el-menu-item>
								<el-menu-item index="/Home/CustomerSerivce">
									<i class="el-icon-phone-outline"></i>
									<span slot="title">联系客服</span>
								</el-menu-item>
								<el-menu-item index="/Home/About">
									<i class="el-icon-house"></i>
									<span slot="title">关于我们</span>
								</el-menu-item>
							</el-menu>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="medium_right">
			
		</div>
		<div class="right">
			<router-view></router-view>
		</div>
		
		<el-dialog width="30%" align="center" title="欢迎来到饱了么!" :visible.sync="loginVisible">
			<el-form :model="login">
				<el-form-item label="用户名:" label-width="80px">
					<el-row style="display: flex;flex-direction: row;">
						<el-input v-model="login.username" placeholder="请选择活动区域" autocomplete="off"></el-input>
					</el-row>
				</el-form-item>
				<el-form-item label="密码:" label-width="80px">
					<el-row style="display: flex;flex-direction: row;">
						
						<el-input
						  type="passFormShow?'text':'password'"
						  v-model="login.passwd"
						  style="width: 200px;"
						  placeholder="请选择活动区域" 
						  autocomplete="off"
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
			<div slot="footer" class="dialog-footer" align="center">
				<el-button type="primary" @click="loginSubmit" >登录</el-button>
			</div>
		</el-dialog>
		
		<el-dialog width="30%" align="center" title="注册" :visible.sync="dialogFormVisible">
			<div style="width: 100%; height: 20%;margin-bottom: 5%; ">
				<el-steps :active="active" finish-status="success" align-center>
				  <el-step title="步骤 1"></el-step>
				  <el-step title="步骤 2"></el-step>
				  
				</el-steps>
			</div>
			
			<el-form status-icon ref="ruleForm" :rules="rules" v-show="active==0" :model="form">
				<el-form-item label="账号" prop="customer_username">
					<el-row style="display: flex;flex-direction: row;">
						<el-input v-model="form.customer_username" placeholder="请输入账号" autocomplete="off"></el-input>
					</el-row>
				</el-form-item>
				<el-form-item label="密码" prop="customer_password">
					<el-row style="display: flex;flex-direction: row;">
						<el-input v-model="form.customer_password" placeholder="请输入密码" show-password autocomplete="off"></el-input>
					</el-row>
				</el-form-item>
				<el-form-item label="我同意" prop="checked">
					<el-row style="float: left;">
						<el-checkbox v-model="form.checked"></el-checkbox><el-link type="info"><<隐私政策>></el-link>和<el-link type="info"><<服务条款>></el-link>
					</el-row>
				</el-form-item>
			</el-form>
			<div v-show="active==0" slot="footer" class="dialog-footer" align="center">
				<el-button style="margin-top: 12px;" @click="next('ruleForm')">下一步</el-button>
			</div>
			
			<el-form :rules="ruletwo" ref="ruleForm2" v-show="active==1" :model="form">
				<el-form-item label="手机号" prop="phonenum_mes">
					<el-row style="display: flex;flex-direction: row;">
						<el-input v-model="form.phonenum_mes" placeholder="请输入手机号" autocomplete="off"></el-input>
					</el-row>
				</el-form-item>
				<el-form-item label="验证码" prop="valid">
					<el-row style="display: flex;flex-direction: row;">
						<el-input v-model="form.valid" placeholder="请输入验证码" autocomplete="off"></el-input>
					</el-row>
				</el-form-item> 
			</el-form>
			<div v-show="active==1" slot="footer" class="dialog-footer" align="center">
				<el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
				<el-button style="margin-top: 12px;" @click="reg('ruleForm2')">完成</el-button>
			</div>
			
			
			<div v-show="active==2" slot="footer" class="dialog-footer" align="center">
				<el-button style="margin-top: 12px;" @click="exit">退出</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
export default {
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
		  foodTypeNum:1,
		passFormShow:false,
        activeName: 'second',
		dialogFormVisible: false,
		loginVisible:false,
		login:{
			username:'',
			passwd:'',
		},
		
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
		changeFoodMenu(key) {
			//alert(key);
			this.$store.commit('setFoodType',key);
			//this.$store.commit('setIsUpdateFoodType',true);
			this.$router.push('/Home/Food');
		},
		loginSubmit(){
			this.axios.post(`http://localhost:8080/login/customerLogin`,
			{
				customer_username:this.login.username,
				customer_password:this.login.passwd,
			}).then(r=>{
				console.log(r.data);
				if(r.data.detail=="登陆成功"){
					this.$message({
						message: '登录成功',
						type: 'success'
					});
				}else{
					this.$message({
						message: '登录失败，用户名或者密码错误',
						type: 'warning'
					});
				}
			});
			this.loginVisible = false;
		},
		handleClick(tab, event) {
			if(tab.index==0){
				this.$router.replace('/Home/Welcome');
			}
			console.log(tab, event);
			
		},
		next(formName) {
			if(!this.form.checked||this.form.customer_username==''||this.form.customer_password==''){
				this.$refs[formName].validate((valid) => {
					if (valid) {
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}else{
				this.active++;
			}			
		},
		previous(){
			if(this.active>0){
				this.active--;
			}	
		},
		open(){
			/*this.dialogFormVisible=true;
			this.active=0;*/
			this.$router.push({path:'/Home/Register'})
		},
		loginopen(){
			this.$router.push({path:'/Home/Login'})
		},
		exit(){
			this.dialogFormVisible=false;
		},
		reg(formName){
			if(this.form.valid==''||this.form.phonenum_mes==''){
				this.$refs[formName].validate((valid) => {
					if (valid) {
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}else{					
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/customer/register',this.form).then(r=>{
					console.log(r.data.detail);
					if(r.data.detail.substring(0,4)=='注册成功'){
						this.active++;
					}else{
						this.$message('注册失败，请重新注册，更改账号');
					}
				});					
			   console.log("register...");
			}
		}	 
    }
  };
</script>
<style lang="less" scoped="scoped">
	
	.home{
		width:100%;
		height:100%;
		display: flex;
		flex-direction: row;
		.left{			
			flex:1;
			
			/deep/.el-tabs__active-bar{
				height: 0px !important;
			}
			/deep/ .el-tabs__item{
				padding: 0px 0px 10px 20px;
				font-size: 17px;
				font-family:"微软雅黑";font-weight:bold;
			}
			/deep/ .el-tabs__nav-wrap::after{
				border: none;
				height: 0px;
			}
			
			.bottom{
				/deep/ .el-menu{
					border-right: none;
				}
				/deep/ .el-menu-item{
					
					
					background: none;
					font-size: 15px;
					font-family:"微软雅黑";
					font-weight:bold;
					color: lightgrey;
				}
				/deep/ .el-menu-item.is-active{
				  
				   //border-bottom: green solid 2px;
				   font-size: 22px;
				   font-family:"微软雅黑" ;
				   font-weight:bold;
				   color: black;
				   span{
					   font-size: 22px;
					   border-bottom: green solid 2px;
				   }
				}
			}
			.welcomePage{
				width: 100%;
				margin-top:90%;
				text-align: center;
				//background-color: pink;
			}
			
		}
		
		.right{
			flex:4;
			overflow: auto;
			//background-color: lightpink;
		}
		
	}
	
	
	
</style>
