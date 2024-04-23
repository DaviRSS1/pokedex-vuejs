<script>
import { defineComponent } from 'vue'
import TipoPokemon from './TipoPokemon.vue';

export default defineComponent({
    name: "Moves",
    props: ['move'],
    data() {
        return {
            detalhesMove: {},
            nomeMoveTraduzido: '',
            detalhesTipo: [],
            nomesTipos: {}
        }
    },
    components: {
        TipoPokemon
    },
    methods: {
        async pegarDetalhesMove() {
            try {
                await this.$store.dispatch('carregarDetalhesMove', this.move.move.url);
                this.detalhesMove = this.$store.state.detalhesMove;
                await this.pegarNomeMoveTraduzido();
                await this.pegarDetalhesTipo()
            } catch (error) {
                console.log(error);
            }
        },

        async pegarDetalhesTipo() {
            this.detalhesTipo = this.$store.state.tipo;
            const typeName = this.detalhesMove.type ? this.detalhesMove.type.name : null;

            if (typeName) {
                const tipoEncontrado = this.detalhesTipo.find(tipo => tipo.name === typeName);

                if (tipoEncontrado) {
                    this.nomesTipos = tipoEncontrado;
                } else {
                    this.nomesTipos = null;
                }
            } else {
                this.nomesTipos = null;
            }
        },

        pegarFlavorText() {
            const flavorTexts = [];
            if (this.detalhesMove && this.detalhesMove.flavor_text_entries) {
                for (const language in this.detalhesMove.flavor_text_entries) {
                    if (this.detalhesMove.flavor_text_entries[language].language.name === this.idioma) {
                        flavorTexts.push(this.detalhesMove.flavor_text_entries[language].flavor_text);
                    }
                }
            }
            return flavorTexts;
        },

        pegarRandomFlavorText() {
            const flavorTexts = this.pegarFlavorText();
            if (flavorTexts.length > 0) {
                const randomIndex = Math.floor(Math.random() * flavorTexts.length);
                return flavorTexts[randomIndex];
            }
            return '';
        },

        async pegarNomeMoveTraduzido() {
            let nomeTraduzido = '';
            const move = this.detalhesMove;
            if (move && move.names) {
                for (const language in move.names) {
                    if (move.names[language].language.name === this.idioma) {
                        nomeTraduzido = move.names[language].name;
                        break;
                    }
                }
            }

            if (nomeTraduzido.length > 0) {
                this.nomeMoveTraduzido = nomeTraduzido;
            }
        },
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
        pegarTipoTraduzido() {
            let nomeTraduzido = '';
            if (this.nomesTipos) {
                for (const language in this.nomesTipos.names) {
                    if (this.nomesTipos.names[language].language.name === this.idioma) {
                        nomeTraduzido = this.nomesTipos.names[language].name;
                        break;
                    }
                }
            }

            return nomeTraduzido
        },

    },
    watch: {
        move: {
            handler: 'pegarDetalhesMove',
            immediate: true,
        },
    },
})
</script>

<template>
    <tbody>
        <tr>
            <td>{{ nomeMoveTraduzido }}</td>
            <td>{{ pegarRandomFlavorText() }}</td>
            <td><TipoPokemon :type="pegarTipoTraduzido" /></td>
        </tr>
    </tbody>
</template>


<style scoped>
th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid var(--cinza-claro);
}

th {
    background-color: var(--coral);
    color: var(--branco);
}

tr:nth-child(even) {
    background-color: var(--cinza-claro);
}

</style>
