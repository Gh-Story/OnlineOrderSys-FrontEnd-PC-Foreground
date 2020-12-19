<template>
    <div class="food">
        <div class="cart">
            <div class="cart-num">{{foodChooseList.foodNumSum}}</div>
            <a href="#"><el-button type="primary" circle @click="showShoppingCart" icon="el-icon-shopping-cart-2"></el-button></a>
        </div>
        <el-drawer
              
                :visible.sync="cartDrawer"
                :direction="cartDirection"
                >
            <div class="shoppingCart">
                <div class="cartName"> 购 物 车 </div>
<!--                <div class="link-top"></div>-->
                <div class="cartShow" >
                    <div class="cartItem"  v-for="foodItem in foodChooseList.foodList">
                        <div class="itemPic">
                            <img class="imgs" :src="foodItem.food.foodPicture" @click="foodDetail(foodItem.food.foodId)"/>
                        </div>
                        <div class="itemInfo">
                            <div class="itemName">{{foodItem.food.foodName}}</div>
                            <div class="itemPrice">
                                <div v-if="foodItem.discount==1"><span style="font-size: 12px">￥</span> {{(foodItem.food.foodPrice).toFixed(2)}}</div>
                                <div v-else><span style="font-size: 12px">￥</span> {{(foodItem.foodDiscountPrice).toFixed(2)}}
                                    <span style="font-size: 10px;color: gray"> ￥</span>
                                    <span style="color: gray;font-size: 12px;text-decoration: line-through;padding-right: 5px"> {{(foodItem.food.foodPrice).toFixed(2)}} </span>
                                    <el-tag :key="foodItem.discount" size="mini" type="danger" effect="plain" > {{foodItem.discount*10}}折</el-tag>
                                </div>
                            </div>
                        </div>
                        <div class="itemNum">
                            <div v-if="foodItem.foodNum==0">
                                <el-button @click="addFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                            </div>
                            <div v-else>
                                <el-button @click="minusFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" icon="el-icon-minus" circle></el-button>
                                <input :min="1" :max="99" v-model.number="foodItem.foodNum" @change="changeFoodNum(foodItem.foodNum,foodItem, foodChooseList)" style="width:30px;text-align:center;font-size: 16px;color: #313334;font-weight: bolder;padding-left: 10px;padding-right: 10px"/>
                                <el-button @click="addFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                            </div>
                        </div>

                    </div>
<!--                    <div class="itemLine"></div>-->
                </div>
                <div class="cartButton">
                    <div class="cb1">
                        <img
                            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593867216819&di=6880f7069eae9454cc17ee3fc8dbcd9f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F07%2F25%2F125795991495201.jpg"
                            style="height: 90%;width: 80%;padding-top: 5%;padding-left: 16%;border-radius: 180px;">
                        <div class="cartnum">{{foodChooseList.foodNumSum}}</div>
                    </div>
                    <div class="cb2">
                        <div style="font-weight: bolder;font-size: 22px;display: inline;color: #ea4b35;"><span style="color: #ea4b35;font-size: 16px">￥</span>{{(foodChooseList.foodDiscountPriceSum).toFixed(2)}}</div>
                        <div style="font-weight: bolder;font-size: 14px;display: inline;color: gray;text-decoration: line-through"><span style="font-size: 10px;color: gray;padding-left: 5px">￥</span>{{(foodChooseList.foodPriceSum).toFixed(2)}}</div>
                        <div style="font-weight: bolder;font-size: 13px;color: gray;padding-top: 3px;padding-left: 3px">另需配送费 <span style="font-size: 10px;color: gray;padding-left: 5px">￥</span>2</div>
                    </div>
                    <div class="cb3">
                        <el-button type="primary" @click="orderFoods" round>结算订单</el-button>
                    </div>
                </div>
            </div>
        </el-drawer>
        <el-drawer
                title="美食详情"
                size='40%'
                :visible.sync="foodDrawer"
                :with-header="false"
                :direction="foodDirection">
            <div class="foodDetail">
                <div class="fdPicture">
                    <img class="imgs" :src="foodDetail.food.foodPicture"/>
                </div>
                <div class="fdInfo">
                    <div class="fdiName">{{foodDetail.food.foodName}}</div>
                    <div class="fdiTag">
                        <div class="tag-group" >
                            <el-tag
                                    v-for="item in foodDetail.foodTags"
                                    :key="item.tagId"
                                    effect="plain">
                                {{ item.tagName }}
                            </el-tag>
                        </div>

                    </div>
                    <div class="fdiDetail">{{foodDetail.food.foodIntroduction}}</div>
                    <div class="fdiPrice">
                        <div class="fdiP">
                            <div v-if="foodDetail.discount==1"><span style="color: #ea4b35;font-size: 16px">￥</span> {{foodDetail.food.foodPrice}}</div>
                            <div v-else><span style="font-size: 16px">￥</span> {{(foodDetail.foodDiscountPrice).toFixed(2)}}
                                <span style="font-size: 10px;color: gray"> ￥</span>
                                <span style="color: gray;font-size: 12px;text-decoration: line-through;padding-right: 5px"> {{(foodItem.food.foodPrice).toFixed(2)}} </span>
                                <el-tag :key="foodDetail.discount" size="mini" type="danger" effect="plain" > {{foodDetail.discount*10}}折</el-tag>
                            </div>
                        </div>
                        <div class="fdiNum">
                            <div v-if="foodDetail.foodNum==0">
                                <el-button @click="addFoodNum(foodDetail.foodNum, foodDetail, foodChooseList)" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                            </div>
                            <div v-else>
                                <el-button @click="minusFoodNum(foodDetail.foodNum, foodDetail, foodChooseList)" size="mini" icon="el-icon-minus" circle></el-button>
                                <input :min="1" :max="99" v-model.number="foodDetail.foodNum" @change="changeFoodNum(foodDetail.foodNum,foodDetail, foodChooseList)" style="width:30px;text-align:center;font-size: 16px;color: #313334;font-weight: bolder;padding-left: 10px;padding-right: 10px"/>
                                <el-button @click="addFoodNum(foodDetail.foodNum, foodDetail, foodChooseList)" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </el-drawer>
        <div class="foodLine" v-for="foodItemLine in foodItemList">
