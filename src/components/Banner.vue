<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Banner",
  data() {
    return {
      lingua: 'en'
    }
  },
  methods: {
    ingles() {
      this.lingua = 'en'
      this.$store.dispatch('pegarIdioma', this.lingua)
    },
    espanhol() {
      this.lingua = 'es'
      this.$store.dispatch('pegarIdioma', this.lingua)
    }
  }
})
</script>

<template>
  <header class="banner">
    <div class="apresentacao">
      <div>
        <button class="botao-lingua" @click="ingles">
          <img src="../assets/images/estados-unidos.png" alt="Bandeira dos estados unidos" class="bandeira" />
        </button>
        <button class="botao-lingua" @click="espanhol">
          <img src="../assets/images/espanha.png" alt="Bandeira da espanha" class="bandeira" />
        </button>
      </div>
      <h1 v-if="lingua === 'en'" class="titulo cabecalho-lg"><span class="texto-verde">Pokedex </span> Your complete
        Pokedex</h1>
      <h1 v-else class="titulo cabecalho-lg"><span class="texto-verde">Pokedex </span> Tu Pokédex completo</h1>
      <h3 v-if="lingua === 'en'" class="subtitulo-lg">Explore the fascinating world of Pokémon with our Online Pokedex!
        Dive into a vast collection of information about these incredible creatures, from their types and abilities to
        their evolutions!</h3>
      <h3 v-else class="subtitulo-lg">¡Descubre el fascinante mundo de los Pokémon con nuestra Pokedex en línea! Explora
        una amplia colección de información sobre estas increíbles criaturas, desde sus tipos y habilidades hasta sus
        evoluciones! </h3>
    </div>
    <img src="../assets/images/pokedex.png" alt="Foto de uma pokedex" class="foto-banner">
  </header>
</template>

<style scoped>
.banner {
  padding: 4rem 7.5rem;
  background-image: url('../assets/images/fundo-banner.png');
  background-repeat: repeat;
  display: flex;
  justify-content: space-around;
  align-items: center;
  column-gap: 5rem;
}

.bandeira {
  max-width: 6rem;
  padding: .5rem;
  background-color: #00895A;
  cursor: pointer;
  border-radius: 2rem;
}

.logo {
  height: 4.5rem;
  margin-bottom: 3rem;
}

.texto-verde {
  color: var(--verde-escuro);
}

.frase-cabecalho {
  margin-bottom: 2rem;
}

.apresentacao {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.foto-banner {
  width: 15rem;
}

@media only screen and (max-width: 1300px) {
  .banner {
    padding: 4rem 3.75rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: 767px) {
  .banner {
    padding: 4rem 1.5rem;
  }

  .foto-banner {
    width: min(100%, 10rem);
  }
}
</style>