<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between align-items-center p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>
      <div>
        <input type="file"
               v-show="false"
               @change="onSelectedImage"
               ref="imageSelector"
               accept="image/png, image/jpeg, image/jpg">

        <button class="btn btn-danger mx-2"
                v-if="entry.id"
                @click="onDeleteEntry">
          <i class="fas fa-trash"></i>
        </button>

        <button class="btn btn-primary"
                @click="onSelectImage">
          <i class="fas fa-upload"></i>
        </button>
      </div>
    </div>
    <hr class="mt-0 mb-4">
    <div class="d-flex flex-column px-3 h-75">
      <textarea name="" id="" cols="30" rows="10" placeholder="¿Que sucedio hoy?" v-model="entry.text"></textarea>
    </div>
  </template>

  <img v-if="entry && !localImage"
       :src="entry.picture"
       class="img-thumbnail"
       alt="entry-picture">

  <img v-if="localImage"
       :src="localImage"
       class="img-thumbnail"
       alt="entry-picture">

  <Fab :icon="'fa-save'"
       @on:click="saveEntry"/>

</template>

<script>
import {defineAsyncComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import getDayMonthYear from '../helpers/getDayMonthYear'
import Swal from 'sweetalert2'
import uploadImage from '../helpers/uploadImage'

export default {
  name: "EntryView",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab')),
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null
    }
  },
  computed: {
    ...mapGetters('journal', ['getEntriesById']),

    day() {
      const {day} = getDayMonthYear(this.entry.date)
      return day
    },
    month() {
      const {month} = getDayMonthYear(this.entry.date)
      return month
    },
    yearDay() {
      const {yearDay} = getDayMonthYear(this.entry.date)
      return yearDay
    }
  },
  methods: {
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),

    loadEntry() {
      let entry
      if (this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
        entry = this.getEntriesById(this.id)
        if (!entry) return this.$router.push({name: 'no-entry'})
      }
      this.entry = entry
    },
    async saveEntry() {
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()

      const picture = await uploadImage(this.file)
      if (picture) {
        this.entry.picture = picture;
      }

      if (this.entry.id) {
        await this.updateEntry(this.entry)
        Swal.fire('Actualizado', 'Entrada actualizada con exito', 'success')
      } else {
        const id = await this.createEntry(this.entry)
        if (id !== null) this.$router.push({name: 'entry', params: {id}})
        Swal.fire('Guardado', 'Entrada registrada con exito', 'success')
      }
      this.file = null
      this.localImage = null
    },
    async onDeleteEntry() {
      const {isConfirmed} = await Swal.fire({
        title: '¿Eliminar registro?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Si estoy seguro',
        text: 'Esta accion no se puede revertir'
      })
      if (isConfirmed) {
        Swal.fire({
          title: 'Espere por favor',
          allowOutsideClick: false
        })
        Swal.showLoading()
        await this.deleteEntry(this.entry.id)
        this.$router.push({name: 'no-entry'})
        Swal.fire('Eliminado', '', 'success')
      }

    },
    onSelectedImage(event) {
      const file = event.target.files[0]
      if (!file) {
        this.localImage = null
        this.file = null
        return
      }

      this.file = file
      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)
    },
    onSelectImage() {
      this.$refs.imageSelector.click()
    }
  },
  created() {
    this.loadEntry()
  },

  watch: {
    id() {
      this.loadEntry()
    }
  }
}
</script>

<style lang="scss" scoped>

textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  height: auto;
  position: fixed;
  bottom: 150px;
  right: 150px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>