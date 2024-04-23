<script>
import { defineComponent } from 'vue';
import Habilidades from '@/components/Habilidades.vue';
import TabelaMoves from '@/components/TabelaMoves.vue';
import TitulosPokemon from '@/components/TitulosPokemon.vue';
import Evolucoes from '@/components/Evolucoes.vue';
import Sprites from '@/components/Sprites.vue';
import Data from '@/components/Data.vue';
import Jogos from '@/components/Jogos.vue';
import Atributos from '@/components/Atributos.vue';

export default defineComponent({
    name: "PaginaPokemon",
    data() {
        return {
            detalhesPokemon: {},
            especiePokemon: {},
            detalhesAtributo: [],
            detalhesStats: [],
            arvoreEvolucao: {},
            detalhesTipo: [],
        }
    },
    components: { TabelaMoves, TitulosPokemon, Habilidades, Evolucoes, Sprites, Atributos, Data, Jogos },
    props: { name: { type: String } },
    methods: {
        async pegarDetalhesPokemon(nomePokemon) {
            try {
                await this.$store.dispatch('carregarDetalhesPokemon', nomePokemon);
                this.detalhesPokemon = this.$store.state.detalhesPokemon;
                this.pegarEspeciePokemon(this.detalhesPokemon.species.url)
            } catch (error) {
                console.log(error);
            }
        },

        async pegarTiposPokemon() {
            await this.$store.dispatch('carregarTiposPokemon');
            this.tiposPokemon = this.$store.state.tiposPokemon
            this.tiposPokemon.forEach(tipo => {
                this.pegarDetalhesTipo(tipo.url)
            })
        },

        async pegarDetalhesTipo(url) {
            try {
                await this.$store.dispatch('carregarDetalhesTipo', url);
                this.detalhesTipo = this.$store.state.tipo;
            } catch (error) {
                console.log(error);
            }
        },

        async pegarEspeciePokemon(url) {
            try {
                await this.$store.dispatch('carregarEspeciePokemon', url);
                this.especiePokemon = this.$store.state.especiePokemon;
            } catch (error) {
                console.log(error);
            }
        },

        pegarTipoTraduzido() {
            const tiposTraduzidos = [];
            const detalhesFiltrados = this.detalhesTipo.filter(detalhe => {
                return this.detalhesPokemon.types.some(tipo => tipo.type.name === detalhe.name);
            });

            for (const detalheTipo of detalhesFiltrados) {
                if (detalheTipo && detalheTipo.names) {
                    for (const language in detalheTipo.names) {
                        if (detalheTipo.names[language].language.name === this.idioma) {
                            tiposTraduzidos.push(detalheTipo.names[language].name);
                        }
                    }
                }
            }

            return tiposTraduzidos;
        },
    },

    async mounted() {
        this.pegarDetalhesPokemon(this.name)
        this.pegarTiposPokemon()
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
        todosDadosCarregados() {
            return (
                Object.keys(this.detalhesPokemon).length > 0 &&
                Object.keys(this.especiePokemon).length > 0 &&
                this.detalhesTipo.length > 0
            );
        },
    },
})
</script>


<template>
    <main class="conteudo-principal" ref="mainContent">
        <router-link class="clean-link" :to="`/`">
            <img class="botao-voltar" src="https://cdn-icons-png.flaticon.com/512/271/271220.png" alt="Botão voltar">
        </router-link>
        <section v-if="!todosDadosCarregados">Carregando detalhes do Pokémon...</section>
        <section v-else>
            <section>
                <TitulosPokemon :tiposTraduzidos="pegarTipoTraduzido()" :especiePokemon="especiePokemon"
                    :detalhesPokemon="detalhesPokemon" />
                <div class="informacoes">
                    <div class="informacoes-pokemon">
                        <p class="cabecalho">{{ idioma === 'en' ? 'Pokémon Data' : 'Datos Pokémon' }}</p>
                        <p class="subtitulo-lg">{{ idioma === 'en' ? 'Abilities' : 'Habilidades' }}</p>
                        <Habilidades v-for="habilidade in detalhesPokemon.abilities" :key="habilidade.name"
                            :habilidade="habilidade" />
                        <Data :detalhesPokemon="detalhesPokemon" />
                    </div>
                    <Atributos :detalhesPokemon="detalhesPokemon" />
                </div>
            </section>
            <section class="detalhes-pokemon-section">
                <Evolucoes :url="especiePokemon.evolution_chain.url" />
                <Jogos :jogos="detalhesPokemon.game_indices" />
                <TabelaMoves :moves="detalhesPokemon.moves" />
                <Sprites :sprites="detalhesPokemon.sprites" />
            </section>
        </section>
    </main>
</template>

<style scoped>
.cabecalho {
    margin-bottom: 1rem
}

.jogos {
    display: flex;
    flex-direction: row;
}


.detalhes-pokemon-section {
    gap: 4rem;
    display: flex;
    flex-direction: column;
    margin-top: 4rem
}

.clean-link{
    z-index: 999;
}

.informacoes {
    display: flex;
    justify-content: space-between;
}

.informacoes-pokemon {
    display: flex;
    flex-direction: column;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    justify-content: space-around;
}

.botao-voltar {
    max-width: 2rem;
    position: absolute;
    top: 70%
}

.conteudo-principal {
    padding: 0 7.5rem 4rem 7.5rem;
    border-radius: 3.75rem 3.75rem 0rem 0rem;
    background: var(--creme, #FFFAF3);
    color: var(--cinza, #444);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

@media only screen and (max-width: 1300px) {
    .conteudo-principal {
        padding: 5rem 3.75rem;
        gap: 3.5rem;
    }

    .botao-voltar {
        top: 120%
    }
}

@media only screen and (max-width: 767px) {
    .conteudo-principal {
        padding: 4rem 1.5rem;
        gap: 4rem;
    }

    .botao-voltar {
        top: 100%
    }

    .informacoes {
        flex-direction: column;
        gap: 2rem;
    }
}
</style>
