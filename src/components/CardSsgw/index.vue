<template>
  <el-card class="box-card detail-card detail-card--counselor">
    <div slot="header" class="clearfix">
      <span><slot>所属顾问</slot></span>
    </div>
    <div class="detail-card__body detail-card__body--counselor">

      <el-row class="setting" v-if="type === 3">
        <div @click="triggerParentRebind"><i class="qq qq-38"></i>绑定邀请关系</div>
      </el-row>

      <el-row v-else>
        <el-col :span="5">
          <div class="th">
            <div class="img"><img src="../../assets/images/qq-18.png" alt=""></div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="meta">
            <p class="name">{{ inviterinfo.nickName || inviterinfo.realityName }}</p>
            <p><i class="qq qq-23"></i>{{ inviterinfo.mobile }}</p>
            <div>
              <el-button type="success" plain>{{ inviterinfo.roleTypeStr }}</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="detail-card__footer clearfix" v-show="type !== 3">
      <!-- <div class="inter" v-if="type === 1"><i class="qq qq-34"></i>更改邀请</div> -->
      <div class="inter" v-if="inviterinfo.isChange" @click="triggerParentEvent"><i class="qq qq-34"></i>更改邀请</div>
      <div class="exlink" @click="goDetailPage"><i class="qq qq-31"></i>详情</div>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      inviterinfo: {
        type: Object,
        default: () => {
          return {
            nickName: '',
            realityName: '',
            mobile: '',
            roleTypeStr: ''
          }
        }
      },

      // type 1 - 直接邀请人， 2 - 间接邀请人, 3 - 绑定邀请人关系
      type: {
        type: Number,
        default: 2
      }
    },

    data() {
      return {
        path: ''
      }
    },

    methods: {
      goDetailPage() {
        if (this.inviterinfo.roleTypeStr == '会员') { // role = 2
          this.path = '/client/member/detail?role=2&id=' + this.inviterinfo.userId + '&cardId=' + this.inviterinfo.cardId
        }

        //if (this.inviterinfo.roleTypeStr == '顾问' || this.inviterinfo.roleTypeStr == '美容师') { // role = 2
        //  this.path = '/employee/consultant/detail?role=2&id=' + this.inviterinfo.userId
        //}

        if (this.inviterinfo.roleTypeStr == '顾问') {
            this.path = '/employee/consultant/detail?role=2&id=' + this.inviterinfo.userId
        }

        if (this.inviterinfo.roleTypeStr == '美容师') {
            this.path = '/employee/beautician/detail?role=2&id=' + this.inviterinfo.userId
        }

        this.$router.replace({
          path: this.path,
          query: {
            id: this.inviterinfo.id || this.inviterinfo.userId || '',
            role: 2
          }
        })

       // setTimeout(() => {
        //  location.reload()
       // }, 0)

      },

      triggerParentEvent() {
        this.$emit('activeReBind', { title: '更改邀请', type: this.type })
      },

      triggerParentRebind() {
        this.$emit('activeReBind', { title: '绑定邀请关系', type: this.type })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-card--counselor {
    padding-bottom: 0;
  }

  .detail-card__footer {
    padding-top: 10px;

    > div {
      display: inline-block;
      cursor: pointer;
    }

    > div.exlink {
      float: right;
    }
  }

  .setting {
    text-align: center;
    font-weight: bold;
    padding: 34px 0 40px 0;
    border: 1px solid #e3e3e3;
    font-size: 16px;
    color: #34c4d4;

    > div:hover {
      cursor: pointer;
    }
  }
</style>