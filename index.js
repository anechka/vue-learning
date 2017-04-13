var model = {
    state: {
        description: "Good Cat",
        hasFoodNow: 0,

        cats: [
            {catName: "Pusya", syt: false, description: "Серая"},
            {catName: "Mosha", syt: false, description: "Турок"},
            {catName: "Oposya", syt: false, description: "Флегматичный"},
            {catName: "Kusya", syt: true, description: "Пятнистый"},
            {catName: "Persik", syt: false, description: "Песчаный"},
            {catName: "Monja", syt: true, description: "Старая"},
            {catName: "Musja", syt: true, description: "Черная"},
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
        var myComponent = {
            data: function() {
                return {
                    count: model.state.hasFoodNow
                }
            },
            template: "<span><icon></icon>Покушали {{ count }}</span>"
        };

        return createElement(myComponent)
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

            for (cat in this.sharedState.cats) {
                if (!this.sharedState.cats[cat].syt) shouldFeedCount++
            }

            return { count: shouldFeedCount, bowls: Math.round(shouldFeedCount / this.bowlValue) };
        }
    },
    methods: {
        feedCat: function (e) {
            for (cat in this.sharedState.cats) {
                this.sharedState.cats[cat].syt = !this.sharedState.cats[cat].syt;
            }

            model.state.hasFoodNow = model.state.cats.length - this.catsObject.count
        }
    }
});