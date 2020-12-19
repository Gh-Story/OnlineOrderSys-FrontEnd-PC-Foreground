<template>
	<div class='taskManage'>
	  <el-row>
		  <img src="../../../../static/任务迎取红包.jpg" style="width: 100%;height: 200px;">
	  </el-row>
	  <h3 style="padding-bottom: 10px;">任务中心:</h3>
	  <div class="row" v-for="item in alltask">
		  <div class="row_i" v-for="task in item">
			<div style="margin-top:53px ;margin-left: 41%;">
				<el-button type="warning" @click="getTask(task.taskId)" circle>领</el-button>
			</div>
			<div style="margin-top: 20%;color:white;text-align: center;">
				<el-row >{{task.name}}</el-row>
				<el-row style="margin-top: 5px;">今日下{{task.need}}单</el-row>
				<el-row style="margin-top: 5px;">奖励：{{task.redPacket}}</el-row>
			</div>
		  </div>
	  </div>
	  
	  <h3 style="padding-bottom: 10px;">我的任务:</h3>
	  <div class="row" v-for="item in allmytask">
	  		  <div class="row_i" v-for="task in item">
	  			<div style="margin-top:53px ;margin-left: 41%;">
	  				<el-button type="warning" @click="getRedpack(task)" circle>领</el-button>
	  			</div>
	  			<div style="margin-top: 20%;color:white;text-align: center;">
	  				<el-row >{{task.name}}</el-row>
	  				<el-row style="margin-top: 5px;">今日下{{task.need}}单</el-row>
					<el-row style="margin-top: 5px;">已完成{{task.finished}}单</el-row>
	  				<el-row style="margin-top: 5px;">奖励：{{task.redPacket}}</el-row>
	  			</div>
	  		  </div>
	  </div>
	  <!--
	  <div v-for="item in myTasks">
	  		<el-card body-style="padding:0px">
	  			<el-col :span="6">
	  				<h2 style="padding-top: 5%;">{{item.name}}</h2>
	  			</el-col>
	  			<el-col :span="6">
	  				<h3 style="padding-top: 5%;">今日下{{item.need}}单</h3>
	  					<h4 style="color: grey;" >已完成{{item.finished}}单</h4>
	  			</el-col>
	  			<el-col :span="10">
	  				<h3 style="padding-top: 5%;color: red;">奖励：{{item.redPacket}}</h3>
	  			</el-col>
	  			<el-col :span="2">
	  				<div style="position: relative;" @click="getRedpack(item)">
	  					<img
	  					src="../../../../static/红包包.jpg" 
	  					class="image"
	  					height="60px">
	  					<span style="cursor: default; user-select:none; position: absolute; bottom: 24px; left: 3px;
	  					font-size: 8px;font-family:'微软雅黑';color: white;">领取红包</span> 
	  				</div>
	  			</el-col>
	  		</el-card><br />
	  		
	  </div>
	  
	  -->
		 
	</div>
	
</template>

