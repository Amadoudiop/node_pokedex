<template>

    <div id="app">
        <modal name="demo-login" transition="pop-out" :width="modalWidth" :height="400">
            <div class="box">
                <div class="box-part" id="bp-left">
                    <div class="partition" id="partition-register">
                        <div class="partition-title">CONNEXION</div>
                        <div class="partition-form">
                            <form autocomplete="false">

                                <div class="autocomplete-fix">
                                    <input type="password">
                                </div>


                                <input id="n-username" value="" type="text" placeholder="Login">
                                <input id="n-password2" value="" type="password" placeholder="Password">
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


                            <button class="large-btn facebook-btn" v-on:click="connexion()"><span>Valider</span>
                            </button>
                            <button v-on:click="hide()" class="large-btn github-btn"><span>Annuler</span></button>
                        </div>
                    </div>
                </div>
                <div class="box-part" id="bp-right">
                    <div class="box-messages">
                    </div>
                </div>
            </div>
        </modal>
        <link href="/static/template/css/bootstrap.css" rel="stylesheet">
        <link href="/static/template/css/main.css" rel="stylesheet">
        <div class="navbar navbar-inverse navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="http://localhost:8088/">POKEZEND</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <!--<li><a href="work.html">Work</a></li>-->
                        <!--<li><a href="about.html">About</a></li>-->
                        <!--<li><a href="blog.html">Blog</a></li>-->
                        <li><a href="http://localhost:8088/">Accueil</a></li>
                        <li v-if="stateUser"><a href="http://localhost:8088/admin">Admin</a></li>
                        <li v-if="!stateUser"><a v-on:click="show()">Connexion</a></li>
                        <li v-if="stateUser"><a v-on:click="deconnexion()">Déconnexion</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- +++++ Welcome Section +++++ -->
        <!--<div id="ww">-->
            <!--<div class="container">-->
                <!--<div class="row">-->
                    <!--<div class="col-lg-8 col-lg-offset-2 centered">-->
                        <!--<img src="/static/template/img/user.png" alt="Stanley">-->
                        <!--<h1>Hi, I am Stanley!</h1>-->
                        <!--<p>-->
                            <!--Hello everybody. I'm Stanley, a free handsome bootstrap theme coded by BlackTie.co. A really simple theme for those wanting to showcase their work with a cute & clean style.</p>-->
                        <!--<p>Please, consider to register to <a href="http://eepurl.com/IcgkX">our newsletter</a>-->
                            <!--to be updated with our latest themes and freebies. Like always, you can use this theme in any project freely. Share it with your friends.-->
                        <!--</p>-->

                    <!--</div>&lt;!&ndash; /col-lg-8 &ndash;&gt;-->
                <!--</div>&lt;!&ndash; /row &ndash;&gt;-->
            <!--</div> &lt;!&ndash; /container &ndash;&gt;-->
        <!--</div>&lt;!&ndash; /ww &ndash;&gt;-->
        <!--<img src="./assets/logo.png">-->
        <router-view></router-view>
        <!-- +++++ Projects Section +++++ -->

        <div class="container pt">

            <div id="demo">

                <div class="leftDiv">
                    <form id="search">
                        <strong>Chercher</strong><input name="query" v-model="searchQuery">
                        <a id="addPokemon" href="http://localhost:8088/admin/pokemons/add"><button class="btn btn-warning">Ajouter un pokemon</button></a>
                    </form>
                    <tableau
                            :data="gridData"
                            :columns="gridColumns"
                            :filter-key="searchQuery">
                    </tableau>
                </div>


                <div id="map" class="rightDiv">
                    <pokemap>

                    </pokemap>
                </div>
            </div>
            <!--<div class="row mt centered">-->
            <!--<div class="col-lg-4">-->
            <!--<a class="zoom green" href="work01.html"><img class="img-responsive" src="/static/template/img/portfolio/port01.jpg" alt="" /></a>-->
            <!--<p>APE</p>-->
            <!--</div>-->
            <!--<div class="col-lg-4">-->
            <!--<a class="zoom green" href="work01.html"><img class="img-responsive" src="/static/template/img/portfolio/port02.jpg" alt="" /></a>-->
            <!--<p>RAIDERS</p>-->
            <!--</div>-->
            <!--<div class="col-lg-4">-->
            <!--<a class="zoom green" href="work01.html"><img class="img-responsive" src="/static/template/img/portfolio/port03.jpg" alt="" /></a>-->
            <!--<p>VIKINGS</p>-->
            <!--</div>-->
            <!--</div>&lt;!&ndash; /row &ndash;&gt;-->
            <!--<div class="row mt centered">-->
            <!--<div class="col-lg-4">-->
            <!--<a class="zoom green" href="work01.html"><img class="img-responsive" src="/static/template/img/portfolio/port04.jpg" alt="" /></a>-->
            <!--<p>YODA</p>-->
            <!--</div>-->
            <!--<div class="col-lg-4">-->
            <!--<a class="zoom green" href="work01.html"><img class="img-responsive" src="/static/template/img/portfolio/port05.jpg" alt="" /></a>-->
            <!--<p>EMPERORS</p>-->
            <!--</div>-->
            <!--<div class="col-lg-4">-->
            <!--<a class="zoom green" href="work01.html"><img class="img-responsive" src="/static/template/img/portfolio/port06.jpg" alt="" /></a>-->
            <!--<p>CHIEFS</p>-->
            <!--</div>-->
            <!--</div>&lt;!&ndash; /row &ndash;&gt;-->
        </div><!-- /container -->


        <!-- +++++ Footer Section +++++ -->

        <div id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <h4>Pokezend</h4>
                        <p>
                            Zend 2<br/>
                            VueJS 2 <br/>

                        </p>
                    </div><!-- /col-lg-4 -->

                    <div class="col-lg-4">
                        <!--<h4>My Links</h4>-->
                        <!--<p>-->
                            <!--<a href="#">Dribbble</a><br/>-->
                            <!--<a href="#">Twitter</a><br/>-->
                            <!--<a href="#">Facebook</a>-->
                        <!--</p>-->
                    </div>

                    <div class="col-lg-4">
                        <h4>A propos de Pokezend</h4>
                        <p>Pokezend regroupe les premières générations de Pokemon mais son système est évolutif. A l'aide d'une carte, vous pourrez les géolocaliser !</p>
                    </div><!-- /col-lg-4 -->

                </div>

            </div>
        </div>

    </div>

