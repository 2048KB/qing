<template>
    <div class="rights-wrapper">
      <div class="top-bar">
        <el-button class="add-member-buttom" @click="updateRights" icon="el-icon-edit">
          <i class="el-icon el-icon-loading" v-show="btnLoading"></i>{{ commitBtnText }}
        </el-button>
      </div>

      <table-wrapper :title="roleName">
        <el-form ref="form" label-width="120px">
          <!-- <el-form-item v-for="(key, index) in form">
            <el-checkbox :label="index" @change="checkSubAll(index)">全部</el-checkbox>
            <el-checkbox-group v-model="form[index].rights" @change="handleCheckedCitiesChange">
              <el-checkbox
                v-for="city in form[index].items"
                :label="city.id"
                :key="city.id">{{city.description}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->

          <div class="row" v-for="(item, key) in rightLists">
            <el-row>
              <el-form-item>
                <span slot="label">{{ key }} : </span>
                <el-checkbox-group v-model="rights">
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
        rights: [],
        types: [],
        rightLists: {},
        roleName: ''
      }
    },

    created() {
      this.fetchRights()
    },

    methods: {
      handleCheckedCitiesChange(right) {
        let index = this.rights.indexOf(right)
        this.rights.push(right)

        if (index > -1) {
          return
          console.log('不添加')
        //   this.rights.splice(index, 1)
        //   console.log(this.rights)
        } else {
          this.rights.push(right)
        }
      },

      checkSubAll(index) {
        let checkedList = []

        for (let key in this.form[index].items) {
          let id = this.form[index].items[key].id
          checkedList.push(id)
        }

        this.form[index].rights = checkedList
      },

      fetchRights() {
        this.$API.showright({
          data: {
            roleId: this.$route.query.roleId || ''
          }
        }).then(res => {
          this.rightLists = res.data.allRight
          this.roleId = res.data.roleId
          this.roleName = res.data.roleName
          this.rights = res.data.rights

          this.handleRightCheckedList(res.data.allRight)
        })
      },

      handleRightCheckedList(obj) {
        for (let key in obj) {
          for (let index in  obj[key]) {
            if (obj[key][index].right) {
              this.types.push(obj[key][index].right)
            }
          }
        }
      },

      updateRights() {
        this.btnLoading = true
        this.commitBtnText = '保存中...'

        this.$API.editright({
          data: {
            roleId: this.roleId, //  int 整型  角色id
            rights: JSON.stringify(this.rights) //  Long[]  数组  选择的权限信息
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