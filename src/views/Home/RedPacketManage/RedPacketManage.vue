<template>
	<div class="redPacketManage">
		
	  <div v-for="item in informs">
		<div style="width: 30%;padding-left: 2%; float:left;border-radius: 15px;">
			<el-card style=" border-radius: 15px;padding-bottom: 10px;">
				<el-col :span="24">
					<img 
					src="../../../../static/红包new.jpg" 
					class="image"
					height="160px"
					width="100%"
					>
				</el-col>
				<el-col :span="24">
					<h1 style="float: left;">{{item.redpackName}}</h1>
					<h2 style="float: right; color: red;">￥{{item.money}}</h2>
					
				</el-col>
				<el-col :span="24">
					<h3 style="color: grey;padding-top: 10px;">限制{{item.startDate}}至{{item.endDate}}</h3>
					<h3 style="padding-top: 6px;">满{{item.limit}}元可使用</h3>
				</el-col>
				
			</el-card><br />
		</div>
	  </div>
	  
		 <!-- <img
		  style="position:absolute; bottom:0; right:0"
		  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=170934042,4220110730&fm=26&gp=0.jpg" 
		  class="image"
		  height="150px"> -->
		  <el-col :span="4" :offset="20">
			  <img
			  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=170934042,4220110730&fm=26&gp=0.jpg" 
			  class="image"
			  height="150px">
		  </el-col>
	 
	</div>
	
</template>

<script>
	export default {
		data() {
		  return {
			informs:[
				{
					redpackName:'酒水红包',
					startDate:'2020-05-03',
					endDate:'2020-07-03',
					money:'10',
					limit:'30'
				},{
					redpackName:'鲜蔬红包',
					startDate:'2020-05-03',
					endDate:'2020-07-03',
					money:'10',
					limit:'30'
				},{
					redpackName:'刘猪头红包',
					startDate:'2020-05-03',
					endDate:'2020-07-03',
					money:'10',
					limit:'30'
				},{
					redpackName:'刘猪头红包',
					startDate:'2020-05-03',
					endDate:'2020-07-03',
					money:'10',
					limit:'30'
				},{
					redpackName:'刘猪头红包',
					startDate:'2020-05-03',
					endDate:'2020-07-03',
					money:'10',
					limit:'30'
				}
			]
		  }
		},
		created(){
			
			this.axios.post('http://localhost:8080/redpacket/selectByCustomer',{
				 customerid:5
			}).then(r=>{
				console.log(r.data.msg);
				let list = r.data.msg.redpacketList;
				this.informs=[];
				for(let i=0;i<list.length;i++){
					let item={ redpackName:'酒水红包',startDate:'2020-05-03',
							   endDate:'2020-07-03',money:'10',limit:'30'};
					item.startDate=list[i].customerRedpacket.customerRedpacketStart.substr(0,11);
					item.endDate=list[i].customerRedpacket.customerRedpacketEnd.substr(0,11);
					item.redpackName=list[i].redpacket.redpacketName;
					item.money=list[i].redpacket.redpacketNum;
					item.limit=list[i].redpacket.threshold;
					this.informs.push(item);
				}
			});
		},
		methods: {
		      
		},
	}
</script>

<style lang="less" scoped>
	.redPacketManage{
		padding-top: 20px;
		padding-left: 20px;
		padding-right: 60px;
		overflow: auto;
		.labels{
			padding-bottom: 10px;
		}
		
	}
	
</style>
