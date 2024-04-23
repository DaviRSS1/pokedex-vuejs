<script>
import Banner from './components/Banner.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    Banner
  }
})
</script>

<template>
  <div>
    <Banner />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
