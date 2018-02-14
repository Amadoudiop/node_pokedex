<template>
    <div id="AddPokemon">
        <div class="box">
            <div class="box-part" id="bp-left">
                <div class="partition" id="partition-register">
                    <!--<div class="partition-title">AJOUTER UN POKEMON</div>-->
                    <div class="row mt">
                        <div class="col-lg-10 col-lg-offset-1 centered">
                            <h3>Ajouter un Pokemon</h3>
                            <hr>
                            <p>{{ namePokemon }}</p>
                        </div>
                    </div>
                    <div class="partition-form">
                        <form autocomplete="false">

                            <div class="autocomplete-fix">
                                <input type="password">
                            </div>


                            <input id="n-name" value="" v-model="namePokemon" type="text" placeholder="Nom">
                            <input id="n-id-national" v-model="idnationalPokemon" value="" type="number"
                                   placeholder="Id national">
                            <textarea id="n-description" v-model="descriptionPokemon"
                                      placeholder="Description"></textarea>
                            <div v-if="!image">
                                <h4>Selectionner une image</h4>
                                <input type="file" @change="onFileChange">
                            </div>
                            <div v-else>
                                <h4>Image du pokemon :</h4>
                                <img :src="image"/>
                                <button style="margin: 10px" @click="removeImage">Remove image</button>
                            </div>
                            <div>
                                <h4>Type</h4>
                                <select class="type" v-on:change="addType()">
                                    <option>Aucun</option>
                                    <option v-for="key in types" :value="key.id">{{ key.type }}</option>
                                </select>
                                <ul class="type">
                                    <li v-for="keybis in typesSelect" class="selectType">
                                        <template v-if="keybis !== undefined"><span @click="removeType(keybis)"
                                                                                    class='glyphicon glyphicon-remove'></span>
                                            <span class='selectType'>{{ keybis }}</span>
                                        </template>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>Evolution</h4>
                                <select class="evolution" v-on:change="addEvolution()">
                                    <option>Aucune</option>
                                    <option v-for="key in names" :value="key.id">#{{ key.id_national }} - {{ key.name
                                        }}
                                    </option>
                                </select>
                                <ul class="evolution">
                                    <li v-for="key in namesSelect" class="selectEvolution">
                                        <template v-if="key !== undefined"><span @click="removeEvolution(key)"
                                                                                 class='glyphicon glyphicon-remove'></span><span
                                                class="selectEvolution">{{ key }}</span>
                                        </template>
                                    </li>
                                </ul>

                            </div>
                        </form>
                        <div style="margin-top: 42px"></div>
                        <div style="margin-top: 42px; box-sizing: border-box;
    padding: 5px;
    width: 100%;
    text-align: center;
    letter-spacing: 1px;
    font-size: 16px;
    font-weight: 300;
    color: #e00b0b;">
                                <span v-model="errorModal">
                                    {{errorModal}}</span>
                        </div>

                        <!--<div class="button-set">-->
                        <!---->
                        <!--&lt;!&ndash;<button id="goto-signin-btn">Sign In</button>&ndash;&gt;-->
                        <!--&lt;!&ndash;<button id="register-btn">Register</button>&ndash;&gt;-->
                        <!--</div>-->


                        <button class="large-btn facebook-btn" v-if="limitId <= parseInt(idnationalPokemon)" @click="addPokemon()"><span>Valider</span>
                        </button>
                        <button class="large-btn"><span><a href="http://localhost:8088/admin">< Retour à l'accueil</a></span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import $ from 'jquery'
    export default {
        name: 'addpokemon',

        data() {
            return {
                image: '',
                types: [],
                typesSelect: [],
                names: [],
                namesSelect: [],
                errorModal: '',
                namePokemon: '',
                idnationalPokemon: 0,
                descriptionPokemon: '',
                limitId: 0,
                inputName: ''
            }
        },
        methods: {
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.image = '';
            },
            validImage: function (e) {
                let $id = this.$route.params.id;
                $.ajax({
                    url: 'http://localhost/publicBis/zend-pokedex/public/api/pokemons/upload',
                    type: 'POST',
                    data: {'image': this.image, 'id': $id},
                    success: function (msg) {
                        console.log(msg);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            addPokemon: function (e) {
                console.log({'name': this.namePokemon, 'idnational': this.idnationalPokemon, 'description': this.descriptionPokemon, 'image': this.image, 'evolution': this.namesSelect, 'types': this.typesSelect},);

                $.ajax({
                    url: 'http://localhost/publicBis/zend-pokedex/public/api/pokemons/add',
                    type: 'POST',
                    data: {'name': this.namePokemon, 'idnational': this.idnationalPokemon, 'description': this.descriptionPokemon, 'image': this.image, 'evolution': this.namesSelect, 'types': this.typesSelect},
                    success: function (msg) {
                        console.log(msg);
                        location.href = 'http://localhost:8088/admin';
                    },
                    error: function (error) {
                        location.href = 'http://localhost:8088/admin/pokemons/add';
                        console.log(error);
                    }
                });
            },
            getTypes(){
                let self = this;
                this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/types').then(response => {
                    //self.types = response.body;
                    self.types = self.types.concat(response.body.map(type => {
                        return {
                            id: type.id,
                            type: type.type
                        }
                    }));
                }, response => {
                    // error callback
                    console.log('test fail types', response.body)
                });
            },
            getNames(){
                let self = this;
                this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/names').then(response => {
                    self.names = self.names.concat(response.body.map(poke => {
                        return {
                            id_national: poke.id_national,
                            name: poke.name
                        }
                    }));

                    self.names.sort((a, b) => {
                        return parseInt(a.id_national) - parseInt(b.id_national);
                    });
                    //self.names = response.body;
                }, response => {
                    // error callback
                    console.log('test fail names', response.body)
                });
            },
            getIdNational(){
                let self = this;
                this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/lastId').then(response => {
                    console.log(response.body);
                    self.limitId = parseInt(response.body)+1;
                    self.idnationalPokemon = parseInt(response.body)+1;
                    //self.names = response.body;
                }, response => {
                    // error callback
                    console.log('test fail names', response.body)
                });
            },
            addType(){

                let type = $('select.type option:selected').text();
                let idType = $('select.type option:selected').val();
                if (this.typesSelect.indexOf(type.trim()) === -1 && type !== 'Aucun') {
                    this.typesSelect.push(type.trim());
                }

            },
            addEvolution(){
                let evolution = $('select.evolution option:selected').text();
                let idEvolution = $('select.evolution option:selected').val();
                console.log("test", this.limitId, this.idnationalPokemon);
                if (this.namesSelect.indexOf(evolution.trim()) === -1 && evolution !== 'Aucune') {
                    this.namesSelect.push(evolution.trim());
                }
            },
            removeType(elem){
                let index = this.typesSelect.indexOf(elem);
                this.typesSelect.splice(index, 1);
            },
            removeEvolution(elem){
                let index = this.namesSelect.indexOf(elem);
                this.namesSelect.splice(index, 1);
            }


        },
        mounted() {
            console.log("test", this.limitId, this.idnationalPokemon);
            console.log("test", sessionStorage.getItem('userConnected'));
            if(!sessionStorage.getItem('userConnected')){
                console.log("test", sessionStorage.getItem('userConnected'));
                location.href = 'http://localhost:8088/';
            }
            this.getNames();
            //this.getIdNational();
            this.getTypes();
            let self = this;
//            $('ul.type').on('click', 'li.selectType', function () {
//                console.log('li', this);
//                self.removeType(this);
//                //self.typesSelect.remove(this.text());
//            });
//            $('ul.evolution').on('click', 'li.selectEvolution', function () {
//                console.log('li', this);
//                self.removeEvolution(this);
//                //self.namesSelect.remove(this.text());
//            });
        }
    }
