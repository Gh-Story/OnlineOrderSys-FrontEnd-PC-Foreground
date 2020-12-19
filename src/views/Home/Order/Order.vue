<template>
    <div class="order">
        <div class="orderBottom">
<!--            <el-card class="box-card" style="width: 100%">-->
                <div slot="header" class="clearfix">
                    <div class="lt">
                        <div class="lt1">
                            订单查找 :
                        </div>
                        <div class="lt2">
                            <el-input
                                    placeholder="请输入菜品信息进行订单查询"
                                    v-model="orderSelectInput"
                                    prefix-icon="el-icon-search"
                                    size="small"
                                    clearable>
                            </el-input>
                        </div>
                        <div class="lt3">
                            <el-button @click="selectOrderByFoodBut" size="small" type="primary">查询订单</el-button>
                        </div>
                    </div>
                    <div class="lm">
                        <div class="lm1">
                            评价状态 :
                        </div>
                        <div class="lm2">
                            <el-radio-group  size="small" v-model="evaluationStateRadio" @change="selectOrderByFoodBut">
                                <el-radio-button label="0">全部</el-radio-button>
                                <el-radio-button label="1">已评价</el-radio-button>
                                <el-radio-button label="2">未评价</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="lm">
                        <div class="lm1">
                            订单状态 :
                        </div>
                        <div class="lm2">
                            <el-radio-group  size="small" v-model="orderStateRadio" @change="selectOrderByFoodBut">
                                <el-radio-button label="0">全部</el-radio-button>
                                <el-radio-button label="1">未接单</el-radio-button>
                                <el-radio-button label="2">待送餐</el-radio-button>
                                <el-radio-button label="3">已出餐</el-radio-button>
                                <el-radio-button label="6">已完成</el-radio-button>
                                <el-radio-button label="4">已退单</el-radio-button>
                                <el-radio-button label="5">索赔单</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <div style="padding-right: 30px;padding-left: 30px;padding-top: 20px;padding-bottom: 20px">
                    <el-collapse v-model="activeName" accordion >
                        <el-collapse-item v-for="(item,index) in orderList" :key="item.orderID" >
                            <template slot="title">
                                <span style="padding-left: 20px;width: 70px;">订单编号 </span>
                                <span style="color: dodgerblue;width: 100px;"> {{item.orderCode}} </span>
                                <span v-if="item.orderState==1 || item.orderState==2 || item.orderState==3" style="width: 70px;color: dodgerblue;font-size:12px;padding-left: 80px"> 尽快送达 </span>
                                <span v-else style="color: gray;font-size:12px;padding-left: 80px;width: 70px;"> 订单结束 </span>
                                <span style="font-size:12px;padding-right: 110px"> {{item.timeLimit}} 前送达</span>
                                <el-tag v-if="item.orderState==2" type="warning">待出餐</el-tag>
                                <el-tag v-else-if="item.orderState==3" type="success">已出餐</el-tag>
                                <el-tag v-else-if="item.orderState==6" type="">已完成</el-tag>
                                <el-tag v-else-if="item.orderState==1" effect="dark">未接单</el-tag>
                                <el-tag v-else-if="item.orderState==4" type="info">已退单</el-tag>
                                <el-tag v-else-if="item.orderState==5" type="danger">索赔单</el-tag>
                                <span v-if="item.evaluationState==1" style="color: #409EFF;font-size: 12px;padding-left: 650px">未评价</span>
                                <span v-else style="color: gray;font-size: 12px;padding-left: 650px">已评价</span>
                            </template>
                            <div class="order">
                                <div class="user">
                                    <i class="el-icon-user-solid" style="padding-right: 10px"></i>
                                    <span  style="font-size: 14px"> {{item.customerName}} （{{item.customerSex}}） </span>
                                    <span style="font-weight: bold;font-size: 15px"> {{item.phonenumMes}} </span><br>
                                    <span  style="font-size: 12px;padding-left:30px;padding-top: 10px;padding-bottom: 10px "> {{item.addressDetail}} </span>
                                </div>
                                <div class="foods">
                                    <i class="el-icon-shopping-cart-2" style="padding-right: 10px"></i>
                                    <span  style="font-size: 15px;font-weight: bold;"> {{item.foodNum}} </span>
                                    <span  style="font-size: 15px;font-weight: bold;"> 件美食 </span>
                                    <span style="color: dodgerblue;font-size:12px;font-weight: bold;padding-left: 40px"> 共计￥ </span>
                                    <span style="color: dodgerblue;font-size:12px;font-weight: bold;"> {{item.orderPrice}} </span>
                                    <span  style="font-size: 15px;font-size:12px;padding-left: 40px"> （美食:{{item.orderPrice-3}}元 + 配送费2元 + 包装费1元） </span>
                                    <el-button @click="orderDetails(item.orderID)" type="info" round style="float: right;margin-right: 10px" size="small">详细信息</el-button>
                                </div>
                                <div class="price">
                                    <i class="el-icon-shopping-bag-1" style="padding-right: 10px"></i>
                                    <span  style="font-size: 14px"> 实际支付 </span>
                                    <span style="float: right;color: gray;font-size:12px;font-weight: bold;padding-right: 15px"> {{item.orderPrice}} </span>
                                    <span style="float: right;color: gray;font-size:12px;font-weight: bold;padding-left: 40px"> 已支付￥ </span>
                                    <br>
                                    <span  style="padding-left:30px;padding-top: 10px;padding-bottom: 10px;font-size: 13px"> 优惠价格 </span>
                                    <span style="float: right;color: lightcoral;font-size:12px;font-weight: bold;padding-right: 15px"> -￥{{item.orderDiscount}} </span>
                                </div>
                                <div class="info">
                                    <i class="el-icon-s-order" style="padding-right: 10px"></i>
                                    <span  style="font-size: 14px"> 下单时间 : </span>
                                    <span  style="font-size: 14px;padding-left:10px;"> {{item.orderTime}} </span>
                                    <br>
                                    <span  style="font-size: 14px;padding-left:30px;"> 订单编号 : </span>
                                    <span  style="font-size: 14px;padding-left:10px;"> {{item.orderCode}} </span>
                                    <el-button @click="refuseOrder(item.orderID)" v-if="item.orderState==2 || item.orderState==3 || item.orderState==1" type="info" round style="float: right;margin-right: 10px" size="small">取消订单</el-button>
                                    <el-button @click="refuseOrder(item.orderID)" v-if="item.orderState==6" type="info" round style="float: right;margin-right: 10px" size="small">申请退单</el-button>
                                    <el-button @click="backOrderDetail(item.orderID)" v-if="item.orderState==4" type="info" round style="float: right;margin-right: 10px" size="small">退单详情</el-button>
                                    <el-button @click="payforOrderDetail(item.orderID)" v-if="item.orderState==5" type="info" round style="float: right;margin-right: 10px" size="small">索赔详情</el-button>
                                    <el-button @click="evaluateDetail(item.orderID)" v-if="item.evaluationState==2 " type="info" round style="float: right;margin-right: 10px" size="small">查看评价</el-button>
                                    <el-button @click="doneOrder(item.orderID)" v-if="item.orderState==3 " type="info" round style="float: right;margin-right: 10px" size="small">确认收货</el-button>
                                    <el-button @click="evaluateOrder(item.orderID)" v-if="item.evaluationState==1 && item.orderState==6" type="info" round style="float: right;margin-right: 10px" size="small">评价订单</el-button>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
