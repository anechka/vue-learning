<template>
    <form action="#">
        <label>Список котов</label>
        <select id="select-menu" title="Выбери кота" v-model="selectedCatName">
            <option disabled value="">Выберите кота</option>
            <option v-for="cat in sharedState.cats">
                {{ cat.catName }}
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
                selectedCatName: ""
            }
        },
        methods: {
            addCat() {
                model.addCatInTable(this.selectedCatName)
            }
        }
    }
</script>