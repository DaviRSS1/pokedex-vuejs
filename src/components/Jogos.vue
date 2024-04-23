<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Jogos',
    props: ['jogos'],
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
    }
})
</script>

<template>
    <div>
        <p class="subtitulo-lg" v-if="idioma === 'en'">Games in which it appears</p>
        <p class="subtitulo-lg" v-else>Juegos en los que aparece</p>
        <div class="jogos-container" v-if="jogos && jogos.length > 0">
            <div v-for="(jogo, index) in jogos" :key="jogo.id" class="jogo">
                <p class="paragrafo">Pokemon {{ jogo.version.name }}{{ index !== jogos.length - 1 ? ',' : '.' }}</p>
            </div>
        </div>
        <p v-else-if="idioma === 'en'" class="paragrafo">No game found</p>
        <p v-else class="paragrafo">Juego no encontrado</p>
    </div>
</template>

<style scoped>

.subtitulo-lg{
    text-align: center;
}

.jogos-container {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: space-around;
}

.jogo {
    white-space: nowrap;
}
</style>
