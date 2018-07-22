<template>
    <div class="organize-page">
      <div class="top-bar">
        <span class="add-member-buttom" @click="updateYYSet">
          <i class="el-icon el-icon-loading" v-show="btnLoading"></i>添加
        </span>
      </div>

      <table-wrapper title="组织架构">
        <span slot="right">共23435人</span>
      </table-wrapper>
    </div>
</template>

<script>
  import TableWrapper from '@/components/TableWrapper'

  export default {
    data() {
      return {
        msg: 'Lorem'
      }
    },

    components: {
      TableWrapper
    }
  }
</script>