<template>
  <div class="pageIndex">
    <ul>
      <li v-for="(item) in list" :key="key">
        <!-- <h2>{{key}}</h2> -->
        <nav>
          <router-link :to="item.path" class="block-link">
            {{item.meta && item.meta.title || item.path}}
          </router-link>
        </nav>
      </li>
    </ul>
  </div>
</template>
<script>
  import { constantRouterMap } from '@/router/index'
  export default {
    data() {
      return {
        list: constantRouterMap
      }
    }
  }
</script>
<style lang="scss">
  body {
    background-color: #efeff4;
  }
  .pageIndex {
    li {
      h2 {
        padding: 0 16px;
      }
      h2, nav {
        height: 44px;
        line-height: 44px;
      }
      nav {
        position: relative;
        padding-left: 16px;
        background-color: white;
        margin-bottom: 1px;
        &::after {
          content: '';
          position: absolute;
          right: 16px;
          top: 50%;
          width: 10px;
          height: 10px;
          border: 1px solid #ddd;
          border-width: 1px 1px 0 0;
          transform: rotate(45deg) translateY(-50%);
        }
      }
      .block-link {
        display: block;
      }
    }
  }
</style>
