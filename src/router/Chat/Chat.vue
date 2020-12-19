<template>
	<div class="Chat">
		<div class="Panel">
			<el-card class="Mycard">
			  <div class="head" slot="header" style="text-align: center;">
			    <span >聊天框</span>
			  </div>
			  <div class="body">
				<div ref="main" class="middle">
					<div ref="content">
						<div v-for="item in messages">
							<div :class="{left:item.customerId>0,right:item.customerId<0}" style="width: 60%;">
								<div class="name">
									<span>{{name(item)}}</span>
								</div>
								<div class="chartBox">
								  <span v-text="item.message"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<el-row>
						<el-col :span="5">
							<el-select v-model="value" style="padding-left: 3%;padding-top: 15px;" placeholder="客户名">
								<el-option
								  v-for="item in customer"
								  :key="item.customerId"
								  :value="item.customerName">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="15">
							<el-input
							  style="padding-left: 2%;padding-top: 10px;"
							  type="textarea"
							  :autosize="{minRows:2,maxRows:3}"
							  placeholder="请输入内容"
							  v-model="message">
							</el-input>
						</el-col>
						<el-col :span="4">
							 <el-button @click="sendMessage" style="float:right; margin-right:15px;margin-top: 15px;" type="warning" size="small">发送</el-button>
						</el-col>
					</el-row>
				</div>
			  </div>
			  
			</el-card>
		</div>
	</div>
	
</template>

<script>
	export default {
		data(){
			return{
				//如果id>0,则将customerName显示在左侧，为用户所发消息
				//如果id=-1,则将customerName显示在右侧，为管理员所回复的消息
				messages:[
					{customerId:1,customerName:'刘猪猪1',message:"咋了房间欧文i就覅我非叫我我i叫我二wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"},
					{customerId:2,customerName:'刘猪猪2',message:'在吗'},
					{customerId:-1,customerName:'刘猪猪1',message:'不在'},
					{customerId:2,customerName:'刘猪猪2',message:'在吗??'},
					{customerId:-1,customerName:'刘猪猪1',message:'不在'},
					{customerId:2,customerName:'刘猪猪2',message:'在吗??'},
					{customerId:-1,customerName:'刘猪猪1',message:'不在'},
					{customerId:2,customerName:'刘猪猪2',message:'在吗??'},
				],
				value:'',
				message:'',
				ws:''
			}
			
		},
		computed:{
			customer(){
				let customer=[];
				for(let i=0;i<this.messages.length;i++){
					let customer_item={customerId:0,customerName:''};
					let flag=1;
					for(let j=0;j<customer.length;j++){
						if(this.messages[i].customerId ==customer[j].customerId)
							flag=0;
					}
					if(flag==1&&this.messages[i].customerId!=-1){
						customer_item.customerId=this.messages[i].customerId;
						customer_item.customerName=this.messages[i].customerName;
						customer.push(customer_item);
					}
				}
				return customer;
			},
			name(){
				return(item)=>{
					if(item.customerId>0)return item.customerName;
					else return '回复:'+item.customerName;
				}
				
			}
		},
		methods:{
			sendMessage(){
				let customerId=0;
				for(let i=0;i<this.customer.length;i++){
					if(this.value==this.customer[i].customerName){
						customerId=this.customer[i].customerId;
					}
				}
				let message_item={customerId:-1,customerName:'',message:''};
				message_item.customerName=this.value;
				message_item.message=this.message;
				this.messages.push(message_item);
				console.log(customerId);
				
				let msg={from:0,to:0,message:''};
				msg.from=-1;
				msg.to=1;
				msg.message=message_item.message;
				let res=msg.message+'_'+msg.from+'_'+msg.to;
				console.log(res);
				this.ws.send(res);
				
				
				this.$nextTick(() => {
				       this.$refs.main.scrollTop = this.$refs.content.scrollHeight;
				});
			},
			wsMessage(event) {
                console.log(event.data);//返回数据的内容
				let data=JSON.parse(event.data);
				console.log(data.messageType);
                if(data.messageType==1){
					let message_item={customerId:-1,customerName:'',message:''};
					message_item.customerId=data.clientId;
					message_item.customerName=data.clientName;
					message_item.message=data.message;
					this.messages.push(message_item);
					this.$nextTick(() => {
					       this.$refs.main.scrollTop = this.$refs.content.scrollHeight;
					});
				}
				

            },
            wsOpen() {
                console.log('websocket-连接已经建立');
            },
            wsClose() {
                console.log('websocket-连接已经关闭');
            },
            wsError() {
                console.log('websocket-出现错误');
            },

            
		},
		created(){
			this.ws = new WebSocket(`ws://localhost:8080/wss/客服小饱/-1`);
			this.ws.onopen = this.wsOpen;
			this.ws.onclose = this.wsClose;
			this.ws.onerror = this.wsError;
			this.ws.onmessage = this.wsMessage;
		}
	}
</script>

<style lang="less" scoped>

	.Chat{
		width: 100%;
		.Panel{
			background-color: blue;
			height:550px;
			width:70%;
			margin-top: 50px;
			margin-left: 15%;
			margin-right: 100px;
			.Mycard{
				height: 100%;
				.head{
					//background-color: #D3DCE6;
				}
				.body{
					
					.middle{
						padding-left: 5px;
						padding-right: 5px;
						height: 405px;
						overflow: auto;
						background-color: #eaeaea;
						.left{
							padding-top: 5px;
							float:left;
							text-align: left;
							.chartBox{
								padding-left: 15px;
							}
							
						}
						.right{
							float:right;
							text-align: right;
							.chartBox{
								padding-right: 15px;
								span{
									padding:5px;
									background-color: #fde463;
								}
								
							}
						}
						.name{
							font-size: 14px;
						}
						.chartBox{
							padding: 6px;
							font-size: 16px;
							span{
								background-color: white;
								padding: 3px;
								border-radius: 5px;
								padding:5px;
								word-break:break-all;
								display:inline-block;
								//display:block; 
								//word-wrap : break-word ;
							}
							
						}
					}
					.bottom{
						height: 90px;
						background-color: #e5e8f0;
					}
				}
				/deep/.el-card__body{
					padding: 0px !important;
					
				}
				
			}
		}
	}
	
</style>