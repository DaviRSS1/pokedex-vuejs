<script>
import { defineComponent } from 'vue'
import TipoPokemon from './TipoPokemon.vue';

export default defineComponent({
    name: 'TitulosPokemon',
    props: ['especiePokemon', 'detalhesPokemon', 'tiposTraduzidos'],
    data() {
        return{
            detalheTipo: [],
        }
    },
    components: {
        TipoPokemon
    },
    methods: {
        formatName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },

        getFlavorText() {
            const flavorTexts = [];
            if (this.especiePokemon && this.especiePokemon.flavor_text_entries) {
                for (const language in this.especiePokemon.flavor_text_entries) {
                    if (this.especiePokemon.flavor_text_entries[language].language.name === this.idioma) {
                        flavorTexts.push(this.especiePokemon.flavor_text_entries[language].flavor_text);
                    }
                }
            }
            return flavorTexts;
        },

        getRandomFlavorText() {
            const flavorTexts = this.getFlavorText();
            if (flavorTexts.length > 0) {
                const randomIndex = Math.floor(Math.random() * flavorTexts.length);
                return flavorTexts[randomIndex];
            }
            return 'Texto de sabor não encontrado';
        },

        getGeneraNameInEnglish() {
            if (this.especiePokemon && this.especiePokemon.genera) {
                for (const language in this.especiePokemon.genera) {
                    if (this.especiePokemon.genera[language].language.name === this.idioma) {
                        return this.especiePokemon.genera[language].genus;
                    }
                }
            }
            return 'Gênero não encontrado';
        },
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
        getImage() {
            if (!!this.detalhesPokemon.sprites) {
                const { front_default } = this.detalhesPokemon.sprites
                if (front_default === null) {
                    return 'https://static-00.iconduck.com/assets.00/image-not-found-01-icon-2048x2048-95wsi7vg.png'
                }
                return front_default
            }
            else
                return 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
        },
    }
})
</script>

<template>
    <div>
        <div class="titulos">
            <img :src="getImage" class="imagem" :alt="detalhesPokemon.name" />
            <div class="titulo-sobre-imagem">
                <h1 class="cabecalho titulo-pokemons">{{ formatName(detalhesPokemon.name) }}</h1>
                <p class="paragrafo-lg">{{ getGeneraNameInEnglish() }}</p>
                <p class="paragrafo-lg">{{ getRandomFlavorText() }}</p>
                <div class="tipos-pokemon">
                    <TipoPokemon v-for="(tipo, index) in this.tiposTraduzidos" :key="index" :type="tipo" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.titulos {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tipos-pokemon {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.imagem {
    width: 25rem;
    opacity: 0.3;
}

.titulo-sobre-imagem {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 0.5rem 1rem;
}


</style>