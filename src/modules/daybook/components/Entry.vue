<template>
  <div class="entry-container mb-3 pointer p-2" @click="$router.push({name: 'entry', params: {id: 2}})">
    <div class="entry-title">
      <span class="text-success fs-5 fw-bold">15 </span>
      <span class="mx-1 fs-5">Julio </span>
      <span class="mx-2 fw-light">2021, Jueves</span>
    </div>
    <div class="entry-description">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, enim error eveniet id iste laboriosam magni
      maxime nihil nobis numquam officia, provident quo quod similique unde vel veniam veritatis voluptates?
    </div>
  </div>
</template>

<script>
export default {
  name: "Entry"
}
</script>

<style lang="scss" scoped>

.entry {
  &-container {
    border-bottom: 1px solid #2C3E50;
    transition: 0.2s all ease-in;

    &:hover {
      background-color: lighten($color: gray, $amount: 45);
      transition: 0.2s all ease-in;
    }
  }

  &-description {
    font-size: 12px;
  }
}

</style>