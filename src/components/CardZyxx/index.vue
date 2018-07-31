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
            <UploadBox v-model="formData.photo" :showButton="true" tips="" v-show="!disableUploadImg"></UploadBox>
            <div class="img" v-if="employeeDetail.photo"><img :src="employeeDetail.photo" alt="" v-show="disableUploadImg"></div>
            <div class="img" v-else><img src="../../assets/images/qq-18.png" alt="" v-show="disableUploadImg"></div>

            <!-- <el-button type="primary" v-show="!isVip">更换头像</el-button> -->
          </div>
        </el-col>
        <el-col :span="19">
          <div class="meta">
            <p class="name">
              {{ employeeDetail.realityName || employeeDetail.nickName }}

              <span v-if="userCard.isActive">
                <span class="state">已激活</span>
                <span class="validtime">有效期至{{ userCard.expireTime }}</span>
              </span>
            </p>
            <p><i class="qq qq-19"></i>{{ employeeDetail.sno || employeeDetail.mobile }}</p>
            <p><i class="qq qq-20"></i>{{ employeeDetail.entryDate || employeeDetail.time }}</p>
            <p><i class="qq qq-21" v-show="employeeDetail.remark"></i>{{ employeeDetail.remark }}</p>
            <div>
              <el-button type="success" plain v-show="!hideMobile">{{ employeeDetail.mobile }}</el-button>
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
      defaultPhoto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAABrCAYAAABwv3wMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MTE3NDRkMS0wMzVmLTQzNDEtYTZiMS1iM2M5YmU4NDYxYzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjdDNUM1QUM3RjJGMTFFOEJDRENGMDgzNDJCMUVDMDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjdDNUM1QUI3RjJGMTFFOEJDRENGMDgzNDJCMUVDMDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjEwZjg1Y2MtMWIwOC1jYjRlLWFjOGYtN2I4NDI0ZjUyODdkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYxMTc0NGQxLTAzNWYtNDM0MS1hNmIxLWIzYzliZTg0NjFjNyIv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',
      employeeDetail: Object,
      isCustom: {
        Type: Boolean,
        default: false
      },
      disableUploadImg: {
        Type: Boolean,
        default: false
      },
      userCard: {
        type: Object,
        default: false
      },
      hideEdit: {
        type: Boolean,
        default: false
      },
      hideMobile: {
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

  .detail-card__body--user .UploadBox .custom-icon {
    margin-top: 20px;
  }
</style>