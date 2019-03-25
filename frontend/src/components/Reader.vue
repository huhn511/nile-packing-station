<template>
  <div class="reader">
    <h1>Reader</h1>
    <p>root: {{root}}</p>
    <pre>{{messages}}</pre>
  </div>
</template>

<script>
const axios = require('axios');
import { fetch } from '@/utils/MAM';

export default {
  name: 'Reader',
  data() {
    return {
      root: '',
      loading: false,
      messages: []
    }
  },
  mounted() {
    this.readCard();
  },
  methods: {
    readCard: function(root) {
      var self = this;
      axios.get('http://192.168.178.135:4000/read')
      .then(function (response) {
        // handle success
        console.log(response);
        self.root = response.data
        console.log("root", self.root)
        self.loadData(self.root)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    },
    loadData: async function(root) {
          console.log("input root", root)
          console.log("input root", root.length)
          console.log("input root", root[0])
          console.log("input root", root[root.length-1])
          console.log("input root", root[root.length-2])
          this.loading = true
          if(root) {
              this.root = root
              
              await fetch(this.root, 'restriced', 'TEST', this.appendToMessages, this.fetchComplete);
          } else {
              console.log("no root defined, show search and latest views.")
              this.loading = false
          }
          
      },
      appendToMessages(message){
          this.messages.push(message)
      },
      fetchComplete() {
          this.loading = false
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