</template>
<script src="/static/template/js/bootstrap.min.js"></script>
<script>
    import Tableau from './components/Tableau.vue'
    import Pokemap from './components/Pokemap.vue'
    import router from './router'
    import bus from './bus'
    import store from './store'
    import $ from 'jquery'

    const MODAL_WIDTH = 956;

    export default {
        name: 'app',
        components: {Tableau, Pokemap},
        data() {
            return {
                pokemons: [],
                user: {},
                pokemonsName: [],
                searchQuery: '',
                gridColumns: ['selection', 'id_national', 'name', 'evolution', 'type', 'picture'],
                gridData: [],
                stateMarkers: [],
                modalWidth: MODAL_WIDTH,
                errorModal: '',
                markers: [],
                stateUser: ''
            }
        },
        methods: {
            getList(){
                this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/getList').then(response => {
                    // get body data
                    this.pokemons = response.data;
                    const array = [];
                    let obj = {};
                    let type = [];
                    let evolution = [];
                    for (let i = 0; i < response.data.length; i++) {
                        obj = {};
                        type = [];
                        evolution = [];
                        obj['id_national'] = response.data[i].id_national;
                        obj['name'] = response.data[i].name;
                        for (let j = 0; j < response.data[i].type.length; j++) {
                            type.push(response.data[i].type[j]);
                            //type += " " + response.data[i].type[j] + " <img src='http://localhost:8088/assets/" + response.data[i].type[j] +".png'>";
                        }
                        obj['type'] = type;
                        for (let k = 0; k < response.data[i].evolution.length; k++) {

                            evolution.push({
                                id_national : response.data[i].evolution[k].id_national,
                                name : response.data[i].evolution[k].name
                            });
                        }
                        evolution.push({
                            id_national : response.data[i].id_national,
                            name : response.data[i].name
                        });
                        evolution.sort( (a, b) => {
                            return parseInt(a.id_national) - parseInt(b.id_national)
                        })
                        obj['evolution'] = evolution;


                        obj['picture'] = response.data[i].picture;
                        array.push(obj);
                        //console.log('array', array);
                    }
                    array.sort( (a,b) => {
                        return parseInt(a.id_national) - parseInt(b.id_national)
                    });
                    this.gridData = array;
                }, response => {
                    // error callback
                    console.log('test2', response.body)
                });
            },
            show() {
                this.$modal.show('demo-login');
            },
            deconnexion() {
                sessionStorage.removeItem('userConnected');
                location.href = 'http://localhost:8088/';
            },
            hide() {
                this.$modal.hide('demo-login');
            },
            test($id){

            },
            connexion(){
                let login = $('#n-username').val();
                let password = $('#n-password2').val();
                console.log('state', this.$store.state)
                console.log('local state', sessionStorage)
                let self = this;

                $.ajax({
                    url: 'http://localhost/publicBis/zend-pokedex/public/api/admin/connexion',
                    type: 'POST',
                    data: {'login': login, 'password': password},
                    success: function (msg) {
                        if (msg[0]) {
                            self.errorModal = 'Correct';
                            console.log('local state', sessionStorage)

                            sessionStorage.setItem('userConnected', true);

                            console.log('local state', sessionStorage)
                            location.href = 'http://localhost:8088/';
                        } else {
                            self.errorModal = "Login et / ou mot de passe incorrect";
                        }

                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        },
        mounted() {
            $('#addPokemon button').on('click', function (e) {
                e.preventDefault();
                location.href = 'http://localhost:8088/admin/pokemons/add';
            })
            this.stateUser = sessionStorage.getItem('userConnected')

            console.log('state', this.stateUser)
            console.log('local state', sessionStorage)
            this.modalWidth = window.innerWidth < MODAL_WIDTH
                ? MODAL_WIDTH / 2
                : MODAL_WIDTH;

            if (this.$route.fullPath === '/') {
                this.getList();
                $('#demo').css('display', 'flex');
                $('.vue-map-container').css('height', '600px');
                $('.vue-map-container').css('position', 'fixed');
                $('.vue-map-container').css('top', '230px');
                $('#autocomplete').css('display', 'inline');
                $('#addPokemon').css('display', 'none');
                $('#spanAutocomplete').css('top', '205px');
                $('#spanAutocomplete').css('right', '20%');
                $('#spanAutocomplete').css('position', 'fixed');
                $('#spanTitle').text('Indiquez un lieu : ');

            } else if (this.$route.fullPath === '/admin'){
                if(!sessionStorage.getItem('userConnected')){
                    location.href = 'http://localhost:8088/';
                }
                this.getList();
//                //$('#demo').css('display', 'none');
                this.gridColumns.push('action');
                this.gridColumns.splice(this.gridColumns.indexOf('selection'), 1);
                $('#map').css('display', 'none');
                $('#addPokemon').css('display', 'inline');
                $('.leftDiv').css('width', '60%');
                $('.leftDiv').css('min-width', '980px');
                $('#demo').css('display', 'flex');
            }
            else {
                $('#demo').css('display', 'none');
            }
            if (this.$route.fullPath.indexOf('/details') !== -1) {
                this.getList();
                $('#footer').css('margin-top', '75px');
                $('#footer').css('z-index', '100000000000');
                $('#autocomplete').css('display', 'inline');
                $('#autocomplete').css('z-index', '20');
                $('#autocomplete').css('min-width', '250px');
                $('#spanAutocomplete').css('position', 'relative');
                $('.vue-map-container').css('position', 'relative !important');
                $('.vue-map-container').css('top', '150px');
                $('.vue-map div div.gm-style div div div div div div div').css('background-color', 'red');

            }

        }
    }
</script>
<style lang="scss">
    $background_color: #404142;
    $github_color: #DBA226;
    $facebook_color: #3880FF;
    .box {
        background: white;
        overflow: hidden;
        width: 956px;
        height: 600px;
        border-radius: 2px;
        box-sizing: border-box;
        box-shadow: 0 0 40px black;
        color: #8b8c8d;
        font-size: 0;
        .box-part {
            display: inline-block;
            position: relative;
            vertical-align: top;
            box-sizing: border-box;
            height: 100%;
            width: 50%;
            &#bp-right {
                background: url("/static/template/img/panorama.jpg") no-repeat top left;
                border-left: 1px solid #eee;
            }
        }
        .box-messages {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
        }
        .box-error-message {
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            height: 0;
            line-height: 32px;
            padding: 0 12px;
            text-align: center;
            width: 100%;
            font-size: 11px;
            color: white;
            background: #F38181;
        }
        .partition {
            width: 100%;
            height: 100%;
            .partition-title {
                box-sizing: border-box;
                padding: 30px;
                width: 100%;
                text-align: center;
                letter-spacing: 1px;
                font-size: 20px;
                font-weight: 300;
            }
            .partition-form {
                padding: 0 20px;
                box-sizing: border-box;
            }
        }
        input[type=password],
        input[type=text],
        input[type=file],
        input[type=number],
        select,
        textarea {
            display: block;
            box-sizing: border-box;
            margin-bottom: 4px;
            width: 100%;
            font-size: 12px;
            line-height: 2;
            border: 0;
            border-bottom: 1px solid #DDDEDF;
            padding: 4px 8px;
            font-family: inherit;
            transition: 0.5s all;
            outline: none;
        }
        button {
            background: white;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 10px;
            letter-spacing: 1px;
            font-family: "Open Sans", sans-serif;
            font-weight: 400;
            min-width: 140px;
            margin-top: 8px;
            color: #8b8c8d;
            cursor: pointer;
            border: 1px solid #DDDEDF;
            text-transform: uppercase;
            transition: 0.1s all;
            font-size: 10px;
            outline: none;
            &:hover {
                border-color: mix(#DDDEDF, black, 90%);
                color: mix(#8b8c8d, black, 80%);
            }
        }
        .large-btn {
            width: 100%;
            background: white;
            span {
                font-weight: 600;
            }
            &:hover {
                color: white !important;
            }
        }
        .button-set {
            margin-bottom: 8px;
        }
        #register-btn,
        #signin-btn {
            margin-left: 8px;
        }
        .facebook-btn {
            border-color: $facebook_color;
            color: $facebook_color;
            &:hover {
                border-color: $facebook_color;
                background: $facebook_color;
            }
        }
        .github-btn {
            border-color: $github_color;
            color: $github_color;
            &:hover {
                border-color: $github_color;
                background: $github_color;
            }
        }
        .autocomplete-fix {
            position: absolute;
            visibility: hidden;
            overflow: hidden;
            opacity: 0;
            width: 0;
            height: 0;
            left: 0;
            top: 0;
        }
    }

    .pop-out-enter-active,
    .pop-out-leave-active {
        transition: all 0.5s;
    }

    .pop-out-enter,
    .pop-out-leave-active {
        opacity: 0;
        transform: translateY(24px);
    }
</style>
<style>
    #app {
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    * {
        margin: 0;
        padding: 0;
    }

    @media all {
        #search{
            border: 1px solid #42b983;
            background: #42b983;
            width: 99.9%;
            min-width: 671px;
            padding: 5px;
            color: rgba(255, 255, 255, 0.66);
        }
        #addPokemon, #seePoke{
            display: none;
        }
        #autocomplete{
            display: inline;
        }
        #mapCompo{
            position: fixed !important;
        }
        .evolOwn{
            border: 2px solid grey;
            padding: 2px;
        }
        #search input{
            margin: 0px 5px;
        }


        .navbar {
            z-index: 990 !important;
        }

        .pt {
            width: 100% !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        #demo{
            width: 100% !important;
            display: none;
            justify-content: space-around;
            align-items: center;
            padding: 0;
        }

        div.leftDiv{
            display: inline-block;
            margin: 0;
            width: 55%;
            position: relative;
            bottom:70px;
            margin-top: 30px;
        }
        table{
            width: 100%;
        }

        div.rightDiv{
            display: inline-block;
            margin: 0;
            width: 45%;
        }

        div#pokedex {
            width: 750px;
            margin: 50px auto 0 auto;
        }

        div#left {
            width: 400px;
            height: 500px;
            float: left;
            position: relative;
            z-index: 1;
        }

        div#right {
            width: 350px;
            height: 500px;
            float: left;
            position: relative;
        }

        /* //// LEFT PART //// */
        div#curve1_left {
            width: 201px;
            height: 85px;
            background-color: #8b0000;
            float: left;
            padding: 15px 0 0 15px;

            position: absolute;
            top: 0;
            left: 0;

            box-shadow: -10px 9px #5e0000;
            -webkit-box-shadow: -10px 9px #5e0000;
            -moz-box-shadow: -10px 9px #5e0000;
            -o-box-shadow: -10px 9px #5e0000;

            border-bottom-right-radius: 85px 60px;
            -webkit-border-bottom-right-radius: 85px 60px;
            -moz-border-bottom-right-radius: 85px 60px;
            -o-border-bottom-right-radius: 85px 60px;

            border-top-left-radius: 30px;
            -webkit-border-top-left-radius: 30px;
            -moz-border-top-left-radius: 30px;
            -o-border-top-left-radius: 30px;
        }

        div#bg_curve1_left {
            width: 400px;
            height: 80px;
            background-color: #8b0000;

            border-top-left-radius: 30px;
            -webkit-border-top-left-radius: 30px;
            -moz-border-top-left-radius: 30px;
            -o-border-top-left-radius: 30px;
        }

        div#curve2_left {
            width: 216px;
            height: 451px;
            background-color: #c00d0d;
            float: right;

            position: absolute;
            bottom: 0;
            right: 0;

            border-top-left-radius: 85px 60px;
            -webkit-border-top-left-radius: 85px 60px;
            -moz-border-top-left-radius: 85px 60px;
            -o-border-top-left-radius: 85px 60px;
        }

        div#bg_curve2_left {
            width: 400px;
            height: 420px;
            background-color: #c00d0d;

            box-shadow: -10px 9px #5e0000;
            -webkit-box-shadow: -10px 9px #5e0000;
            -moz-box-shadow: -10px 9px #5e0000;
            -o-box-shadow: -10px 9px #5e0000;

            border-bottom-left-radius: 30px;
            -webkit-border-bottom-left-radius: 30px;
            -moz-border-bottom-left-radius: 30px;
            -o-border-bottom-left-radius: 30px;
        }

        div#buttonGlass {
            width: 60px;
            height: 60px;
            margin-right: 15px;
            border: 5px solid #fff;
            float: left;

            box-shadow: 0 0 10px #490000;
            -webkit-box-shadow: 0 0 10px #490000;
            -moz-box-shadow: 0 0 10px #490000;
            -o-box-shadow: 0 0 10px #490000;

            background: radial-gradient(#05fbfb, #29abe3);
            background: -webkit-radial-gradient(#05fbfb, #29abe3);
            background: -moz-radial-gradient(#05fbfb, #29abe3);
            background: -o-radial-gradient(#05fbfb, #29abe3);

            border-radius: 35px;
            -webkit-border-radius: 35px;
            -moz-border-radius: 35px;
            -o-border-radius: 35px;
        }

        div#reflect {
            width: 30px;
            height: 18px;
            margin: 3px 0 0 15px;
            background: #fff;
            opacity: 0.6;

            border-radius: 15px 9px;
            -webkit-border-radius: 15px 9px;
            -moz-border-radius: 15px 9px;
            -o-border-radius: 15px 9px;

        }

        div#miniButtonGlass1 {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            float: left;

            box-shadow: 0 0 10px #490000;
            -webkit-box-shadow: 0 0 10px #490000;
            -moz-box-shadow: 0 0 10px #490000;
            -o-box-shadow: 0 0 10px #490000;

            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            -o-border-radius: 20px;

            background: radial-gradient(#fb7b7b, #fb0505);
            background: -webkit-radial-gradient(#fb7b7b, #fb0505);
            background: -moz-radial-gradient(#fb7b7b, #fb0505);
            background: -o-radial-gradient(#fb7b7b, #fb0505);
        }

        div#miniButtonGlass2 {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            float: left;

            box-shadow: 0 0 10px #490000;
            -webkit-box-shadow: 0 0 10px #490000;
            -moz-box-shadow: 0 0 10px #490000;
            -o-box-shadow: 0 0 10px #490000;

            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            -o-border-radius: 20px;

            background: radial-gradient(#fbfb9b, #fbfb05);
            background: -webkit-radial-gradient(#fbfb9b, #fbfb05);
            background: -moz-radial-gradient(#fbfb9b, #fbfb05);
            background: -o-radial-gradient(#fbfb9b, #fbfb05);
        }

        div#miniButtonGlass3 {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            float: left;

            box-shadow: 0 0 10px #490000;
            -webkit-box-shadow: 0 0 10px #490000;
            -moz-box-shadow: 0 0 10px #490000;
            -o-box-shadow: 0 0 10px #490000;

            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            -o-border-radius: 20px;

            background: radial-gradient(#b0fb7b, #50fb05);
            background: -webkit-radial-gradient(#b0fb7b, #50fb05);
            background: -moz-radial-gradient(#b0fb7b, #50fb05);
            background: -o-radial-gradient(#b0fb7b, #50fb05);
        }

        div#junction {
            width: 60px;
            height: 451px;
            float: right;

            background: linear-gradient(left, #8b0000 0%, #c00d0d 50%, #8b0000 100%);
            background: -webkit-linear-gradient(left, #8b0000 0%, #c00d0d 50%, #8b0000 100%);
            background: -moz-linear-gradient(left, #8b0000 0%, #c00d0d 50%, #8b0000 100%);
            background: -o-linear-gradient(left, #8b0000 0%, #c00d0d 50%, #8b0000 100%);
        }

        div#junction1 {
            height: 40px;
            background-color: #5e0000;
            opacity: 0.3;
            margin-top: 50px;
            margin-bottom: 262px;

            border-top: 2px solid #330000;
            border-bottom: 2px solid #330000;
        }

        div#junction2 {
            height: 40px;
            background-color: #5e0000;
            opacity: 0.3;

            border-top: 2px solid #330000;
            border-bottom: 2px solid #330000;
        }

        div#screen {
            height: 245px;
            width: 260px;
            padding: 0 20px;
            background-color: #b0b0b0;
            float: left;

            position: absolute;
            top: 130px;
            left: 19px;

            border-radius: 15px;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            -o-border-radius: 15px;
        }

        div#screen:after {
            content: "";
            border-top: 40px solid #b0b0b0;
            border-left: 40px solid #c00d0d;
            height: 0;

            position: absolute;
            bottom: 0;
            left: 0;
        }

        div#picture {
            height: 175px;
            width: 254px;
            margin-top: 20px;
            margin-bottom: 9px;
            background-color: #fff;
            border: 3px solid #494949;
            clear: both;

            border-radius: 15px;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            -o-border-radius: 15px;
        }

        div#picture img {
            display: block;
            margin: 0 auto;
        }

        div#topPicture {
            margin: 6px auto;
            width: 40px;
        }

        div#buttontopPicture1, div#buttontopPicture2 {
            height: 8px;
            width: 8px;
            background-color: #c00d0d;
            border: 1px solid #000;
            float: left;

            border-radius: 15px;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            -o-border-radius: 15px;
        }

        div#buttontopPicture1 {
            margin-right: 20px;
        }

        div#buttonbottomPicture {
            height: 26px;
            width: 26px;
            background-color: #c00d0d;
            margin-left: 35px;
            float: left;

            border-radius: 30px;
            -webkit-border-radius: 30px;
            -moz-border-radius: 30px;
            -o-border-radius: 30px;

            box-shadow: -2px 1px #5e0000;
            -webkit-box-shadow: -2px 1px #5e0000;
            -moz-box-shadow: -2px 1px #5e0000;
            -o-box-shadow: -2px 1px #5e0000;

            background: linear-gradient(top, #c00d0d 0%, #8b0000 80%);
            background: -webkit-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
            background: -moz-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
            background: -o-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
        }

        div#speakers {
            float: right;
            width: 75px;
            height: 25px;
            margin-right: 20px;
        }

        div.sp {
            height: 3px;
            margin-bottom: 5px;
            background-color: #494949;

            border-radius: 30px;
            -webkit-border-radius: 30px;
            -moz-border-radius: 30px;
            -o-border-radius: 30px;
        }


        div#barbutton1 {
            height: 13px;
            width: 50px;

            position: absolute;
            top: 405px;
            left: 100px;

            border-radius: 100px;
            -webkit-border-radius: 100px;
            -moz-border-radius: 100px;
            -o-border-radius: 100px;

            background: linear-gradient(top, #50fb05 0%, #057b05 100%);
            background: -webkit-linear-gradient(top, #50fb05 0%, #057b05 100%);
            background: -moz-linear-gradient(top, #50fb05 0%, #057b05 100%);
            background: -o-linear-gradient(top, #50fb05 0%, #057b05 100%);

            box-shadow: -1px 2px #004200;
            -webkit-box-shadow: -1px 2px #004200;
            -moz-box-shadow: -1px 2px #004200;
            -o-box-shadow: -1px 2px #004200;
        }

        div#barbutton2 {
            height: 13px;
            width: 50px;

            position: absolute;
            top: 405px;
            left: 165px;

            border-radius: 100px;
            -webkit-border-radius: 100px;
            -moz-border-radius: 100px;
            -o-border-radius: 100px;

            background: linear-gradient(top, #fb6505 0%, #bb0505 100%);
            background: -webkit-linear-gradient(top, #fb6505 0%, #bb0505 100%);
            background: -moz-linear-gradient(top, #fb6505 0%, #bb0505 100%);
            background: -o-linear-gradient(top, #fb6505 0%, #bb0505 100%);

            box-shadow: -1px 2px #7b0000;
            -webkit-box-shadow: -1px 2px #7b0000;
            -moz-box-shadow: -1px 2px #7b0000;
            -o-box-shadow: -1px 2px #7b0000;
        }

        div#cross {
            width: 90px;
            height: 90px;

            position: absolute;
            top: 394px;
            left: 230px;
        }

        div#topcross {
            width: 30px;
            height: 30px;
            background-color: #222;

            position: absolute;
            top: 0;
            left: 30px;

            box-shadow: -3px 2px #010101;
            -webkit-box-shadow: -3px 2px #010101;
            -moz-box-shadow: -3px 2px #010101;
            -o-box-shadow: -3px 2px #010101;

            border-top-left-radius: 5px;
            -webkit-border-top-left-radius: 5px;
            -moz-border-top-left-radius: 5px;
            -o-border-top-left-radius: 5px;

            border-top-right-radius: 5px;
            -webkit-border-top-right-radius: 5px;
            -moz-border-top-right-radius: 5px;
            -o-border-top-right-radius: 5px;
        }

        div#leftcross {
            width: 30px;
            height: 30px;
            background-color: #222;
            z-index: 1;

            position: absolute;
            left: 0;
            top: 30px;

            box-shadow: -3px 2px #010101;
            -webkit-box-shadow: -3px 2px #010101;
            -moz-box-shadow: -3px 2px #010101;
            -o-box-shadow: -3px 2px #010101;

            border-top-left-radius: 5px;
            -webkit-border-top-left-radius: 5px;
            -moz-border-top-left-radius: 5px;
            -o-border-top-left-radius: 5px;

            border-bottom-left-radius: 5px;
            -webkit-border-bottom-left-radius: 5px;
            -moz-border-bottom-left-radius: 5px;
            -o-border-bottom-left-radius: 5px;
        }

        div#midcross {
            width: 30px;
            height: 30px;
            background-color: #222;

            position: absolute;
            top: 30px;
            left: 30px;

            box-shadow: -3px 2px #010101;
            -webkit-box-shadow: -3px 2px #010101;
            -moz-box-shadow: -3px 2px #010101;
            -o-box-shadow: -3px 2px #010101;
        }

        div#rightcross {
            width: 30px;
            height: 30px;
            background-color: #222;

            position: absolute;
            top: 30px;
            right: 0;

            box-shadow: -3px 2px #010101;
            -webkit-box-shadow: -3px 2px #010101;
            -moz-box-shadow: -3px 2px #010101;
            -o-box-shadow: -3px 2px #010101;

            border-top-right-radius: 5px;
            -webkit-border-top-right-radius: 5px;
            -moz-border-top-right-radius: 5px;
            -o-border-top-right-radius: 5px;

            border-bottom-right-radius: 5px;
            -webkit-border-bottom-right-radius: 5px;
            -moz-border-bottom-right-radius: 5px;
            -o-border-bottom-right-radius: 5px;
        }

        div#botcross {
            width: 30px;
            height: 30px;
            background-color: #222;

            position: absolute;
            bottom: 0;
            left: 30px;

            box-shadow: -3px 2px #010101;
            -webkit-box-shadow: -3px 2px #010101;
            -moz-box-shadow: -3px 2px #010101;
            -o-box-shadow: -3px 2px #010101;

            border-bottom-left-radius: 5px;
            -webkit-border-bottom-left-radius: 5px;
            -moz-border-bottom-left-radius: 5px;
            -o-border-bottom-left-radius: 5px;

            border-bottom-right-radius: 5px;
            -webkit-border-bottom-right-radius: 5px;
            -moz-border-bottom-right-radius: 5px;
            -o-border-bottom-right-radius: 5px;
        }

        div#upT {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #111;

            position: absolute;
            top: 5px;
            left: 4px;
        }

        div#downT {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #111;

            position: absolute;
            bottom: 5px;
            left: 4px;
        }

        div#leftT {
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-right: 10px solid #111;
            border-bottom: 10px solid transparent;

            position: absolute;
            top: 5px;
            left: 4px;
        }

        div#rightT {
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-left: 10px solid #111;
            border-bottom: 10px solid transparent;

            position: absolute;
            top: 5px;
            right: 5px;
        }

        div#midCircle {
            width: 20px;
            height: 20px;

            position: absolute;
            top: 5px;
            left: 4px;

            border-radius: 30px;
            -webkit-border-radius: 30px;
            -moz-border-radius: 30px;
            -o-border-radius: 30px;

            background: radial-gradient(#111, #222);
            background: -webkit-radial-gradient(#111, #222);
            background: -moz-radial-gradient(#111, #222);
            background: -o-radial-gradient(#111, #222);
        }

        /* //// RIGHT PART //// */
        div#curve1_right {
            width: 166px;
            height: 451px;
            background-color: #c00d0d;
            float: right;

            position: absolute;
            bottom: 0;
            left: 0;

            border-top-right-radius: 85px 60px;
            -webkit-border-right-left-radius: 85px 60px;
            -moz-border-right-left-radius: 85px 60px;
            -o-border-right-left-radius: 85px 60px;
        }

        div#bg_curve1_right {
            width: 350px;
            height: 80px;
            background-color: #fff;

            border-top-right-radius: 30px;
            -webkit-border-top-right-radius: 30px;
            -moz-border-top-right-radius: 30px;
            -o-border-top-right-radius: 30px;
        }

        div#curve2_right {
            width: 216px;
            height: 100px;
            background-color: #fff;
            float: left;

            position: absolute;
            top: 0;
            right: 0;

            border-bottom-left-radius: 85px 60px;
            -webkit-border-bottom-left-radius: 85px 60px;
            -moz-border-bottom-left-radius: 85px 60px;
            -o-border-bottom-left-radius: 85px 60px;
        }

        div#bg_curve2_right {
            width: 350px;
            height: 420px;
            background-color: #c00d0d;

            border-bottom-right-radius: 30px;
            -webkit-border-bottom-right-radius: 30px;
            -moz-border-bottom-right-radius: 30px;
            -o-border-bottom-right-radius: 30px;

            box-shadow: -10px 9px #5e0000;
            -webkit-box-shadow: -10px 9px #5e0000;
            -moz-box-shadow: -10px 9px #5e0000;
            -o-box-shadow: -10px 9px #5e0000;
        }

        div#stats {
            height: 130px;
            width: 280px;
            padding: 6px;
            background-color: #30da0c;
            z-index: 1;
            font-size: 13px;
            font-family: arial, sans-serif;

            position: absolute;
            top: 130px;
            left: 25px;

            border-radius: 15px;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            -o-border-radius: 15px;

            box-shadow: 0 0 20px #003300 inset;
            -webkit-box-shadow: 0 0 20px #003300 inset;
            -moz-box-shadow: 0 0 20px #003300 inset;
            -o-box-shadow: 0 0 20px #003300 inset;
        }

        div#blueButtons1 {
            z-index: 1;

            position: absolute;
            top: 295px;
            left: 49px;
        }

        div#blueButtons2 {
            z-index: 1;

            position: absolute;
            top: 335px;
            left: 49px;
        }

        div.blueButton {
            height: 35px;
            width: 45px;
            background-color: #003300;
            float: left;
            margin-right: 7px;

            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -o-border-radius: 10px;

            background: linear-gradient(top, #307bfb 0%, #0530e5 80%);
            background: -webkit-linear-gradient(top, #307bfb 0%, #0530e5 80%);
            background: -moz-linear-gradient(top, #307bfb 0%, #0530e5 80%);
            background: -o-linear-gradient(top, #307bfb 0%, #0530e5 80%);

            box-shadow: -1px 2px #001c91;
            -webkit-box-shadow: -1px 2px #001c91;
            -moz-box-shadow: -1px 2px #001c91;
            -o-box-shadow: -1px 2px #001c91;
        }

        div#barbutton3 {
            height: 13px;
            width: 50px;
            z-index: 1;

            position: absolute;
            top: 385px;
            left: 210px;

            border-radius: 100px;
            -webkit-border-radius: 100px;
            -moz-border-radius: 100px;
            -o-border-radius: 100px;

            background: linear-gradient(top, #50fb05 0%, #057b05 100%);
            background: -webkit-linear-gradient(top, #50fb05 0%, #057b05 100%);
            background: -moz-linear-gradient(top, #50fb05 0%, #057b05 100%);
            background: -o-linear-gradient(top, #50fb05 0%, #057b05 100%);

            box-shadow: -1px 2px #004200;
            -webkit-box-shadow: -1px 2px #004200;
            -moz-box-shadow: -1px 2px #004200;
            -o-box-shadow: -1px 2px #004200;
        }

        div#barbutton4 {
            height: 13px;
            width: 50px;
            z-index: 1;

            position: absolute;
            top: 385px;
            left: 270px;

            border-radius: 100px;
            -webkit-border-radius: 100px;
            -moz-border-radius: 100px;
            -o-border-radius: 100px;

            background: linear-gradient(top, #fb6505 0%, #bb0505 100%);
            background: -webkit-linear-gradient(top, #fb6505 0%, #bb0505 100%);
            background: -moz-linear-gradient(top, #fb6505 0%, #bb0505 100%);
            background: -o-linear-gradient(top, #fb6505 0%, #bb0505 100%);

            box-shadow: -1px 2px #7b0000;
            -webkit-box-shadow: -1px 2px #7b0000;
            -moz-box-shadow: -1px 2px #7b0000;
            -o-box-shadow: -1px 2px #7b0000;
        }

        div#miniButtonGlass4 {
            width: 15px;
            height: 15px;
            float: left;
            z-index: 1;

            position: absolute;
            top: 383px;
            left: 25px;

            box-shadow: 0 0 10px #490000;
            -webkit-box-shadow: 0 0 10px #490000;
            -moz-box-shadow: 0 0 10px #490000;
            -o-box-shadow: 0 0 10px #490000;

            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            -o-border-radius: 20px;

            background: radial-gradient(#ff9b5b, #fb6505);
            background: -webkit-radial-gradient(#ff9b5b, #fb6505);
            background: -moz-radial-gradient(#ff9b5b, #fb6505);
            background: -o-radial-gradient(#ff9b5b, #fb6505);
        }

        div#miniButtonGlass5 {
            width: 15px;
            height: 15px;
            float: left;
            z-index: 1;

            position: absolute;
            top: 383px;
            left: 51px;

            box-shadow: 0 0 10px #490000;
            -webkit-box-shadow: 0 0 10px #490000;
            -moz-box-shadow: 0 0 10px #490000;
            -o-box-shadow: 0 0 10px #490000;

            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            -o-border-radius: 20px;

            background: radial-gradient(#0abd0a, #057b05);
            background: -webkit-radial-gradient(#0abd0a, #057b05);
            background: -moz-radial-gradient(#0abd0a, #057b05);
            background: -o-radial-gradient(#0abd0a, #057b05);
        }

        div#yellowBox1 {
            width: 140px;
            height: 70px;
            z-index: 1;
            background-color: #ffff00;

            position: absolute;
            top: 415px;
            left: 25px;

            border-radius: 15px;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            -o-border-radius: 15px;

            box-shadow: 0 0 20px #ff6600 inset;
            -webkit-box-shadow: 0 0 20px #ff6600 inset;
            -moz-box-shadow: 0 0 20px #ff6600 inset;
            -o-box-shadow: 0 0 20px #ff6600 inset;
        }

        div#yellowBox2 {
            width: 140px;
            height: 70px;
            z-index: 1;
            background-color: #ffff00;

            position: absolute;
            top: 415px;
            left: 185px;

            border-radius: 15px;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            -o-border-radius: 15px;

            box-shadow: 0 0 20px #ff6600 inset;
            -webkit-box-shadow: 0 0 20px #ff6600 inset;
            -moz-box-shadow: 0 0 20px #ff6600 inset;
            -o-box-shadow: 0 0 20px #ff6600 inset;
        }

    }

    @media handheld and (orientation: portrait), (max-width: 768px) {

        div#pokedex {
            width: 400px;
        }

        div#logo {
            width: 281px;
            height: 99px;
            background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/logo.png') no-repeat left top;
            z-index: 1;

            position: absolute;
            top: 220px;
            left: 30px;
        }

        div#left {
            width: 400px;
            height: 500px;
            float: left;
            position: relative;
            z-index: 1;
            margin: 0 auto;
        }

        div#curve1_left {
            width: 201px;
            height: 85px;
            background-color: #8b0000;
            float: left;
            padding: 15px 0 0 15px;

            position: absolute;
            top: 0;
            left: 0;

            box-shadow: 0 0 #5e0000;
            -webkit-box-shadow: 0 0 #5e0000;
            -moz-box-shadow: 0 0 #5e0000;
            -o-box-shadow: 0 0 #5e0000;

            border-bottom-right-radius: 85px 60px;
            -webkit-border-bottom-right-radius: 85px 60px;
            -moz-border-bottom-right-radius: 85px 60px;
            -o-border-bottom-right-radius: 85px 60px;

            border-top-left-radius: 30px;
            -webkit-border-top-left-radius: 30px;
            -moz-border-top-left-radius: 30px;
            -o-border-top-left-radius: 30px;
        }

        div#bg_curve1_left {
            width: 400px;
            height: 80px;
            background-color: #8b0000;

            box-shadow: -10px 9px #5e0000;
            -webkit-box-shadow: -10px 9px #5e0000;
            -moz-box-shadow: -10px 9px #5e0000;
            -o-box-shadow: -10px 9px #5e0000;

            border-top-left-radius: 30px;
            -webkit-border-top-left-radius: 30px;
            -moz-border-top-left-radius: 30px;
            -o-border-top-left-radius: 30px;
        }

        div#right, div#screen, div#bigbluebutton, div#barbutton1, div#barbutton2, div#cross {
            display: none;
        }

    }
</style>
