<template>
  <el-card class="InfoCard">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
    </div>
    <div class="content" v-if="options" v-for="key in Object.keys(options)" :key="key">
      <span class="key">{{key}}</span>
      <span class="value">{{options[key]}}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    title: String,
    options: Object
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
@import '../../styles/vars.scss';
.InfoCard {
  .content {
    height: 28px;
    line-height: 28px;
  }
  .key {
    display: inline-block;
    min-width: 8em;
    color: $c4;
  }
  .value {

  }
}
</style>