<template>
  <button class="btn btn-primary">
    <i class="fas fa-2x" :class="icon"></i>
  </button>
</template>

<script>
export default {
  name: "Fab",

  props:{
    icon:{
      type:String,
      require:true,
      default:'fa-plus'
    }
  }
}
</script>

<style lang="scss" scoped>
button{
  border-radius: 100%;
  position: fixed;
  right: 15px;
  bottom: 15px;
  height: 50px;
  width: 50px;
  padding: 0px;
}
</style>