<!--            <template slot-scope="scope">-->
            <div class="foodItem" v-for="foodItem in foodItemLine">
                <div class="foodPic">
                    <img class="imgs" :src="foodItem.food.foodPicture" @click="foodDetailShow(foodItem)"/>
                </div>
                <div class="foodInfo">
                    <div class="foodName">
                        {{foodItem.food.foodName}}
                    </div>
                    <div class="foodPrice">
                        <div v-if="foodItem.discount==1"><span style="font-size: 12px">￥</span> {{foodItem.food.foodPrice}}</div>
                        <div v-else><span style="font-size: 12px">￥</span> {{(foodItem.foodDiscountPrice).toFixed(2)}}
                            <span style="font-size: 10px;color: gray"> ￥</span>
                            <span style="color: gray;font-size: 12px;text-decoration: line-through;padding-right: 5px"> {{(foodItem.food.foodPrice).toFixed(2)}} </span>
                            <el-tag :key="foodItem.discount" size="mini" type="danger" effect="plain" > {{foodItem.discount*10}}折</el-tag>
                        </div>
                    </div>
                    <div class="foodNum">
                        <div v-if="foodItem.foodNum==0">
                            <el-button @click="addFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                        </div>
                        <div v-else>
                            <el-button @click="minusFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" icon="el-icon-minus" circle></el-button>
                            <input :min="1" :max="99" v-model.number="foodItem.foodNum" @change="changeFoodNum(foodItem.foodNum,foodItem, foodChooseList)" style="width:30px;text-align:center;font-size: 16px;color: #313334;font-weight: bolder;padding-left: 10px;padding-right: 10px"/>
                            <el-button @click="addFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                        </div>
                    </div>
                </div>
            </div>