<script>
	export default {
		data() {
		  return {
			alltask:[],
			allmytask:[],
			tasks:[
				/*{
					taskId:0,
					name:'新春红包活动11',
					need:'2',
					redPacket:'3元红包',
					
				},{
					taskId:0,
					name:'新春红包活动12',
					need:'2',
					redPacket:'3元红包',
				},{
					taskId:0,
					name:'新春红包活动13',
					need:'2',
					redPacket:'3元红包',
				},{
					taskId:0,
					name:'新春红包活动14',
					need:'2',
					redPacket:'3元红包',
				},
				{
					taskId:0,
					name:'新春红包活动11',
					need:'2',
					redPacket:'3元红包',
					
				},{
					taskId:0,
					name:'新春红包活动12',
					need:'2',
					redPacket:'3元红包',
				},{
					taskId:0,
					name:'新春红包活动13',
					need:'2',
					redPacket:'3元红包',
				},{
					taskId:0,
					name:'新春红包活动14',
					need:'2',
					redPacket:'3元红包',
				},
				{
					taskId:0,
					name:'新春红包活动14',
					need:'2',
					redPacket:'3元红包',
				},*/
			],
			myTasks:[
				/*{
					customer_missionId:0,
					name:'新春红包活动1',
					need:'2',
					finished:'1',
					redPacket:'3元红包',
				},{
					customer_missionId:0,
					name:'新春红包活动2',
					need:'2',
					finished:'1',
					redPacket:'3元红包',
				},{
					customer_missionId:0,
					name:'新春红包活动3',
					need:'2',
					finished:'1',
					redPacket:'3元红包',
				},{
					customer_missionId:0,
					name:'新春红包活动4',
					need:'2',
					finished:'1',
					redPacket:'3元红包',
				},*/
			]
		  }
		},
		created(){
			this.load();
			//this.trans();
			//this.trans2();
		},
		methods: {
		    trans(){
				let nums=this.tasks.length;
				this.alltask=[];
				for(let i=0;i<nums/4-1;i++){
					let tmp=[];
					for(let j=0;j<4;j++){
						tmp.push(this.tasks[4*i+j]);
					}
					this.alltask.push(tmp);
				}
				let tmp=[];
				if(nums%4==0){
					for(let i=4*(Math.floor(nums/4)-1);i<nums;i++){
						tmp.push(this.tasks[i]);
					}
				}else{
					for(let i=4*Math.floor(nums/4);i<nums;i++){
						tmp.push(this.tasks[i]);
					}
				}
				
				this.alltask.push(tmp);
				
			},
			trans2(){
				let nums=this.myTasks.length;
				this.allmytask=[];
				for(let i=0;i<nums/4-1;i++){
					let tmp=[];
					for(let j=0;j<4;j++){
						tmp.push(this.myTasks[4*i+j]);
					}
					this.allmytask.push(tmp);
				}
				let tmp=[];
				if(nums%4==0){
					for(let i=4*(Math.floor(nums/4)-1);i<nums;i++){
						tmp.push(this.myTasks[i]);
					}
				}else{
					for(let i=4*Math.floor(nums/4);i<nums;i++){
						tmp.push(this.myTasks[i]);
					}
				}
				this.allmytask.push(tmp);
				
			},
			getTask(taskId){
				
				this.axios.post('http://localhost:8080/mission/addCustomerMission',{
					customerId:3,
					missionId:taskId
				}).then(r=>{
					
					this.$message({
						message: '领取成功',
						type: 'success'
					});
					this.load();
				});
				
			},
			getRedpack(item){
				
				 if(item.finished>=item.need){
					this.axios.post('http://localhost:8080/mission/converRedpacket',{
						customerId:3,
						customer_missionId:item.customer_missionId
					}).then(r=>{
						this.$message({
							message: '领取成功',
							type: 'success'
						});
						this.load();
					});
				}else{
					this.$message({
						message: '未完成任务',
						type: 'warning'
					});
				}
				
			},
			load(){
				this.axios.post('http://localhost:8080/mission/selectByCustomer',{}).then(r=>{
					let list = r.data.msg.missionList;
					
					this.myTasks=[];
					for(let i=0;i<list.length;i++){
						let item={customer_missionId:0,name:'新春红包活动4',need:'2',finished:'1',redPacket:'3元红包',};
						item.customer_missionId=list[i].customerMission.customerMissionId;
						item.name=list[i].mission.missionName;
						item.need=list[i].mission.missionNeed;
						item.finished=list[i].customerMission.missionCompl;
						item.redPacket=list[i].redpacket.redpacketName;
						if(list[i].customerMission.customerMissionState==1)
							this.myTasks.push(item);
					}
					if(this.myTasks.length==0){
						this.allmytask=[];
					}else{
						this.trans2();
					}console.log('111',this.allmytask);
				
					this.axios.post('http://localhost:8080/mission/selectAll',{}).then(r=>{
						
						let list1 = r.data.msg.missionList;
						
						this.tasks=[];
						for(let i=0;i<list1.length;i++){
							let item={taskId:0,name:'新春红包活动4',need:'2',redPacket:'3元红包',};
							item.taskId=list1[i].mission.missionId;
							item.name=list1[i].mission.missionName;
							item.need=list1[i].mission.missionNeed;
							item.redPacket=list1[i].redpacket.redpacketName;
							let flag=1;
							for(let j=0;j<list.length;j++){
								
								if(list1[i].mission.missionId==list[j].mission.missionId){
									flag=0;
									//console.log(list1[i].mission,list[j].mission);
								}
									
							}
							if(flag==1){
								this.tasks.push(item);
							}
								
						}
						//console.log('111',this.tasks);
						if(this.tasks.length==0){
							this.alltask=[];
						}else{
							this.trans();
						}
						console.log('222',this.alltask);
					});
					
				});
			}
		},
	}
</script>

<style lang="less" scoped>
	.taskManage{
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 60px;
		overflow: auto;
		.row{
			display: flex;
			flex-direction: row;
			height: 300px;
			width: 100%;
			margin-top: 2%;
			margin-left: 2%;
			.row_i{

				margin-right: 5%;
				width: 15%;
				background: 
					url("../../../../static/红包包.jpg");
				background-size:100% 100%;
			}
		}
		
	}
	
</style>
