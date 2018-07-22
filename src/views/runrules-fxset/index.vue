<template>
    <div class="runrules-fxset">
      <div class="top-bar">
        <span class="add-member-buttom" @click="updateYYSet">
          <i class="el-icon el-icon-loading" v-show="btnLoading"></i>{{ commitBtnText }}
        </span>
      </div>

      <table-wrapper title="分销规则设置">
        <table>
          <tr>
            <th class="name">名称</th>
            <th class="zhitui">直推奖</th>
            <th class="yideng">一级奖</th>
            <th class="erdeng">二级奖</th>
            <th class="shuangren">双人奖</th>
            <th class="rentou">人头奖</th>
          </tr>

          <tr>
            <td class="name">顾客</td>
            <td class="zhitui">
              <div>
                <p>顾问直推1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="yideng">-</td>
            <td class="erdeng">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="shuangren">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="rentou" width="100%">
              <div>
                <span>邀请</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="input4">
                  <template slot="append">元</template>
                </el-input>
              </div>

              <div>
                <span>邀请</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="input4">
                  <template slot="append">元</template>
                </el-input>
              </div>

              <div>
                <span>邀请</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="input4">
                  <template slot="append">元</template>
                </el-input>
              </div>

              <div>
                <span>邀请</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="input4">
                  <template slot="append">元</template>
                </el-input>
              </div>
            </td>
          </tr>
          <tr>
            <td class="name">美容师</td>
            <td class="zhitui">
              <div>
                <p>美容师直推1位奖励(顾问美容师合作)</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="yideng">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="erdeng">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="shuangren">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="rentou" width="100%">
              <div>
                <span>邀请</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="input4">
                  <template slot="append">元</template>
                </el-input>
              </div>

              <div>
                <span>邀请</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="input4">
                  <template slot="append">元</template>
                </el-input>
              </div>

              <div>
                <span>邀请</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="input4">
                  <template slot="append">元</template>
                </el-input>
              </div>

              <div>
                <span>邀请</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>从</span>
                <el-input v-model="input"></el-input>
                <span>-</span>
                <el-input v-model="input4">
                  <template slot="append">位</template>
                </el-input>
                <span>每邀请1位所得奖励</span>
                <el-input v-model="input4">
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
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="erdeng">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </td>
            <td class="shuangren">
              <div>
                <p>每邀请1位奖励</p>
                <div style="margin-top: 15px;">
                  <el-input v-model="input4">
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
  // import { setBtnLoading, resetBtnLoading } '@/utils/btnLoading'
  export default {
    data() {
      return {
        msg: 'Lorem',
        commitBtnText: '保存',
        lists: [
          {
            inviterRealName: '111',
            inviterMobile: '222'
          }
        ]
      }
    },

    components: {
      TableWrapper
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
  }


  .runrules-fxset .el-input-group {
    width: 100px;
  }

  .runrules-fxset .el-input-group__append, .el-input-group__prepend {
    padding: 0 2px;
    height: 20px !important;
  }
</style>