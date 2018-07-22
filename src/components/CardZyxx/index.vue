<template>
  <!-- 职业信息 -->
  <el-card class="box-card detail-card detail-card--user">
    <div slot="header" class="clearfix">
      <span><slot>职业信息</slot></span>
      <el-button style="float: right; padding: 3px 0" type="text" v-show="!hideEdit">
        <div class="icon" @click="triggerUpdateInfoForm"></div>
      </el-button>
    </div>

    <div class="detail-card--body detail-card__body--user">
      <el-row>
        <el-col :span="5">
          <div class="th">
            <UploadBox v-model="formData.photo" :showButton="true" tips=""></UploadBox>
<!--             <div class="img"><img src="../../assets/images/qq-18.png" alt=""></div>
            <el-button type="primary" v-show="!isVip">更换头像</el-button> -->
          </div>
        </el-col>
        <el-col :span="19">
          <div class="meta">
            <p class="name">
              {{ employeeDetail.realityName || employeeDetail.nickName }}

              <span v-if="employeeDetail.isActive">
                <span class="state">已激活</span>
                <span class="validtime">有效期至{{ employeeDetail.expireTime }}</span>
              </span>
            </p>
            <p><i class="qq qq-19"></i>{{ employeeDetail.sno || employeeDetail.mobile }}</p>
            <p><i class="qq qq-20"></i>{{ employeeDetail.entryDate || employeeDetail.time }}</p>
            <p><i class="qq qq-21" v-show="employeeDetail.remark"></i>{{ employeeDetail.remark }}</p>
            <div>
              <el-button type="success" plain v-show="employeeDetail.storeId">{{ employeeDetail.storeId }}</el-button>
              <el-button type="success" plain v-show="employeeDetail.storeName">{{ employeeDetail.storeName }}</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import UploadBox from '@/components/UploadBox'
  export default {
    props: {
      employeeDetail: Object,
      isCustom: {
        Type: Boolean,
        default: false
      },
      isVip: {
        Type: Boolean,
        default: false
      },
      hideEdit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        formData: {
          photo: ''
        }
      }
    },
    methods: {
      triggerUpdateInfoForm() {
        this.$emit('updateUserInfo', {})
      }
    },

    components: {
      UploadBox
    }
  }
</script>

<style lang="scss">
  .detail-card__body--user {
    .meta .name .state {
      margin-left: 20px;
      font-size: 12px;
      color: #fff;
      background: #34c4d4;
      padding: 3px 8px;
      border-radius: 4px;
    }

    .meta .name .validtime {
      color: #676a6c;
      font-size: 12px;
      font-weight: normal;
    }
  }

  .detail-card__body--user {

    .UploadBox {
      height: 200px;
      /*border: 1px solid red;*/
    }

    .UploadBox .upload-img .el-upload-list, .UploadBox .upload-img .el-upload {
      margin-top: -15px;
    }

    .UploadBox .custom-icon {
      margin-top: 10px;
    }

    .UploadBox .upload-img .el-button {
      top: 140px;
    }
  }

  .detail-card--user {
    padding-bottom: 0
  }

  .detail-card--user .el-card__body {
    padding-bottom: 0;
  }

  .detail-card__body--user .UploadBox .custom-icon {
    margin-top: 20px;
  }
</style>