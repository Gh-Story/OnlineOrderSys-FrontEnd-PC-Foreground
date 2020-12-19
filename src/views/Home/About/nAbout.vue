<template>
	<div class="about">
		<div class="top">
			<el-card class="box-card" style="width: 100%;">
				<div slot="header" class="clearfix">
					<span>商家信息</span>
					<el-button @click="test" style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
				</div>
				<el-row>
					<span style="float:left;margin-top:3%;">商家照片</span>
					<img  ref="imgHeight"
							 :src="res.resPhoto"
							 class="avatar"
							 width=100px
							 height=100px
							 style="padding-left: 20px;">
					<img  ref="imgHeight"
							 :src="res.resQrcode"
							 class="avatar"
							 width=100px
							 height=100px
							 style="padding-left: 20px;">
				</el-row>
			</el-card>
			
		</div>
		<div class="medium">
			<el-card class="box-card" style="width: 100%;">
			<el-row style="margin-top: 20px ;">
				<span style="float:left;margin-left:1%;" >商家名称</span>
				<span style="float: right;margin-right: 40%;">{{res.resName}}</span>
			</el-row>
			<el-divider></el-divider>
			<el-row>
				<span style="float:left;margin-left:1%;">商家主营</span>
				<span style="float: right;margin-right: 40%;">{{res.businessQualification}}</span>
			</el-row>
			<el-divider></el-divider>
			<el-row>
				<span style="float:left;margin-left:1%;">商家地址</span>
				<el-popover
				    placement="top-start"
				    width="600"
					height="400"
				    trigger="hover"
				    content="">
					<blmMap></blmMap>
				    <span slot="reference" style="float: right;margin-right: 40%;">东北大学浑南校区第二学生宿舍B区</span>
				 </el-popover>
			</el-row>
			<el-divider></el-divider>
			<el-row>
				<span style="float:left;margin-left:1%;">营业时间</span>
				<span style="float: right;margin-right: 40%;">{{res.onTime}}-{{res.offTime}}</span>
			</el-row>
			<el-divider></el-divider>
			<el-row>
				<span style="float:left;margin-left:1%;">联系商家</span>
				<el-link class="el-icon-phone" style="float: right;margin-right: 40%;">{{res.resTelephoneNumber}}</el-link>
			</el-row>
			</el-card >
		</div>
		<div class="buttom">
			
		</div>
	</div>
</template>

<script>
	import blmMap from '../../../components/Map/blmMap.vue';
	export default {
		components:{
			blmMap,
		},
		created() {
			this.axios.defaults.withCredentials=true;
			this.axios.post('http://localhost:8080/resturant/getResInfo').then(r=>{
				console.log(r.data);
				if(r.data.detail=='成功'){
					r.data.msg.ResD.resPhoto='http://localhost:8080/image/'+r.data.msg.ResD.resPhoto;
					r.data.msg.ResD.resQrcode='http://localhost:8080/image/'+r.data.msg.ResD.resQrcode;
					r.data.msg.ResD.onTime=r.data.msg.ResD.onTime.substring(11,16);
					r.data.msg.ResD.offTime=r.data.msg.ResD.offTime.substring(11,16);
					this.res=r.data.msg.ResD;
					
					
				}else{
					alert("数据连接出现问题，请联系数据库管理员");
				}
			});
		},
		methods:{
			test(){
				console.log("预留接口，作用未知");
			},
			query(){
				console.log("ddddd");
			}
		},
		data() {
			return {
				res:{
				},
			}
		},
	
	}
	
</script>

<style lang="less" scoped>
	.about{
		display: flex;
		flex-direction: column;
		width:100%;
		height:100%;
		background:
		        url("../../../../static/14.jpg")
		        no-repeat center/cover;
		.top{
			display: flex;
			flex-direction: row;
			flex:1.5;
			width: 800px;
			margin-left: 200px;
		}
		.medium{
			display: flex;
			flex-direction: row;
			flex:4.5;
			//background-color: lightgoldenrodyellow;
			width: 800px;
			margin-left: 200px;
			
		}
		.buttom{
			display: flex;
			flex-direction: row;
			flex:1;
			width: 800px;
			margin-left: 200px;
			background-color: white;
			margin-top: 0px;
		}
	}
</style>
