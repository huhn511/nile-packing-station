<template>
  <div class="reader" v-loading="loading || waitForCard">
    <h1>Reader</h1>
    <h3>{{root}}</h3>
    <h2>Ordered Products</h2>
    <el-row :gutter="12">
      <el-col :span="8" v-for="(product, index) in products" v-bind:key="product.id">
        <el-card shadow="hover">
          <h5>Product #{{index + 1}}</h5>
          {{product.item.data.title}}, quantity: {{product.quantity}}
        </el-card>
      </el-col>
    </el-row>
    <h2>Order History</h2>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(message, index) in sortedMessages"
          :key="index"
          :icon="''"
          :type="'primary'"
          :color="'#0bbd87'"
          :size="'large'"
          :timestamp="message.timestamp | formatTimestampToDate"
        >{{message.status}} by {{message.data.name}}</el-timeline-item>
      </el-timeline>
      <pre v-if="error">Error: {{error}}</pre>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { fetch } from "@/utils/MAM";

export default {
  name: "Reader",
  data() {
    return {
      root: "",
      loading: false,
      waitForCard: true,
      messages: [],
      products: [],
      error: ""
    };
  },
  mounted() {
    // Send a PUT request to HUE bridge
    console.log("blue");
    axios({
      method: "put",
      url:
        "http://192.168.178.41/api/SmDBRI79hLYzldlX4aEUB8sTAScZJhULAot8hzIL/lights/1/state",
      data: {
        on: true,
        bri: 254,
        xy: [0.15, 0.15] //blue,
      }
    });

    this.readCard();
  },
  methods: {
    readCard: function(root) {
      var self = this;
      axios
        .get("http://192.168.178.135:4000/read")
        .then(function(response) {
          // handle success
          self.root = response.data;
          self.loadData(self.root);
          self.waitForCard = false;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    },
    loadData: async function(root) {
      this.loading = true;

      if (root) {
        this.root = root;
        this.message = [];
        try {
          await fetch(
            this.root,
            "restriced",
            "TEST",
            this.appendToMessages,
            this.fetchComplete
          );
        } catch (err) {
          axios({
            method: "put",
            url:
              "http://192.168.178.41/api/SmDBRI79hLYzldlX4aEUB8sTAScZJhULAot8hzIL/lights/1/state",
            data: {
              on: true,
              bri: 254,
              xy: [0.675, 0.322] //red
            }
          });
        }

      } else {
        console.log("no root defined, show search and latest views.");
        this.loading = false;
        // Send a PUT request to HUE bridge
        axios({
          method: "put",
          url:
            "http://192.168.178.41/api/SmDBRI79hLYzldlX4aEUB8sTAScZJhULAot8hzIL/lights/1/state",
          data: {
            on: true,
            bri: 254,
            xy: [0.675, 0.322] //red
          }
        });
      }
    },
    appendToMessages(message) {
      console.log("message", message);
      this.messages.push(message);
    },
    fetchComplete() {
      // Send a PUT request to HUE bridge
      console.log("green");

      axios({
        method: "put",
        url:
          "http://192.168.178.41/api/SmDBRI79hLYzldlX4aEUB8sTAScZJhULAot8hzIL/lights/1/state",
        data: {
          on: false,
          bri: 254,
          xy: [0.2, 0.7] //gree
        }
      });
      this.loading = false;
      this.products = this.sortedMessages[0].data.cart;
    }
  },
  computed: {
    sortedMessages: function() {
      function compare(a, b) {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      }
      return this.messages.sort(compare);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
