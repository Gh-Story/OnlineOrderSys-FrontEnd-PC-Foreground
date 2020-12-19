<template>
	<div class="customerService">
		<div class="top">
			<div class="top_div1">
				<el-row style="width: 600px; height: 40px;display: flex;flex-direction: row;">
					<div class="block" ><el-avatar :size="50" :src="imgList[0].idView"></el-avatar></div>
					<el-alert style="margin-left: 10%;" title="您好,客服小饱很高心为您服务" type="info" :closable="false"></el-alert>
				</el-row>
			</div>				
		</div>
		<div class="medium">
			<div class="Panel">
				<el-card class="Mycard">
				  <div class="head" slot="header" style="text-align: center;">
				    <span >在线客服</span>
				  </div>
				  <div class="body">
					<div ref="main" class="middle">
						<div ref="content">
							<div v-for="item in messages">
								<div :class="{left:item.customerId<0,right:item.customerId>0}" style="width: 60%;">
									<div class="name">
										<span>{{item.customerName}}</span>
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
		<div class="buttom">
			<el-divider  content-position="center"><el-link class="el-icon-phone" type="primary">电话客服：83332333</el-link></el-divider>
			
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [
					{id: 0, idView: require('../../../../static/8.jpg')},
					
				],
				messages:[
					
				],
				message:'',
				ws:'',
				customerId:'',
				serviceName:''
			}
		},
		created(){
			let customer=this.$store.getters.getCustomer;
			console.log(customer);
			this.customerId = customer.customerId;
			this.serviceName = customer.customerName;
			console.log(`ws://localhost:8080/wss/${this.serviceName}/${this.customerId}`);
			this.ws = new WebSocket(`ws://localhost:8080/wss/${this.serviceName}/${this.customerId}`);
			this.ws.onopen = this.wsOpen;
			this.ws.onclose = this.wsClose;
			this.ws.onerror = this.wsError;
			this.ws.onmessage = this.wsMessage;
		},
		methods:{
			sendMessage(){
				let message_item={customerId:1,customerName:'',message:''};
				message_item.customerName='我';
				message_item.message=this.message;
				this.messages.push(message_item);
				//发送消息
				let response=message_item.message+'_'+this.customerId+'_'+'-1';
				console.log(response);
				this.ws.send(response);
				//刷新页面
				this.message="";
				this.$nextTick(() => {
				       this.$refs.main.scrollTop = this.$refs.content.scrollHeight;
				});
			},
			wsMessage(event){
				console.log(event.data);//返回的数据内容
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
			wsOpen(){
				console.log("websocket开启");
			},
			wsError(){
				console.log("websocket错误");
			},
			wsClose(){
				console.log("websocket关闭");
			},
			
		}
	
	}
	
</script>

<style lang="less" scoped>
	.customerService{
		display: flex;
		flex-direction: column;
		width:100%;
		height:100%;
		.top{
			display: flex;
			flex-direction: row;
			flex:1;
			//background-color: blanchedalmond;
			.top_div1{
				margin-top: 3%;
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
			.Panel{
				//background-color: blue;
				height:550px;
				width:70%;
				margin-top: 50px;
				margin-left: 15%;
				margin-right: 100px;
				.Mycard{
					height: 100%;
					/deep/ .el-card__header{
						background-color:#f6f6f6 ;
					}
					.head{
						//background-color: #D3DCE6;
					}
					.body{
						
						.middle{
							padding-left: 5px;
							padding-right: 5px;
							height: 405px;
							overflow: auto;
							//background-color: #eaeaea;
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
										//background-color: #e2f5fa;
										
									}
									
								}
							}
							.name{
								font-size: 12px;
							}
							.chartBox{
								padding: 6px;
								font-size: 16px;
								span{
									background-color: #e2f5fa;
									border: 1px solid #e5e8f0;
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
							//background-color: #e5e8f0;
							border-top:1px solid #e5e8f0;
							/deep/ .el-button{
								background-color: #e2f5fa;
								border-color:  #c6f5fa;
								color: black;
							}
						}
					}
					/deep/.el-card__body{
						padding: 0px !important;
						
					}
					
				}
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