<!--            </template>-->
        </div>
        <div class="dialog">
            <el-dialog title="确认订单" style="overflow: auto;width: 2000px" :visible.sync="dialogOrderConfirmVisible">
                <div class="orderConfirm">
                    <div class="ocLeft">
                        <el-card class="box-card" style="width: 100%;">
                            <div class="cartShow" >
                                <div class="cartItem"  v-for="foodItem in foodChooseList.foodList">
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
                                            <el-button @click="addFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                                        </div>
                                        <div v-else>
                                            <el-button @click="minusFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" icon="el-icon-minus" circle></el-button>
                                            <input :min="1" :max="99" v-model.number="foodItem.foodNum" @change="changeFoodNum(foodItem.foodNum,foodItem, foodChooseList)" style="width:30px;text-align:center;font-size: 16px;color: #313334;font-weight: bolder;padding-left: 10px;padding-right: 10px"/>
                                            <el-button @click="addFoodNum(foodItem.foodNum, foodItem, foodChooseList)" size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                                        </div>
                                    </div>

                                </div>
                                <!--                    <div class="itemLine"></div>-->
                            </div>
                        </el-card>
                    </div>
                    <div class="ocRight">
                        <el-card class="box-card" style="width: 100%;height: 100%">
                            <div class="ocr">
                                <div class="ocr1">
                                    <el-card class="box-card" style="width: 100%">
                                        <div>
                                            <el-dropdown @command="chooseAddress" >
                                            <span class="el-dropdown-link">
                                                {{order.address.addressDetail}}<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item v-for="address in Information.addressList" :command="address.addressId" :key="address.addressId">{{address.addressDetail}}</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                        <div>
                                            <el-dropdown @command="choosePhonenum">
                                            <span class="el-dropdown-link">
                                                {{order.customer.customerName}} ({{order.customer.customerSex}}) {{order.phonenum.phonenumMes}}<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item v-for="phonenum in Information.phonenumList" :command="phonenum.phonenumId" :key="phonenum.phonenumId">
                                                        {{phonenum.phonenumMes}}</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </el-card>
                                </div>
                                <div class="ocr2">
                                    <el-card class="box-card" style="width: 100%">
                                        <div style="display: flex;">
                                            <div style="flex: 1;">立即送出</div><div style="flex:4;color: #409EFF;text-align: right;">大约 {{Information.predictTime}} 送达</div>
                                        </div>
                                        <div style="display: flex;">
                                            <div style="flex: 1;">支付方式</div><div style="flex:4;color: #409EFF;text-align: right;">
                                            <el-dropdown @command="choosePayWay">
                                            <span class="el-dropdown-link">
                                                {{order.payWay.payWayName}}<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item v-for="payWay in Information.payWayList" :command="payWay.payWayId" :key="payWay.payWayId">
                                                        {{payWay.payWayName}}</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                        </div>
                                    </el-card>
                                </div>
                                <div class="ocr3">
                                    <el-card class="box-card" style="width: 100%">
                                        <div style="display: flex;">
                                            <div style="flex: 1;">包装费</div><div style="flex:4;text-align: right;"><span style="font-size: 10px;padding-left: 5px">￥</span> 1</div>
                                        </div>
                                        <div style="display: flex;">
                                            <div style="flex: 1;">配送费</div><div style="flex:4;text-align: right;"><span style="font-size: 10px;padding-left: 5px">￥</span> 2</div>
                                        </div>
                                    </el-card>
                                </div>
                                <div class="ocr4">
                                    <el-card class="box-card" style="width: 100%">
                                        <div style="display: flex;">
                                            <div style="flex: 1;">活动优惠</div><div style="flex:4;text-align: right;color: #ea4b35;font-weight: bolder"><span style="font-size: 10px;padding-left: 5px;color: #ea4b35;font-weight: bolder">-￥</span> {{(foodChooseList.foodPriceSum-foodChooseList.foodDiscountPriceSum).toFixed(2)}}</div>
                                        </div>
                                        <div style="display: flex;">
                                            <div style="flex: 1;">红包优惠</div>
                                            <div v-if="Information.redpacketList==''" style="flex:4;text-align: right;">
                                                <span>无可用红包</span>
                                            </div>
                                            <div v-else style="flex:4;text-align: right;">
                                                <el-dropdown @command="chooseRedacket">
                                                <span class="el-dropdown-link" style="color: #ea4b35;font-weight: bolder">
                                                    <span style="font-size: 10px;padding-left: 5px;color: #ea4b35;font-weight: bolder">-￥</span>
                                                    {{order.cusRed.redpacket.redpacketNum}}<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item v-for="cusRed in Information.redpacketList" :command="cusRed.customerRedpacket.customerRedpacketId" :key="cusRed.customerRedpacket.customerRedpacketId">
                                                    <div style="display: flex;width: 250px">
                                                        <div style="flex: 1;">
                                                            <img
                                                                    style="padding-top: 10px"
                                                                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593684739705&di=3af8fb4be557007c90cae634ff21950e&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190610%2F17%2F1560159102-EYNsuHBOwd.jpg"
                                                                    class="image"
                                                                    width="40px"
                                                                    height="50px">
                                                        </div>
                                                        <div style="flex: 2;font-weight: bolder;font-size: 14px;padding-top: 20px">
                                                            {{cusRed.redpacket.redpacketName}}
                                                        </div>
                                                        <div style="flex: 2;display: flex;flex-direction: column;padding-top: 10px">
                                                            <div style="height:20px;color: #ea4b35;font-weight: bolder;font-size: 14px;text-align: center;">{{cusRed.redpacket.redpacketNum}}</div>
                                                            <div style="height:20px;font-size: 8px;text-align: center;top: 0px">满 {{cusRed.redpacket.threshold}} 元可用</div>
                                                        </div>
                                                    </div>
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                                <div class="ocr5">
                                    <el-card class="box-card" style="width: 100%">
                                        <div class="cartButton">
                                            <div class="cb1">
                                                <img
                                                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593867216819&di=6880f7069eae9454cc17ee3fc8dbcd9f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F07%2F25%2F125795991495201.jpg"
                                                        style="height: 90%;width: 70%;padding-top: 5%;padding-left: 16%;border-radius: 180px;">
                                                <div class="cartnum">{{foodChooseList.foodNumSum}}</div>
                                            </div>
                                            <div class="cb2">
                                                <div v-if="order.cusRed == ''" style="font-weight: bolder;font-size: 22px;display: inline;color: #ea4b35;"><span style="color: #ea4b35;font-size: 16px">￥</span>{{(foodChooseList.foodDiscountPriceSum).toFixed(2)}}</div>
                                                <div v-else-if="order.cusRed != ''" style="font-weight: bolder;font-size: 22px;display: inline;color: #ea4b35;"><span style="color: #ea4b35;font-size: 16px">￥</span>{{(foodChooseList.foodDiscountPriceSum-order.cusRed.redpacket.redpacketNum).toFixed(2)}}</div>
                                                <div style="font-weight: bolder;font-size: 14px;display: inline;color: gray;text-decoration: line-through"><span style="font-size: 10px;color: gray;padding-left: 5px">￥</span>{{(foodChooseList.foodPriceSum).toFixed(2)}}</div>
                                                <div style="font-weight: bolder;font-size: 13px;color: gray;padding-top: 3px;padding-left: 3px">另需配送费 <span style="font-size: 10px;color: gray;padding-left: 5px">￥</span>2</div>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>


            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogOrderConfirmVisible = false">取 消</el-button>
                <el-button type="primary" @click="payFoods">提 交</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Food",
        data(){
            return{
                foodInput: {
                    foodType:2,//美食类别
                    //该类别下所有美食信息列表
                },
                foodItemList:[
                    [{
                        food: {
                            foodId:88,//美食ID
                            foodName:'水煮肉片88',//美食名称
                            foodPrice:36,//美食原价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '水煮肉片88',//美食介绍
                            foodState:1,//美食状态
                            foodType:1,//美食类别
                        },
                        foodNum:1,//美食数量
                        discount:0.9,//美食折扣
                        foodDiscountPrice:32.4,//美食折扣价
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },
                    {
                        food: {
                            foodId:89,//美食ID
                            foodName:'水煮肉片89',//美食名称
                            foodPrice:36,//美食价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '水煮肉片89',//美食介绍
                            foodState:1,//美食状态
                            foodType:1,//美食类别
                        },
                        foodNum:0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:36,//美食折扣价
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },
                    {
                        food: {
                            foodId:90,//美食ID
                            foodName:'水煮肉片90',//美食名称
                            foodPrice:36,//美食价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '水煮肉片90',//美食介绍
                            foodState:1,//美食状态
                            foodType:1,//美食类别
                        },
                        foodNum:0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:36,//美食折扣价
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },
                    {
                        food: {
                            foodId:91,//美食ID
                            foodName:'水煮肉片91',//美食名称
                            foodPrice:36,//美食价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '水煮肉片91',//美食介绍
                            foodState:1,//美食状态
                            foodType:1,//美食类别
                        },
                        foodNum:0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:36,//美食折扣价
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },],

                    [{
                        food: {
                            foodId: 99,//美食ID
                            foodName: '精品牛排99',//美食名称
                            foodPrice: 188,//美食价格
                            foodPicture: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=478974051,1148287746&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '精品牛排99',//美食介绍
                            foodState: 1,//美食状态
                            foodType: 1,//美食类别
                        },
                        foodNum: 0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:188,//美食折扣价
                        foodTags: [{tagId: 2, tagName: '肉类'}, {tagId: 3, tagName: '营养'}],
                    },
                    {
                        food: {
                            foodId: 98,//美食ID
                            foodName: '精品牛排98',//美食名称
                            foodPrice: 188,//美食价格
                            foodPicture: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=478974051,1148287746&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '精品牛排98',//美食介绍
                            foodState: 1,//美食状态
                            foodType: 1,//美食类别
                        },
                        foodNum: 0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:188,//美食折扣价
                        foodTags: [{tagId: 2, tagName: '肉类'}, {tagId: 3, tagName: '营养'}],
                    },
                    {
                        food: {
                            foodId: 97,//美食ID
                            foodName: '精品牛排97',//美食名称
                            foodPrice: 188,//美食价格
                            foodPicture: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=478974051,1148287746&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '精品牛排97',//美食介绍
                            foodState: 1,//美食状态
                            foodType: 1,//美食类别
                        },
                        foodNum: 0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:188,//美食折扣价
                        foodTags: [{tagId: 2, tagName: '肉类'}, {tagId: 3, tagName: '营养'}],
                    },
                    {
                        food: {
                            foodId: 96,//美食ID
                            foodName: '精品牛排96',//美食名称
                            foodPrice: 188,//美食价格
                            foodPicture: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=478974051,1148287746&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '精品牛排96',//美食介绍
                            foodState: 1,//美食状态
                            foodType: 1,//美食类别
                        },
                        foodNum: 0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:188,//美食折扣价
                        foodTags: [{tagId: 2, tagName: '肉类'}, {tagId: 3, tagName: '营养'}],
                    },],

                    [{
                        food: {
                            foodId: 66,//美食ID
                            foodName: '高贵甜品66',//美食名称
                            foodPrice: 66,//美食价格
                            foodPicture: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=806744898,3289850978&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '高贵甜品66',//美食介绍
                            foodState: 1,//美食状态
                            foodType: 1,//美食类别
                        },
                        foodNum: 0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:66,//美食折扣价
                        foodTags: [{tagId: 4, tagName: '甜品'}, {tagId: 3, tagName: '营养'}],
                    },
                    {
                        food: {
                            foodId: 67,//美食ID
                            foodName: '高贵甜品67',//美食名称
                            foodPrice: 66,//美食价格
                            foodPicture: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=806744898,3289850978&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '高贵甜品67',//美食介绍
                            foodState: 1,//美食状态
                            foodType: 1,//美食类别
                        },
                        foodNum: 0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:66,//美食折扣价
                        foodTags: [{tagId: 4, tagName: '甜品'}, {tagId: 3, tagName: '营养'}],
                    },
                    {
                        food: {
                            foodId: 68,//美食ID
                            foodName: '高贵甜品68',//美食名称
                            foodPrice: 66,//美食价格
                            foodPicture: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=806744898,3289850978&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '高贵甜品68',//美食介绍
                            foodState: 1,//美食状态
                            foodType: 1,//美食类别
                        },
                        foodNum: 0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:66,//美食折扣价
                        foodTags: [{tagId: 4, tagName: '甜品'}, {tagId: 3, tagName: '营养'}],
                    },
                    {
                        food: {
                            foodId: 69,//美食ID
                            foodName: '高贵甜品69',//美食名称
                            foodPrice: 66,//美食价格
                            foodPicture: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=806744898,3289850978&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '高贵甜品69',//美食介绍
                            foodState: 1,//美食状态
                            foodType: 1,//美食类别
                        },
                        foodNum: 0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:66,//美食折扣价
                        foodTags: [{tagId: 4, tagName: '甜品'}, {tagId: 3, tagName: '营养'}],
                    },],
                ],
                //单行美食对象列表
                foodItemLine:[
                    {
                        food: {
                            foodId:88,//美食ID
                            foodName:'水煮肉片',//美食名称
                            foodPrice:36,//美食价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '',//美食介绍
                            foodState:1,//美食状态
                            foodType:1,//美食类别
                        },
                        foodNum:0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:36,//美食折扣价
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },
                    {
                        food: {
                            foodId:88,//美食ID
                            foodName:'水煮肉片',//美食名称
                            foodPrice:36,//美食价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '',//美食介绍
                            foodState:1,//美食状态
                            foodType:1,//美食类别
                        },
                        foodNum:0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:36,//美食折扣价
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },
                    {
                        food: {
                            foodId:88,//美食ID
                            foodName:'水煮肉片',//美食名称
                            foodPrice:36,//美食价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '',//美食介绍
                            foodState:1,//美食状态
                            foodType:1,//美食类别
                        },
                        foodNum:0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:36,//美食折扣价
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },
                    {
                        food: {
                            foodId:88,//美食ID
                            foodName:'水煮肉片',//美食名称
                            foodPrice:36,//美食价格
                            foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                            foodIntroduction: '',//美食介绍
                            foodState:1,//美食状态
                            foodType:1,//美食类别
                        },
                        foodNum:0,//美食数量
                        discount:1,//美食折扣
                        foodDiscountPrice:36,//美食折扣价
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },
                ],
                //单个美食对象
                foodItem:{
                    food: {
                        foodId:88,//美食ID
                        foodName:'水煮肉片',//美食名称
                        foodPrice:36,//美食价格
                        foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                        foodIntroduction: '',//美食介绍
                        foodState:1,//美食状态
                        foodType:1,//美食类别
                    },
                    foodNum:0,//美食数量
                    discount:1,//美食折扣
                    foodDiscountPrice:88,//美食折扣价
                    foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                },
                //购物车信息
                foodChooseList: {
                    foodNumSum: 0,//购物车总数量
                    foodPriceSum: 0,//购物车总价
                    foodDiscountPriceSum: 0,//购物车优惠后总价
                    foodList:[
                        // {
                        //     food: {
                        //         foodId:88,//美食ID
                        //         foodName:'水煮肉片88',//美食名称
                        //         foodPrice:36,//美食价格
                        //         foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                        //         foodIntroduction: '',//美食介绍
                        //         foodState:1,//美食状态
                        //         foodType:1,//美食类别
                        //     },
                        //     foodNum:1,//美食数量
                        //     discount:0.9,//美食折扣
                        //     foodDiscountPrice:32.4,//美食折扣价
                        //     foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                        // },
                    ],
                },
                //详细美食信息
                foodDetail: {
                    food: {
                        foodId:88,//美食ID
                        foodName:'水煮肉片88',//美食名称
                        foodPrice:36,//美食价格
                        foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3838812493,777122751&fm=26&gp=0.jpg',//美食图片
                        foodIntroduction: '水煮肉片88',//美食介绍
                        foodState:1,//美食状态
                        foodType:1,//美食类别
                    },
                    foodNum:1,//美食数量
                    discount:0.9,//美食折扣
                    foodDiscountPrice:32.4,//美食折扣价
                    foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                },
                //标签实体
                tag: {
                    tagId:0,
                    tagName:'',
                },
                //购物车弹窗
                cartDrawer: false,
                cartDirection: 'rtl',
                //美食详细信息弹窗
                foodDrawer: false,
                foodDirection: 'btt',
                //确认订单弹窗是否可见
                dialogOrderConfirmVisible: false,
                //订单
                order: {
                    orderId:'',//订单编号
                    customer:{
                        customerId:0,
                        customerName:'',
                        customerSex:'',
                    },//用户
                    address:{
                        addressId:0,
                        customerId:0,
                        addressDetail:'',
                        addressState:1,
                    },//用户地址
                    cusRed: {
                        customerRedpacket: {
                            customerRedpacketId:0,//用户红包实体ID
                            customerId:0,//用户ID
                            redpackertId:0,//红包Id
                            customerRedpacketState:1,//用户红包状态
                            customerRedpacketStart:'',
                            customerRedpacketEnd:'',
                        },//用户红包实体
                        redpacket: {
                            redpacketId:0,//红包ID
                            redpacketName: '',//红包名称
                            threshold:0,//红包门槛
                            redpacketNum:0,//红包金额
                        },//红包实体
                    },//用户红包关系
                    payWay:{
                        payWayId:0,
                        payWayName:'',
                        payWayState:1,
                    },//支付方式
                    orderPrice:0,//订单价格
                    orderTime:'',//订单时间
                    phonenum:{
                        phonenumId:0,
                        customerId:0,
                        phonenumMes:'',//电话号码
                        phoneState:1,
                    },//电话
                    orderType:1,//订单状态（待接餐）
                },
                //用户信息
                Information: {
                    customer: {
                        customerId:0,
                        customerName:'',
                        customerSex:'',
                    },
                    predictTime:'',//预计送达时间
                    payWayList: [
                        {
                            payWayId:0,
                            payWayName:'',
                            payWayState:1,
                        },
                        // {
                        //     payWayId:2,
                        //     payWayName:'微信',
                        //     payWayState:1,
                        // },
                    ],
                    addressList: [
                        {
                            addressId:0,
                            customerId:0,
                            addressDetail:'',
                            addressState:1,
                        },
                        // {
                        //     addressId:2,
                        //     customerId:2,
                        //     addressDetail:'河北省石家庄市',
                        //     addressState:1,
                        // },
                    ],
                    phonenumList: [
                        {
                            phonenumId:0,
                            customerId:0,
                            phonenumMes:'',
                            phoneState:1,
                        },
                        // {
                        //     phonenumId:2,
                        //     customerId:2,
                        //     phonenumMes:'12312341234',
                        //     phoneState:1,
                        // },
                    ],
                    redpacketList: [

                        // {
                        //     customerRedpacket: {
                        //         customerRedpacketId:2,//用户红包实体ID
                        //         customerId:2,//用户ID
                        //         redpackertId:1,//红包Id
                        //         customerRedpacketState:2,//用户红包状态
                        //         customerRedpacketStart:'',
                        //         customerRedpacketEnd:'',
                        //     },
                        //     redpacket: {
                        //         redpacketId:2,//红包ID
                        //         redpacketName: '有你超甜红包',//红包名称
                        //         threshold:20,//红包门槛
                        //         redpacketNum:3,//红包金额
                        //     },
                        // },
                    ],
                },
                //获取Information输入
                orderInput: {
                    customerId:2,//当前用户ID
                    nowTime:'',//用户点击结算订单后的时间
                },
                //最终提交订单信息
                payForOrder: {
                    orderOrder:{},
                    orderFoodList: [],
                },
                //订单
                orderOrder: {
                    customerId:0,
                    isUseActivity:2,//是否使用活动
                    addressId:1,
                    customerRedpacketId:1,
                    payWayId:1,
                    orderPrice:0,//订单实际支付价格
                    orderTime:'',//订单时间
                    phonenumId:1,
                    orderType:1,//订单状态（待接餐）
                    orderRemark:'',//订单备注
                },

                orderFoodList:[
                   {
                        foodId: 0,//美食ID
                        foodPrice: 0,//美食价格
                        foodDiscountPrice: 0,//折扣价格
                        foodNum: 0,//美食数量
                    },
                ],

                orderFoodItem: {
                    foodId: 88,//美食ID
                    foodPrice: 36,//美食价格
                    foodDiscountPrice: 36,//折扣价格
                    foodNum: 2,//美食数量
                },
                //用户实体
                customer: {
                    customerId:0,
                    customerName:'',
                    customerSex:'',
                },
                payWay: {
                    payWayId:0,
                    payWayName:'',
                    payWayState:1,
                },
                //地址实体
                address: {
                    addressId:0,//地址ID
                    customerId:0,//用户ID
                    addressDetail:'',//地址详细信息
                    addressState:1,//地址状态
                },
                //电话实体
                phonenum: {
                    phonenumId:0,
                    customerId:0,
                    phonenumMes:'',
                    phoneState:1,
                },
                //用户红包实体
                customerRedpacket: {
                    customerRedpacketId:0,//用户红包实体ID
                    customerId:0,//用户ID
                    redpackertId:0,//红包Id
                    customerRedpacketState:1,//用户红包状态
                    customerRedpacketStart:'',
                    customerRedpacketEnd:'',
                },
                //用户红包关系
                cusRed: {
                    customerRedpacket: {},//用户红包实体
                    redpacket: {},//红包实体
                },
                //红包实体
                redpacket: {
                    redpacketId:0,//红包ID
                    redpacketName: '',//红包名称
                    threshold:10,//红包门槛
                    redpacketNum:2,//红包金额
                },

            }
        },
        computed: {
            foodTypeComputed() {
                return this.$store.state.foodType;
            }
        },
        watch: {
            foodTypeComputed:function(oldValue,newValue){
                this.getAllFoods();
            },
        },
        created() {
            //初始化购物车信息
            this.getChooseNumSum();
            //初始化美食信息
            this.getAllFoods();

        },
        methods:{


            getFoodType() {
                this.foodInput.foodType = this.$store.getters.getFoodType;
                console.log(this.foodInput);
            },
            //获取所有美食信息
            getAllFoods() {
                this.getFoodType();
                this.foodChooseList = this.$store.getters.getFoodChooseList;
                this.axios.defaults.withCredentials = true;
                //清空现有加载过的foodTypeList
                // this.foodItemList = [];
                //console.log(this.foodItemList);
                this.axios.post(`http://localhost:8080/food/selectByTypeAndState`,this.foodInput).then(r=>{
                    //console.log(r);
                    // console.log(r.data);
                    // console.log(r.data.msg);
                    this.foodItemList = r.data.msg.foodItemList;
                    for(let i=0;i<this.foodItemList.length;i++){
                        //console.log(this.foodItemList[i]);
                        for(let j=0;j<this.foodItemList[i].length;j++){
                            //console.log(this.foodItemList[i][j]);
                            //console.log(this.foodItemList[i][j].food);
                            this.foodItemList[i][j].food.foodPicture = 'http://localhost:8080/image/'+this.foodItemList[i][j].food.foodPicture;
                        }
                    }
                });
            },
            //结算订单
            orderFoods() {
                //提交订单成功，跳转确认订单信息弹窗
                // this.dialogOrderConfirmVisible= true;
                this.axios.defaults.withCredentials = true;
                let nowDate = new Date().getFullYear() +"-" +(new Date().getMonth() + 1) +"-" +new Date().getDate() +
                " " +new Date().getHours() +":" +new Date().getMinutes() +":" +new Date().getSeconds();
                this.orderInput.nowTime = nowDate;
                this.axios.post(`http://localhost:8080/customer/getCustomerDetail`,this.orderInput).then(r=>{
                    console.log(r);
                    if(r.data.msg){
                        let customer = r.data.msg.customer;
                        this.Information.customer.customerId = customer.customerId;
                        this.Information.customer.customerName = customer.customerName;
                        this.Information.customer.customerSex = customer.customerSex;
                        this.Information.predictTime = r.data.msg.predictTime.substring(11,16);
                        this.Information.payWayList = r.data.msg.payWayList;
                        this.Information.addressList = r.data.msg.addressList;
                        this.Information.phonenumList = r.data.msg.phonenumList;
                        this.Information.redpacketList = [];
                        if(r.data.msg.redpacketList==""){
                            console.log('该用户没有可用红包');
                            this.Information.redpacketList = "";
                        }else{
                            for(let k=0;k<r.data.msg.redpacketList.length;k++){
                                this.cusRed.customerRedpacket = r.data.msg.redpacketList[k].customerRedpacket;
                                this.cusRed.redpacket.redpacketId = r.data.msg.redpacketList[k].redpacket.redpacketId;
                                this.cusRed.redpacket.redpacketName = r.data.msg.redpacketList[k].redpacket.redpacketName;
                                this.cusRed.redpacket.threshold = r.data.msg.redpacketList[k].redpacket.threshold;
                                this.cusRed.redpacket.redpacketNum = r.data.msg.redpacketList[k].redpacket.redpacketNum;

                                console.log(this.cusRed);
                                this.Information.redpacketList.push(this.cusRed);
                            }
                        }
                        // this.Information.redpacketList = r.data.msg.redpacketList;//如果redpacket类型不符合，再改
                        //console.log(this.Information);
                        this.order.customer = customer;
                        this.order.phonenum = this.Information.phonenumList[0];
                        //console.log(this.order.phonenum);
                        this.order.address = this.Information.addressList[0];
                        this.order.payWay = this.Information.payWayList[0];
                        if(this.Information.redpacketList!=""){
                            this.order.cusRed = this.Information.redpacketList[0];
                            console.log(this.order);
                            // this.foodChooseList.foodDiscountPriceSum = this.foodChooseList.foodDiscountPriceSum - this.order.cusRed.redpacket.redpacketNum;
                        }else{
                            this.order.cusRed = "";
                            console.log(this.order);
                        }
                        if(customer.customerSex == '男'){
                            this.order.customer.customerSex = '先生';
                        }else if(customer.customerSex == '女'){
                            this.order.customer.customerSex = '女士';
                        }
                        console.log(this.order);
                        //提交订单成功，跳转确认订单信息弹窗
                        this.dialogOrderConfirmVisible= true;
                    }else{
                        //提交订单失败
                        alert('结算订单失败');
                    }
                });


            },
            //支付订单
            payFoods() {
                this.axios.defaults.withCredentials = true;

                this.orderOrder.customerId = this.order.customer.customerId;
                for(let i=0;i<this.foodChooseList.foodList.length;i++){
                    if(this.foodChooseList.foodList[i].discount != 1){
                        this.orderOrder.isUseActivity = 1;
                        break;
                    }
                }
                this.orderOrder.addressId = this.order.address.addressId;
                if(this.order.cusRed == ''){
                    this.orderOrder.customerRedpacketId = 0;
                }else{
                    this.orderOrder.customerRedpacketId = this.order.cusRed.customerRedpacket.customerRedpacketId;
                }

                this.orderOrder.payWayId = this.order.payWay.payWayId;
                if(this.order.cusRed != ''){
                    this.orderOrder.orderPrice = this.foodChooseList.foodDiscountPriceSum - this.order.cusRed.redpacket.redpacketNum;
                }else{
                    this.orderOrder.orderPrice = this.foodChooseList.foodDiscountPriceSum
                }
                let nowDate = new Date().getFullYear() +"-" +(new Date().getMonth() + 1) +"-" +new Date().getDate() +
                    " " +new Date().getHours() +":" +new Date().getMinutes() +":" +new Date().getSeconds();
                this.orderOrder.orderTime = nowDate;
                this.orderOrder.phonenumId = this.order.phonenum.phonenumId;

                this.orderFoodList = [];
                //console.log(this.foodChooseList);
                for(let j=0;j<this.foodChooseList.foodList.length;j++){
                    this.orderFoodItem = {};
                    let foodList = this.foodChooseList.foodList[j];
                    //console.log(foodList);
                    this.orderFoodItem.foodId = foodList.food.foodId;
                    this.orderFoodItem.foodPrice = foodList.food.foodPrice;
                    this.orderFoodItem.foodDiscountPrice = foodList.foodDiscountPrice;
                    this.orderFoodItem.foodNum = foodList.foodNum;
                   // console.log(this.orderFoodItem);
                    this.orderFoodList.push(this.orderFoodItem);
                }

                this.payForOrder.orderOrder = this.orderOrder;
                this.payForOrder.orderFoodList = this.orderFoodList;
                //console.log('payForOrder');
                //console.log(this.payForOrder);
                this.axios.post(`http://localhost:8080/orders/payOrder`,this.payForOrder).then(r=>{
                    console.log(r);
                    this.$store.commit('setFoodChooseList',[]);
                    
                    this.dialogOrderConfirmVisible = false;
                    this.cartDrawer =  false;
                    this.$message({
                        message: '支付成功',
                        type: 'success'
                    });

                });
            },
            //获取当前购物车总数量，总价格
            getChooseNumSum() {
                let newSum = 0;
                let newPriceSum = 0;
                let newDiscountPriceSum = 0;
                for(let i=0;i<this.foodChooseList.foodList.length;i++){
                    // console.log(this.foodChooseList.foodList[i]);
                    newSum += this.foodChooseList.foodList[i].foodNum;
                    newPriceSum += (this.foodChooseList.foodList[i].food.foodPrice)*(this.foodChooseList.foodList[i].foodNum);
                    newDiscountPriceSum += (this.foodChooseList.foodList[i].foodDiscountPrice)*(this.foodChooseList.foodList[i].foodNum);
                }
                this.foodChooseList.foodNumSum = newSum;
                this.foodChooseList.foodPriceSum = newPriceSum+1;
                this.foodChooseList.foodDiscountPriceSum = newDiscountPriceSum+1;
                this.$store.commit('setFoodChooseList',this.foodChooseList);
            },
            //添加美食数量
            addFoodNum(foodNum, foodItem, foodChooseList) {
				if(!this.$store.getters.getIsLogin){
					console.log("dddddddd");
					this.$router.push({path:'/Home/Login'})
				}
                foodItem.foodNum = foodNum+1;
                if(foodItem.foodNum==1){
                    foodChooseList.foodList.push(foodItem);
                }else{
                    for(let i=0;i<foodChooseList.foodList.length;i++){
                        // console.log(foodChooseList.foodList[i]);
                        if(foodChooseList.foodList[i].food.foodId == foodItem.food.foodId){
                            foodChooseList.foodList[i].foodNum = foodItem.foodNum;
                            break;
                        }
                    }
                }
                //获取当前购物车总数量
                this.getChooseNumSum();
                // console.log(this.foodChooseList);
            },
            //减少美食数量
            minusFoodNum(foodNum, foodItem, foodChooseList) {
                foodItem.foodNum = foodNum-1;
                if(foodItem.foodNum==0){
                    for(let i=0;i<foodChooseList.foodList.length;i++){
                        // console.log(foodChooseList.foodList[i]);
                        if(foodChooseList.foodList[i].food.foodId == foodItem.food.foodId){
                            foodChooseList.foodList.splice(i,1);
                            // console.log(foodChooseList.foodList);
                            break;
                        }
                    }
                }else{
                    for(let i=0;i<foodChooseList.foodList.length;i++){
                        // console.log(foodChooseList.foodList[i]);
                        if(foodChooseList.foodList[i].food.foodId == foodItem.food.foodId){
                            foodChooseList.foodList[i].foodNum = foodItem.foodNum;
                            break;
                        }
                    }
                }
                //获取当前购物车总数量
                this.getChooseNumSum();
                // console.log(this.foodChooseList);
            },
            //手动输入修改美食数量
            changeFoodNum(foodNum, foodItem, foodChooseList) {
                console.log(foodNum);
                foodItem.foodNum = foodNum;
                if(foodItem.foodNum==0){
                    for(let i=0;i<foodChooseList.foodList.length;i++){
                        console.log(foodChooseList.foodList[i]);
                        if(foodChooseList.foodList[i].food.foodId == foodItem.food.foodId){
                            foodChooseList.foodList.splice(1,i);
                            console.log(foodChooseList.foodList);
                            break;
                        }
                    }
                }else{
                    for(let i=0;i<foodChooseList.foodList.length;i++){
                        console.log(foodChooseList.foodList[i]);
                        if(foodChooseList.foodList[i].food.foodId == foodItem.food.foodId){
                            foodChooseList.foodList[i].foodNum = foodItem.foodNum;
                            break;
                        }
                    }
                }
                //获取当前购物车总数量
                this.getChooseNumSum();
                console.log(this.foodChooseList)
            },
            //展开购物车
            showShoppingCart() {
                this.cartDrawer = true;
            },
            //关闭弹窗的询问
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //查看美食详情信息
            foodDetailShow(foodItem) {
                this.foodDrawer = true;
                console.log(foodItem);
                this.foodDetail = foodItem;
                //获取当前购物车总数量
                this.getChooseNumSum();
            },
            //解决选择地址事件
            chooseAddress(command) {
                //this.$message('click on item ' + command);
                for(let i=0;i<this.Information.addressList.length;i++){
                    if(this.Information.addressList[i].addressId == command){
                        this.order.address = this.Information.addressList[i];
                    }
                }
            },
            //解决选择电话事件
            choosePhonenum(command) {
                //this.$message('click on item ' + command);
                for(let i=0;i<this.Information.phonenumList.length;i++){
                    if(this.Information.phonenumList[i].phonenumId == command){
                        this.order.phonenum = this.Information.phonenumList[i];
                    }
                }
            },
            //解决选择支付方式事件
            choosePayWay(command) {
                //this.$message('click on item ' + command);
                for(let i=0;i<this.Information.payWayList.length;i++){
                    if(this.Information.payWayList[i].payWayId == command){
                        this.order.payWay = this.Information.payWayList[i];
                    }
                }
            },
            //解决选择红包事件
            chooseRedacket(command) {
                //this.$message('click on item ' + command);
                for(let i=0;i<this.Information.redpacketList.length;i++){
                    if(this.Information.redpacketList[i].customerRedpacket.customerRedpacketId == command){
                        this.order.cusRed = this.Information.redpacketList[i];
                        // this.foodChooseList.foodDiscountPriceSum = this.foodChooseList.foodDiscountPriceSum - this.order.cusRed.redpacket.redpacketNum;
                    }
                }
            },
        },
    }
