<template>
  <div id="app" class='container'>
    <nav-bar></nav-bar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar
  },
  data() {
    return {
        activeIndex: '1'
    }
  },
  computed: {
      level1() { // 默认打开所有一级菜单
          return this.$router.options.routes.map(function(route) {
              return route.path;
          });
      }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito');
@import "../node_modules/leaflet/dist/leaflet.css";

html {
  font-family: 'Nunito', sans-serif;
}

body {
    margin: 0px;
}

.main {
  margin-top: 70px;
  padding-top: 24px;
}

:root {
  --primary: #139B48;
  --primary-2: #A2CF6F;
  --secondary: #0B5D9E;
  --secondary-2: #5AB0B2;
  --dark: #081C1D;
  --darker: #0F3535;
  --light: #E2E2E2;
  --white: #FFFFFF;
  --white_5: rgba(255,255,255,.05);
  --white_10: rgba(255,255,255,.1);
  --white_25: rgba(255,255,255,.25);
  --white_50: rgba(255,255,255,.5);
  --red: #F16465;
  --orange: #E69255;
  --yellow: #E6BE54;
  --purple: #8F60A8;

  --border-radius: 10px;
  --border-radius-sm: 5px;

  --box-shadow: 0 3px 6px rgba(0,0,0,.15);

  --transition-in-out: all 0.3s ease-in-out;

}
</style>
