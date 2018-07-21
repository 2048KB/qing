<template>
  <div class="UploadBox">
    <el-upload
      ref="upload"
      class="upload-img"
      :action="uploadAction"
      :multiple="false"
      name="img"
      :show-file-list="true"
      :onSuccess="handleSuccess"
      :onChange="handleFileChange"
      :beforeUpload="handleBeforeUpload"
      list-type="picture-card">
      <i class="custom-icon" v-if="value === ''"></i>
      <div slot="tip" class="el-upload__tip" v-if="tips">{{tips}}</div>
    </el-upload>
  </div>
</template>

<script>
import {getFullPath} from '../../api'

export default {
  props: {
    value: String,
    tips: {
      type: String,
      default: '你可以上传JPG、GIF或PNG格式的文件，大小不能超过2M'
    }
  },
  data () {
    return {
      innerValue: this.value,
      uploadAction: getFullPath('upload')
    }
  },
  watch: {
    innerValue (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleBeforeUpload (img) {
      // if (img.size > 2 * 1024) {
      if (img.size > 2 * 1024 * 1024) {
        this.$emit('error', new Error('文件大小不能超过2M'))
        return false
      }
      if (['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].indexOf(img.type) === -1) {
        this.$emit('error', new Error('只可以上传JPG、GIF或PNG格式的文件'))
        return false
      }
      return true
    },
    handleFileChange () {
      let uploadFiles = this.$refs.upload.uploadFiles
      this.$refs.upload.uploadFiles = [uploadFiles[uploadFiles.length - 1]] 
    },
    handleSuccess (data) {
      if (data.code < 0) {
        // 没有登录
        if (data.code == -9999) {
          this.$message({
            message: data.msg || '请先登录！',
            type: 'error'
          })
          this.$router.push({
            path: '/login'
          })
          return
        }

        // 请勿重复提交
        if (data.code == -9997) {
          this.$emit('error', new Error(data.msg || '请勿重复提交！'))

          return
        }

        // 其它小于 < 0 的错误码
        this.$emit('error', new Error(data.msg || '服务异常，请稍后再试！'))
        return
      }

      // 请求成功
      this.innerValue = data.data.name
      // 以便保证父组件监听success时间时组件值已更新
      setTimeout(() => {
        this.$emit('success', data)
      }, 0)
    }
  },
  mounted () {
  }

}
</script>

<style lang="scss">
.UploadBox {
  text-align: center;
  .custom-icon {
    margin: 25px auto;
    display: block;
    width: 98px;
    height: 98px;
    background-size: cover;
    background-image: url(./images/qq-16.png);
  }
  .upload-img {
    display: inline-block;
    position: relative;
    padding-top: 148px;
    .el-upload-list, .el-upload {
      position: absolute;
      width: 148px;
      height: 148px;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
    .el-upload  {
      border-width: 0;
      background-color: transparent;
    }
  }
}
</style>