<template>
  <div class="page-404">
    <div class="wscn-http404">
        <div>
          <img class="pic-404__parent" :src="img_404" alt="404">
        </div>
        <div class="link-container">
          <a href="" class="bullshit__return-home">返回首页</a>
        </div>
    </div>
  </div>
</template>

<script>
import img_404 from '@/assets/images/404.jpg'

export default {
  data() {
    return {
      img_404
    }
  },
  computed: {
    message() {
      return '你没有权限进入这个页面......'
    }
  }
}
</script>

<style lang="scss" >
@import '../styles/vars.scss';
.page-404 {
  background-color: white;
  height: 100%;
  text-align: center;
  .wscn-http404 {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    padding: 0 100px;
    overflow: hidden;
  }
  .link-container {
    color: $c0;
    margin-top: 1em;
    font-size: 24px;
    font-weight: bold;
    text-decoration: underline;
  }
}
</style>
