<template>
  <el-card class="box-card detail-card detail-card--address" shadow="never">
    <div slot="header" class="clearfix">
      <span>收货地址</span>
    </div>
    <div class="detail-card__body detail-card__body--address">
      <el-row class="item" v-for="item in address" :key="item.mobile">
        <el-col :span="5">
          <div class="name">
            {{ item.name }}
          </div>
        </el-col>
        <el-col :span="19">
          <div class="address__item">
            <div class="phone">{{ item.mobile }}<span class="state" v-show="item.isDefault">默认</span></div>
            <div>{{item.provinceName}} {{item.cityName}} {{item.areaName}} {{item.detail}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      address: Array
    }
  }
</script>

<style lang="scss" scoped>
  .detail-card--address {
    padding-bottom: 0;
  }

  .detail-card__body--address {
    text-align: left;

    > .item {
      border-bottom: 1px solid #e3e3e3;
      padding: 10px 0;
    }

    > .item:last-child {
      border: none;
    }
  }

  .address__item .phone {
    margin-bottom: 20px;
  }

  .state {
    font-size: 13px;
    padding: 1px 10px;
    border-radius: 2px;
    background: #34c4d4;
    color: #fff;
    float: right;
  }
</style>