<!--            </el-card>-->
        </div>
        <div class="dialog">
            <el-dialog title="订单详情" style="overflow: auto;width: 1100px" :visible.sync="dialogOrderDetailVisible">
                <div class="orderConfirm">
                    <el-card class="box-card" style="width: 500px;height: 400px">
                        <div class="cartShow" >
                            <div class="cartItem"  v-for="foodItem in foodList">
                                <div class="itemPic">
                                    <img class="imgs" :src="foodItem.food.foodPicture" @click="foodDetail(foodItem.food.foodId)"/>
                                </div>
                                <div class="itemInfo">
                                    <div class="itemName">{{foodItem.food.foodName}}</div>
                                    <div class="itemPrice">
                                        <div v-if="foodItem.discount==1"><span style="font-size: 12px">￥</span> {{(foodItem.food.foodPrice).toFixed(2)}}</div>
                                        <div v-else>
                                            <span style="font-size: 12px">￥</span> {{(foodItem.foodDiscountPrice).toFixed(2)}}
                                            <span style="font-size: 10px;color: gray"> ￥</span><span style="color: gray;font-size: 12px;text-decoration: line-through;padding-right: 5px"> {{(foodItem.food.foodPrice).toFixed(2)}} </span>
                                            <el-tag :key="foodItem.discount" size="mini" type="danger" effect="plain" > {{foodItem.discount*10}}折</el-tag>
                                        </div>
                                    </div>
                                </div>
                                <div class="itemNum">
                                    <div v-if="foodItem.foodNum==0">
                                        <el-button size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                                    </div>
                                    <div v-else>
                                        <el-button size="mini" icon="el-icon-minus" circle></el-button>
                                        <input :min="1" :max="99" v-model.number="foodItem.foodNum" style="width:30px;text-align:center;font-size: 16px;color: #313334;font-weight: bolder;padding-left: 10px;padding-right: 10px"/>
                                        <el-button size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <br>
                    <div slot="footer" class="dialog-footer" style="text-align: right">
                        <el-button @click="dialogOrderDetailVisible = false">取 消</el-button>
                    </div>

                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog title="评价订单" style="overflow: auto;width: 1100px" :visible.sync="dialogEvaluationVisible">
                <div class="orderConfirm">
                    <el-card class="box-card" style="width: 500px;height: 400px">
                        <div style="font-size: 16px;padding-bottom: 15px"> 订单评价 :</div>
                        <div>
                            <el-input
                                    type="textarea"
                                    :rows="14"
                                    placeholder="请输入评价内容"
                                    maxlength="100"
                                    show-word-limit
                                    v-model="evaluation.evaluationContent">
                            </el-input>

                        </div>
                    </el-card>
                    <br>
                    <div slot="footer" class="dialog-footer" style="text-align: right">
                        <el-button @click="dialogEvaluationVisible = false">取 消</el-button>
                        <el-button type="primary" @click="evaluateOrderSub()">提 交</el-button>
                    </div>

                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog title="评价订单" style="overflow: auto;width: 1100px" :visible.sync="dialogEvaluationDetailVisible">
                <div class="orderConfirm">
                    <el-card class="box-card" style="width: 500px;height: 400px">
                        <div style="font-size: 16px;padding-bottom: 15px"> 订单评价 :</div>
                        <div>
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="评价内容为空"
                                    maxlength="100"
                                    show-word-limit
                                    disabled
                                    v-model="evaluationDetail.evaluationContent">
                            </el-input>
                        </div>
                        <div style="font-size: 16px;padding-bottom: 15px;padding-top: 15px"> 商家回复 :</div>
                        <div>
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="商家未回复"
                                    maxlength="100"
                                    show-word-limit
                                    disabled
                                    v-model="evaluationDetail.replyMessage">
                            </el-input>
                        </div>
                    </el-card>
                    <br>
                    <div slot="footer" class="dialog-footer" style="text-align: right">
                        <el-button @click="dialogEvaluationDetailVisible = false">取 消</el-button>
                        <el-button type="primary" @click="evaluateOrder(orderId)">提 交</el-button>
                    </div>

                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Order",
        data(){
            return{
                activeName:'1',//手风琴当前展开订单详细内容
                // orderTypeRadio:'',//订单类型按钮组
                orderSelectInput:'',//查询订单输入内容（根据美食名查找）
                orderStateRadio: 0,//订单状态按钮
                evaluationStateRadio: 0,//订单评价状态按钮
                //查询单元
                selectData:{
                    cutsomerId: 0,//用户编号
                    order_state: 0,//订单状态按钮
                    order_evaluation: 0,//订单评价状态
                },
                info: {
                    orderID:'',//订单编号
                },
                info2: {
                    orderId:'',//订单编号
                },

                //订单单元
                order:{
                    orderID:'',//订单ID
                    orderCode:'',//订单编号
                    orderRequest:'尽快送达',//订单送达要求
                    orderRemark: '',//订单备注
                    orderTime:'',//订单下单时间
                    timeLimit:'',//订单截至时间
                    orderState:'',//订单状态
                    orderPrice:'',//订单价格

                    evaluationState:'',//评价状态

                    customerName:'',//用户姓名
                    customerSex:'',//用户性别

                    phonenumMes:'',//用户电话

                    addressDetail:'',//用户地址

                    foodNum:'',//食品数量
                    deliverPrice:2,//配送费
                    packingPrice:1,//包装费
                    orderDiscount:0,//订单优惠了多少钱
                },

                //所有订单列表
                orderList: [
                    {
                        orderID:1,//订单ID
                        orderCode:'20200708182612',//订单编号
                        orderRequest:'尽快送达',//订单送达要求
                        orderRemark: '',//订单备注
                        orderTime:'2020-7-8 18:26',//订单下单时间
                        timeLimit:'18:56',//订单截至时间
                        orderState:1,//订单状态
                        orderPrice:'22.5',//订单价格

                        evaluationState:1,//评价状态

                        customerName:'刘美丽',//用户姓名
                        customerSex:'女',//用户性别

                        phonenumMes:'13888888888',//用户电话

                        addressDetail:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址

                        foodNum:2,//食品数量
                        orderDiscount:12,//订单优惠
                    },
                    {
                        orderID:2,//订单ID
                        orderCode:'20200708182613',//订单编号
                        orderRequest:'尽快送达',//订单送达要求
                        orderRemark: '',//订单备注
                        orderTime:'2020-7-8 18:26',//订单下单时间
                        timeLimit:'18:56',//订单截至时间
                        orderState:2,//订单状态
                        orderPrice:'22.5',//订单价格

                        evaluationState:1,//评价状态

                        customerName:'刘美丽',//用户姓名
                        customerSex:'女',//用户性别

                        phonenumMes:'13888888888',//用户电话

                        addressDetail:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址

                        foodNum:2,//食品数量
                        orderDiscount:12,//订单优惠
                    },
                    {
                        orderID:3,//订单ID
                        orderCode:'20200708182614',//订单编号
                        orderRequest:'尽快送达',//订单送达要求
                        orderRemark: '',//订单备注
                        orderTime:'2020-7-8 18:26',//订单下单时间
                        timeLimit:'18:56',//订单截至时间
                        orderState:3,//订单状态
                        orderPrice:'22.5',//订单价格

                        evaluationState:2,//评价状态

                        customerName:'刘美丽',//用户姓名
                        customerSex:'女',//用户性别

                        phonenumMes:'13888888888',//用户电话

                        addressDetail:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址

                        foodNum:2,//食品数量
                        orderDiscount:12,//订单优惠
                    },
                    {
                        orderID:4,//订单ID
                        orderCode:'20200708182615',//订单编号
                        orderRequest:'尽快送达',//订单送达要求
                        orderRemark: '',//订单备注
                        orderTime:'2020-7-8 18:26',//订单下单时间
                        timeLimit:'18:56',//订单截至时间
                        orderState:4,//订单状态
                        orderPrice:'22.5',//订单价格

                        evaluationState:1,//评价状态

                        customerName:'刘美丽',//用户姓名
                        customerSex:'女',//用户性别

                        phonenumMes:'13888888888',//用户电话

                        addressDetail:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址

                        foodNum:2,//食品数量
                        orderDiscount:12,//订单优惠
                    },
                    {
                        orderID:5,//订单ID
                        orderCode:'20200708182616',//订单编号
                        orderRequest:'尽快送达',//订单送达要求
                        orderRemark: '',//订单备注
                        orderTime:'2020-7-8 18:26',//订单下单时间
                        timeLimit:'18:56',//订单截至时间
                        orderState:5,//订单状态
                        orderPrice:'22.5',//订单价格

                        evaluationState:1,//评价状态

                        customerName:'刘美丽',//用户姓名
                        customerSex:'女',//用户性别

                        phonenumMes:'13888888888',//用户电话

                        addressDetail:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址

                        foodNum:2,//食品数量
                        orderDiscount:12,//订单优惠
                    },
                    {
                        orderID:6,//订单ID
                        orderCode:'20200708182617',//订单编号
                        orderRequest:'尽快送达',//订单送达要求
                        orderRemark: '',//订单备注
                        orderTime:'2020-7-8 18:26',//订单下单时间
                        timeLimit:'18:56',//订单截至时间
                        orderState:6,//订单状态
                        orderPrice:'22.5',//订单价格

                        evaluationState:2,//评价状态

                        customerName:'刘美丽',//用户姓名
                        customerSex:'女',//用户性别

                        phonenumMes:'13888888888',//用户电话

                        addressDetail:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址

                        foodNum:2,//食品数量
                        orderDiscount:12,//订单优惠
                    },
                ],
                deliverPrice:2,//配送费
                packingPrice:1,//包装费
                //美食详细列表
                foodList:[
                    {
                        food: {
                            foodId:88,//美食ID
                            foodName:'水煮肉片88',//美食名称
                            foodPrice:36,//美食价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                        },
                        foodNum:1,//美食数量
                        discount:0.9,//美食折扣
                        foodDiscountPrice:32.4,//美食折扣价
                    },
                ],
                //美食单元
                foodItem:{
                    food: {
                        foodId:88,//美食ID
                        foodName:'水煮肉片88',//美食名称
                        foodPrice:36,//美食价格
                        foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                    },
                    foodNum:1,//美食数量
                    discount:0.9,//美食折扣
                    foodDiscountPrice:32.4,//美食折扣价
                },
                evaluation: {
                    orderId:0,
                    evaluationContent:'',
                },
                evaluationDetail: {
                    evaluationContent:'',
                    replyMessage:'',
                    likesNumber:'',
                    evaluationDate:'',
                },
                dialogOrderDetailVisible: false,
                dialogEvaluationVisible: false,
                dialogEvaluationDetailVisible: false,
                timeLimit:'',
            }
        },
        created() {
            //搜索订单信息
            this.selectOrderByFoodBut();
        },
        methods:{
            //获取订单方法内部单元
            getOrders:function() {
                console.log('selectData');
                console.log(this.selectData);
                this.axios.post(`http://localhost:8080/orders/selectOrderByCustomer`,this.selectData).then(r=>{
                    console.log(r);
                    this.orderList = r.data.msg.orderMsgList;
                    for(let i=0;i<this.orderList.length;i++){
                        let timeLimit = this.orderList[i].timeLimit;
                        this.orderList[i].timeLimit = timeLimit;
                    }
                });
            },
            //根据美食名称模糊查询所有订单信息
            selectOrderByFoodBut:function () {
                this.selectData = {};
                this.selectData.order_state = this.orderStateRadio;
                this.selectData.order_evaluation = this.evaluationStateRadio;
                this.selectData.customerId = this.$store.getters.getCustomer.customerId;
				console.log(this.selectData);
                this.getOrders();
            },
            //订单详情
            orderDetails(orderId) {
                console.log(orderId);
                this.info2.orderId = orderId;
                console.log(this.info2);
                this.dialogOrderDetailVisible = true;
                this.axios.post(`http://localhost:8080/orders/selectOrderDetail`,this.info2).then(r=>{
                    console.log(r);
                    this.foodList = r.data.msg.foodList;
                    for(let i=0;i<this.foodList.length;i++){
                        this.foodList[i].food.foodPicture = 'http://localhost:8080/image/'+this.foodList[i].food.foodPicture;
                    }
                });
            },
            //取消订单
            refuseOrder(orderId) {
                this.info.orderID = orderId;
                this.axios.post(`http://localhost:8080/orders/refuseOrder`,this.info).then(r=>{
                    console.log(r);
                    this.getOrders();
                });
                // this.selectOrderByFoodBut();
            },
            //评价订单
            evaluateOrder(orderID) {
                console.log(orderID);
                this.evaluation.orderId = orderID;
                console.log(this.evaluation);
                this.dialogEvaluationVisible = true;
            },
            //提交评价
            evaluateOrderSub() {
                this.axios.post(`http://localhost:8080/evaluation/addEvaluation`,this.evaluation).then(r=>{
                    console.log(r);
                    this.$message({
                        message: '评价成功，谢谢小主',
                        type: 'success'
                    });
                    this.dialogEvaluationVisible = false;
                });
                this.selectOrderByFoodBut();
            },
            //查看评价
            evaluateDetail(orderId) {
                this.dialogEvaluationDetailVisible = true;
                this.info2.orderId = orderId;
                this.axios.post(`http://localhost:8080/evaluation/selectEvaluationByOrderId`,this.info2).then(r=>{
                    console.log(r);
                    this.evaluationDetail = r.data.msg.evaluationDetail;
                });
            },
            //确认收货
            doneOrder(orderId) {
                this.info2.orderId = orderId;
                this.axios.post(`http://localhost:8080/orders/doneOrder`,this.info2).then(r=>{
                    console.log(r);
                    this.getOrders();
                });
                // this.selectOrderByFoodBut();
            },
            //退单详情
            backOrderDetail(orderId) {

            },
            //赔付详情
            payforOrderDetail(orderId) {

            },
        },
    }
