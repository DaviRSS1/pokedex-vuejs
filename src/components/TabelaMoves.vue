<script>
import { defineComponent } from 'vue'
import Moves from './Moves.vue';

export default defineComponent({
    name: 'TabelaMoves',
    props: ['moves'],
    components: {
        Moves
    },
    data() {
        return {
            paginaAtual: 1,
            itensPorPagina: 20,
        };
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
        totalPaginas() {
            return Math.ceil(this.moves.length / this.itensPorPagina);
        },
        displayedMoves() {
            const startIndex = (this.paginaAtual - 1) * this.itensPorPagina;
            const endIndex = Math.min(startIndex + this.itensPorPagina, this.moves.length);
            const displayedMoves = this.moves.slice(startIndex, endIndex);
            return displayedMoves;
        },
    },
    methods: {
        proximaPagina() {
            if (this.paginaAtual < this.totalPaginas) {
                this.paginaAtual++;
            }
        },
        paginaAnterior() {
            if (this.paginaAtual > 1) {
                this.paginaAtual--;
            }
        },
    },
})
</script>

<template>
    <div class="movimentos">
        <p class="subtitulo-lg" v-if="this.idioma === 'en'">Moves</p>
        <p class="subtitulo-lg" v-else>Movimientos</p>
        <table class="tabela-movimentos">
            <thead>
                <tr v-if="this.idioma === 'en'">
                    <th>Move</th>
                    <th>Description</th>
                    <th>Type</th>
                </tr>
                <tr v-else>
                    <th>Movimiento</th>
                    <th>Descrición</th>
                    <th>Tipo</th>
                </tr>
            </thead>
            <Moves v-for="(move, index) in displayedMoves" :key="index" :move="move" />
        </table>
        <div class="botoes-paginacao">
            <button v-if="this.idioma === 'en'" class="botao" @click="paginaAnterior" :disabled="paginaAtual === 1">&larr; Prev </button>
            <button v-else class="botao" @click="paginaAnterior" :disabled="paginaAtual === 1">&larr; Anterior </button>
            <span>{{ paginaAtual }}</span>
            <button v-if="this.idioma === 'en'" class="botao" @click="proximaPagina" :disabled="paginaAtual === totalPaginas">Next &rarr;</button>
            <button v-else class="botao" @click="proximaPagina" :disabled="paginaAtual === totalPaginas">Próxima&rarr;</button>
        </div>
    </div>
</template>

<style scoped>
.botoes-paginacao {
    display: flex;
    gap: 1rem;
    margin: 1rem;
}

.movimentos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.tabela-movimentos {
    width: 70%;
    box-shadow: 4px 4px 12px 0px rgba(68, 68, 68, 0.08);
    border-collapse: collapse;
}

.tabela-movimentos th,
.tabela-movimentos td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid var(--cinza-claro);
}

.tabela-movimentos th {
    background-color: var(--coral);
    color: var(--branco);
}

.tabela-movimentos tr:nth-child(even) {
    background-color: var(--cinza-claro);
}

.movimentos .move-info {
    display: flex;
    gap: 10px;
}

.seta-direita {
    max-width: 3rem;
}

@media only screen and (max-width: 1300px) {
    .tabela-movimentos {
        width: 85%
    }
}

@media only screen and (max-width: 767px) {
    .tabela-movimentos {
        width: 100%
    }
}
</style>