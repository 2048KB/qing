<template>
    <div class="rights-wrapper">
      <div class="top-bar">
        <span class="add-member-buttom" @click="updateRights">
          <i class="el-icon el-icon-loading" v-show="btnLoading"></i>{{ commitBtnText }}
        </span>
      </div>

      <table-wrapper title="超级管理员">
        <el-form ref="form" :model="form" label-width="120px">
          <div class="row" v-for="(item, key) in rightLists">
            <!-- <p>{{ item }}</p>
            <p>{{ key }}</p> -->
            <el-row>
              <el-form-item>
                <span slot="label">{{ key }} : </span>
                <el-checkbox-group v-model="form.type">
                  <el-checkbox
                    v-for="list in item"
                    :label="list.id"
                    :key="'' + list.id + list.moduleId"
                  >{{ list.description }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>
          </div>
        </el-form>
      </table-wrapper>
    </div>
</template>

<script>
  import TableWrapper from '@/components/TableWrapper'
  // import { setBtnLoading, resetBtnLoading } '@/utils/btnLoading'
  export default {
    data() {
      return {
        msg: 'Lorem',
        btnLoading: false,
        commitBtnText: '保存',
        form: {
          type: []
        },
        rightLists: {}
      }
    },

    created() {
      this.$API.showright({}).then(res => {
        this.rightLists = res.data.allRight
      })
    },

    methods: {
      updateRights() {
        console.log(this.form)
      }
    },

    components: {
      TableWrapper
    }
  }
</script>

<style lang="scss">
  .rights-wrapper .row {
    border-bottom: 1px solid #ddd;
    padding: 10px 0 6px 0;
  }

  .rights-wrapper .row .el-form-item {
    margin-bottom: 0;
  }
</style>