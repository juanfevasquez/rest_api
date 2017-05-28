(function () {
    var EventBus = new Vue();


    Vue.component('artist-list', {
        template: '#artists',
        data: function () {
            return {
                artists: []
            };
        },
        mounted: function () {
            var _this = this;
            axios.get('http://localhost:3000/api/artists')
                .then(function (response) {
                    _this.artists = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            EventBus.$on('new-band', function(newBand) {
                _this.artists.push(newBand);
            });
        }
    });

    Vue.component('new-artist', {
        template: '#new-artist',
        data: function () {
            return {
                name: '',
                picture: '',
                founded: ''
            };
        },
        mounted: function () {

        },
        methods: {
            save: function () {
                var _this = this;
                var data = {
                    name: this.name,
                    picture: this.picture,
                    founded: this.founded
                };

                axios.post('http://localhost:3000/api/artists', data)
                    .then(function (response) {
                        EventBus.$emit('new-band', response.data);
                        _this.name = '';
                        _this.picture = '';
                        _this.founded = '';
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    })



    var julian = new Vue({
        el: '.julian'
    });
})();