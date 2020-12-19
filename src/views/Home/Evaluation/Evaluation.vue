<template>
	<div class="evaluation">
		<div class="top">
			<div class="top_div1">
				<el-row style="height: 40px;display: flex;flex-direction: row;">
					<p style="line-height: 30px; margin-right: 10px;">评价日期:</p>
					<el-radio-group  size="small" >
					  <el-button @click="timeSelect" size="small">全部</el-button>
					</el-radio-group>
					<el-date-picker
					style="display: flex; width: 50%;"
					v-model="timeValue"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					size='small'
					@change="query"
					value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-row>
			</div>				
		</div>
		<div class="medium">
			<div class="medium_div1">
				<el-collapse   accordion>
					<el-collapse-item v-for=" item in evaluationList"  :key="item.evaluation.evaluationId" name="1">
						<template slot="title">
							<span style="padding-left: 20px;">匿名用户 </span>
							<span style="color: dodgerblue;margin-left: 40px"> {{item.evaluation.evaluationDate.substring(0,16)}} </span>
							<span v-if="item.evaluation.evaluationState==2" style="color: dodgerblue;font-size:12px;margin-left: 40px"> 等待回复 </span>
							<span v-else="item.evaluation.evaluationState==1" style="color: gray;font-size:12px;margin-left: 40px"> 商家已回复 </span>
						</template>
						<el-row>
							<img v-for="img in item.foods" ref="imgHeight"
								 :src="path+img.foodPicture"
								 class="avatar"
								 width=100px
								 height=100px
								 style="padding-left: 20px;margin-top: 5px;float:left;margin-right: 5px">
						</el-row>
						<el-row><span style="padding-left: 20px;">{{item.evaluation.evaluationContent}}</span></el-row>
						<el-row v-if="item.evaluation.evaluationState==1"><el-tag style="margin-left: 20px;"type="info">商家回复：{{item.evaluation.replyMessage}}</el-tag></el-row>
					</el-collapse-item>
					
				</el-collapse>
			</div>
		</div>
		<div class="buttom">
			<div>黄金广告位招租中**********</div>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			this.timeSelect();
		},
		methods:{
			query(){
				if(this.timeValue==null || this.timeValue==''){
				}else{
					let Data={evaluation_startdate:this.timeValue[0],evaluation_enddate:this.timeValue[1],evaluation_state:this.stateValue};
					this.getEvaluations(Data);
				}
			},
			timeSelect(){
				this.setTime()
				let Data={evaluation_startdate:this.timeValue[0],evaluation_enddate:this.timeValue[1],evaluation_state:this.stateValue};
				this.getEvaluations(Data);
			},
			setTime(){
				let nowDate=new Date();
				let yy=nowDate.getFullYear();
				let MM=(nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1);
				let dd=nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate();
				let formatNowDate=yy+'-'+MM+'-'+dd;
				this.timeValue=['1970-01-01',formatNowDate];
			},
			getEvaluations(Data){
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/evaluation/selectFoodAndEvaluation',Data).then(r=>{
					this.evaluationList=r.data.msg.evaluationFoodList;
					console.log(this.evaluationList);
				});
				
				
			},
		},
		data() {
			return {
				timeValue:[],
				evaluationList:[],
				path:'http://localhost:8080/image/',
			}
		},
	
	}
	
</script>

<style lang="less" scoped>
	.evaluation{
		display: flex;
		flex-direction: column;
		width:100%;
		height:100%;
		margin-left:10px;
		.top{
			display: flex;
			flex-direction: row;
			flex:1;
			//background-color: blanchedalmond;
			.top_div1{
				margin-top:2%;
				
			}
		}
		.medium{
			display: flex;
			flex-direction: row;
			flex:5;
			//background-color: lightgoldenrodyellow;
			.medium_div1{
				width:100%;
			}
		}
		.buttom{
			display: flex;
			flex-direction: row;
			flex:1;
			//background-color: yellow;
		}
	}
</style>
