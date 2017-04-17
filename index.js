var model = {
    state: {
        description: "Good Cat",
        hasFoodNow: 0,
        pushedCats: [],

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

Vue.component("cat", {
    props: ["name", "description"],
    methods: {
        clickHdlr: function (e) {
            console.log("Clicked on: " + this.name, "has description: " + this.description);
            model.state.description = this.description;
        }
    },
    template: "<span @click='clickHdlr'>{{ name }}</span>"
});

Vue.component("icon", {
    template: "<span class='glyphicon glyphicon-cutlery bowl'></span>"
});

Vue.component("bowl", {
    render: function (createElement) {
        var Child = {
            computed: {
                count: function () {
                    return model.state.hasFoodNow
                }
            },
            template: "<span><icon></icon>Покушали {{ count }}</span>"
        };

        var myComponent = {
            components: {
                // <bowl-component> will only be available in parent's template
                'bowl-component': Child
            },
            template: "<bowl-component></bowl-component>"
        };

        return createElement(myComponent)
    }
});

Vue.component("select-cat", {
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
        addCat: function() {

            var catNameFromSelect = document.getElementById("select-menu").value;
            var catsArrayModel = this.sharedState.cats;

            for (var catIndex = 0; catIndex < catsArrayModel.length; catIndex++) {

                var currentCat = catsArrayModel[catIndex];
                console.log(currentCat.catName);

                if(catNameFromSelect === currentCat.catName) {
                    this.sharedState.pushedCats.push(currentCat);
                }
            }

        }
    }
});

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
        },

    }
});