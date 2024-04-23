<script>
import { defineComponent } from 'vue';
import TipoPokemon from './TipoPokemon.vue';

export default defineComponent({
    name: "Card",
    props: {
        pokemon: { type: Object, required: true }
    },
    data() {
        return {
            detalhesTipo: [],
            imagemCarregando: true
        }
    },
    components: {
        TipoPokemon
    },
    methods: {
        async pegarDetalhesTipo() {
            try {
                this.detalhesTipo = this.$store.state.tipo;
            } catch (error) {
                console.error("Erro ao carregar detalhes do tipo:", error);
            }
        },
        pegarTipoTraduzido() {
            const tiposTraduzidos = [];
            const detalhesFiltrados = this.detalhesTipo.filter(detalhe => {
                return this.pokemon.types.some(tipo => tipo.type.name === detalhe.name);
            });

            for (const detalheTipo of detalhesFiltrados) {
                if (detalheTipo && detalheTipo.names) {
                    for (const language in detalheTipo.names) {
                        if (
                            detalheTipo.names[language].language.name === this.idioma
                        ) {
                            tiposTraduzidos.push(detalheTipo.names[language].name);
                        }
                    }
                }
            }

            return tiposTraduzidos.length > 0 ? tiposTraduzidos : ['Tipo não encontrado'];
        },
        deixarPrimeiraLetraMaiuscula(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        formatarId(id) {
            return `#${String(id).padStart(4, '0')}`;
        }
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
        pegarImagem() {
            if (!!this.pokemon.sprites) {
                const { front_default } = this.pokemon.sprites;
                if (front_default === null) {
                    return 'https://static-00.iconduck.com/assets.00/image-not-found-01-icon-2048x2048-95wsi7vg.png';
                }
                return front_default;
            } else {
                return 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';
            }
        },
    },
    created() {
        this.pegarDetalhesTipo().finally(() => {
            this.imagemCarregando = false;
        });
    }
});
</script>

<template>
    <div>
        <img src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" class="loading" v-if="imagemCarregando">
        <article v-else class="card-pokemon">
            <header class="cabecalho-card paragrafo-lg">
                <img :src="pegarImagem" class="imagem" :alt="pokemon.name" />
            </header>
            <div class="nome">
                <p>{{ formatarId(pokemon.id) }}</p>
                <p>{{ deixarPrimeiraLetraMaiuscula(pokemon.name) }}</p>
            </div>
            <div class="tipos-pokemon">
                <TipoPokemon v-for="(tipo, index) in pegarTipoTraduzido()" :key="index" :type="tipo" />
            </div>
        </article>
    </div>
</template>

<style scoped>
.card-pokemon {
    width: 17.625rem;
    max-width: 19.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: var(--branco, #FFF);
    box-shadow: 4px 4px 12px 0px rgba(68, 68, 68, 0.08);
    border-radius: 1rem;
}

.cabecalho-card {
    width: 100%;
    border-radius: 1rem 1rem 0 0;
    padding-top: 10px;
    background-color: var(--coral);
    color: var(--creme);
    text-align: center;
    justify-content: center;
}

.corpo-card {
    padding: 2rem 1rem;
}

.loading {
    width: 17.625rem;
    max-width: 19.5rem;
    padding: 10px 90px;
}

.nome{
    display: flex;
    gap: .5rem;
}

.imagem {
    max-width: 96px;
}

.corpo-card__nome {
    font-size: 22;
    font-weight: 600;
}

.tipos-pokemon {
    display: flex;
    gap: 1rem;
    justify-content: center;
}
</style>
