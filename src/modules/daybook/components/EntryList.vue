<template>
  <div class="entry-list-container">
    <div class="p-2">
      <input
          type="text"
          class="form-control"
          placeholder="Buscar..."/>
    </div>
    <div class="entry-scrollablearea">
      <Entry v-for="item in 100" :key="item" />
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "EntryList",

  components: {
    Entry: defineAsyncComponent(() => import('../components/Entry.vue')),
  }
}
</script>

<style lang="scss" scoped>

input {
  height: 30px;
  font-size: 14px;
}

.entry {
  &-list-container {
    border-right: 1px solid #2C3E50;
    height: calc(100vh - 56px);
  }

  &-scrollablearea {
    height: calc(100vh - 110px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

</style>