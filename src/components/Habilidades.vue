<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Habilidades',
    props: ['habilidade'],
    data() {
        return {
            habilidadePokemon: {}
        }
    },
    methods: {
        async pegarHabilidadesPokemon() {
            try {
                await this.$store.dispatch('carregarHabilidadesPokemon', this.habilidade.ability.url);
                const novaHabilidade = this.$store.state.habilidadesPokemon;
                this.habilidadePokemon = novaHabilidade;
                this.pegarHabilidadesInfoInEnglish();
            } catch (error) {
                console.log(error);
            }
        },

        pegarHabilidadesInfoInEnglish() {
            const habilidadesInfo = [];

            const info = {};
            if (this.habilidadePokemon && this.habilidadePokemon.names) {
                for (const nome of this.habilidadePokemon.names) {
                    if (nome.language.name === this.idioma) {
                        info.nome = nome.name;
                    }
                }
            }
            if (this.habilidadePokemon && this.habilidadePokemon.flavor_text_entries) {
                for (const entry of this.habilidadePokemon.flavor_text_entries) {
                    if (entry.language.name === this.idioma) {
                        info.textoSabor = entry.flavor_text;
                    }
                }
            }
            if (!info.nome) {
                info.nome = 'Nenhum nome em inglês encontrado';
            }
            if (!info.textoSabor) {
                info.textoSabor = 'Nenhum texto de sabor em inglês encontrado';
            }

            habilidadesInfo.push(info);

            return habilidadesInfo; 
        }
    },
    async mounted() {
        await this.pegarHabilidadesPokemon(); 
    },
    computed: {
        idioma() {
            return this.$store.state.idioma;
        },
    }
})
</script>

<template>
    <div>
        <div v-for="habilidade in pegarHabilidadesInfoInEnglish()" class="habilidade" :key="habilidade">
            <p class="paragrafo">{{ habilidade.nome }}:</p>
            <p class="paragrafo">{{ habilidade.textoSabor }}</p>
        </div>
    </div>
</template>

<style scoped>

.habilidade {
    display: flex;
    gap: 1rem;
}

</style>