<template>
    <div class="runrules-yyset">
      <div class="top-bar">
        <span class="add-member-buttom" @click="updateYYSet">
          <el-button plain>{{ commitBtnText }}</el-button>
          <i class="el-icon el-icon-loading" v-show="btnLoading"></i>{{ commitBtnText }}
        </span>
      </div>

      <table-wrapper title="参数设置">
        <div class="yyset-form">
          <el-form ref="form" :model="form" label-width="200px">
            <el-row class="row">
              <el-col :span="10">
                <el-form-item label="佣金管理费">
                  <el-input v-model="form.service_award_fee"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" class="desc">10表示收取用户每笔所赚佣金的10%</el-col>
            </el-row>

            <el-row class="row">
              <el-col :span="10">
                <el-form-item label="人头奖结算时间设置（每月）">
                  <el-time-picker
                    arrow-control
                    v-model="form.award_time"
                    format="HH:mm:ss"
                    :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }"
                    placeholder="--:--:--">
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="14" class="desc">23:00:00表示在每月最后一天的23时0分0秒进行结算</el-col>
            </el-row>

            <el-row class="row">
              <el-col :span="10">
                <el-form-item label="提现周期">
                  <el-input v-model="form.withdraw_time"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" class="desc">天</el-col>
            </el-row>

          </el-form>
        </div>

      </table-wrapper>
    </div>
</template>

<script>
  import TableWrapper from '@/components/TableWrapper'
  import { setBtnLoading, resetBtnLoading } from '@/utils/btnLoading'

  export default {
    data() {
      return {
        btnLoading: false,
        commitBtnText: '保存',
        form: {
          service_award_fee: '',
          award_time: new Date(0, 0, 0, 0, 0),
          withdraw_time: 7
        }
      }
    },

    created() {
      this.$API.showrunruledetail({}).then(res => {
        let arr = res.data.award_time.split(':')

        this.form.service_award_fee = res.data.service_award_fee
        this.form.withdraw_time = res.data.withdraw_time
        this.form.award_time = new Date(0, 0, 0, +arr[0], +arr[1], +arr[2])
      })
    },

    methods: {
      updateYYSet() {
        setBtnLoading.call(this, '保存中...')

        let d = new Date(this.form.award_time)
        let h = d.getHours()
        let m = d.getMinutes()
        let s = d.getSeconds()
        let award_time = `${h}:${m}:${s}`

        this.$API.editrunrule({
          data: {
            service_award_fee: this.form.service_award_fee,
            withdraw_time: this.form.withdraw_time,
            award_time: award_time
          }
        }).then(res => {
          setTimeout(() => {
            resetBtnLoading.call(this)
            this.commitBtnText = '保存'
          }, 1500)
        })
      }
    },

    components: {
      TableWrapper
    }
  }
</script>

<style lang="scss">
  .yyset-form {
    margin-top: 22px;
  }

  .yyset-form .row {
    line-height: 40px;
  }

  .yyset-form .row .desc {
    padding-left: 10px;
  }

  .yyset-form .el-input__inner {
    width: 220px !important;
  }

  .add-member-buttom {
    height: 49px;
    line-height: 50px;
    padding: 0 30px;
  }
</style>