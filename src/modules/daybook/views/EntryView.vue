<template>
  <div class="entry-title d-flex justify-content-between align-items-center p-2">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="mx-1 fs-3">Julio</span>
      <span class="mx-2 fs-4 fw-light">2021, Jueves</span>
    </div>
    <div>
      <button class="btn btn-danger mx-2">
        <i class="fas fa-trash"></i>
      </button>
      <button class="btn btn-primary">
        <i class="fas fa-upload"></i>
      </button>
    </div>
  </div>
  <hr class="mt-0 mb-4">
  <div class="d-flex flex-column px-3 h-75">
    <textarea name="" id="" cols="30" rows="10" placeholder="¿Que sucedio hoy?"></textarea>
  </div>

  <Fab :icon="'fa-save'" />

  <img src="https://astelus.com/wp-content/viajes/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg"
       class="img-thumbnail"
       alt="entry-picture">

</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "EntryView",
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab'))
  }
}
</script>

<style lang="scss" scoped>

textarea{
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
      outline: none;
   }
}

img{
  width: 200px;
  height: auto;
  position: fixed;
  bottom: 150px;
  right: 150px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>