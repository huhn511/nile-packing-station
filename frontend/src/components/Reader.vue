<template>
  <div class="reader">
    <h1>Reader</h1>
    <p>root: {{root}}</p>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Reader',
  data() {
    return {
      root: ''
    }
  },
  mounted() {
    this.readData();
  },
  methods: {
    readData: function(root) {
      var self = this;
      axios.get('http://192.168.178.135:4000/read')
      .then(function (response) {
        // handle success
        console.log(response);
        let data_string = response.data
        self.root = data_string.substr(data_string.length - 82)
        console.log("root", self.root)
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
