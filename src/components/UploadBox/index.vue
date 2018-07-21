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
      <i class="custom-icon" v-if="innerValue === ''"></i>
      <div slot="tip" class="el-upload__tip" v-if="tips">{{tips}}</div>
      <div slot="tip" class="el-upload__tip upload-error-tip" v-if="error">{{error}}</div>
      <el-button size="small" type="primary" v-if="showButton">点击上传</el-button>
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
    },
    showButton: Boolean
  },
  data () {
    return {
      innerValue: this.value,
      uploadAction: getFullPath('upload'),
      error: null
    }
  },
  watch: {
    innerValue (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleBeforeUpload (img) {
      if (['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].indexOf(img.type) === -1) {
        this.error = '只可以上传JPG、GIF或PNG格式的文件'
        this.$emit('error', new Error(this.error))
        return false
      }
      if (img.size > 2 * 1024 * 1024) {
        this.error = '文件大小不能超过2M'
        this.$emit('error', new Error(this.error))
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
          this.error = data.msg || '请勿重复提交！'
          this.$emit('error', new Error(this.error))

          return
        }

        // 其它小于 < 0 的错误码
        this.error = data.msg || '服务异常，请稍后再试！'
        this.$emit('error', new Error(this.error))
        return
      }

      // 请求成功
      this.error = null
      this.innerValue = data.data.name
      // 以便保证父组件监听success时间时组件值已更新
      setTimeout(() => {
        this.$emit('success', data)
      }, 0)
    }
  },
  mounted () {
    this.$on('error', () => {
      this.innerValue = ''
    })
  }

}
</script>

<style lang="scss">
@import '../../styles/vars.scss';
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
    .el-upload-list {
      li {
        margin: 0 auto;
        margin-top: 20px;
        width: 107px;
        height: 107px;
        border-radius: 50%;
      }
    }
    .el-button {
      position: absolute;
      top: 134px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .upload-error-tip {
    color: $c1;
  }
}
</style>