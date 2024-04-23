<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sprites',
  props: ['sprites'],
  computed: {
    todasUrls() {
      return this.extrairUrls(this.sprites);
    }
  },
  methods: {
    extrairUrls(obj) {
      let urls = [];
      for (const key in obj) {
        if (obj[key] !== null && typeof obj[key] === 'object') {
          urls = urls.concat(this.extrairUrls(obj[key]));
        } else if (typeof obj[key] === 'string' && obj[key].startsWith('http')) {
          urls.push(obj[key]);
        }
      }
      return urls;
    }
  }
})
</script>

<template>
  <div class="lista">
    <p class="subtitulo-lg">Sprites</p>
    <div class="scrollbar">
      <div class="sprites">
        <ul>
          <li v-for="url in todasUrls" :key="url">
            <img alt="Sprite Pokemon" class="sprite" :src="url">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lista {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  background: var(--branco, #FFF);
  box-shadow: 4px 4px 12px 0px rgba(68, 68, 68, 0.08);
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border-radius: 1rem;
}

.scrollbar {
  overflow-x: auto;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  border-top: 1px solid var(--cinza-claro);
  padding-top: 1rem;
  white-space: nowrap;
}

.scrollbar::-webkit-scrollbar {
  display: none;
}

.sprites ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
}

.sprites li {
  flex: 0 0 auto;
  margin-right: 1rem;
}

.sprite {
  max-width: 7rem;
}
</style>
