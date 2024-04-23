<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Atributos',
    data() {
        return {
            detalhesStats: [],
        }
    },
    props: ['detalhesPokemon'],
    methods: {
        async pegarDetalhesStats(url) {
            try {
                await this.$store.dispatch('carregarDetalhesStats', url);
                this.detalhesStats.push(this.$store.state.stats)
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
        pegarNomeStatsTraduzido() {
            const nomesTraduzidos = [];
            for (const stat of this.detalhesStats) {
                if (stat && stat.names) {
                    for (const language in stat.names) {
                        if (stat.names[language].language.name === this.idioma) {
                            nomesTraduzidos.push(stat.names[language].name);
                        }
                    }
                }
            }
            if (nomesTraduzidos.length > 0) {
                return nomesTraduzidos;
            } else {
                return ['Gênero não encontrado'];
            }
        },
    },
    async mounted() {
        try {
            await Promise.all(this.detalhesPokemon.stats.map(stat => this.pegarDetalhesStats(stat.stat.url)));
        } catch (error) {
            this.erro = 'Erro ao carregar detalhes das estatísticas.';
            console.error(error);
        }
    }
})
</script>

<template>
    <div class="atributos">
        <div class="atributo-titulo">
            <p v-if="idioma === 'en'" class="paragrafo-lg">Attributes</p>
            <p v-else class="paragrafo-lg">Atributos</p>
        </div>
        <div class="atributos-status">
            <div v-for="(nomeAtributo, index) in pegarNomeStatsTraduzido" :key="index" class="atributos-stats"
                :class="nomeAtributo.toLowerCase().replace(/\s+/g, '-')">
                <p>{{ nomeAtributo }}</p>
                <p>{{ this.detalhesPokemon.stats[index].base_stat }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.atributos-status {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem
}

.atributos-stats {
    color: #fff;
    border-radius: 10rem;
    display: inline-block;
    padding: 0.25em 0.4em;
    margin-bottom: 5px;
    font-size: 75%;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    gap: 4rem;
    padding: .5rem;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
}

.paragrafo-lg {
    margin: 1rem
}

.atributo-titulo {
    background-color: var(--coral);
    color: var(--creme);
    border-radius: 1rem 1rem 0 0;
}

.atributos {
    background: var(--branco, #FFF);
    box-shadow: 4px 4px 12px 0px rgba(68, 68, 68, 0.08);
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 1rem;
}
</style>