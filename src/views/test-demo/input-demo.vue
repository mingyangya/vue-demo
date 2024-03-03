<template>
  <el-form ref="refForm" :model="form" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="form.name" @input="input" @change="change"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="ok">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: this.value
      },
    }
  },
  props: {
    value: String
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  watch: {
    value(newV) {
      console.log(newV, 'watch')

      const v = newV

      this.$set(this.form, 'name', v)
    },
  },
  created() {
    this.name = this.value
  },
  methods: {
    input(value) {
      // const {value} = e.target
      console.log(value, 'inner input')

      this.$emit('input', value)
    },

    change(value) {
      console.log('inner change', value)
      this.$emit('input', value)
    },

    ok() {
      console.log(this.form)
      console.table(JSON.parse(JSON.stringify(this.form)))
    }
  }
}
</script>

<style scoped lang="scss"></style>
