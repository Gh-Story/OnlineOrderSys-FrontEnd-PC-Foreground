<template>
	<div class="register">
		
		<div class="top">
			<div style="width: 100%; height: 20%;margin-bottom: 5%; ">
				<el-steps :active="active" finish-status="success" align-center>
				  <el-step title="步骤 1"></el-step>
				  <el-step title="步骤 2"></el-step>
				  
				</el-steps>
			</div>
			
			<el-form style="font-weight: bold;" status-icon ref="ruleForm" :rules="rules" v-show="active==0" :model="form">
				<el-form-item  label="账号" prop="customer_username">
					<el-row style="display: flex;flex-direction: row;">
						<el-input v-model="form.customer_username" placeholder="请输入账号" autocomplete="off"></el-input>
					</el-row>
				</el-form-item>
				<el-form-item label="密码" prop="customer_password">
					<el-row style="display: flex;flex-direction: row;">
						<el-input v-model="form.customer_password" placeholder="请输入密码" show-password autocomplete="off"></el-input>
					</el-row>
				</el-form-item>
				<el-form-item  label="我同意" prop="checked">
					<el-row style="float: left;">
						<el-checkbox v-model="form.checked"></el-checkbox><el-link type="info" style="font-weight: bold;"><<隐私政策>></el-link>和<el-link type="info"><<服务条款>></el-link>
					</el-row>
				</el-form-item>
			</el-form>
			<div v-show="active==0" slot="footer" class="dialog-footer" align="center">
				<el-button style="margin-top: 12px;" @click="next('ruleForm')">下一步</el-button>
			</div>
			
			<el-form style="font-weight: bold;" :rules="ruletwo" ref="ruleForm2" v-show="active==1" :model="form">
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
			
		</div>	
		
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
							this.$message("注册成功");
							this.active=0;
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

<style lang="less" scoped>
	
	.register{
		height: 100%;
		width:100%;
		.top{
			width: 400px;
			padding: 50px;
			    //overflow-y:scroll;
			position: absolute;
			right: 25%;
			top: 25%;
			background-color: rgba(240, 255, 255, 0.5);
			border-radius: 10px;
			text-align: center;
		}
		background:
		        url("../../../../static/bg.jpg")
		        no-repeat center/cover;
	}
</style>
