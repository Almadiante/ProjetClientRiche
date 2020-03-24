<template>
    <div>

            <sui-card v-if="!chargement">
                <sui-dimmer-dimmable
                        @mouseenter.native="cardActive = true"
                        @mouseleave.native="cardActive = false"
                >
                <img v-if="hasImage"
                    :src="biere.labels.medium"
                    class="center floated"
                />
                    <img v-else
                               src="../assets/default_biere.jpeg"
                               class="center floated"
                    />
                    <sui-dimmer blurring :active="cardActive">
                        <sui-container fluid v-if="hasDescription">
                            {{biere.description}}
                        </sui-container>
                        <sui-container v-else >
                            No description available
                        </sui-container>
                    </sui-dimmer>
                </sui-dimmer-dimmable>
                <sui-card-content>
                    <sui-card-header v-if="hasName" >{{biere.nameDisplay}}</sui-card-header>
                    <sui-card-meta>
                    </sui-card-meta>
                    <sui-card-description>
                        <p v-if="hasName" >{{biere.abv}}°</p>
                        <p v-if="hasStyle">{{biere.style.name}}</p>
                    </sui-card-description>
                </sui-card-content>
                <sui-card-content extra>
                    <sui-container text-align="center">
                        <sui-button fluid content="En savoir plus"/>
                    </sui-container>
                </sui-card-content>
            </sui-card>

    </div>
</template>

<script>
    import axios from "axios";
    import global from "@/globals";

    export default {
        name: "BiereCard",
        props: {
                biere_id: String,
                styles : null
        },
        data () {
            return {
                biere: "",
                chargement: true,
                tab_styles: null,
                cardActive: false
            }
        },
        mounted () {
            axios.get(global.API + 'beers/' + global.API_KEY+'&ids=' + this.biere_id).then((response) =>{
                this.biere = response.data.data[0]
            }).catch(e => alert("erreur requete"+e))
            this.chargement = false
        },
        methods: {
            containsKey(obj, key ) {
                return Object.keys(obj).includes(key);
            }
        },
        computed: {
            hasImage() {
                return this.containsKey(this.biere, 'labels')
            },
            hasStyle () {
                return this.containsKey(this.biere,'style')
            },
            hasName() {
                return this.containsKey(this.biere, 'name')
            },
            hasDescription(){
                return this.containsKey(this.biere, 'description')
            }
        }

    }
</script>

<style scoped>

</style>
