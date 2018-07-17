<template>
  <div class="edit-modal edit-modal--choose">
    <el-dialog :title="title" :visible.sync="showModal">
      <div class="wrap">
        <el-button type="primary" @click="selectType(4)">指定顾问</el-button>
        <el-button type="primary" @click="selectType(3)">指定美容师</el-button>
        <el-button type="primary" @click="selectType(2)">指定会员</el-button>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="activeModal">取 消</el-button>
        <el-button type="primary" @click="activeModal">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '更改邀请关系'
      },

      showModal: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      activeModal() {
        return this.showModal
      },

      selectType(type) {
        alert(type)
        this.$emit('activeDialogForm', { storeType: type })
      }
    }
  }
</script>