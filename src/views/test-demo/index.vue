<template>
  <div class="index">
    <inputDemo v-model="name"></inputDemo>

    <div>name: {{ name }}</div>
    <input type="text" :name="name2" @input="input" class="border">
  </div>
</template>

<script>
import inputDemo from './input-demo.vue'
export default {
  components: {
    inputDemo
  },
  data() {
    return {
      name: '',
      name2: ''
    }
  },
  methods: {
    input(e) {
      const { value } = e.target
      this.name2 = value

      this.name = value
    }
  }
}
</script>

<style scoped lang="scss"></style>