</script>
<style>
    #backHome{
        background-color: white;
        color: #1abc9c;
        border: 1px solid #1abc9c;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        letter-spacing: 1px;
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        min-width: 140px;
        margin-top: 8px;
        cursor: pointer;

        text-transform: uppercase;
        transition: 0.1s all;
        font-size: 10px;
        outline: none;
        position: relative;
        bottom: 70px;
        right: 140px;
    }
    .box{
        width: 80%;
        margin-left: 10%;
        box-shadow: 0 0 0 white;
        background: white;
        overflow: hidden;
    }
    .box input{
        font-size: 14px !important;
    }
    #AddPokemon{
        margin-top: 6%;
        margin-bottom: 6%;
        font-size: 14px;
    }
    #backHome:hover{
        background-color: #1abc9c;
        color: white;
        border: 1px solid #1abc9c;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        letter-spacing: 1px;
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        min-width: 140px;
        margin-top: 8px;
        cursor: pointer;

        text-transform: uppercase;
        transition: 0.1s all;
        font-size: 10px;
        outline: none;
    }
    #backHome:hover a{
        color: white;
    }
    #AddPokemon .box {
        height: auto;
    }

    .glyphicon-remove {
        font-size: 20px !important;
        margin: 5px;
    }

    ul.type {
        font-size: 16px;
        margin-bottom: 30px;
    }

    ul.type li {
        margin: 5px;
        list-style-type: none;
    }

    ul.evolution {
        font-size: 16px;
    }

    ul.evolution li {
        font-size: 16px;
        list-style-type: none;
    }
</style>