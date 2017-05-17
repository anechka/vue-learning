var model = {
    state: {
        description: "Good Cat",
        age: null,
        hasFoodNow: 0,
        pushedCats: [],
        enabledButtons: [],

        cats: null
    },

    fetchCats: function () {
        // If fetch API is available:
        if (window.fetch) {
            fetch('cats').then(function (response) {

                if (response.ok) {
                    return response.json();
                }

                alert('Network Error. Django is running?');
                throw new Error('Network response was not ok.');

            }).then(function (djangoJson) {
                model.state.cats = djangoJson;
            })
        }

        // Old browsers:
        else {
            var xhr = new XMLHttpRequest();

            xhr.open('GET', '/cats', false);
            xhr.send(null);

            if(xhr.status === 200)
                model.state.cats = JSON.parse(xhr.responseText);
        }

    }
};

var localComponents = {
    bowl: {
        computed: {
            count: function () {
                return model.state.hasFoodNow
            }
        },
        template: "<span><icon></icon>Покушали {{ count }}</span>",
        components: {
            'icon': { template: "<span class='glyphicon glyphicon-cutlery bowl'></span>" }
        }
    },
    cat: {
        props: ["name", "description", "cat"],
        methods: {
            showCatDescription: function (e) {
                console.log("Clicked on: " + this.name, "has description: " + this.description);
                model.state.description = this.description;
            },
            showCatAge: function (e) {

                if(window.fetch) {
                    fetch('/cats/' + this.cat.catName)
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }

                            alert('Network Error. Django is running?');
                            throw new Error('Network response was not ok.');
                        })
                        .then(function (catAge) {
                            model.state.age = catAge.age;
                            console.log(model.state.age);

                    })
                }
                // Old browsers:
                else {
                    var xhr = new XMLHttpRequest();

                    xhr.open('GET', '/cats/' + this.cat.catName, false);
                    xhr.send(null);

                    if(xhr.status === 200)
                        var catAge = JSON.parse(xhr.responseText);
                        model.state.age = catAge["age"];

                        console.log(model.state.age);


                }
            }
        },
        template: "<span @mouseover='showCatDescription' @click='showCatAge'>{{ name }}</span>"
    },
    selectCat: {
        data: function () {
            return {
                sharedState: model.state,
                selectedCat: ''
            }
        },

        template: "<form action='#'>" +
        "<label>Список котов</label>" +
        "<select id='select-menu' title='Выбери кота' v-model='selectedCat'>" +
        "<option disabled value=''>Выберите кота</option>" +
        "<option v-for='catIndexString in sharedState.cats'>{{ catIndexString.catName }}</option>" +
        "</select>" + "<button class='btn btn-primary btn-sm' @click='addCat' type='button'>Добавить кота</button>" +
        "</form>",
        methods: {
            addCat: function () {

                var catsArrayModel = this.sharedState.cats;

                for (var catIndex = 0; catIndex < catsArrayModel.length; catIndex++) {

                    var currentCat = catsArrayModel[catIndex];

                    if (this.selectedCat === currentCat.catName) {
                        this.sharedState.pushedCats.push(currentCat);
                        this.sharedState.enabledButtons.push(false);
                    }
                }

            }
        }
    },
    table: {
        data: function () {
            return {
                sharedState: model.state
            }
        },
        props: ["index", "cat"],

        template: "<tr @mouseover='mouseOverTr' @mouseleave='mouseOutTr'>" +
        "<td>{{ index }}</td>" +
        "<td>{{ cat.catName }}</td>" +
        "<td class='delete-button-td'>" +
        "<button class='btn btn-primary btn-xs' v-show='this.sharedState.enabledButtons[this.index]' @click='deleteCat'>Delete</button>" +
        "</td></tr>",

        methods: {
            mouseOverTr: function () {
                Vue.set(this.sharedState.enabledButtons, this.index, true)
                // this.$forceUpdate();
            },

            mouseOutTr: function () {
                Vue.set(this.sharedState.enabledButtons, this.index, false)
                // this.$forceUpdate();
            },

            deleteCat: function () {
                this.sharedState.pushedCats.splice(this.index, 1);
                this.sharedState.enabledButtons.splice(this.index, 1);

                // ajax
                if(window.fetch) {
                    fetch('/cats/' + this.cat.catName, {
                        method: 'DELETE'
                    })
                        .then(function(response){
                            if (response.ok) {
                                model.fetchCats();
                            }
                            else {
                                alert('Network Error. Django is running?');
                                throw new Error('Network response was not ok.');
                            }
                        })

                }
                // Old browsers:
                else {
                    var xhr = new XMLHttpRequest();

                    xhr.open('DELETE', '/cats/' + this.cat.catName, false);
                    xhr.send(null);

                    if(xhr.status === 200)
                        model.fetchCats();

                }

            }

        }

    }
};

var app = new Vue({
    el: "#app",
    data: {
        hello: "Hello Vue!",
        name: "Аня!",
        bowlValue: 2,
        sharedState: model.state
    },
    computed: {
        catsObject: function () {
            var shouldFeedCount = 0;

            for (catIndexString in this.sharedState.cats) {
                if (!this.sharedState.cats[catIndexString].syt) shouldFeedCount++
            }

            return { count: shouldFeedCount, bowls: Math.round(shouldFeedCount / this.bowlValue) };
        }
    },

    methods: {

        feedCat: function (e) {
            for (catIndexString in this.sharedState.cats) {
                this.sharedState.cats[catIndexString].syt = !this.sharedState.cats[catIndexString].syt;
            }
            model.state.hasFoodNow = model.state.cats.length - this.catsObject.count
        }
    },
    components: {
        'bowl': localComponents.bowl,
        'cat': localComponents.cat,
        'select-cat': localComponents.selectCat,
        'table-tr-component': localComponents.table
    },

    beforeCreate: model.fetchCats
});