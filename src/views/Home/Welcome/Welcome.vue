<template>
	<div class="welcome">
<!--		<el-card style="width: 90%; margin-left: 5%;height: 500px">-->
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
		<div style="width: 90%;height: 320px;padding-left: 50px;padding-top: 0px;text-align: center">
			<div style="font-size: 26px;padding-bottom: 20px">{{information.title}}</div>
			<div style="font-size: 18px;padding-bottom: 5px">夏日美食四溢，你想要的全都有</div>
			<div style="font-size: 18px;padding-bottom: 5px">早餐土司配以培根，</div>
			<div style="font-size: 18px;padding-bottom: 5px">整只太阳蛋，微烤吐司，还有松软酥脆的可颂堡，</div>
			<div style="font-size: 18px;padding-bottom: 5px">咬一口，回味无穷。</div>
			<div style="font-size: 18px;padding-bottom: 5px">甜蜜饮品，清香四溢的蜜瓜与馥郁的奶香交织融合，</div>
			<div style="font-size: 18px;padding-bottom: 5px">为你带来夏日童话般的浪漫体验。</div>
			<div style="font-size: 18px;padding-bottom: 5px">使用‘饱了么’线上送餐</div>
			<div style="font-size: 18px;padding-bottom: 5px">带领你解锁今夏最便捷最享受的“美食”新体验吧。</div>

		</div>
<!--	<el-card style="width: 80%; margin-left: 8%;text-align: center;">
			<h3 style="">今日活动</h3>
			<div style="font-size: 18px;padding-top: 10px">{{activity}}</div>
		</el-card>	-->
		<ActivityCp style="overflow: hidden;"></ActivityCp>
		<br />
		<el-card style="width: 80%; margin-left: 8%;text-align: center;">
			<h3>店铺公告</h3>
			<div style="font-size: 18px;padding-top: 10px">{{notice}}</div>
		</el-card><br />
		<el-card style="width: 80%; margin-left: 8%;text-align: center;">
			<h3>当季菜品</h3>
			<div style="font-size: 18px;padding-top: 10px">{{seasonFood}}</div>
		</el-card><br /><br/><br>
		<el-row style="padding-bottom: 50px">
			<el-col :span="5" :offset="1">
				<el-card :body-style="{ padding: '0px' }">
					<img style="width: 100%;height: 250px;"src="../../../../static/16.jpg" class="image">
				</el-card>
			</el-col>
			<el-col :span="5" style="margin-left: 20px;">
				<el-card :body-style="{ padding: '0px' }">
					<img style="width: 100%;height: 250px;"src="../../../../static/17.jpg" class="image">
				</el-card>
			</el-col>
			<el-col :span="5" style="margin-left: 20px;">
				<el-card :body-style="{ padding: '0px' }">
					<img style="width: 100%;height: 250px;"src="../../../../static/18.jpg" class="image">
				</el-card>
			</el-col>
			<el-col :span="5" style="margin-left: 20px;">
				<el-card :body-style="{ padding: '0px' }">
					<img style="width: 100%;height: 250px;"src="../../../../static/19.jpg" class="image">
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ActivityCp from '../../../components/Activity.vue';
	export default {
		//单页面中不支持前面的data:{}方式
		components:{
			ActivityCp,
		},
		data() {
			
			//相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
			return {
				
				//显示图片部分图片地址
				imgList: [
					{id: 0, idView: require('../../../../static/FOOD.jpg')},
					{id: 1, idView: require('../../../../static/MSR.jpg')},
					{id: 2, idView: require('../../../../static/MERCH.jpg')},
				],
				activity:"宫保鸡丁 6折 熊掌豆腐 7折 双椒牛柳 2折",
				notice:"新店开业，全场八折",
				seasonFood:"绿豆汤    密瓜酸奶",
				information:{
					title:'开启夏日狂想',
					content:'人鱼桃桃星冰乐将原榨桃汁、桃果肉果冻融合燕麦奶*，' +
							'\n 为你带来夏日童话般的浪漫体验。' +
							'\n 三种美味层层融合的童趣三色杯星冰乐，' +
							'\n 用满满的愉悦包裹你的味蕾，唤起简单快乐的童心。' +
							'\n 清香四溢的蜜瓜与馥郁的奶香交织融合，' +
							'\n 用晴空蜜瓜星冰乐解锁今夏“吃瓜”新体验吧。' +
							'\n *燕麦奶为谷物饮料'
				},
			}
		},
		created(){
			this.axios.get('http://localhost:8080/activity/getActivityMessage').then(r=>{
				this.activity=r.data.msg.message;
			});
			this.axios.get('http://localhost:8080/resturant/getNoticeInfo').then(r=>{
				//console.log(r.data.msg.NewNotice.noticeContent);
				this.notice=r.data.msg.NewNotice.noticeContent;
			});
			this.axios.get('http://localhost:8080/food/selectNewFood').then(r=>{
				console.log(r.data);
				this.seasonFood='';
				this.seasonFood+= r.data.msg.food1.foodName;
				this.seasonFood+='     ';
				this.seasonFood+=r.data.msg.food2.foodName;
				//this.notice=r.data.msg.NewNotice.noticeContent;
			});
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
