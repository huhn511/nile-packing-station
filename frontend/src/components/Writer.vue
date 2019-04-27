<template>
  <div class="writer">
    <h1>Writer</h1>
    <el-form v-loading="loading" :inline="true" :model="form" class="form">
      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item label="Root">
            <el-input v-model="form.root" placeholder="ABC9...." style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Write</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      
      
    </el-form>
    <pre v-if="error">Error: {{error}}</pre>
  </div>
</template>

<script>
const axios = require('axios');
import { packing_station_url } from '../config.json';

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
  mounted() {
    // Send a PUT request to HUE bridge
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
      axios.get(packing_station_url + '/write?root=' + this.form.root)
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
<style>
  .el-form-item {
    width: 100%;
  }
  .el-form-item__content {
    width: 100% !important;
  }
</style>