</script>

<style lang="less" scoped>
.food{
    width: 100%;
    height: 100%;
    -background-color: lightcoral;
    -background-color: #f1f9fe;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .cart{
        position: fixed;
        width: 40px;
        height: 40px;
        line-height:40px;
        top:7%;
        right:2%;
        z-index: 99999;
        border-radius: 180px;
        -background-color: #787878;
        opacity: 0.8;
    }
    .cart-num{
        position:absolute;
        margin:0;
        text-align: center;
        line-height: 12px;
        font-size: 0.55rem;
        color: #ffffff;
        padding: 0;
        top:-1px;
        right: -1px;
        width:13px;
        height: 13px;
        border: 1px solid #ea4b35;
        background-color: #ea4b35;
        z-index:999999;
        border-radius: 180px;
    }
    .shoppingCart{
        padding-left: 5%;
        padding-right: 5%;
        width: 100%;
        height: 90%;
        -background-color: #42b983;
        overflow: auto;
        .link-top {
            padding-left: 15%;
            padding-right: 15%;
            width: 70%;
            height: 1px;
            border-top: solid silver 1px;
        }
        .cartName{
            height: 30px;
            font-size: 20px;
            font-weight: bolder;
            -background-color: #b02f36;
            text-align: center;
            padding-top: 0px;
            padding-bottom: 10px;
        }
        .cartShow{
            height: 670px;
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
                        height:90%;
                        width:90%;
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
        .cartButton{
            display: flex;
            height: 60px;
            border-radius: 180px;
            background-color: #f8f8f8;
            .cb1{
                flex: 1;
                -background-color: lightcoral;
                z-index:999999;
                opacity:.75;
                position: relative;
                .cartnum{
                    position:absolute;
                    margin:0;
                    text-align: center;
                    line-height: 12px;
                    font-size: 0.55rem;
                    color: #ffffff;
                    padding: 0;
                    top:2px;
                    right: 2px;
                    width:13px;
                    height: 13px;
                    border: 1px solid #ea4b35;
                    background-color: #ea4b35;
                    z-index:999999;
                    border-radius: 180px;
                }
            }
            .cb2{
                flex: 3;
                -background-color: aqua;
                padding-top: 3px;
                padding-left: 3px;
            }
            .cb3{
                flex: 2;
                -background-color: #b02f36;
                padding-top: 10px;
            }
        }
    }
    .foodDetail{
        height: 100%;
        width: 90%;
        padding-left: 10%;
        -background-color: darkgoldenrod;
        overflow: auto;
        display: flex;
        .fdPicture{
            flex: 1;
            -background-color: #ea4b35;
            padding-top: 1%;
            padding-left: 5%;
            .imgs{
                height:95%;
                width:80%;
                border-radius: 50%;
                box-shadow: 5px 5px 5px #888888;
                cursor: pointer;
            }
        }
        .fdInfo{
            flex: 2;
            -background-color: #42b983;
            padding-bottom: 60px;
            padding-top: 60px;
            display: flex;
            flex-direction: column;
            .fdiName{
                flex: 1;
                -background-color: aqua;
                font-size: 20px;
                font-weight: bolder;
                -line-height: 60px;
            }
            .fdiTag{
                flex: 1;
                -background-color: darkviolet;
            }
            .fdiDetail{
                flex: 1;
                font-size: 14px;
                color: gray;
                -background-color: lightcoral;
            }
            .fdiPrice{
                flex: 1;
                display: flex;
                -background-color: dodgerblue;
                .fdiP{
                    flex: 1;
                    color: #ea4b35;
                    font-size: 22px;
                    font-weight: bolder;
                }
                .fdiNum{
                    flex: 1;
                    -background-color: #b02f36;
                }
            }

        }
    }
    .foodLine{
        width: 100%;
        /*height: 35%;*/
        height: 300px;
        padding-top: 30px;
        padding-bottom: 10px;
        display: flex;
        -background-color: lightcoral;
        .foodItem{
            height: 100%;
            width: 25%;
            padding-left: 10px;
            padding-right: 10px;
            -background-color: coral;
            display: flex;
            flex-direction: column;
            .foodPic{
                flex: 2;
                text-align: center;
                overflow: hidden;
                -background-color: azure;
                .imgs{
                    height:95%;
                    width:60%;
                    border-radius: 50%;
                    box-shadow: 5px 5px 5px #888888;
                    cursor: pointer;
                    .imgs :hover imgs{
                        filter:alpha(Opacity=80);
                        -moz-opacity:0.8;
                        opacity: 0.8;
                    }
                }
            }
            .foodInfo{
                flex: 1;
                -background-color: dodgerblue;
                text-align: center;
                .foodName{
                    padding-top: 8px;
                    font-size: 22px;
                    text-align: center;
                    color: black;
                    font-weight: bolder;
                }
                .foodPrice{
                    font-size: 16px;
                    color: #ea4b35;
                    text-align: center;
                    font-weight: bolder;
                    padding-top: 5px;
                }
                .foodNum{
                    padding-top: 5px;
                    text-align: center;
                }


            }
        }
    }
    .orderConfirm{
        height: 100%;
        width: 100%;
        -background-color: #b02f36;
        display: flex;
        .ocLeft{
            flex: 1;
            -background-color: darkgoldenrod;
            display: flex;
            overflow: auto;
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

        }
        .ocRight{

            flex: 1;
            -background-color: #888888;
            display: flex;
            .ocr{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                -background-color: darkgoldenrod;
                .ocr1{
                    flex: 1;
                    -background-color: #ea4b35;
                }
                .ocr2{
                    flex: 1;
                    -background-color: aqua;
                }
                .ocr3{
                    flex: 1;
                    -background-color: dodgerblue;
                }
                .ocr4{
                    flex: 1;
                    -background-color: lightcoral;
                }
                .ocr5{
                    flex: 1;
                    -background-color: lightgreen;
                    .cartButton{
                        display: flex;
                        height: 60px;
                        border-radius: 180px;
                        background-color: #f8f8f8;
                        .cb1{
                            flex: 1;
                            -background-color: lightcoral;
                            z-index:999999;
                            opacity:.75;
                            position: relative;
                            .cartnum{
                                position:absolute;
                                margin:0;
                                text-align: center;
                                line-height: 12px;
                                font-size: 0.55rem;
                                color: #ffffff;
                                padding: 0;
                                top:10px;
                                right: 10px;
                                width:13px;
                                height: 13px;
                                border: 1px solid #ea4b35;
                                background-color: #ea4b35;
                                z-index:999999;
                                border-radius: 180px;
                            }
                        }
                        .cb2{
                            flex: 3;
                            text-align: right;
                            -background-color: aqua;
                            padding-top: 3px;
                            padding-right: 15px;
                        }
                    }
                }
            }
        }
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
}
</style>