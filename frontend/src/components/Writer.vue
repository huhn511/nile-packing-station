<template>
  <div class="writer">
    <h1>Writer</h1>
    <el-form v-loading="loading" :inline="true" :model="form" class="form">
      <el-form-item label="Root">
        <el-input v-model="form.root" placeholder="ABC9...."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Write</el-button>
      </el-form-item>
    </el-form>
    <pre v-if="error">Error: {{error}}</pre>
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
      loading: false,
      error: ''
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      console.log("write root: ", this.form.root)
      this.writeData(this.form.root)
    },
    showMsg(type, message) {
      this.$message({
        message: message,
        type: type
      });
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
          self.showMsg('error', 'no root given.');
        } else {
          self.error = ""
          self.form.root = ""
          self.showMsg('success', 'Root was successfully written on card!');
        }
        self.loading = false
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
