var model = {
    state: {
        description: "Good Cat",
        hasFoodNow: 0,
        pushedCats: [],
        enabledButtons: [],

        cats: [
            {catName: "Pusya", syt: false, description: "Серая"},
            {catName: "Mosha", syt: false, description: "Турок"},
            {catName: "Oposya", syt: false, description: "Флегматичный"},
            {catName: "Kusya", syt: true, description: "Пятнистый"},
            {catName: "Persik", syt: false, description: "Песчаный"},
            {catName: "Monja", syt: true, description: "Мудрая"},
            {catName: "Musja", syt: true, description: "Длинноногая"},
            {catName: "Masya", syt: false, description: "Смешная"}
        ]
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
            'icon': {template: "<span class='glyphicon glyphicon-cutlery bowl'></span>"}
        }
    },
    cat: {
        props: ["name", "description"],
        methods: {
            clickHdlr: function (e) {
                console.log("Clicked on: " + this.name, "has description: " + this.description);
                model.state.description = this.description;
            }
        },
        template: "<span @click='clickHdlr'>{{ name }}</span>"
    },
    selectCat: {
        data: function () {
            return {
                sharedState: model.state
            }
        },

        template: "<form action='#'>" +
        "<label>Выбери кота</label>" +
        "<select id='select-menu' title='Выбери кота'>" +
        "<option v-for='catIndexString in sharedState.cats'>{{ catIndexString.catName }}</option>" +
        "</select>" + "<button class='btn btn-default' @click='addCat'>Добавить кота</button>" +
        "</form>",
        methods: {
            addCat: function () {

                var catNameFromSelect = document.getElementById("select-menu").value;
                var catsArrayModel = this.sharedState.cats;

                for (var catIndex = 0; catIndex < catsArrayModel.length; catIndex++) {

                    var currentCat = catsArrayModel[catIndex];

                    if (catNameFromSelect === currentCat.catName) {
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
        "<td><button class='btn btn-default' v-show='this.sharedState.enabledButtons[this.index]' @click='btnClick'>Delete</button></td>" +
        "</tr>",

        methods: {
            mouseOverTr: function () {
                this.sharedState.enabledButtons[this.index] = true;
                this.$forceUpdate();
            },

            mouseOutTr: function () {
                this.sharedState.enabledButtons[this.index] = false;
                this.$forceUpdate();
            },

            btnClick: function () {
                this.sharedState.pushedCats.splice(this.index, 1);
                this.sharedState.enabledButtons.splice(this.index, 1);
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
    }
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("Loaded");

    if (window.fetch) {
        fetch('browser').then(function (response) {

            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');

        }).then(function (djangoJson) {
            console.log(djangoJson)
        })
    } else {
        alert("Use XHR code below");
    }
});