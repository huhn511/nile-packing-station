<template>
  <div class="reader" v-loading="loading || waitForCard">
    <h1>Order</h1>

    <el-row>
      <el-col :span="12">
        <h2>Information</h2>
        <el-form ref="form" :model="form" label-position="top">
          <el-form-item label="ID">
            <el-input placeholder="Please input" v-model="order.data.id" class="input-with-select">
              <template slot="prepend">
                <i class="el-icon-edit"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input
              placeholder="Please input"
              v-model="order.data.name"
              class="input-with-select"
            >
              <template slot="prepend">
                <i class="el-icon-edit"></i>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <h2>Packaging</h2>
        <p>Pack all products below and check them if your're done!</p>
        <div class="checkbox-list">
          <el-checkbox
            v-for="product in products"
            :label="product.item.data.title"
            :key="product.item.data.id"
            border
          >
            #{{product.item.data.id}}: {{product.item.data.title}}
            <el-badge :value="product.quantity" class="item" type="primary"></el-badge>
          </el-checkbox>
        </div>
        <el-button type="success" v-on:click="confirmPackaging">Confirm packaging</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <h2>Delivery destination</h2>
        <l-map
          :zoom="zoom"
          :center="center"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
          style="height: 250px"
        >
          <l-tile-layer :url="url" :attribution="attribution"/>
          <l-marker :lat-lng="origin">
            <l-popup>
              <div @click="innerClick">I am a popup</div>
            </l-popup>
          </l-marker>
          <l-marker :lat-lng="destination">
            <l-tooltip :options="{permanent: true, interactive: true}">
              <div @click="innerClick">Destination</div>
            </l-tooltip>
          </l-marker>
        </l-map>
      </el-col>
      <el-col :span="12">
        <h2>Order History</h2>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

const axios = require("axios");
import { fetch } from "@/utils/MAM";
const iotaAreaCodes = require("@iota/area-codes");

export default {
  name: "Reader",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      form: {},
      root: "",
      loading: false,
      waitForCard: true,
      order: {},
      messages: [],
      products: [],
      error: "",
      zoom: 13,
      center: { lat: 52.529562, lng: 13.413047 },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 11.5,
      currentCenter: { lat: 52.529562, lng: 13.413047 },
      destination: { lat: 52.529562, lng: 13.413047 },
      origin: { lat: 52.529562, lng: 13.413047 }
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

      // remove this
      self.root =
        "KMZHPYCFZOKULEVYKQFZVNRYWXNGAUCVDVOTBNUNKTGNMLIWIPM9NGWYCFRXXVLMVKME9ETGVVVKRIPYB";
      self.loadData(self.root);
      self.waitForCard = false;
      return;

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
      this.order = this.sortedMessages[0];
      this.products = this.order.data.cart;
      let iac = this.order.data.shipping_location;
      console.log("order", this.order);
      console.log("iac", iac);
      let coords = iotaAreaCodes.decode(iac);
      this.destination = { lat: coords.latitude, lng: coords.longitude };
      this.center = { lat: coords.latitude, lng: coords.longitude };
      console.log("this.destination", this.destination);
    },
    confirmPackaging() {},

    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    innerClick() {
      alert("Click!");
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
.el-checkbox {
  width: 100%;
  margin: 5px 5px 5px 10px;
}

.checkbox-list {
  display: inline;
}
</style>
