<script>
import { defineComponent } from 'vue'
import Card from './Card.vue';

export default defineComponent({
    name: 'Evolucoes',
    data() {
        return {
            detalhesEvolucao: [],
            arvoreEvolucao: []
        }
    },
    props: [
        'url'
    ],
    components: {
        Card
    },
    methods: {
        async pegarArvoreEvolucao(url) {
            try {
                this.detalhesEvolucao = []; 
                await this.$store.dispatch('carregarArvoreEvolucao', url);
                this.arvoreEvolucao = this.$store.state.arvoreEvolucao;
                this.percorrerArvore(this.arvoreEvolucao.chain);
            } catch (error) {
                console.error("Erro ao carregar árvore de evolução:", error);
            }
        },

        async pegarDetalhesEvolucao(nomePokemon) {
            try {
                await this.$store.dispatch('carregarDetalhesPokemon', nomePokemon);
                const detalhesEvolucao = this.$store.state.detalhesPokemon;
                if (!this.detalhesEvolucao.some(detalhe => detalhe.id === detalhesEvolucao.id)) {
                    this.detalhesEvolucao.push(detalhesEvolucao);
                }
            } catch (error) {
                console.error("Erro ao carregar detalhes de evolução:", error);
            }
        },

        percorrerArvore(node) {
            if (node) {
                this.pegarDetalhesEvolucao(node.species.name);

                if (node.evolves_to && node.evolves_to.length > 0) {
                    for (const evolucao of node.evolves_to) {
                        this.percorrerArvore(evolucao);
                    }
                }
            }
        },
    },
    mounted() {
        this.pegarArvoreEvolucao(this.url);
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
    }
})
</script>

<template>
    <div>
        <p v-if="this.idioma === 'en'" class="subtitulo-lg titulo-evolucao">Evolution Tree</p>
        <p v-else class="subtitulo-lg titulo-evolucao">Árbol de Evolución</p>
        <ul class="pokemons">
            <li class="evolucao" v-for="(pokemon, index) in detalhesEvolucao" :key="index">
                <Card :pokemon="pokemon" />
                <span v-if="index < detalhesEvolucao.length - 1"><img class="seta-esquerda" src="../assets/images/seta-direita.png"></span>
            </li>
        </ul>
        <img src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" class="loading" v-if="detalhesEvolucao.length === 0">
    </div>
</template>

<style scoped>
.evolucoes {
    padding: 2rem 0;
}

.cabecalho {
    margin-bottom: 1rem
}

.pokemons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: nowrap;
    margin-bottom: 2rem;
}

.titulo-evolucao{
    text-align: center
}

.seta-esquerda{
    max-width: 3rem;
}

.evolucao {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.loading {
    width: 50px;
    margin: 20px auto;
    display: block;
}

@media only screen and (max-width: 1100px) {
    .pokemons {
        flex-direction: column
    }
    .evolucao{
        flex-direction: column
    }
    .seta-esquerda {
        transform: rotate(90deg);
    }
}

@media only screen and (max-width: 767px) {

}

</style>
