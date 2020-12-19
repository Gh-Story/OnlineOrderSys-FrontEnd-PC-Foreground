<template>
	<div class="Chat">
		<el-dialog v-dialogDrag  title="" :visible.sync="dialogTableVisible" custom-class="custom" :modal="false"
		                    :show-close="false">
		                    <div class="wxchatBorderLeft">
		                      <el-row>
		                        <div style="padding: 10px;">
		                          <div style="display: inline-block;">
		                            <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="input2" size="mini">
		                            </el-input>
		                          </div>
		                          <div style="display: inline-block;">&nbsp;&nbsp;
		                            <i class="el-icon-plus"></i>
		                          </div>
		                        </div>
		                      </el-row>
		                      <el-row>
		                        <div>
		                          <el-col :span="24">
		                            <div style="display: inline-block;padding: 12px;">
		                              <el-avatar shape="square" :src="squareUrl"></el-avatar>
		                            </div>
		                            <div style="display: inline-block;">
		                              <el-col>
		                                <div class="wxchatPeople">张小小</div>
		                              </el-col>
		                              <el-col>
		                                <div class="wxchatNews">你在干什么</div>
		                              </el-col>
		                            </div>
		                          </el-col>
		                        </div>
		                      </el-row>
		                    </div>
		                    <div class="wxchatBorderRightTop" v-dialogDrag>
		                      <div style="float: right;padding: 5px;">
		                        <i class="el-icon-close" style="font-size: 10px;"></i>
		                      </div>
		                      <div class="wxchatName">张三</div>
		                      <div class="wxchatMore">
		                        <i class="el-icon-more"></i>
		                      </div>
		                    </div>
		                    <div class="wxchatBorderRightMid">
		                      <div style="margin-left: 30px;margin-top: 15px;">
		                        <div align="center" style="padding: 15px 0;">
		                          <el-tag type="info" size="mini">12:56</el-tag>
		                        </div>
		                        <el-row>
		                          <el-col :span="2">
		                            <el-avatar shape="square" :src="squareUrl" style="width: 35px;height: 35px;"></el-avatar>
		                          </el-col>
		                          <el-col :span="12">
		                            <div class="chatPop1">
		                              <span style="line-height: 23px;">由type属性来选择tag的类型，也可以通过color属性来自定义背景色。</span>
		                            </div>
		                          </el-col>
		                        </el-row>
		                      </div>
		                      <div style="margin-left: 30px;margin-top: 15px;">
		                        <div align="center" style="padding: 15px 0;">
		                          <el-tag type="info" size="mini">12:56</el-tag>
		                        </div>
		                        <el-row>
		                          <el-col :span="21">
		                            <div class="chatPop2">
		                              <span style="line-height: 23px;">你好文本属性来选择属性来选择属性来选择属性来选择</span>
		                            </div>
		                          </el-col>
		                          <el-col :span="2">
		                            <el-avatar shape="square" :src="squareUrl" style="width: 35px;height: 35px;"></el-avatar>
		                          </el-col>
		                        </el-row>
		                      </div>
		                    </div>
		                    <div class="wxchatBorderRightBottom">
		                      <div>
		                        <div class="wxchatIcon1">
		                          <i class="el-icon-star-off"></i>
		                        </div>
		                        <div class="wxchatIcon2">
		                          <i class="el-icon-folder-remove"></i>
		                        </div>
		                        <div class="wxchatIcon3">
		                          <i class="el-icon-scissors"></i>
		                        </div>
		                        <div class="wxchatIcon4">
		                          <i class="el-icon-chat-dot-round"></i>
		                        </div>
		                      </div>
		                      <div style="margin: -2px 15px;">
		                        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="" v-model="textarea2"
		                          resize="none" autofocus maxlength="500">
		                        </el-input>
		                      </div>
		                      <div class="sendButton">
		                        <el-button size="mini">发送</el-button>
		                      </div>
		                    </div>
		                  </el-dialog>
		
		<!-- <div class="Panel">
			<el-card class="Mycard">
			  <div class="head" slot="header" style="text-align: center;">
			    <span >聊天框</span>
			  </div>
			  <div class="body">
				<div class="middle">
					<h1>???</h1>
					<h1>???</h1>
					<h1>???</h1>
					<h1>???</h1>
					<h1>???</h1>
					<h1>???</h1>
					<h1>???</h1>
					<h1>???</h1>
					<h1>???</h1>
				</div>
				<div class="bottom">
					<div style="display: inline;">
						<el-select v-model="value" style="height: 20px; width: 15%;padding-left: 3%;" placeholder="客户名">
							<el-option
							  v-for="item in customer"
							  :key="item.customerId"
							  :value="item.customerName">
							</el-option>
						</el-select>
					</div>
					<div style="display: inline;height: 20px;">
						<el-input
						  style="width: 60%;padding-left: 2%;"
						  type="textarea"
						  :autosize="{minRows:1,maxRows:3}"
						  placeholder="请输入内容"
						  v-model="textarea">
						</el-input>
					</div>

				</div>
			  </div>
			  
			</el-card>
		</div> -->
	</div>
	
