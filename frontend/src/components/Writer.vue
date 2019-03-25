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
    <pre>Error: {{error}}</pre>
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
      },
      error: ''
    }
  },
  methods: {
    onSubmit() {
      console.log("write root: ", this.form.root)
      this.writeData(this.form.root)
    },
    writeData: function(root) {
      var self=this;
      axios.get('http://192.168.178.135:4000/write?root=' + this.form.root)
      .then(function (response) {
        // handle success
        console.log(response);
        let data_string = response.data
        if(data_string == "no root given") {
          self.error = "no root given"
        } else {

        }
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
