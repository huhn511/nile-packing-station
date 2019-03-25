<template>
  <div class="writer">
    <h1>Writer</h1>
    <el-form :inline="true" :model="form" class="form">
      <el-form-item label="Root">
        <el-input v-model="form.root" placeholder="ABC9...."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Write</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Writer',
  data() {
    return {
      form: {
        root: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log("write root: ", this.form.root)
      this.writeData(this.form.root)
    },
    writeData: function(root) {
      var self=this;
      axios.get('http://localhost:4000/write')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
