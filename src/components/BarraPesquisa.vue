<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "BarraPesquisa",
    props: ['modelValue'],
    emits: [
        'update:modelValue',
    ],
    data() {
        return {
            textoPesquisa: '',
        }
    },
    methods: {
        pokemonPesquisado() {
            this.$emit('update:modelValue', this.textoPesquisa.trim().toLowerCase());
        },
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
    }
})
</script>

<template>
    <div class="pesquisa">
        <input type="text" class="input-pesquisa"
            :placeholder="idioma === 'en' ? 'Enter the name of the Pokémon you want to search' : 'Ingrese el nombre del Pokémon que desea buscar'"
            v-model="textoPesquisa" @keyup="pokemonPesquisado">
    </div>
</template>

<style scoped>
.input-pesquisa {
    border: 1px solid var(--cinza);
    padding: 24px;
    border-radius: 1rem;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, .06);
    font-size: 20px;
    min-width: 50vw;
}

.input-pesquisa::placeholder {
    color: var(--cinza);
    font-size: 20px;
}
</style>