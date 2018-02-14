<template>
    <table>
        <thead>
        <tr>
            <th v-for="key in columns"
                @click="sortBy(key)"
                :class="{ active: sortKey == key }">
                {{ key | capitalize }}
                <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in filteredData">

            <td v-for="key in columns">

                <div v-if="key == 'picture'"><a :href="'/details/' + entry.id_national"><img v-if="entry[key] != null"
                                                                                             :src="'http://localhost/publicBis/zend-pokedex/'+entry[key]"/></a>
                </div>
                <div v-else-if="key == 'name'"><a :href="'/details/' + entry.id_national">{{entry[key]}}</a></div>
                <div v-else-if="key == 'type'"><span v-for="type in entry.type"><img style="padding: 5px"
                                                                                     :src='"../assets/" + type +".png"'/>{{ type
                    }}<span
                            style="padding: 5px"></span></span></div>
                <div v-else-if="key == 'id_national'"><a :href="'/details/' + entry.id_national">{{entry[key]}}</a>
                </div>
                <div v-else-if="key == 'action'"><a :href="'/admin/pokemons/update/' + entry.id_national">
                    <button class="btn btn-info">Mettre à jour</button>
                </a></div>
                <div v-else-if="key == 'evolution'"><span v-for="(evol, index) in entry.evolution">
                    <img
                            v-if="evol.id_national === entry.id_national" class="evolOwn"
                            :src="'http://localhost/publicBis/zend-pokedex/public/img/'+evol.id_national+'minimini.png'"/>
                    <img v-if="evol.id_national !== entry.id_national" class="evolOther"
                         :src="'http://localhost/publicBis/zend-pokedex/public/img/'+evol.id_national+'minimini.png'"/> <span
                        v-if="evol.id_national === '133'"> / </span><span v-else-if="evol.id_national === '134'"> , </span><span
                        v-else-if="evol.id_national === '135'"> , </span><span
                        v-else-if="index !== entry.evolution.length-1"> > </span><span
                        style="padding: 5px"></span></span></div>
                <div v-else><input v-on:click="test(entry.id_national)" v-model="checkedName" class="checkPokemon"
                                   name="checkPokemon" :value="entry.id_national" type="checkbox"/></div>

            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Vue from 'vue';
    import bus from '../bus'
    export default {
        name: 'tableau',
        props: {
            data: Array,
            columns: Array,
            filterKey: String
        },

        data: function () {
            let sortOrders = {};
            this.columns.forEach(function (key) {
                sortOrders[key] = 1
            });
            return {
                sortKey: '',
                sortOrders: sortOrders,
                pokemons: [],
                pokemonsName: [],
                searchQuery: '',
                gridColumns: ['selection', 'id_national', 'name', 'type', 'evolution', 'picture', 'action'],
                gridData: [],
                checkedName: []
            }
        },
        computed: {
            filteredData: function () {
                let sortKey = this.sortKey;
                let filterKey = this.filterKey && this.filterKey.toLowerCase();
                let order = this.sortOrders[sortKey] || 1;
                let data = this.data;
                if (filterKey) {
                    data = data.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    data = data.slice().sort(function (a, b) {
                        a = a[sortKey];
                        b = b[sortKey];
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return data
            }
        },
        filters: {
            capitalize: function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        methods: {
            sortBy: function (key) {
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1

            },
            test($id){
                let self = this;
                setTimeout(function () {
                    console.log('test called', $id);
                    console.log('test called', self.checkedName);
                    if (self.checkedName.indexOf($id) !== -1) {
                        bus.$emit('addGeoloc', $id);
                    } else {
                        bus.$emit('removeGeoloc', $id);
                    }
                }, 2000);


            },
            getList(){
                this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/getList').then(response => {
                    // get body data
                    this.pokemons = response.data;
                    const array = [];
                    let obj = {};
                    let type = '';
                    let evolution = '';
                    for (let i = 0; i < response.data.length; i++) {
                        obj = {};
                        type = '';
                        obj['id_national'] = response.data[i].id_national;
                        obj['name'] = response.data[i].name;
                        for (let j = 0; j < response.data[i].type.length; j++) {

                            type += " " + response.data[i].type[j] + " <img src='../assets/" + response.data[i].type[j] + ".png'>";
                        }
                        obj['type'] = type;
                        for (let k = 0; k < response.data[i].evolution.length; k++) {

                            evolution += " " + response.data[i].evolution[k] + "";
                        }
                        obj['evolution'] = evolution;
                        //console.log('evolution', response.data[i].evolution);

                        obj['picture'] = response.data[i].picture;
                        array.push(obj);
                        //console.log('array', array);
                    }

                    this.gridData = array;
                }, response => {
                    // error callback
                    console.log('test2', response.body)
                });
            },
            getGeoSpec($param){
                let self = this;
                console.log('call', $param);
                this.$http.get('http://localhost/publicBis/zend-pokedex/public/api/pokemons/geo/' + $param).then(response => {
                    // get body data
                    self.markers = self.markers.concat(response.data[0].geolocalisation.map(geo => {
                        let image = {
                            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                            //url: 'http://localhost/publicBis/zend-pokedex/public/img/'+$id+'.png',

                            // This marker is 20 pixels wide by 32 pixels high.
                            size: new google.maps.Size(20, 32),
                            // The origin for this image is (0, 0).
                            origin: new google.maps.Point(0, 0),
                            // The anchor for this image is the base of the flagpole at (0, 32).
                            anchor: new google.maps.Point(0, 32)
                        };
                        return {
                            position: {
                                lat: parseFloat(geo.latitude),
                                lng: parseFloat(geo.longitude)
                            },
                            image: image

                        }
                    }));
                }, response => {
                    // error callback
                    console.log('test2', response.body)
                });
            }
        },
        mounted() {
            this.getList();

        }

    }
</script>

<style>
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
    }

    th {
        background-color: #42b983;
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
    }

    th, td {
        min-width: 120px;
        padding: 5px 5px;
    }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }
</style>
