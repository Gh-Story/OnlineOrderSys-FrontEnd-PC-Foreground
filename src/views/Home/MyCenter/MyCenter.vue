<template>
	<div class="myCenter">
		<el-card class="box-card" style="width: 100%;height:700px;padding-bottom: 50px;">
		  <div slot="header" class="clearfix">
		    <span>个人中心</span>
		    <el-button style="float: right; padding: 3px 0" type="text">《隐私协议》</el-button>
		  </div>
		  
		  <div style="padding-top: 60px">
			  <el-col :span="4" :offset="1">
				<div @click="uploadHeadImg">
					<img style="border-radius:50%; width:150px; height:150px;" :src="user.profile" fit="cover">
					<input  hidden="hidden" type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
					
				</div>
				
			  </el-col>
			  <el-col :span="15" :offset="1">
			  	<el-form ref="form" :model="form" label-width="80px">
			  	  <el-form-item label="用户名">
			  	    <el-input disabled style="width: 200px;" v-model="user.username"></el-input>
			  	  </el-form-item>
				  <el-form-item label="姓名">
				    <el-input style="width: 200px;" v-model="user.name"></el-input>
				  </el-form-item>
				  <el-form-item label="昵称">
				    <el-input style="width: 200px;" v-model="user.nickname"></el-input>
				  </el-form-item>
				  <el-form-item label="密码">
					  <el-input
						type="password"
                        v-model="user.password"
						style="width: 200px;padding-right: 20px"
                      >
					  </el-input>
					  <el-button style="" @click="pwdVisible = true" size="mini">修改密码</el-button>
				  </el-form-item>
				  
				  <el-form-item label="出生日期">
				  	<el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择生日" v-model="user.birthday" style="width: 200px;"></el-date-picker>
				  </el-form-item>
				  <el-form-item label="性别">
				    <el-radio-group v-model="user.sex">
				      <el-radio label="男"></el-radio>
				      <el-radio label="女"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  </el-form>
				  <el-col :span="20":offset="4" style="padding-top: 50px">
					  
					  <el-button type="success" @click="updateInform">修改</el-button>
					  <el-button type="danger" @click="telVisible = true">电话管理</el-button>
					  <el-button type="warning" @click="addressVisible = true">地址管理</el-button>
				  </el-col>
				  
				  
			  	
			  </el-col>
		  </div>
		</el-card>
		<el-dialog
		  title="我的电话"
		  :visible.sync="telVisible"
		  width="40%"
		  >
			<div v-for="item in user.phone">
				<el-row>
					<el-col :span="18">
						<el-input class="inputTel" v-model="item.value"></el-input>
					</el-col>
					<el-col :span="6">
						<el-button type="danger" @click="delPhone(item.index)" icon="el-icon-delete" circle></el-button>
					</el-col>
				</el-row><br />
			</div>
			<div style="text-align: right;">
				<el-button type="success" icon="el-icon-circle-plus-outline" @click="addTel" circle>新增</el-button>
			</div>
		</el-dialog>
		<el-dialog
		  title="地址管理"
		  :visible.sync="addressVisible"
		  width="30%"
		>
			  <div v-for="item in user.address">
			  	<el-row>
			  		<el-col :span="18">
			  			<el-input class="inputTel" v-model="item.value"></el-input>
			  		</el-col>
			  		<el-col :span="6">
			  			<el-button type="danger" @click="delAddress(item.index)" icon="el-icon-delete" circle></el-button>
			  		</el-col>
			  	</el-row><br />
			  </div>
			  <div style="text-align: right;">
			  	<el-button type="success" icon="el-icon-circle-plus-outline" @click="addAddress" circle>新增</el-button>
			  </div>
		</el-dialog>
		
		<el-dialog
		  title="修改密码"
		  :visible.sync="pwdVisible"
		  width="40%"
		>
			  <el-form :model="changePwd">
			  	<el-form-item label="原密码:" label-width="80px">
			  		<el-row style="display: flex;flex-direction: row;">
			  			<el-input type="password" v-model="changePwd.oldPwd"  style="width: 200px;" placeholder="请输入原密码" autocomplete="off"></el-input>
			  		</el-row>
			  	</el-form-item>
			  	<el-form-item label="新密码:" label-width="80px">
			  		<el-row style="display: flex;flex-direction: row;">
			  			<el-input
			  			  :type="passFormShow?'text':'password'"
			  			  v-model="changePwd.newPwd"
			  			  style="width: 200px;"
			  			>
			  			<i
			  			  :class="passFormShow ?'el-icon-remove-outline el-input__icon':'el-icon-view el-input__icon'"
			  			  slot="suffix"
			  			  @click="passFormShow=!passFormShow">
			  			</i>
			  			</el-input>
			  		</el-row>
			  	</el-form-item>
				<el-form-item label="确认密码:" label-width="80px">
					<el-row style="display: flex;flex-direction: row;">
						<el-input
						  :type="passFormShow?'text':'password'"
						  v-model="changePwd.checkPwd"
												style="width: 200px;"
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
			  <div style="text-align: right;">
			  	<el-button type="success" icon="el-icon-circle-plus-outline" @click="updatePwd" circle>确认修改</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
		  return {
			passFormShow:false,
			activeNames: ['1'],
			user:{
				profile:require("@/../static/红包包.jpg"),
				username:'刘猪头',
				name:'刘大猪头',
				nickname:'猪头刘',
				birthday:'1998-06-06',
				sex:'男',
				password:'666',
				feature:'猪头',
				type:'1',
				address:[
					{index:1,value:'猪头弄1号'},
					{index:2,value:'猪头弄2号'}],
				phone:[
					{index:1 ,
					 value:'13843866666',
					},
					{index:2,
					 value:'13843877777',
					},
				],
			},
			form: {
			  name: '',
			  region: '',
			  date1: '',
			  date2: '',
			  delivery: false,
			  type: [],
			  resource: '',
			  desc: ''
			},
			changePwd:{
				oldPwd:'',
				newPwd:'',
				checkPwd:'',
			},
			telVisible:false,
			addressVisible:false,
			pwdVisible:false
		  }
		},
		created(){
			this.load();
		},
		methods: {
			load(){
				this.axios.post('http://localhost:8080/customer/getCustomer',{
					 customerId:2
				}).then(r=>{
					console.log(r.data.msg);
					let ret=r.data.msg.customer;
					this.user.profile="http://localhost:8080/image/"+ret.customerProfile;
					this.user.username=ret.customerUsername;
					this.user.name=ret.customerName;
					this.user.nickname=ret.customerNickname;
					this.user.birthday=ret.customerBirthday.substr(0,11);
					this.user.sex=ret.customerSex;
					this.user.feature=ret.customerFeature;
					this.user.password=ret.customerPassword;
					this.user.type=ret.customerType;
					
					let address = r.data.msg.addressList;
					let tel = r.data.msg.phonenumList;
					console.log(tel);
					this.user.address=[];
					this.user.phone=[];
					
					for(let i=0;i<tel.length;i++){
						let tel_item={index:1,value:''};
						tel_item.index=tel[i].phonenumId;
						tel_item.value=tel[i].phonenumMes;
						this.user.phone.push(tel_item);
						
					}
					for(let i=0;i<address.length;i++){
						let address_item={index:1,value:''};
						address_item.index=address[i].addressId;
						address_item.value=address[i].addressDetail;
						this.user.address.push(address_item);
						
					}
				});
			},
			updateInform:function(){
				console.log(this.user.birthday);
				this.axios.post(`http://localhost:8080/customer/updateCustomerWithDate`,
				{
					customerName:this.user.name,
					customerNickname:this.user.nickname,
					customerBirthday:this.user.birthday,
					customerSex:this.user.sex,
					customerFeature:this.user.feature,
					customerId:2,
				}).then(r=>{
					console.log(r.data);
					this.$message({
						message: '信息更新成功',
						type: 'success'
					});
				});
			},
			uploadHeadImg: function () {
				this.$el.querySelector('.hiddenInput').click();
			},
			handleFile: function (e) {
			      let $target = e.target || e.srcElement;
				  let formData = new FormData();
				  formData.append('pic', $target.files[0]);
				  console.log($target.files[0]);
				  console.log(formData);
				  this.axios.post(`http://localhost:8080/customer/up`,formData,{
				      headers:{
				          'Content-Type': 'multipart/form-data',
				      },
				  }).then(r=>{
				     //console.log(r.data);
					 //console.log("http://localhost:8080/image/"+r.data.saveFileName);
					 this.user.profile="http://localhost:8080/image/"+r.data.saveFileName;
					 this.axios.post(`http://localhost:8080/customer/updateCustomer`,
					 {
						 customerProfile:r.data.saveFileName,
						 customerId:2,
					 }).then(r=>{
						 console.log(r.data);
						 
						 this.$message({
							  message: '头像更新成功',
							  type: 'success'
						 });
					 });
				  });
			},
			updatePwd(){
				if(this.changePwd.newPwd==this.changePwd.checkPwd){
					console.log(this.changePwd.oldPwd);
					console.log(this.changePwd.newPwd);
					this.axios.post(`http://localhost:8080/customer/updatePwd`,
					{
						oldpassword:this.changePwd.oldPwd,
						newpassword:this.changePwd.newPwd,
						customerId:2,
					}).then(r=>{
						console.log(r.data);
						this.$message({
							message: '信息更新成功',
							type: 'success'
						});
					});
				}
				
			},
			addTel(){
				this.$prompt('请输入电话','新增电话', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(({ value }) => {
					console.log(value);
					this.axios.post(`http://localhost:8080/customer/addPhone`,
					{
						phoneNumber:value,
						phoneState:1,
						customerId:2,
					}).then(r=>{
						console.log(r.data);
						this.$message({
							message: '新增电话成功',
							type: 'success'
						});
					});
					this.load();
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '新增失败'
				  });       
				});
				
			},
			delPhone(index){
				console.log(index);
				this.axios.post(`http://localhost:8080/customer/delPhone`,
				{
					phoneID:index,
					
				}).then(r=>{
					console.log(r.data);
					this.$message({
						message: '删除电话成功',
						type: 'success'
					});
				});
				this.load();
			},
			addAddress(){
				this.$prompt('请输入地址','新增地址', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				}).then(({ value }) => {
					console.log(value);
					this.axios.post(`http://localhost:8080/customer/addAddress`,
					{
						customerId:2,
						address:value,
						addressState:1,
					}).then(r=>{
						console.log(r.data);
						this.$message({
							message: '新增地址成功',
							type: 'success'
						});
					});
					this.load();
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '新增失败'
				  });       
				});
			},
			delAddress(index){
				console.log(index);
				this.axios.post(`http://localhost:8080/customer/delAddress`,
				{
					addressID:index,
				}).then(r=>{
					console.log(r.data);
					this.$message({
						message: '删除地址成功',
						type: 'success'
					});
				});
				this.load();
			},
		},
	}
</script>

<style lang="less" >
	.inputTel /deep/ input{border: none;height: 30px;}
	.myCenter{
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 60px;
		overflow: auto;
		.labels{
			padding-bottom: 10px;
		}
		
	}
	.text {
	    font-size: 14px;
	  }
	
	  .item {
	    margin-bottom: 18px;
	  }
	
	 
	  .box-card {
	    width: 480px;
	  }
</style>
