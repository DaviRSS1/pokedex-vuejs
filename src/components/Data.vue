<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Data',
    props: ['detalhesPokemon'],
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
    }
})
</script>

<template>
    <div class="data" v-if="idioma === 'en'">
        <p class="subtitulo-lg">Data</p>
        <p class="paragrafo">Height: {{ (this.detalhesPokemon.height / 10).toFixed(2) }} m / {{
            Math.floor(this.detalhesPokemon.height / 10 * 3.28) }}'{{
                Math.round(((this.detalhesPokemon.height / 10 * 3.28) % 1) * 12) }}"</p>
        <p class="paragrafo">Weight: {{ (this.detalhesPokemon.weight / 1000).toFixed(2) }} kg / {{
            (this.detalhesPokemon.weight
                / 453.592).toFixed(2) }} lb</p>
    </div>
    <div class="data" v-else>
        <p class="subtitulo-lg">Datos</p>
        <p class="paragrafo">Altura: {{ (this.detalhesPokemon.height / 10).toFixed(2) }} m / {{
            Math.floor(this.detalhesPokemon.height / 10 * 3.28) }}'{{
                Math.round(((this.detalhesPokemon.height / 10 * 3.28) % 1) * 12) }}"</p>
        <p class="paragrafo">Peso: {{ (this.detalhesPokemon.weight / 1000).toFixed(2) }} kg / {{
            (this.detalhesPokemon.weight
                / 453.592).toFixed(2) }} lb</p>
    </div>
</template>

<style scoped>
.data{
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
</style>