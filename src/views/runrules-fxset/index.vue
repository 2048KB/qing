<template>
    <div class="runrules-fxset">
      <div class="top-bar">
        <el-button class="add-member-buttom" icon="el-icon-edit" @click="handleSubmit">保存</el-button>
      </div>

      <table-wrapper title="分销规则设置" v-loading.body="listLoading">
        <table>
          <tr>
            <th class="name" width="8%">名称</th>
            <th class="zhitui" width="13%">直推奖</th>
            <th class="yideng" width="13%">一级奖</th>
            <th class="erdeng" width="13%">二级奖</th>
            <th class="shuangren" width="13%">双人奖</th>
            <th class="rentou">人头奖</th>
          </tr>

          <tr>
            <td class="name">顾问</td>
            <td class="zhitui">
              <div>
                <p>顾问直推1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['顾问直推奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <p>美容师直推1位奖励<br>（顾问美容师合作）</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['顾问合作奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="yideng">-</td>
            <td class="erdeng">
              <div>
                <p>二级每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['顾问二级奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="shuangren">
              <div>
                <p>邀请满2位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['顾问双人奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="rentou">
              <div v-for="item in list['顾问人头奖']">
                <span>邀请</span>
                <el-input v-model="item.inviteFrom"></el-input>
                <span>-</span>
                <el-input v-model="item.inviteTo">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="item.from"></el-input>
                <span>-</span>
                <el-input v-model="item.to">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="item.bonus">
                  <template slot="append">元</template>
                </el-input>
              </div>
            </td>
          </tr>
          <tr>
            <td class="name">美容师</td>
            <td class="zhitui">
            </td>
            <td class="yideng">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['美容师一级奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="erdeng">
              <div>
                <p>二级每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['美容师二级奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="shuangren">
              <div>
                <p>邀请满2位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['美容师双人奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="rentou">
              <div v-for="item in list['美容师人头奖']">
                <span>邀请</span>
                <el-input v-model="item.inviteFrom"></el-input>
                <span>-</span>
                <el-input v-model="item.inviteTo">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="item.from"></el-input>
                <span>-</span>
                <el-input v-model="item.to">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="item.bonus">
                  <template slot="append">元</template>
                </el-input>
              </div>
            </td>
          </tr>
          <tr>
            <td class="name">会员</td>
            <td class="zhitui">-</td>
            <td class="yideng">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['会员一级奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="erdeng">
              <div>
                <p>二级每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['会员二级奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="shuangren">
              <div>
                <p>邀请满2位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="list['会员双人奖'][0].bonus">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="rentou">-</td>
          </tr>
        </table>
      </table-wrapper>
    </div>
</template>

<script>
  import TableWrapper from '@/components/TableWrapper'
  import DEFAULT_LIST from './default.js'
  // import { setBtnLoading, resetBtnLoading } '@/utils/btnLoading'
  export default {
    data() {
      return {
        list: DEFAULT_LIST,
        listLoading: true
      }
    },
    components: {
      TableWrapper
    },
    methods: {
      fetchData () {
        this.$API.showsaleruledetail()
          .then((res) => {
            this.listLoading = false
            Object.assign(this.list, res.data)
          })
          .catch(() => {
            this.listLoading = false
          })
      },
      handleSubmit () {
        this.$API.editsalerule({
          data: {
            distributionRules: JSON.stringify(this.list)
          }
        }).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        })
      }
    },
    mounted () {
      this.fetchData()
    }
  }
</script>

<style lang="scss">
  .runrules-fxset table {
    font-size: 12px;
    text-align: center;
    border-spacing: 0;

    .el-input-group__append {
      font-size: 12px;
      background: #f5f3f4;
    }

    .el-input__inner {
      height: 32px;
      line-height: 32px;
      font-size: 12px;
    }
  }

  .runrules-fxset table th {
    background: #f5f3f4;
    padding: 15px 5px;
    border: 1px solid #ddd;
    border-left: none;
    font-weight: bold;

    &:first-child {
      border-left: 1px solid #ddd;
    }
  }

  .runrules-fxset table td.name {
    padding-left: 15px;
    padding-right: 15px;
  }

  .runrules-fxset table th,
  .runrules-fxset table td {
    border: 1px solid #ddd;
    border-left: none;
    border-top: none;

    &:first-child {
      border-left: 1px solid #ddd;
    }
  }

  .runrules-fxset table th {
    border-top: 1px solid #ddd;
  }

  .runrules-fxset table td {
    padding: 30px 15px;
  }

  .runrules-fxset table th:first-child {
    width: 80px;
  }

  .runrules-fxset table .rentou > div {
    width: 100%;
    display: inline-block;
    float: left;
    margin-bottom: 15px;
  }

  .runrules-fxset table .rentou > div .el-input__inner,
  .runrules-fxset table .rentou > div .el-input {
    vertical-align: middle;
    width: 40px;
    padding: 0;
    // padding-left: 15px;
  }


  .runrules-fxset .el-input-group {
    width: 100px;
  }

  .runrules-fxset .el-input-group__append, .el-input-group__prepend {
    padding: 0 2px;
    height: 20px !important;
  }
  .rentou {
    input[type="text"] {
      padding-left: 15px !important;
    }
  }
</style>