</script>

<style lang="less" scoped>
.order{
    width: 100%;
    height: 100%;
    -background-color: lightcoral;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .orderTop{
        flex:1;
        -background-color: lightskyblue;
        padding-top: 10px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        text-align: center;
        .lt {
            display: flex;
            text-align: center;
            -background-color: lightcoral;
            .lt1 {
                flex: 1;
                -background-color: #42b983;
                padding-top: 10px;
                text-align: center;
            }
            .lt2 {
                flex: 3;
                -background-color: coral;
                padding-top: 0px;
                text-align: center;
            }
            .lt3 {
                flex: 4;
                -background-color: azure;
                padding-top: 0px;
                text-align: right;
            }
        }
    }
    .orderMedium{
        flex:2;
        -background-color: aqua;
        padding-top: 5px;
        padding-bottom: 0px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        text-align: center;
        .lm{
            display: flex;
            text-align: center;
            -background-color: lightcoral;
            .lm1{
                flex:1;
                padding-top: 10px;
                -background-color: #42b983;
                text-align:center;
            }
            .lm2{
                flex:7;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 5px;
                -background-color: dodgerblue;
                text-align:left;
                display: flex;
                -flex-direction: column;
            }
            .lm3{
                flex:7;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 5px;
                -background-color: dodgerblue;
                text-align:left;
                display: flex;
                flex-direction: column;
                .lm3-1{
                    flex:1;
                    padding-left: 0px;
                }
                .lm3-2{
                    flex:1;
                    padding-left: 0px;
                }
            }
        }

    }
    .orderBottom{
        flex:7;
        -background-color: coral;
        padding-top: 50px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        .lm{
            display: flex;
            text-align: center;
            -background-color: lightcoral;
            .lm1{
                flex:1;
                padding-top: 10px;
                -background-color: #42b983;
                text-align:center;
            }
            .lm2{
                flex:7;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 5px;
                -background-color: dodgerblue;
                text-align:left;
                display: flex;
                -flex-direction: column;
            }
            .lm3{
                flex:7;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 5px;
                -background-color: dodgerblue;
                text-align:left;
                display: flex;
                flex-direction: column;
                .lm3-1{
                    flex:1;
                    padding-left: 0px;
                }
                .lm3-2{
                    flex:1;
                    padding-left: 0px;
                }
            }
        }
        .lt {
            display: flex;
            text-align: center;
            -background-color: lightcoral;
            .lt1 {
                flex: 1;
                -background-color: #42b983;
                padding-top: 10px;
                text-align: center;
            }
            .lt2 {
                flex: 3;
                -background-color: coral;
                padding-top: 0px;
                padding-bottom: 5px;
                text-align: center;
            }
            .lt3 {
                flex: 4;
                -background-color: azure;
                padding-top: 0px;
                padding-left: 10px;
                text-align: left;
            }
        }
        .order{
        display: flex;
        flex-direction: column;
        -background-color: antiquewhite;
        .orderTitle{
            display: flex;
            flex-direction: column;
            .orderNo{
                flex: 1;
                background-color: #42b983;
            }
            .orderNos{
                flex: 1;
                color: dodgerblue;
                background-color: bisque;
            }
            .orderRequest{
                flex: 2;
                color: dodgerblue;
                font-size:12px;
                padding-left: 40px;
                background-color: teal;
            }
            .orderLimit{
                flex: 2;
                font-size:12px;
                padding-right: 100px;
                background-color: lightcoral;
            }
            .orderState{
                flex: 4;
                float: right;
                background-color: coral;
            }
        }
        .user{
            flex:2;
            -background-color: lightcoral;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
        }
        .foods{
            flex:2;
            -background-color: azure;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
        }
        .price{
            flex:2;
            -background-color: lightgreen;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
        }
        .info{
            flex:2;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
        }
        }
    }
    .orderConfirm{
        height: 100%;
        width: 100%;
        -background-color: #b02f36;
        display: flex;
        overflow: auto;
        flex-direction: column;
        .cartShow{
            height: 420px;
            -background-color: darkviolet;
            overflow: auto;
            .cartItem{
                height: 180px;
                -background-color: darkgoldenrod;
                display: flex;
                text-align: center;
                padding-top: 10px;
                .itemPic{
                    flex: 3;
                    -background-color: darkviolet;
                    .imgs{
                        height:80%;
                        width:80%;
                        border-radius: 50%;
                        box-shadow: 5px 5px 5px #888888;
                        cursor: pointer;
                    }
                }
                .itemInfo{
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    -background-color: dodgerblue;
                    .itemName{
                        line-height: 90px;
                        flex: 1;
                        font-size: 16px;
                        font-weight: bolder;
                    }
                    .itemPrice{
                        flex: 1;
                        font-size: 16px;
                        font-weight: bolder;
                        color: #ea4b35;
                    }
                }
                .itemNum{
                    flex: 2;
                    line-height: 140px;
                    -background-color: lightgreen;
                }

            }
            .itemLine {
                padding-left: 20%;
                padding-right: 20%;
                width: 60%;
                height: 1px;
                border-top: solid silver 1px;
            }

        }
        .lt {
            display: flex;
            text-align: center;
            -background-color: lightcoral;
            .lt1 {
                flex: 1;
                -background-color: #42b983;
                padding-top: 10px;
                text-align: center;
            }
            .lt2 {
                flex: 3;
                -background-color: coral;
                padding-top: 0px;
                text-align: center;
            }
            .lt3 {
                flex: 4;
                -background-color: azure;
                padding-top: 0px;
                text-align: right;
            }
        }
    }
}
</style>