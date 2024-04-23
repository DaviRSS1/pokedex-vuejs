<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: "teste",
    data() {
        return {
            listaPokemon: [],
            detalhesPokemon: [],
        };
    },
    methods: {
        async carregarListaPokemon() {
            await this.$store.dispatch('carregarListaPokemon');
            this.listaPokemon = this.$store.state.listaPokemon;
            this.pegarDetalhesPokemon();
        },

        async pegarDetalhesPokemon() {
            const detalhesPromises = this.listaPokemon.map(pokemon => this.carregarDetalhesPokemon(pokemon.name));
            // Esperar por todas as chamadas de carregarDetalhesPokemon em paralelo
            const detalhes = await Promise.all(detalhesPromises);
            // Adicionar os detalhes retornados ao detalhesPokemon
            this.detalhesPokemon = detalhes;
        },

        async carregarDetalhesPokemon(nomePokemon) {
            const detalhes = await this.$store.dispatch('carregarDetalhesPokemon', nomePokemon);
            return detalhes;
        },
    },
    async created() {
        await this.carregarListaPokemon();
    },
})
</script>


<template>
    <div>
        <div v-for="pokemon in detalhesPokemon" :key="pokemon.name">
            {{ pokemon.name }}
        </div>
    </div>
</template>