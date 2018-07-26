<template>
    <div class="rights-wrapper">
      <div class="top-bar">
        <span class="add-member-buttom" @click="updateRights">
          <i class="el-icon el-icon-loading" v-show="btnLoading"></i>{{ commitBtnText }}
        </span>
      </div>

      <table-wrapper :title="roleName">
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
        commitBtnText: '保 存',
        form: {
          type: []
        },
        rightLists: {},
        roleName: ''
      }
    },

    created() {
      console.log(this.$route.query.roleId)
      this.fetchRights()
    },

    methods: {
      fetchRights() {
        this.$API.showright({
          data: {
            roleId: this.$route.query.roleId || ''
          }
        }).then(res => {
          this.rightLists = res.data.allRight
          this.roleId = res.data.roleId
          this.roleName = res.data.roleName

          this.handleRightCheckedList(res.data.allRight)
        })
      },

      handleRightCheckedList(obj) {
        for (let key in obj) {
          for (let index in  obj[key]) {
            this.form.type.push(obj[key][index].id)
          }
        }
      },

      updateRights() {
        this.btnLoading = true
        this.commitBtnText = '保存中...'

        this.$API.editright({
          data: {
            roleId: this.roleId, //  int 整型  角色id
            rights: this.form.type //  Long[]  数组  选择的权限信息
          }
        }).then((res) => {
          this.$message({
            message: res.msg || '成功',
            type: 'success'
          });

          this.fetchRights({
            data: {
              roleId: this.$route.query.roleId || ''
            }
          })
        }).finally(() => {
          this.btnLoading = false
          this.commitBtnText = '保 存'
        })
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