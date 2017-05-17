/**
 * developer: menangen@gmail.com
 * Date: 17.05.17
 * Time: 14:54
 */

import model from "models"

export default {
    bowl: {
        computed: {
            count() {
                return model.state.hasFoodNow
            }
        },
        template: "<span><icon></icon>Покушали {{ count }}</span>",
        components: {
            'icon': { template: '<span class="glyphicon glyphicon-cutlery bowl"></span>' }
        }
    },
    cat: {
        props: ['name', 'description'],
        methods: {
            clickHdlr() {
                console.log(`Clicked on: ${this.name} || has description: ${this.description}`);
                model.state.description = this.description;
            }
        },
        template: '<span @click="clickHdlr">{{ name }}</span>'
    },
    selectCat: {
        data() {
            return {
                sharedState: model.state,
                selectedCat: ''
            }
        },

        template: `<form action="#">
                            <label>Список котов</label>
                            <select id="select-menu" title="Выбери кота" v-model="selectedCat">
                                <option disabled value="">Выберите кота</option>
                                <option v-for="catIndexString in sharedState.cats">{{ catIndexString.catName }}</option>
                            </select>
                            <button class="btn btn-primary btn-sm" @click="addCat" type="button">Добавить кота</button>
                        </form>`,
        methods: {
            addCat() {
                const catsArrayModel = this.sharedState.cats;

                for (const cat of catsArrayModel) {
                    if (this.selectedCat === cat.catName) {
                        this.sharedState.pushedCats.push(cat);
                        this.sharedState.enabledButtons.push(false);
                    }
                }
            }
        }
    },
    table: {
        data() {
            return {
                sharedState: model.state
            }
        },
        props: ['index', 'cat'],

        template: `<tr @mouseover="mouseOverTr" @mouseleave="mouseOutTr">
                            <td>{{ index }}</td>
                            <td>{{ cat.catName }}</td>
                            <td class="delete-button-td">
                                <button class="btn btn-primary btn-xs" v-show="sharedState.enabledButtons[this.index]" @click="deleteCat">Delete</button>
                            </td>
                        </tr>`,

        methods: {
            mouseOverTr() {
                Vue.set(this.sharedState.enabledButtons, this.index, true)
            },

            mouseOutTr() {
                Vue.set(this.sharedState.enabledButtons, this.index, false)
            },

            deleteCat() {
                this.sharedState.pushedCats.splice(this.index, 1);
                this.sharedState.enabledButtons.splice(this.index, 1);

                const self = this;

                // ajax
                fetch(`/cats/${self.cat.catName}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        model.fetchCats();
                    }
                    else {
                        alert('Network Error. Django is running?');
                        throw new Error('Network response was not ok.');
                    }
                });
            }

        }

    }
};