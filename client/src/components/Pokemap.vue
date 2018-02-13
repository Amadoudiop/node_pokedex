<template>
    <div id="mapComponent">
        <span id="spanAutocomplete"><span id="spanTitle">J'ai croisé ce pokemon :</span><gmap-autocomplete
                :value="description" id="autocomplete"
                @place_changed="setPlace">
        </gmap-autocomplete></span>

        <gmap-map
                :center="center"
                :zoom="12"
                style="width: 800px; height: 565px"

        >

            <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :icon="m.image"
                    :label="m.infoText"
                    :clickable="false"
                    :draggable="m.draggable"

            ></gmap-marker>
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
                              :content="infoContent" @closeclick="infoWinOpen=true"></gmap-info-window>
        </gmap-map>
        <div slot="visible">
            <div style="bottom: 0; left: 0; background-color: #0000FF; color: white; position: absolute; z-index: 100">
                {{statusText}}
            </div>
        </div>
    </div>
</template>

<script>
    /////////////////////////////////////////
    // New in 0.4.0
    import * as VueGoogleMaps from 'vue2-google-maps';
    import Vue from 'vue';
    import bus from '../bus'
    import $ from 'jquery'

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCdOpR_BwbDym_whLfvOsbrL2TZeLOqkZc',
            v: '3',
            libraries: 'places', //// If you need to use place input
        }
    });

    export default {
        name: 'Pokemap',
        data () {
            return {
                detail: {},
                gridData: [],
                center: {lat: 10.0, lng: 10.0},
                markers: [],//this.$parent.stateMarkers,
                position: null,
                description: '',
                latLng: {},
                infoContent: '',
                infoWindowPos: {
                    lat: 0,
                    lng: 0
                },
                infoWinOpen: false,
                currentMidx: [],
                //optional: offset infowindow so it visually sits nicely on top of our marker
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                timer: null,
                statusText: ''
            }
        },
        methods: {
            dragMarker(marker){

                bus.$emit("dragMarker", marker)
            },
            toggleInfoWindow: function (marker, idx) {
                this.infoWindowPos = marker.position;
                this.infoContent = marker.infoText;

                this.infoWinOpen = true;
                if (this.currentMidx.indexOf(idx) === -1) {
                    this.currentMidx.push(idx);
                }


            },
            timerF(){
                let variable = this;
                setInterval(function () {

// Update the count down every 1 second
                    for (let mark of variable.markers) {

                        if(mark.created){

//                            let countDownDate = new Date(mark.countDownDate).getTime();
//                            let countDownDate2 = new Date(mark.countDownDate);
                            let countDownDate = mark.countDown;
                            variable.timer = '';
                            // Get todays date and time
                            let now = new Date().getTime();
                            let now2 = new Date();
//                            console.log('1',now2, now)
//                            console.log('2',countDownDate2, countDownDate)
//                            console.log('3',mark.created)
                            // Find the distance between now an the count down date
                            let distance = countDownDate - now;

                            // Time calculations for days, hours, minutes and seconds

                            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                            // Display the result in the element with id="demo"
                            variable.timer =  minutes + "m " + seconds + "s ";

                            mark.infoText = variable.timer;
                        }else{
                            mark.infoText = '';
                        }
                        $('.vue-map div div.gm-style div div div div div div div').css('background-color', '#cccccc');
                        $('.vue-map div div.gm-style div div div div div div div').css('font-size', '17px');
                        $('.vue-map div div.gm-style div div div div div div div').css('padding', '1px');
                        $('.vue-map div div.gm-style div div div div div div div').css('margin-top', '60px');
                    }
                    //console.log(variable.timer);
                }, 5000);
            },
            setPlace(place) {
                this.latLng = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                bus.$emit('setPlace', this.latLng);
                $('#longitude').val(parseFloat(this.latLng.lng));
                $('#latitude').val(parseFloat(this.latLng.lat));
                this.center.lat = place.geometry.location.lat();
                this.center.lng = place.geometry.location.lng();

                this.markers[0].position.lat = place.geometry.location.lat();
                this.markers[0].position.lng = place.geometry.location.lng();
                console.log('place', this.latLng)
                console.log('place', this.markers)
            },
            getDetails($id){
                let self = this;
                if ($id != null) {
                    this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/details/' + $id).then(response => {
                        // get body data
                        self.pokemons = response.data;
                        self.detail = response.data[0];

                        console.log("okok", response.data[0]);
                        self.markers = self.markers.concat(response.data[0].geolocalisation.map(geo => {
                            let image = {
                                //url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                                url: 'http://localhost/publicBis/zend-pokedex/public/img/' + $id + 'minimini.png',

                                // This marker is 20 pixels wide by 32 pixels high.
                                size: new google.maps.Size(40, 40),
                                // The origin for this image is (0, 0).
                                origin: new google.maps.Point(0, 0),
                                // The anchor for this image is the base of the flagpole at (0, 32).
                                anchor: new google.maps.Point(0, 32)
                            };
//                            console.log('1',geo.created_date);
//                            console.log('2',new Date(geo.created_date));
                            let countDownDate = new Date(geo.created_date).getTime();
                            countDownDate = countDownDate+(60*30*1000);
//                            console.log('3',countDownDate);
//                            console.log('4',new Date(countDownDate));
// Update the count down every 1 second
                            let variable = this;
                            variable.timer = '';
                            // Get todays date and time
                            let now = new Date().getTime();

                            // Find the distance between now an the count down date
                            let distance = countDownDate - now;

                            // Time calculations for days, hours, minutes and seconds

                            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                            // Display the result in the element with id="demo"
                            variable.timer =  minutes + "m " + seconds + "s ";


                            // Set the date we're counting down to

                            return {
                                position: {
                                    lat: parseFloat(geo.latitude),
                                    lng: parseFloat(geo.longitude)
                                },

                                infoText: this.timer,
                                created: geo.created_date,
                                countDown: countDownDate,
                                image: image,
                                draggable: false
                            }
                        }));
                    }, response => {
                        // error callback
                        console.log('test2', response.body)
                    });
                }

            },
            removeDetails($id){
                let self = this;
                if ($id != null) {
                    this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/details/' + $id).then(response => {
                        // get body data
                        self.pokemons = response.data;
                        self.detail = response.data[0];

                        for (let j = response.data[0].geolocalisation.length; j--;) {
                            for (let i = self.markers.length; i--;) {

                                if (response.data[0].geolocalisation[j].latitude === self.markers[i].position.lat.toString() && response.data[0].geolocalisation[j].longitude === self.markers[i].position.lng.toString()) {
                                    self.markers.splice(i, 1);
                                }
                            }
                        }
                    }, response => {
                        // error callback
                        console.log('test2', response.body)
                    });
                }

            },
            setDescription(description) {
                this.description = description;
                console.log('description', description)
            },
            getPosition(){
                let self = this;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        self.position = position.coords;
                        self.center['lat'] = position.coords.latitude;
                        self.center['lng'] = position.coords.longitude;
                        let image = {
                            //url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                            url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-32.png',
                            //url: 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokemon-48.png',
                            //url: 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Location-32.png',
                            //url: 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Zapdos_Pokeball-32.png',
                            //url: 'http://localhost/publicBis/zend-pokedex/public/img/'+$id+'.png',

                            // This marker is 20 pixels wide by 32 pixels high.
                            size: new google.maps.Size(48, 48),
                            // The origin for this image is (0, 0).
                            origin: new google.maps.Point(0, 0),
                            // The anchor for this image is the base of the flagpole at (0, 32).
                            anchor: new google.maps.Point(24, 24)
                        };
                        self.markers = self.markers.concat({
                            position: {
                                lat: parseFloat(position.coords.latitude),
                                lng: parseFloat(position.coords.longitude)
                            },
                            image: image,
                            draggable: false

                        });
                    })
                }
            }
        },
        mounted() {
            let self = this;
            this.getPosition();
            bus.$on('addGeoloc', (data) => {
                //console.log('remove has work', self.markers);
                this.getDetails(data);
                //console.log('remove has work', self.markers);

            });
            bus.$on('removeGeoloc', (data) => {
                //console.log('remove has work', self.markers);
                this.removeDetails(data);
                //console.log('remove has work', self.markers);
            });
            if (this.$route.fullPath.indexOf('/details') !== -1) {
                //this.getList();
                this.getDetails(this.$route.params.id);

            }
            this.timerF();
            bus.$on('geoLocSubmit', (data) => {
                let image = {
                    //url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                    //url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-32.png',
                    url: 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Pokemon-48.png',
                    //url: 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Location-32.png',
                    //url: 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Zapdos_Pokeball-32.png',
                    //url: 'http://localhost/publicBis/zend-pokedex/public/img/'+$id+'.png',

                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(48, 48),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(24, 36)
                };
                let marker = {
                    position: {
                        lat: parseFloat(data.lat),
                        lng: parseFloat(data.lng)
                    },
                    image: image,
                    draggable: false
                };
                console.log('add listener');


                self.markers = self.markers.concat(marker);


            });

            bus.$on('tryyy', (data) => {
                console.log('try', self.markers);
                console.log('try', self.markers);
            });
            bus.on('changeLoc', (data) => {
                console.log('try', parseFloat($('#latitude').val()));
                self.markers[self.markers.length - 1].position.lat = parseFloat($('#latitude').val());
                self.markers[self.markers.length - 1].position.lng = parseFloat($('#longitude').val());
            });
            $('#longitude').on('change', function () {
                console.log('try', self.markers.length);
                console.log('try', self.markers[2]);
                self.markers[self.markers.length - 1].position.lng = parseFloat($('#longitude').val());
            });
            $('#latitude').on('change', function () {
                console.log('try', self.markers[2]);
                self.markers[self.markers.length - 1].position.lat = parseFloat($('#latitude').val());
            });


        }
    }
</script>
<style>
    .vue-map-container {
        position: fixed;
        bottom: 280px;
    }

    #spanAutocomplete {
        position: relative;
        top: 128px;
        right: 275px;
        z-index: 20;
    }

</style>