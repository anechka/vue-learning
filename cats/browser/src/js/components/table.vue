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
                if (window.fetch) {
                    fetch(`/cats/${self.cat.catName}`, {
                        method: "DELETE"
                    })
                    .then(response => {
                        if (response.ok) model.fetchCats()
                        else throw new Error("Network response was not ok.");
                    })
                    .catch(() => {
                        console.error("Network Error. Django is running?")
                    })
                }
                // Old browsers:
                else {
                    const xhr = new XMLHttpRequest();

                    xhr.open("DELETE", `/cats/${this.cat.catName}`, false);
                    xhr.send(null);

                    if (xhr.status === 200) model.fetchCats();
                    else console.error("Network Error. Django is running?")
                }
            }

        }
    }
</script>