<template>
  <div class="TableWrapper">
    <div class="head">
      <span>{{title}}</span>
      <span><slot name="right"></slot></span>
    </div>
    <div class="content"><slot></slot></div>
    <div class="pagination-container" v-if="isShowPaging && total">
      <el-pagination 
        @current-change="handleChangeCurrent"
        layout="prev, pager, next"
        :total="total">
      </el-pagination> 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    total: [String, Number],
    isShowPaging: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleChangeCurrent (pageNumber) {
      this.$emit('current-change', pageNumber)
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/vars.scss';
.TableWrapper {
  margin: 20px;
  background-color: white;
  .head {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 42px;
    line-height: 42px;
    background-color: $c0;
    color: white;
  }
  .content {
    padding: 10px;
  }
}
</style>