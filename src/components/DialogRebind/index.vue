<template>
  <div class="edit-modal edit-modal--choose">
    <el-dialog :title="title" :visible.sync="showModal">
      <div class="wrap">
        <el-button type="primary" @click="selectGW">指定顾问</el-button>
        <!-- <el-button type="primary" @click="selectMYS">指定美容师</el-button> -->
        <!-- <el-button type="primary" @click="selectVIP">指定会员</el-button> -->
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

    computed: {
      activeModal() {
        return this.showModal
      }
    },

    methods: {
      activeModal() {
        return this.showModal
      },

      changeGW() {
        this.$emit('changeGW', { showModal: true })
      }
    }
  }
</script>