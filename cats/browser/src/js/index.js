/**
    developer: menangen@gmail.com
    Date: 17.05.17
    Time: 14:52

ES6 code from https://lebab.io/try-it */

import bowlComponent from "components/bowl.vue"
import catComponent from "components/cat.vue"
import selectComponent from "components/selector.vue"
import tableComponent from "components/table.vue"

import model from "models"

const app = new Vue({
    el: "#app",
    data: {
        hello: "Hello Vue 2.3!",
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
            this.sharedState.hasFoodNow = this.sharedState.cats.length - this.catsObject.count
        }
    },
    components: {
        "bowl": bowlComponent,
        "cat": catComponent,
        "select-cat": selectComponent,
        "table-tr-component": tableComponent
    },

    beforeCreate: model.fetchCats
});