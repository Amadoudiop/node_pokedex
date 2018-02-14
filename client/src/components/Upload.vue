<template>
    <div v-if="!image">
        <h2>Select an image</h2>
        <input type="file" @change="onFileChange">
    </div>
    <div v-else>
        <img :src="image"/>
        <button @click="validImage">Valid image</button>
        <button @click="removeImage">Remove image</button>
    </div>
</template>

<script>

    import $ from 'jquery'
    export default {
        name: 'upload',

        data() {
            return {
                image: ''
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
            },
            validImage: function (e) {
                let $id = this.$route.params.id;
                $.ajax({
                    url: 'http://localhost/publicBis/zend-pokedex/public/api/pokemons/upload',
                    type: 'POST',
                    data: {'image' : this.image, 'id' : $id},
                    success: function(msg) {
                        console.log(msg);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
//                this.$http.post('http://localhost/publicBis/zend-pokedex/public/api/pokemons/upload', { image: this.image}).then(response => {
//                    // get body data
//                    // get status
//
//                    console.log(response.status);
//                    console.log(response.statusText);
//                    // get status text
//
//
//                    // get 'Expires' header
//                    response.headers.get('Expires');
//
//                    // get body data
//
//                    console.log("hey");
//                    console.log('test2', response);
//                }, response => {
//                    // error callback
//                    console.log("hey hey hey");
//                    console.log('test2', response.body)
//                });
            }


        },
        mounted() {
            console.log("test", null);
        }
    }
</script>