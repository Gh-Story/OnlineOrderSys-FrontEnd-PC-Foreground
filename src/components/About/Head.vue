<template>
	<div class="Food_top">
		
		<div class="Food_top_bg" >
		</div>
		<div class="Food_top_main">
			始于1923，传统工艺，匠心独具
			<div class="shop-logo">
			    <img src="../../../static/logotext-white.png">
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: "foodHeader",
		data(){
			return{
			}
		},
		methods: {
		},
	}
</script>

<style lang="less" scoped>
	.Food_top{
		.Food_top_bg{
		    position: relative;
		    height: 100px;
		    &:before{
		        content: '';
		        position: absolute;
		        top: 0;
		        left: 0;
		        right: 0;
		        bottom: 0;
		        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
		    }
		   
		}
		.Food_top_main{
		    position: relative;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    .shop-logo{
		        overflow: hidden;
		        position: absolute;
		        left: 50%;
		        top: -75px;
		        border-radius: 3px;
		        transform: translateX(-50%);
		        img{
		            width: 150px;
		            box-shadow: 0 0 1px rgba(0, 0, 0, 0.31);
		        }
		        .marker{
		            position: absolute;
		            top: 0;
		            left: 0;
		            padding: 0 1px;
		            background-color: #ffe339;
		            font-size: 10px;
		            font-weight: bold;
		            color: #6f3f15;
		        }
		    }
		    .shop-tit{
		        width: 72vw;
		        h2{
		            display: flex;
		            align-items: center;
		            justify-content: center;
		            font-size: 20.5px;
		            span{
		                overflow: hidden;
		                text-overflow: ellipsis;
		                white-space: nowrap;
		            }
		        }
		    }
		    .rate{
		        margin-top: 5px;
		        font-size: 0;
		        span{
		            margin: 0 5px;
		            font-size: 11px;
		            color: #666;
		        }
		    }
		}
	}
</style>
