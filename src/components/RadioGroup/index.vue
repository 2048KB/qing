<template>
  <div class="RadioGroup">
    <span class="title">{{title}}</span>
    <el-radio-group v-model="innerValue" @change="handleChange">
      <el-radio class="radio-label" label="0">全部</el-radio>
      <el-radio class="radio-label" v-for="item in options" :key="item.key" :label="item.key">{{item.value}}
      </el-radio>
    </el-radio-group>
  </div>
</template>
<script>
  export default {
    props: {
      value: String,
      title: String,
      options: Array
    },
    data () {
      return {
        innerValue: this.value
      }
    },
    watch: {
      innerValue (val) {
        this.$emit('input', val)
      }
    },
    methods: {
      handleChange (val) {
        this.innerValue = val
        this.$emit('change', val)
      }
    }
  }
</script>

<style lang="scss">
@import '../../styles/vars.scss';
.RadioGroup {
  .title {
    font-size: 14px;
    padding-right: .5em;
  }
  .radio-label {
    .el-radio__input {
      width: 0;
      visibility: hidden !important;
    }
    &.is-checked .el-radio__label {
      color: $c0;
    }
  }
}
</style>