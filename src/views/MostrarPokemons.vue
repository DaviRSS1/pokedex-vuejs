<script>
import { defineComponent } from 'vue';
import Card from '@/components/Card.vue';
import BarraPesquisa from '@/components/BarraPesquisa.vue';
import Filtros from '@/components/Filtros.vue';

export default defineComponent({
    name: 'MostrarPokemons',
    components: { Card, BarraPesquisa, Filtros },
    data() {
        return {
            listaPokemon: [],
            detalhesPokemon: [],
            numeroPokemonsVisiveis: 21,
            pesquisa: '',
            filtroTipo: '',
            especiePokemon: {},
            detalhesTipo: [],

        };
    },
    computed: {
        quantidadePokemonsVisiveis() {
            return this.pokemonsVisiveis.length;
        },
        pokemonsVisiveis() {
            const { pesquisa, filtroTipo, detalhesPokemon, detalhesTipo } = this;

            if (!detalhesTipo || detalhesTipo.length === 0) {
                return [];
            }

            const tiposTraduzidos = detalhesTipo
                .flatMap(({ names }) => names ? names.filter(({ language }) => language.name === 'es') : [])
                .map(({ name }) => name.toLowerCase());

            const tiposIngles = detalhesTipo
                .flatMap(({ names }) => names ? names.filter(({ language }) => language.name === 'en') : [])
                .map(({ name }) => name.toLowerCase());

            const index = tiposTraduzidos.indexOf(filtroTipo.toLowerCase());
            const filtroTipoIngles = index !== -1 ? tiposIngles[index] : filtroTipo;

            let pokemonsFiltrados = detalhesPokemon.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(pesquisa.toLowerCase())
            );

            if (filtroTipoIngles !== '') {
                pokemonsFiltrados = pokemonsFiltrados.filter((pokemon) =>
                    pokemon.types.some(({ type }) => type.name.toLowerCase() === filtroTipoIngles)
                );
            }

            pokemonsFiltrados.sort((a, b) => a.id - b.id);

            return pokemonsFiltrados;
        },


    },
    methods: {
        async carregarListaPokemon() {
            try {
                await this.$store.dispatch('carregarListaPokemon');
                this.listaPokemon = this.$store.state.listaPokemon;
                await this.carregarDetalhesPokemon();
                this.detalhesTipo = this.$store.state.tipo;
            } catch (error) {
                console.log(error);
            }
        },

        async carregarDetalhesPokemon() {
            try {
                if (this.carregandoDetalhes) return;

                this.carregandoDetalhes = true;

                let pokemonsFiltrados = this.listaPokemon

                if (this.pesquisa !== 0) {
                    pokemonsFiltrados = pokemonsFiltrados
                        .filter(pokemon => pokemon.name.toLowerCase().includes(this.pesquisa.toLowerCase()));
                }

                await Promise.all(pokemonsFiltrados.slice(0, this.numeroPokemonsVisiveis).map(({ name }) => this.pegarDetalhesPokemon(name)));
                this.especiePokemon = this.$store.state.especiePokemon;

                this.carregandoDetalhes = false;
            } catch (error) {
                console.log(error);
                this.carregandoDetalhes = false;
            }
        },

        carregarMaisPokemons(entries) {
            if (entries[0].isIntersecting) {
                const indexPokemonPesquisado = this.listaPokemon.findIndex(pokemon => pokemon.name.toLowerCase() === this.pesquisa.toLowerCase());
                if (indexPokemonPesquisado !== -1) {
                    clearInterval(this.timer);
                    this.timer = null;
                    const indicePagina = Math.ceil((indexPokemonPesquisado + 1) / 24);
                    this.numeroPokemonsVisiveis = indicePagina * 24;
                } else {
                    if (!this.timer) {
                        const pokemonsVisiveis = this.pokemonsVisiveis.length;
                        const pokemonsRestantes = this.listaPokemon.length - pokemonsVisiveis;
                        this.timer = setInterval(() => {
                            this.numeroPokemonsVisiveis += Math.min(pokemonsRestantes, 24);
                        }, 200);
                    }
                }
            } else {
                clearInterval(this.timer);
                this.timer = null;
            }
        },


        async pegarDetalhesPokemon(nomePokemon) {
            try {
                if (!this.detalhesPokemon.some((pokemon) => pokemon.name === nomePokemon)) {
                    await this.$store.dispatch('carregarDetalhesPokemon', nomePokemon);
                    this.detalhesPokemon.push(this.$store.state.detalhesPokemon);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted() {
        await this.carregarListaPokemon();

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        const observer = new IntersectionObserver(this.carregarMaisPokemons, options);
        observer.observe(this.$refs.listaInfinita);

    },
    watch: {
        numeroPokemonsVisiveis: {
            handler: 'carregarDetalhesPokemon',
            immediate: true
        },
        pesquisa: {
            handler: 'carregarDetalhesPokemon',
            immediate: true
        }
    },
});
</script>

<template>
    <main class="conteudo-principal">
        <BarraPesquisa v-model="pesquisa" />
        <Filtros v-model="filtroTipo" />
        <section class="mostrar-pokemons">
            <h1 class="cabecalho titulo-pokemons">Pokemons</h1>
            <div class="pokemons-encontradas" v-if="pokemonsVisiveis.length > 0">
                <ul class="pokemons">
                    <li v-for="pokemon in pokemonsVisiveis" :key="pokemon.name">
                        <router-link class="clean-link" :to="`${pokemon.name}`">
                            <Card :pokemon="pokemon" />
                        </router-link>
                    </li>
                </ul>
            </div>
            <div v-else class="pokemons-nao-encontradas">
                <p class="paragrafo-lg pokemons-nao-encontradas__info">
                    Ops, não encontramos resultados para sua combinação. Vamos tentar de novo?
                </p>
            </div>
        </section>
        <div ref="listaInfinita"></div>
    </main>
</template>

<style scoped>
.mostrar-pokemons {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.resultados-encontrados {
    color: var(--verde-medio);
    margin-bottom: 1.5rem;
}

.titulo-pokemons {
    color: var(--verde-medio);
    margin-bottom: 1.5rem;
}

.informacoes {
    margin-bottom: 2rem;
}

.pokemons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.pokemons-nao-encontradas {
    margin-bottom: 2rem;
}

.pokemons-nao-encontradas__info {
    margin-bottom: 0.5rem;
}

.conteudo-principal {
    padding: 6.5rem 7.5rem;
    border-radius: 3.75rem 3.75rem 0rem 0rem;
    background: var(--creme, #FFFAF3);
    color: var(--cinza, #444);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
}

@media only screen and (max-width: 1300px) {
    .conteudo-principal {
        padding: 5rem 3.75rem;
        gap: 3.5rem;
    }
}

@media only screen and (max-width: 767px) {
    .conteudo-principal {
        padding: 4rem 1.5rem;
        gap: 4rem;
    }
}
</style>