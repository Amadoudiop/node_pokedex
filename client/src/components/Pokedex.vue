<template>
    <div id="pokedex">
        <div id="left">
            <div id="logo"></div>
            <div id="bg_curve1_left"></div>
            <div id="bg_curve2_left"></div>
            <div id="curve1_left">
                <div id="buttonGlass">
                    <div id="reflect"></div>
                </div>
                <div id="miniButtonGlass1"></div>
                <div id="miniButtonGlass2"></div>
                <div id="miniButtonGlass3"></div>
            </div>
            <div id="curve2_left">
                <div id="junction">
                    <div id="junction1"></div>
                    <div id="junction2"></div>
                </div>
            </div>
            <div id="screen">
                <div id="topPicture">
                    <div id="buttontopPicture1"></div>
                    <div id="buttontopPicture2"></div>
                </div>
                <div id="picture">
                    <img v-if="!detail.id_national"
                         :src="'http://localhost/publicBis/zend-pokedex/public/img/000mini.png'"
                         height="170"/>
                    <img v-if="detail.picture" :src="'http://localhost/publicBis/zend-pokedex/'+detail.picture"
                         height="170"/>
                </div>
                <div id="buttonbottomPicture"></div>
                <div id="speakers">
                    <div class="sp"></div>
                    <div class="sp"></div>
                    <div class="sp"></div>
                    <div class="sp"></div>
                </div>
            </div>
            <div id="bigbluebutton">Naviguez à gauche ou à droite :</div>

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
            <button id="backHome"><a href="http://localhost:8088/">< Retour à l'accueil</a></button>
            <button v-if="detail.id_national" id="seePoke" v-on:click="seePoke(detail.id_national)">
                J'ai vu ce pokemon !
            </button>
        </div>
        <div id="right">
            <div id="stats">
                <div v-if="!detail.id_national" style="margin-top: 170px"><strong>Aucun pokemon correspond à cet id national</strong>
                </div>
                <div v-if="detail.id_national">
                    <strong>ID national :</strong> {{ detail.id_national }} <br/><br/>
                    <strong>Name :</strong> {{ detail.name }} <br/><br/>
                    <strong>Type :</strong> <br/>
                    <span v-for="type in detail.type"><img style="padding: 5px"
                                                           :src='"../assets/" + type +".png"'/>{{ type }}<span
                            style="padding: 5px"></span></span><br/><br/>

                    <strong>Description :</strong><br/>
                    {{ detail.description }}
                    <br/><br/>
                    <strong>Evolution :</strong><br/>
                    <span v-for="evolution in detail.evolution">
                        <template
                                v-if="parseInt(detail.id_national) === 133">Evolution suivante :<template>

                        <img style="padding: 5px"
                             :src='"http://localhost/publicBis/zend-pokedex/public/img/" + evolution.id_national +"minimini.png"'/>
                        <a :href="'/details/' + evolution.id_national">{{ evolution.name }}</a><br/>
                </template></template>
                        <template v-else><template
                                v-if="parseInt(detail.id_national)+1 == parseInt(evolution.id_national)">
                    Evolution suivante :
                        <img style="padding: 5px"
                             :src='"http://localhost/publicBis/zend-pokedex/public/img/" + evolution.id_national +"minimini.png"'/>
                        <a :href="'/details/' + evolution.id_national">{{ evolution.name }}</a><br/>
                </template>
                    <template v-if="parseInt(detail.id_national)-1 == parseInt(evolution.id_national)">
                    Evolution précédente : <img style="padding: 5px"
                                                :src='"http://localhost/publicBis/zend-pokedex/public/img/" + evolution.id_national +"minimini.png"'/>
                        <a :href="'/details/' + evolution.id_national">{{ evolution.name }}</a><br/>
                </template>
                    <template v-if="parseInt(detail.id_national)+2 == parseInt(evolution.id_national)">
                    Evolution future : <img style="padding: 5px"
                                            :src='"http://localhost/publicBis/zend-pokedex/public/img/" + evolution.id_national +"minimini.png"'/>
                        <a :href="'/details/' + evolution.id_national">{{ evolution.name }}</a><br/>
                </template>
                    <template v-if="parseInt(detail.id_national)-2 == parseInt(evolution.id_national)">
                    Evolution antérieure : <img style="padding: 5px"
                                                :src='"http://localhost/publicBis/zend-pokedex/public/img/" + evolution.id_national +"minimini.png"'/>
                        <a :href="'/details/' + evolution.id_national">{{ evolution.name }}</a><br/>
                </template></template>


                    <span
                            style="padding: 5px"></span>
                </span><br/><br/>
                </div>
            </div>
            <div id="bg_curve1_right"></div>
            <div id="bg_curve2_right"></div>
            <div id="curve1_right"></div>
            <div id="curve2_right"></div>
        </div>
        <div id="geoLocPoke" style="display: none;">
            <input id="longitude" v-model="longitude" type="number" step="0.001" placeholder="Longitude">
            <input id="latitude" v-model="latitude" type="number" step="0.001" placeholder="Latitude">
            <button id="submitGeoLoc" v-on:click="submitGeoLocPoke(detail.id_national)">Envoyer</button>
        </div>
        <div id="yolo"></div>
        <div id="map">
            <pokemap>

            </pokemap>
        </div>
    </div>
