var model = [
    {catName: "Pusya", syt: false},
    {catName: "Mosha", syt: false},
    {catName: "Oposya", syt: false},
    {catName: "Kusya", syt: true},
    {catName: "Persik", syt: false},
    {catName: "Monja", syt: true},
    {catName: "Musja", syt: true},
    {catName: "Masya", syt: false}
];

Vue.component("cat", {
    props: ["name"],
    template: "<span>{{ name }}</span>"
});

Vue.component("icon", {
    template: "<span class='glyphicon glyphicon-cutlery miska'></span>"
});

Vue.component("miska", {
    render: function (createElement) {
        var myComponent = {
            template: "<span><icon></icon>Покушали</span>"
        };

        return createElement(myComponent)
    }
});

var app = new Vue({
    el: "#app",
    data: {
        hello: "Hello Vue!",
        name: "Аня!",

        catList: model
    },
    computed: {
        catsObject: function () {
            var shouldFeedCount = 0;

            for (cat in this.catList) {
                if (!this.catList[cat].syt) shouldFeedCount++
            }

            return {count: shouldFeedCount, miski: Math.round(shouldFeedCount / 2)};
        }
    },
    methods: {
        feedCat: function (e) {
            for (cat in this.catList) {
                this.catList[cat].syt = !this.catList[cat].syt;
            }
        }
    }
});