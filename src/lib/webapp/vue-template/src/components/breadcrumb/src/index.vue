<template>
  <ul class="breadcrumb clearfix">
    <i class="fa fa-map-marker m-r-5"></i>
    <li v-for="route in matchedRoutes" :class="{ 'active': $index === matchedRoutes.length - 1 }" v-bind:key="route">
      <span v-if="$index === matchedRoutes.length - 1">{{ route.handler.title }}</span>
      <a v-else v-link="route.handler.fullPath">{{ route.handler.title }}</a>
    </li>
    <button @click="refresh" class="btn btn-default btn-xs pull-right">
      <i class="fa fa-refresh m-r-5"></i>
      强制刷新
    </button>
    <button @click="back" class="btn btn-default btn-xs pull-right">
      <i class="fa fa-reply m-r-5"></i>
      返回
    </button>
  </ul>
</template>
<script>
import { change, asyncChange, promiseChange } from "./events";
import trimQs from "@/utils/trimQs";

export default {
  computed: {
    matchedRoutes() {
      return this.$route.matched.slice();
    }
  },
  methods: {
    refresh() {
      let curPath = trimQs(this.$route.path);
      this.$router.go(`/redirect?dest=${curPath}`);
    },
    back() {
      history.back();
    },
    change() {
      change.call(this);
    },
    asyncChange() {
      asyncChange.call(this);
    },
    promiseChange() {
      promiseChange.call(this);
    }
  }
};
</script>