</template>

<script>
    import Pokemap from './Pokemap.vue'
    import bus from '../bus'
    import $ from 'jquery'

    export default {
        name: 'pokedex',
        components: {Pokemap},
        data() {
            return {
                detail: {},
                pokemons: [],
                pokemonsName: [],
                searchQuery: '',
                longitude: 0,
                latitude: 0
            }
        },
        methods: {
            getDetails($id){
                this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/details/' + $id).then(response => {
                    // get body data
                    this.pokemons = response.data;
                    this.detail = response.data[0];

                }, response => {
                    // error callback
                    console.log("hey hey hey");
                    console.log('test2', response.body)
                });
            },
            precPoke(){
                let $id = this.$route.params.id;
                let id = parseInt($id) - 1;
                if (id < 10) {
                    id = "00" + id.toString();
                } else if (id < 100) {
                    id = "0" + id.toString();
                }

                location.href = "http://localhost:8088/details/" + id;
            },
            suivPoke(){
                let $id = this.$route.params.id;
                let id = parseInt($id) + 1;
                if (id < 10) {
                    id = "00" + id.toString();
                } else if (id < 100) {
                    id = "0" + id.toString();
                }

                location.href = "http://localhost:8088/details/" + id;
            },
            seePoke($id){
                console.log('see', $id);
                let self = this;

                if (navigator.geolocation) {
                    if (this.latitude === 0 && this.longitude === 0) {
                        navigator.geolocation.getCurrentPosition(position => {
                            self.latitude = position.coords.latitude;
                            self.longitude = position.coords.longitude;
                            bus.$emit('geoLocSubmit', {lat: position.coords.latitude, lng: position.coords.longitude});
                        });
                    }
                }
                $('#geoLocPoke').css('display', 'block');
                $('#geoLocPoke').css('z-index', '100');
                $('#geoLocPoke').css('height', '55px');
                $('#geoLocPoke').css('left', '230px');

            },
            submitGeoLocPoke($id){
                let lng = $('#longitude').val();
                let lat = $('#latitude').val();
                $id = this.$route.params.id;
                $.ajax({
                    url: 'http://localhost/publicBis/zend-pokedex/public/api/pokemons/geo/add/' + $id,
                    type: 'POST',
                    data: {'idnational': $id, lat: lat, lng: lng},
                    success: function (msg) {
                        console.log(msg);
                        $('#geoLocPoke').css('z-index', '0');
                        $('#geoLocPoke').css('display', 'none');
                        $('#geoLocPoke').css('height', '0px');
                    },
                    error: function (error) {
                        location.href = 'http://localhost:8088/admin/pokemons/add';
                        console.log(error);
                    }
                });

            },
            getAddressData(){
                console.log('toto', this);
            }
        },
        mounted() {
            this.seePoke();
            $('#seePoke').css('display', 'none');
            let self = this;
            console.log("test", this.$route.params.id);
            this.getDetails(this.$route.params.id);
            console.log('local state state', sessionStorage);
            $('#demo').remove();
            $('.vue-map-container').css('width', '940px');
            bus.on('setPlace', (data) => {
                console.log('called '+data)
                $('#longitude').val(parseFloat(data.lng)) ;
                $('#latitude').val(parseFloat(data.lat)) ;
            });

        }
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    @media all {

        #yolo {
            position: relative;
            top: 80px;
        }

        .vue-map-container {
            top: 615px;
        }

        #footer {
            margin-top: 350px;
        }

        div#pokedex {
            width: 950px;
            margin: 50px auto 0 auto;
        }

        div#left {
            width: 500px;
            height: 500px;
            float: left;
            position: relative;
            z-index: 1;
        }

        div#right {
            width: 450px;
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
            width: 500px;
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
            width: 500px;
            height: 520px;
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
            height: 551px;
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
            width: 360px;
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
            width: 312px;
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

        div#bigbluebutton {
            color: antiquewhite;
            height: 50px;
            width: 60%;
            background-color: #c00d0d;

            position: absolute;
            top: 395px;
            left: 30px;

            border-radius: 2px;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            -o-border-radius: 2px;

            /*background: linear-gradient(top, #307bfb 0%, #0530e5 80%);*/
            /*background: -webkit-linear-gradient(top, #307bfb 0%, #0530e5 80%);*/
            /*background: -moz-linear-gradient(top, #307bfb 0%, #0530e5 80%);*/
            /*background: -o-linear-gradient(top, #307bfb 0%, #0530e5 80%);*/

            /*box-shadow: -3px 2px #001c91;*/
            /*-webkit-box-shadow: -3px 2px #001c91;*/
            /*-moz-box-shadow: -3px 2px #001c91;*/
            /*-o-box-shadow: -3px 2px #001c91;*/
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
            font-weight: 600;
            min-width: 140px;
            margin-top: 8px;
            cursor: pointer;

            text-transform: uppercase;
            transition: 0.1s all;
            font-size: 10px;
            outline: none;
            position: relative;
            bottom: 70px;
            right: 70px;
        }

        #seePoke {
            background-color: white;
            color: #1abc9c;
            border: 1px solid #1abc9c;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 10px;
            letter-spacing: 1px;
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            min-width: 140px;
            margin-top: 8px;
            cursor: pointer;

            text-transform: uppercase;
            transition: 0.1s all;
            font-size: 10px;
            outline: none;
            position: relative;
            bottom: 70px;
        }

        #geoLocPoke {
            position: relative;
            top: 115px;
            left: 50px;
        }

        #submitGeoLoc {
            top: 0px;
            background-color: white;
            color: #1abc9c;
            border: 1px solid #1abc9c;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 10px;
            letter-spacing: 1px;
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            min-width: 140px;
            margin-top: 8px;
            cursor: pointer;

            text-transform: uppercase;
            transition: 0.1s all;
            font-size: 10px;
            outline: none;
            position: relative;
            bottom: 70px;
        }

        #submitGeoLoc:hover {
            color: white;
            background-color: #1abc9c;
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

        #seePoke:hover {
            color: white;
            background-color: #1abc9c;
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
            left: 140px;
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
            background-color: #999;
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
            background-color: #999;
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
            background-color: #999;

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
            width: 450px;
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
            width: 450px;
            height: 520px;
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
            height: 455px;
            width: 380px;
            padding: 10px;
            background-color: #ffe252;
            z-index: 1;
            font-size: 14px;

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
            width: 500px;
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