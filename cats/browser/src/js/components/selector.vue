<template>
    <form action="#">
        <label>Список котов</label>
        <select id="select-menu" title="Выбери кота" v-model="selectedCat">
            <option disabled value="">Выберите кота</option>
            <option v-for="catIndexString in sharedState.cats">
                {{ catIndexString.catName }}
            </option>
        </select>
        <button class="btn btn-primary btn-sm" @click="addCat" type="button">
            Добавить кота
        </button>
    </form>
</template>

<script>
    import model from "models"

    export default {
        data() {
            return {
                sharedState: model.state,
                selectedCat: ""
            }
        },
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
    }
</script>