<template>
  <div class="DatePicker">
    <span class="title">{{title}}</span>
    <el-date-picker value-format="yyyy-MM-dd" v-model="innerValue.start" @change="handleChange" :type="type" placeholder="选择开始日期" ></el-date-picker>
    <span class="link-date">至</span>
    <el-date-picker value-format="yyyy-MM-dd" v-model="innerValue.end" @change="handleChange" :type="type" placeholder="选择结束日期"></el-date-picker>
  </div>
</template>

<script>
// 组件value为 {start, end}的对象格式
export default {
  props: {
    value: Object,
    title: String,
    name: String,
    type: {
      type: String,
      default: 'date'
    }
  },
  data () {
    let defaultValue = { start: null, end: null }
    return {
      innerValue: this.value || defaultValue
    }
  },
  watch: {
    innerValue: {
      handler: function (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.DatePicker {
  display: flex;
  line-height: 40px;
  font-size: 14px;
  .title {
    padding-right: 1.5em;
  }
  .link-date {
    display: inline-block;
    padding: 0 .5em;
  }
}
</style>