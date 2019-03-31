<template>
  <div class="home">
    <h1>Nile Packing Station</h1>
    <p>Application to support and track the packing process.</p>
    <div class="section section--use-case" id="use-cases">
      <div class="container">
        <el-row>
          <el-col :span="12">
            <h3 class="section-hero">Features</h3>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item name="1">
                <template slot="title">
                  <span>
                    <span class="counter">1</span>All orders on a RFID Card
                  </span>
                </template>
                <div>The MAM root of an order can be written on an RFID card. With the READ function, you can scan a card and gets information about it through the messages in the MAM channel.</div>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                  <span>
                    <span class="counter">2</span>Scan it, pack it, check it!
                  </span>
                </template>
                <div>All information gets displayed on the screen for packing the correct products. You can simply check the packed products like a todo list.</div>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template slot="title">
                  <span>
                    <span class="counter">3</span> Card rewards - support your local!
                  </span>
                </template>
                <div>The card will be delivered within the package. The buyer can collect those cards and gets a good discount in the local shop for exchange with 5 cards for example.</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="12">
            <img alt="vendor" src="../assets/customer-circled.jpg">
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Home",
  data() {
    return {
      activeNames: ["1", "2", "3"]
    };
  },
  mounted() {
    // Send a PUT request to HUE bridge
    console.log("aus");
    axios({
      method: "put",
      url:
        "http://192.168.178.41/api/SmDBRI79hLYzldlX4aEUB8sTAScZJhULAot8hzIL/lights/1/state",
      data: {
        on: false
      }
    });
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.container {
  width: 1200px;
  margin: 0 auto;
}

.section {
  padding: 100px 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-color: var(--white);
  &-hero {
    margin-bottom: 30px;
  }
  &__light {
    background-color: #f5f8fa;
  }
  &__dark {
    background-color: var(--dark);
    color: var(--white);
  }
  &__primary {
    background-image: linear-gradient(
      to right bottom,
      #0b5d9e,
      #0074a9,
      #0089ae,
      #2e9db0,
      #5ab0b2
    );
    color: var(--white);
  }
  &__secondary {
    background-image: linear-gradient(
      to right bottom,
      #139b48,
      #48a84f,
      #69b558,
      #86c263,
      #a2cf6f
    );
    color: var(--white);
  }
}

.section--use-case {
  img {
    width: 500px;
  }
  hr {
    border-color: rgba(0, 0, 0, 0.05);
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
}

.section--use-case {
  img {
    border-radius: 100%;
  }
  color: var(--dark);
}
.el-collapse {
  border: none;
  margin-left: 40px;
  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .el-collapse-item {
    background-color: transparent;
    margin-bottom: 30px;
    &__header {
      position: relative;
      border: none;
      font-size: 24px;
      font-weight: 700;
      background-color: transparent;
      i {
        display: none;
      }
    }
    &__content {
      font-size: 16px;
      line-height: 1.5;
    }
    .counter {
      position: absolute;
      left: -40px;
      height: 40px;
      width: 40px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--dark);
      background-color: rgba(0, 0, 0, 0.05);
      transition: all 200ms ease-in-out;
    }
    &.is-active {
      .counter {
        background-color: #69bae8;
        color: var(--white);
      }
    }
  }
}
</style>
