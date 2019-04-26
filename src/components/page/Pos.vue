<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="点餐" name="first">
            <el-table :data="tableData" border style="width:100%;color: black;">
              <el-table-column prop="goodsName" label="商品名字"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
              <el-table-column label="操作" fixed="right">
                <template scope="scope">
                  <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                  <!--
                  第九节改造的：
                  这里有个小坑，由于这里没有goods所以无法给方法里传goods，所以绑定不管用。
                  这个时候，需要将template里面写的scope写到绑定的方法里，并且用scope.row将
                  一整列都绑定进去，就可以了。
                  -->
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="totalDiv">
              <small>数量:{{totalCount}}</small> &nbsp;&nbsp;&nbsp;<small>金额:{{totalMoney}}元</small>
            </div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delAllGoods()">删除</el-button>
              <el-button type="success" @click="checkout()">结账</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="挂单" name="second">

          </el-tab-pane>
          <el-tab-pane label="外卖" name="third">

          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class="cookList">
                <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class="cookList">
                <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class="cookList">
                <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class="cookList">
                <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import ElTabPane from "../../../node_modules/element-ui/packages/tabs/src/tab-pane.vue";
  import axios from 'axios';//这里引入的名字也就是from后面跟着那个名字，必须和在package.json的dependencies里面的axios的版本号前面的那个名字一样！！
  export default {
    components: {ElTabPane},
    name: 'pos',
    data() {
      return {
        activeName: 'first',
        /*
        快餐Pos系统第九节：
        将学会以数据驱动改变Dom的结构
        */
        tableData: [],
        oftenGoods: [],
        type0Goods: [],
        type1Goods: [],
        type2Goods: [],
        type3Goods: [],
        totalMoney: 0,
        totalCount: 0
      };
    },
    /*
    项目第八节：
    在钩子函数中，我们希望在Pos.vue一创建就开始拉取数据，那我们就需要一个基本的钩子函数。
     技术胖提供的两个接口地址：
       1. http://jspang.com/DemoApi/oftenGoods.php
       2. http://jspang.com/DemoApi/typeGoods.php
    */
    created: function () {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')//这里技术胖提供了一个接口
        .then(reponse => {
//          console.log(reponse);
          this.oftenGoods = reponse.data;
        })//.then()是说明我们成功了，>catch()是说明没有成功，出错了
        .catch(error => {
          //console.log(error);//做个最简单的错误处理
          alert('网络错误，不能访问！');
        });

      axios.get('http://jspang.com/DemoApi/typeGoods.php')//这里技术胖提供了一个接口
        .then(reponse => {
          //console.log(reponse);
          this.type0Goods = reponse.data[0];
          this.type1Goods = reponse.data[1];
          this.type2Goods = reponse.data[2];
          this.type3Goods = reponse.data[3];
        })//.then()是说明我们成功了，>catch()是说明没有成功，出错了
        .catch(error => {
          //console.log(error);//做个最简单的错误处理
          alert('网络错误，不能访问！');
        })
    },
    /*
    element是虚拟的，所以需要在所有的虚拟dom都加载完成后，才能在钩子里写这个。
    mounted：当所有的虚拟dom都加载完成之后，这里面实行的是什么？
    用javaScript原生的方法给.pos-order设置高度。
     */
    mounted: function () {
      var orderHeiht = document.body.clientHeight;
      console.log(orderHeiht);
      document.getElementById('order-list').style.height = orderHeiht + 'px';
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /*
        第九节内容：快餐收银Pos系统-订单模块1
      */
      addOrderList(goods) {
        //商品是否已经存在于订单列表中
        let isHave = false;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].goodsId == goods.goodsId) {
            isHave = true;
          }
        }
        //根据判断的值编写业务逻辑
        if (isHave) {
          //改变列表中商品的数量，如果列表中存在，就增加数量
          let arr = this.tableData.filter(a => a.goodsId == goods.goodsId);
          arr[0].count++;
        } else {
          //如果商品列表里不存在，直接将东西推入数组
          let newGoods = {goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1};
          this.tableData.push(newGoods);
        }
        //第十节添加的
        this.getAllMoney();
        /*
        每次增加都清零
         */
        this.totalMoney = 0;
        this.totalCount = 0;
        /*
        计算汇总金额和数量
         */
        this.tableData.forEach((element) => {
          this.totalCount += element.count;
          this.totalMoney = this.totalMoney + (element.price * element.count);

        })
      },
      /*
      第十节：快餐收银Pos系统-订单模块2
      删除单个商品：
       */
      delSingleGoods(goods) {
        this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
        this.getAllMoney();
      },
      // 全部删除
      delAllGoods() {
        this.tableData = [];
        this.totalMoney = 0;
        this.totalCount = 0;
      },
      //汇总数量和金额
      getAllMoney() {
        this.totalCount = 0;//清零
        this.totalMoney = 0;
        if (this.tableData) {
          /*
       计算汇总金额和数量
        */
          this.tableData.forEach((element) => {
            this.totalCount += element.count;
            this.totalMoney = this.totalMoney + (element.price * element.count);

          })
        }
      },
      /*
      模拟结账：
       */
      checkout() {
        if (this.totalCount != 0) {
          this.tableData = [];
          this.totalCount = 0;//清零
          this.totalMoney = 0;
          this.$message({
            message: "结账成功，感谢你又为店里出了一份力",
            type: 'success'
          });
        } else {
          this.$message.error('不能空结，老板了解你急切地心情!');
        }
      }
      /*
      第十一节：打包和上线：
      注意：1.把绝对路径改成相对路径（打包配置在config的index.js的build的属性，这就是我们打包的一些设置。
              index就是我们首页的打包位置，可以将后面的绝对路径改成相对路径，比如改成我们打包E盘的一个目录。
              主要改的是assetsPublicPath，将里面‘/’改成'./'。
              打包的命令：npm run build
       */
    }
  }
</script>
<!--scoped:是局部变量-->
<style>
  .pos-order {
    background: #f9fafc;
    border-right: 1px solid #c0ccda;
    padding-left: 20px;
  }

  .div-btn {
    margin-top: 15px;
  }

  /*
  这是右边的部分
   */
  .title {
    height: 20px;
    border-bottom: 1px solid #d3dce6;
    background: #f9fafc;
    padding: 10px;
    text-align: left;
  }

  .often-goods-list ul li {
    list-style: none;
    float: left;
    border: 1px solid lightskyblue;
    padding: 10px;
    margin: 10px;
    background: #fff;
    /*将鼠标放置上相应的位置，变成手型：cursor: pointer;*/
    cursor: pointer;
  }

  .o-price {
    color: #5887ff;
  }

  .goods-type {
    clear: both;
    padding-left: 15px;
  }

  .cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #E5E9F2;
    height: auto;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;
    cursor: pointer;
  }

  .cookList li span {

    display: block;
    float: left;
  }

  .foodImg {
    width: 40%;
  }

  .foodName {
    font-size: 18px;
    padding-left: 10px;
    color: brown;

  }

  .foodPrice {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .totalDiv {
    background: #fff;
    padding: 10px;
    border-bottom: 1px solid #d3dce6;
  }
</style>
