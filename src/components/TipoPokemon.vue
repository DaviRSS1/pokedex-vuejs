<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "TipoPokemon",
    props: ["type"],
    data() {
        return {
            url: ""
        };
    },
    methods: {
        removeAcentos(texto) {
            return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        },
        setUrl() {
            this.url = require("../assets/images/icons/svg/" + this.removeAcentos(this.type).toLowerCase() + ".svg");
        },
    },
    mounted() {
        if (this.type) {
            this.setUrl();
        }
    },
    computed: {
        tipoMinusculoSemAcento() {

            return this.removeAcentos(this.type).toLowerCase()
        }
    }
});
</script>

<template>
    <li>
        <span :class="`${tipoMinusculoSemAcento}`" class="tipo">
            {{ type }}
            <img class="icone-tipo" :src="url" />
        </span>
    </li>
</template>

<style>
h1 {
    display: inline;
}

span {
    display: block;
}

.tipo {
    color: #fff;
    border-radius: 10rem;
    display: inline-block;
    padding: 0.25em 0.4em;
    margin-bottom: 5px;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
}

.icone-tipo {
    display: inline;
    border: 0;
    width: 10px;
}
</style>