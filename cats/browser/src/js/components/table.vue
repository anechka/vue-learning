<template>
    <tr @mouseover="mouseOverTr" @mouseleave="mouseOutTr">
        <td>{{ index }}</td>
        <td>{{ cat.catName }}</td>
        <td class="delete-button-td">
            <button
                    class="btn btn-primary btn-xs"
                    v-show="sharedState.enabledButtons[this.index]"
                    @click="deleteCat">
                Delete
            </button>
        </td>
    </tr>
</template>

<script>
    import model from "models"

    export default {
        data() {
            return {
                sharedState: model.state
            }
        },
        props: ["index", "cat"],
        methods: {
            mouseOverTr() {
                model.setArrayIndexAsTrue(this.index);
            },

            mouseOutTr() {
                model.setArrayIndexAsFalse(this.index);
            },

            deleteCat() {
                model.deleteCatByIndex(this.index, this.cat.catName)
            }

        }
    }
</script>