</template>

<script>
	export default {
		data(){
			return{
				//如果id>0,则将customerName显示在左侧，为用户所发消息
				//如果id=-1,则将customerName显示在右侧，为管理员所回复的消息
				message:[
					{customerId:1,customerName:'刘猪猪1',message:'在吗'},
					{customerId:2,customerName:'刘猪猪2',message:'在吗'},
					{customerId:-1,customerName:'刘猪猪1',message:'不在'},
					{customerId:2,customerName:'刘猪猪2',message:'在吗??'},
				],
				value:'',
				textarea:''
			}
			
		},
		computed:{
			customer(){
				let customer=[];
				
				for(let i=0;i<this.message.length;i++){
					let customer_item={customerId:0,customerName:''};
					let flag=1;
					for(let j=0;j<customer.length;j++){
						if(this.message[i].customerId ==customer[j].customerId)
							flag=0;
					}
					if(flag==1&&this.message[i].customerId!=-1){
						customer_item.customerId=this.message[i].customerId;
						customer_item.customerName=this.message[i].customerName;
						customer.push(customer_item);
					}
				}
				return customer;
			}
		}
	}
</script>

<style lang="less" scoped>
//  .el-dialog__header {
//     padding:0px 20px 20px 10px;
//   }

 .chatPop1 :hover {
    background-color: #FAFAFA;
  }

  .chatPop1 span {
    background-color: #fff;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 10px;
    margin: 0px 0 10px 10px;
    position: relative;
    border: 1px solid #E3E3E3;
    max-width: 290px;
  }

  .chatPop1 span::after {
    content: '';
    border: 8px solid #ffffff00;
    border-right: 8px solid #fff;
    position: absolute;
    top: 8px;
    left: -16px;
  }

  .chatPop2 :hover {
    background-color: #2683f5;
  }

  .chatPop2 span {
    background-color: #2683f5;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 10px;
    margin: 0px 15px 10px 10px;
    position: relative;
    border: 1px solid #E3E3E3;
    max-width: 290px;
    float: right;
    color: #fff;
  }

  .chatPop2 span::after {
    content: '';
    border: 8px solid #ffffff00;
    border-right: 8px solid #2683f5;
    position: absolute;
    top: 8px;
    right: -16px;
    transform: rotateY(180deg)
  }

  .custom {
    border: 0px solid blue;
    height: 670px;
    width: 795px;
  }

  .wxchatBorder {
    width: 795px;
    height: 670px;
    border: 1px solid red;
    margin-left: -20px;
    margin-top: -59.5px;

  }

  .wxchatBorderLeft {
    width: 250px;
    height: 670px;
    background-color: #eeebe9;
    // border: 1px solid gray;
    display: inline-block;
    float: left;
    margin-left: -20px;
    margin-top: -60px;
  }

  .wxchatPeople {
    color: #000000;
    font-size: 14px;
  }

  .wxchatNews {
    color: #999;
    padding-top: 5px;
    font-size: 12px;
  }

  .wxchatName {
    color: #000000;
    font-size: 20px;
    float: left;
    padding-left: 30px;
    padding-top: 20px;
  }

  .wxchatMore {
    color: #999;
    font-size: 20px;
    float: right;
    margin-right: -15px;
    padding-top: 25px;
  }

  .wxchatBorderRight {
    max-width: 245px;
    height: 670px;
    // background-color: #000;
    // border: 2px solid red;
    display: inline-block;
    float: right;
    margin-right: -22px;
    // margin-left: 40px;
    margin-top: -60px;
  }

  .wxchatBorderRightTop {
    width: 545px;
    height: 60px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e7e7e7;
    display: block;
    float: right;
    margin-right: -20px;
    margin-top: -30px;
  }

  .wxchatBorderRightMid {
    width: 545px;
    height: 428px;
    background-color: #f5f5f5;
    border: 2px solid deeppink;
    display: block;
    float: right;
    margin-right: -20px;
  }

  .wxchatBorderRightBottom {
    width: 545px;
    height: 152px;
    background-color: #fff;
    border: 1px solid #eee;
    display: block;
    float: right;
    margin-right: -20px;
  }

  .wxchatIcon1 {
    display: inline-block;
    padding: 8px 10px 10px 30px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .wxchatIcon2 {
    display: inline-block;
    padding: 8px 10px 10px 20px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .wxchatIcon3 {
    display: inline-block;
    padding: 8px 10px 10px 10px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .wxchatIcon4 {
    display: inline-block;
    padding: 8px 10px 10px 0px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .sendButton {
    float: right;
    margin-top: 5px;
    margin-right: 28px;
  }



	.Chat{
		width: 100%;
		
		.Panel{
			background-color: blue;
			height:500px;
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
					background-color: #d3d3d3;
					.middle{
						height: 405px;
						overflow: auto;
					}
					.bottom{
						height: 40px;
						//background-color: green;
					}
				}
			}
		}
	}
	
</style>