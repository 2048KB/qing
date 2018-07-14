<template>
  <el-card class="box-card detail-card detail-card--address" shadow="never">
    <div slot="header" class="clearfix">
      <span>收货地址</span>
    </div>
    <div class="detail-card__body detail-card__body--address">
      <el-row class="item">
        <el-col :span="5">
          <div class="name">
            马大海
          </div>
        </el-col>
        <el-col :span="19">
          <div class="address__item">
            <div class="phone">15726658123 <span class="state">默认</span></div>
            <div>北京市 北京市 昌平区 北七家镇白庙村北七家镇白庙村北七家镇白庙村北七家镇白庙村北七家镇白庙村北七家镇白庙村</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      employeeDetail: Object
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
      padding-bottom: 10px;
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