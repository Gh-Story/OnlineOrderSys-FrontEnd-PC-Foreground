<template>
	<div class="activity">
		
		
		
		<div style="margin-left:5% ;margin-top: 50px;margin-bottom: 100px;text-align: center;">
			<el-col :span="22">
					<h2 style="color: coral;">{{activityContent.activity.activityName}}</h2>
					<h3 style="color: grey;">{{activityContent.activity.activityStart.substring(0,11)}} 00:00 — {{activityContent.activity.activityEnd.substring(0,11)}} 00:00</h3>
				</el-col>
				
			<br />
		</div>
			
		
		<div class="row" v-for="item in activityContent.activityItemList">
			<div class="row_l" @click="go(item.food.foodType)">
				<img style=" border-radius: 10px;box-shadow: 5px 5px 5px #888888;" width="80%" height="260" :src="path+item.food.foodPicture">
			</div>
			<div class="row_r">
				<div style="margin-top: 30px;font-size: 20px;font-weight: bold;">{{item.food.foodName}}</div>
				<div style="margin-top: 5px;width: 80%;">{{item.food.foodIntroduction}}</div>
				<div style="margin-top: 5px;color: grey; text-decoration: line-through">原价：￥{{item.food.foodPrice.toFixed(2)}}</div>
				<div style="margin-top: 5px;">折扣：<el-tag type="danger" effect="plain" size="small">{{item.activityItem.discount*10}}折</el-tag></div>
				<div style="margin-top: 5px;color:#ea4b35 ;">惊爆现价：￥<span style="font-size: 18px;">{{(item.activityItem.discount*item.food.foodPrice).toFixed(2)}}</span></div>
				<div class="row_r_img" style="margin-left: 200px;margin-top: -100px;"></div>
			</div>
		</div>
		
	</div>
	
</template>

<script>
	export default {
		data() {
		  return {
			path:'http://localhost:8080/image/',
			activityContent:{
				activity:{
					activityEnd: "2020-07-28 00:00:00",
					activityId: 5,
					activityName: "暑期大放送",
					activityStart: "2020-07-08 00:00:00",
					activityState: 2,
					activityType: 2,
				},
				activityItemList:[
					//[
						{
							activityItem:{
								activityId: 5,
								activityItemId: 14,
								activityItemState: 1,
								discount: 0.8,
								foodId: 17,
							},
							food:{
								foodId: 17,
								foodIntroduction: "黑金时代是本店新推出的一款慕斯蛋糕，口味变化丰富，质地柔软，入口即化，巧克力选用比利时高级巧克力，打造高贵质感。",
								foodName: "黑金时代",
								foodPicture: "黑金时代.jpg",
								foodPrice: 60,
								foodState: 1,
								foodType: "4",
							}
						},
						{
							activityItem:{
								activityId: 5,
								activityItemId: 15,
								activityItemState: 1,
								discount: 0.7,
								foodId: 18,
							},
							food:{
								foodId: 18,
								foodIntroduction: "韩式手法，炸鸡块外表刷满韩式甜辣酱，佐以清脆爽口的泡菜，香甜脆爽，回味无穷。",
								foodName: "韩式炸鸡",
								foodPicture: "韩式炸鸡.jpg",
								foodPrice: 42,
								foodState: 1,
								foodType: "5",
							}
						},
				//	],
				//	[
						{
							activityItem:{
								activityId: 5,
								activityItemId: 14,
								activityItemState: 1,
								discount: 0.8,
								foodId: 17,
							},
							food:{
								foodId: 17,
								foodIntroduction: "黑金时代是本店新推出的一款慕斯蛋糕，口味变化丰富，质地柔软，入口即化，巧克力选用比利时高级巧克力，打造高贵质感。",
								foodName: "黑金时代",
								foodPicture: "黑金时代.jpg",
								foodPrice: 60,
								foodState: 1,
								foodType: "4",
							}
						},
						{
							activityItem:{
								activityId: 5,
								activityItemId: 15,
								activityItemState: 1,
								discount: 0.7,
								foodId: 18,
							},
							food:{
								foodId: 18,
								foodIntroduction: "韩式手法，炸鸡块外表刷满韩式甜辣酱，佐以清脆爽口的泡菜，香甜脆爽，回味无穷。",
								foodName: "韩式炸鸡",
								foodPicture: "韩式炸鸡.jpg",
								foodPrice: 42,
								foodState: 1,
								foodType: "5",
							}
						}
					//],
				]
			},
			
		  }
		},
		created(){
			this.axios.post("http://localhost:8080/activity/nowActivity",{}).then(r=>{
				if(r.data.msg.activity){
					if(r.data.msg.activityItemList&&r.data.msg.activityItemList.length>0){
						/*let tmp=r.data.msg.activityItemList;
						r.data.msg.activityItemList=[];
						for(let i=0;i<Math.floor(tmp.length/2);i++){
							let tp=[];
							for(let j=0;j<2;j++){
								tp.push(tmp[i*2+j]);
							}
							r.data.msg.activityItemList.push(tp);
						}
						if(tmp.length%2!=0){
							let tp=[];
							tp.push(tmp[tmp.length-1]);
							r.data.msg.activityItemList.push(tp);
						}*/
					}else{
						this.$message("没有活动子项");
					}
					this.activityContent=r.data.msg;
					console.log(this.activityContent);
				}else{
					this.$message("目前暂无活动");
				}
				
				
			});
		},
		methods: {
		    go(obj){
				console.log(obj);
				this.$store.commit('setFoodType',obj);
				this.$router.push('/Home/Food');
				
			}
		},
	}
</script>

<style lang="less" scoped>
	.activity{
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 60px;
		overflow: auto;
		.row{
			width: 100%;
			height:300px;
			display: flex;
			flex-direction: row;
			margin-top: 2%;
			margin-left: 5%;
			.row_l{
				flex:1;
			}
			.row_r{
				flex:1;
				.row_r_img{
					height: 170px;
					width: 100%;
					background: url(../../static/bg9.jpg) no-repeat;
					overflow-y: hidden;
				}
			}
		}
		
	}
</style>
