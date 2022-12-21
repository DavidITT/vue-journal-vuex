<template>
  <div class="entry-list-container">
    <div class="p-2">
      <input
          type="text"
          class="form-control"
          placeholder="Buscar..."
          v-model="term"/>
    </div>
    <div class="entry-scrollablearea">
      <div class="mt-2 d-flex flex-column p-2">
        <button class="btn btn-outline-primary"
                @click="$router.push({name: 'entry', params: {id:'new'}})">
          <i class="fa fa-plus-circle"></i>
          Nueva entrada
        </button>
      </div>
      <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry"/>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import {mapGetters} from 'vuex'

export default {
  name: "EntryList",

  components: {
    Entry: defineAsyncComponent(() => import('../components/Entry.vue')),
  },

  data() {
    return {
      term: ''
    }
  },

  computed: {
    ...mapGetters('journal', ['getEntriesByTerm']),

    entriesByTerm() {
      return this.getEntriesByTerm(this.term)
    }
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