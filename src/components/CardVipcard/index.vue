<template>
  <el-card class="box-card detail-card detail-card--vipcard">
    <div slot="header" class="clearfix">
      <span>会员卡服务记录</span>
    </div>
    <div class="detail-card__body detail-card__body--vipcard">
      <div class="record" v-for="item in cardlist">
        <el-row class="item">
          <el-col :span="5"><div>激活日期</div></el-col>
          <el-col :span="19" class="de"><div>{{ item.time }}</div></el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="5"><div>服务内容</div></el-col>
          <el-col :span="19" class="de"><div>{{ item.content }}</div></el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="5"><div>备注</div></el-col>
          <el-col :span="19" class="de"><div>{{ item.remark }}</div></el-col>
        </el-row>
      </div>
    </div>

    <div class="block pagination" v-show="cardlist.length > 0">
      <el-pagination
        @current-change="handleChangeCurrent"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalPages">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      cardlist: {
        Type: Array,
        default: []
      },

      pageSize: {
        type: Number,
        default: 10
      },

      totalPages: {
        type: Number,
        default: 4
      }
    },

    methods: {
      handleChangeCurrent(currentPage) {
        this.$emit('triggerVipcardPagination', { currPage: currentPage, role: this.$route.query.role })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-card {
    padding-bottom: 0;
  }

  .detail-card--counselor {
    padding-bottom: 0;
  }

  .detail-card__body--vipcard {
    text-align: left;

    > .record {
      border-bottom: 1px solid #e3e3e3;
      padding-top: 20px;
    }

    > .record:first-child {
      padding-top: 0;
    }

    > .record:last-child {
      border: none;
    }

    .item {
      margin-bottom: 20px;
    }

    .de {
      padding-left: 20px;
      overflow: hidden;
      display: block;
      word-wrap: break-word;
    }
  }

  .detail-card__footer {
    padding-top: 10px;

    > div {
      display: inline-block;
    }

    > div.exlink {
      float: right;
    }
  }
</style>