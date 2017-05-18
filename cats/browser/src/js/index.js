/**
    developer: menangen@gmail.com
    Date: 17.05.17
    Time: 14:52

ES6 code from https://lebab.io/try-it */

import localComponents from "components"
import model from "models"

const app = new Vue({
    el: "#app",
    data: {
        hello: "Hello Vue!",
        name: "Аня!",
        bowlValue: 2,
        sharedState: model.state
    },
    computed: {
        catsObject() {
            let shouldFeedCount = 0;

            for (const cat of this.sharedState.cats) {
                if (!cat.syt) shouldFeedCount++
            }

            return {
                count: shouldFeedCount,
                bowls: Math.round(shouldFeedCount / this.bowlValue)
            }
        }
    },

    methods: {

        feedCat() {
            for (const cat of this.sharedState.cats) {
                cat.syt = !cat.syt
            }
            model.state.hasFoodNow = model.state.cats.length - this.catsObject.count
        }
    },
    components: {
        "bowl": localComponents.bowl,
        "cat": localComponents.cat,
        "select-cat": localComponents.selectCat,
        "table-tr-component": localComponents.table
    },

    beforeCreate: model.fetchCats
});