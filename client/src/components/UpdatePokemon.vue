<template>
    <div id="AddPokemon">
        <modal name="demo-modal" transition="pop-out" :width="modalWidth" :height="500">
            <div class="box">

                    <div class="partition" id="partition-register2">
                        <div class="partition-title">Etes-vous sûr de vouloir supprimer {{ detail.name }} ? <br><img :src="'http://localhost/publicBis/zend-pokedex/public/img/'+detail.id_national+'mini.png'"/></div>
                        <div class="partition-form">
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


                            <button class="large-btn facebook-btn" v-on:click="deletePokemon()"><span>Supprimer</span>
                            </button>
                            <button v-on:click="hidePop()" class="large-btn github-btn"><span>Annuler</span></button>
                        </div>

                </div>
                <div class="box-part" id="bp-right">
                    <div class="box-messages">
                    </div>
                </div>
            </div>
        </modal>
        <div class="box">

            <div class="box-part" id="bp-left">
                <div class="partition" id="partition-register">
                    <!--<div class="partition-title">METTRE A JOUR LE POKEMON : {{ detail.name }}</div>-->
                    <div class="row mt">
                        <div class="col-lg-10 col-lg-offset-1 centered">
                            <h3>Mettre à jour le pokemon</h3>
                            <hr>
                            <p v-if="detail.id_national">{{ detail.name }}</p>
                            <p v-if="!detail.id_national">Aucun Pokemon ne correspond à cet identifiant</p>
                        </div>
                    </div>
                    <div class="partition-form">
                        <form autocomplete="false">

                            <div class="autocomplete-fix">
                                <input type="password">
                            </div>


                            <input id="n-name" v-if="idnationalPokemon" v-model="namePokemon" :value="detail.name" type="text" placeholder="Nom">
                            <input id="name" v-if="!detail.id_national" value="Inconnu" type="text" placeholder="Nom">
                            <input id="n-id-national" v-model="idnationalPokemon" :value="'#'+detail.id_national"
                                   type="text"
                                   placeholder="Id national" disabled>
                            <textarea id="n-description" v-model="descriptionPokemon"
                                      placeholder="Description">{{ detail.description }}</textarea>
                            <div v-if="!detail.picture && !image">
                                <h4>Selectionner une image</h4>
                                <input type="file" @change="onFileChange">
                            </div>
                            <div v-else-if="!detail.picture && image">
                                <h4>Image du pokemon :</h4>
                                <img :src="image"/>
                                <button style="margin: 10px" @click="removeImage">Remove image</button>
                            </div>
                            <div v-else>
                                <h4>Image du pokemon :</h4>
                                <img :src="'http://localhost/publicBis/zend-pokedex/public/img/'+detail.id_national+'.png'"/>
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
                                <!--<img :src='"../assets/" + key +".png"'/>-->
                            </div>
                            <div>
                                <h4>Evolution</h4>
                                <select class="evolution" v-on:change="addEvolution()">
                                    <option>Aucune</option>
                                    <option v-for="key in names" :value="key.id_national">#{{ key.id_national
                                        }} - {{ key.name }}
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

                        <div id="cross">
                            <div id="leftcross" v-on:click="precPoke()">
                                <div id="leftT"></div>
                            </div>
                            <!--<div id="topcross">-->
                            <!--<div id="upT"></div>-->
                            <!--</div>-->
                            <div id="rightcross" v-on:click="suivPoke()">
                                <div id="rightT"></div>
                            </div>
                            <div id="midcross">
                                <div id="midCircle"></div>
                            </div>
                            <!--<div id="botcross">-->
                            <!--<div id="downT"></div>-->
                            <!--</div>-->
                        </div>
                        <button class="large-btn facebook-btn" v-if="detail.id_national" v-on:click="updatePokemon()"><span>Valider</span>
                        </button>
                        <button class="large-btn"><span><a href="http://localhost:8088/admin">< Retour à l'accueil</a></span>
                        </button>
                        <br/>
                        <button class="large-btn  github-btn" v-if="detail.id_national" v-on:click="showPop()">
                            <span>Supprimer le pokemon</span>
                        </button>
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
                detail: {},
                type: '',
                names: [],
                namesSelect: [],
                errorModal: '',
                namePokemon: '',
                idnationalPokemon: 0,
                descriptionPokemon: '',
                limitId: 0
            }
        },
        methods: {
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                console.log("file ", files[0]);
                this.createImage(files[0]);
            },
            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                    console.log("result ", e.target.result);
                };
                console.log("file param ", file);
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.image = '';
                this.detail.picture = '';
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
            showPop() {
                this.$modal.show('demo-modal');
            },
            hidePop() {
                this.$modal.hide('demo-modal');
            },
            updatePokemon: function (e) {
                console.log({
                    'name': this.namePokemon,
                    'idnational': this.idnationalPokemon,
                    'description': this.descriptionPokemon,
                    'image': this.image,
                    'evolution': this.namesSelect,
                    'types': this.typesSelect
                });

                $.ajax({
                    url: 'http://localhost/publicBis/zend-pokedex/public/api/pokemons/update',
                    type: 'POST',
                    data: {
                        'name': this.namePokemon,
                        'idnational': this.idnationalPokemon,
                        'description': this.descriptionPokemon,
                        'image': this.image,
                        'evolution': this.namesSelect,
                        'types': this.typesSelect
                    },
                    success: function (msg) {
                        console.log(msg);
                        location.href = 'http://localhost:8088/admin';
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            deletePokemon() {
                //sconsole.log({'name': this.namePokemon, 'idnational': this.idnationalPokemon});
                console.log({
                    'name': this.namePokemon,
                    'idnational': this.idnationalPokemon,
                    'description': this.descriptionPokemon,
                    'image': this.image,
                    'evolution': this.namesSelect,
                    'types': this.typesSelect
                })

                $.ajax({
                    url: 'http://localhost/publicBis/zend-pokedex/public/api/pokemons/delete',
                    type: 'POST',
                    data: {
                        'name': this.namePokemon,
                        'idnational': this.idnationalPokemon,
                        'description': this.descriptionPokemon,
                        'image': this.image,
                        'evolution': this.namesSelect,
                        'types': this.typesSelect
                    },
                    success: function (msg) {
                        console.log(msg);
                        location.href = 'http://localhost:8088/admin';
                    },
                    error: function (error) {
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
            getDetails($id){
                let self = this;
                this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/details/' + $id).then(response => {
                    // get body data
                    this.pokemons = response.data;
                    this.detail = response.data[0];
                    self.typesSelect = self.typesSelect.concat(response.data[0].type.forEach(function (value) {
                        if (value !== null) {
                            console.log("push ", value);
                            self.typesSelect.push(value);
                            console.log("push ", self.typesSelect)
                        }

                    }));
                    self.namesSelect = self.namesSelect.concat(response.data[0].evolution.forEach(function (value) {
                        if (value !== null) {
                            console.log("push ", value);
                            self.namesSelect.push('#' + value.id_national + ' - ' + value.name);
                            console.log("push ", self.namesSelect)
                        }

                    }));
                    self.namePokemon = this.detail.name;
                    self.idnationalPokemon = this.detail.id_national;
                    self.descriptionPokemon = this.detail.description;
                }, response => {
                    // error callback
                    console.log("hey hey hey");
                    console.log('test2', response.body)
                });
            },
            addType(){

                let type = $('select.type option:selected').text();
                let idType = $('select.type option:selected').val();
                console.log('ok uuuueeeeessgg');
                if (this.typesSelect.indexOf(type) === -1 && type !== 'Aucun') {
                    this.typesSelect.push(type.trim());
                    console.log("evolution", type.trim())
                    //$('ul.type').append("<li class='selectType' value='" + idType + "'><span class='glyphicon glyphicon-remove'></span><span class='selectType'>" + type + "</span></li>");
                }
                console.log('array', this.typesSelect);
            },
            addEvolution(){
                let evolution = $('select.evolution option:selected').text();
                let idEvolution = $('select.evolution option:selected').val();
                if (this.namesSelect.indexOf(evolution.trim()) === -1 && evolution !== 'Aucune') {
                    this.namesSelect.push(evolution.trim());
                }
                console.log('array', this.namesSelect);
            },
            removeType(elem){
                let index = this.typesSelect.indexOf(elem);
                this.typesSelect.splice(index, 1);
            },
            removeEvolution(elem){
                let index = this.namesSelect.indexOf(elem);
                this.namesSelect.splice(index, 1);
            },
            precPoke(){
                let $id = this.$route.params.id;
                let id = parseInt($id)-1;
                if(id < 10){
                    id = "00"+id.toString();
                }else if(id < 100){
                    id = "0"+id.toString();
                }
                console.log("hey hey hey", id);
                location.href = "http://localhost:8088/admin/pokemons/update/"+id;
            },
            suivPoke(){
                let $id = this.$route.params.id;
                let id = parseInt($id)+1;
                if(id < 10){
                    id = "00"+id.toString();
                }else if(id < 100){
                    id = "0"+id.toString();
                }
                console.log("ho ho ho", id);
                location.href = "http://localhost:8088/admin/pokemons/update/"+id;
            },
        },
        mounted() {
            if (!sessionStorage.getItem('userConnected')) {
                console.log("test", sessionStorage.getItem('userConnected'));
                location.href = 'http://localhost:8088/';
            }
            this.getNames();
            this.getTypes();
            this.getDetails(this.$route.params.id);
            let self = this;
            console.log('array', self.namesSelect);
            console.log('array', self.typesSelect);
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
            this.namesSelect.forEach(function (value) {
                console.log("value", value);
                if (value !== null) {
                    console.log("value test ");
                }
            });

        }
    }
</script>
<style>
    #cross {
        position: initial !important;
    }
    div#cross{
        height: 0px !important;
    }
    #midcross{
        display: none;
    }
    #cross div{
        background-color: #1abc9c;
    }
    #leftcross, #rightcross{
        top:80px !important;
    }

    .box{
        width: 80%;
        margin-left: 10%;
        box-shadow: 0 0 0 white;
    }

    .box input{
        font-size: 14px !important;
    }

    #backHome {
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

    #backHome:hover {
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

    #backHome:hover a {
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