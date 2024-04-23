<script>
export default {
    name: "Filtros",
    data() {
        return {
            tiposPokemon: [],
            nomeFiltro: '',
            detalhesTipo: []
        };
    },
    props: ['modelValue'],
    emits: ['update:modelValue'],
    methods: {
        formatarTipo(tipo) {
            return tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        },
        pegarTiposTraduzidos() {
            const tiposTraduzidos = [];
            if (this.detalhesTipo.length > 0) {
                for (const detalheTipo of this.detalhesTipo) {
                    if (detalheTipo && detalheTipo.names) {
                        for (const language in detalheTipo.names) {
                            if (detalheTipo.names[language].language.name === this.idioma) {
                                const nomeTipo = detalheTipo.names[language].name;
                                if (nomeTipo !== "???" && nomeTipo !== "Shadow") {
                                    tiposTraduzidos.push(nomeTipo);
                                }
                            }
                        }
                    }
                }
            }

            return tiposTraduzidos;
        },

        tirarFiltro() {
            this.nomeFiltro = '';
            this.$emit('update:modelValue', '');
        },
        filtroAdicionado() {
            this.$emit('update:modelValue', this.nomeFiltro.trim().toLowerCase());
        },
        async pegarTiposPokemon() {
            await this.$store.dispatch('carregarTiposPokemon');
            this.tiposPokemon = this.$store.state.tiposPokemon;
            this.tiposPokemon.forEach(tipo => {
                this.pegarDetalhesTipo(tipo.url);
            });
        },
        async pegarDetalhesTipo(url) {
            try {
                await this.$store.dispatch('carregarDetalhesTipo', url);
                this.detalhesTipo = this.$store.state.tipo;
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted() {
        this.pegarTiposPokemon();
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
        classeSelecionada() {
            return this.formatarTipo(this.nomeFiltro)
        }
    },
};
</script>

<template>
    <div>
        <select id="pokemonTipos" v-model="nomeFiltro" :class="classeSelecionada" class="filtros"
            @change="filtroAdicionado">
            <option v-if="this.idioma === 'en'" disabled selected value="">Select a Type</option>
            <option v-else disabled selected value="">Seleccione un Tipo</option>
            <option :class="formatarTipo(tipo)" class="filtro" v-for="tipo in pegarTiposTraduzidos()" :key="tipo"
                :value="tipo">
                {{ tipo }}
            </option>
        </select>
        <button class="clear-button" v-if="nomeFiltro !== ''" @click="tirarFiltro">x</button>
    </div>
</template>

<style scoped>
.filtros {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 200px;
    outline: none;
}

.filtro {
    padding: 5px;
    color: var(--branco);
}

.clear-button {
    margin-left: 1rem;
    padding: .25rem .5rem;
    background-color: var(--coral);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.clear-button:hover {
    background-color: #d84315;
}
</style>