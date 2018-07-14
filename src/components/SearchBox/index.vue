<template>
  <div class="SearchBox">
    <el-select class="search-item" v-model="innerValue.type" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input class="search-item" placeholder="请输入内容" v-model="innerValue.text">
      <el-button slot="append" @click="handleClick">搜索</el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  props: {
    options: Array,
    value: Object
  },
  watch: {
    innerValue: {
      handler: function (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  data () {
    let defaultValue = {type: 0, text: ''}
    return {
      innerValue: this.value || defaultValue
    }
  },
  methods: {
    handleClick () {
      this.$emit('change')
    }
  }
}
</script>
<style lang="scss">
@import '../../styles/vars.scss';
.SearchBox {
  display: flex;
  justify-content: flex-end;
  .search-item {
    max-width: 218px;
    margin-left: .5em;
    .el-input-group__append {
      background-color: $c0 !important;
      border-color: $c0 !important;
      color: white;
    }
  }
}
</style>