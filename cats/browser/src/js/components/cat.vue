<template>
    <span @mouseover="showCatDescription" @click="showCatAge">{{ name }}</span>
</template>

<script>
    import model from "models"

    export default {
        props: ["name", "description"],
        methods: {
            showCatDescription() {
                model.state.description = this.description;
            },
            showCatAge() {
                const self = this;

                if (window.fetch) {
                    fetch(`/cats/${self.name}`)
                        .then(response => {

                            if (response.ok) {
                                return response.json()
                            }

                            throw new Error("Network response was not ok.")
                        })
                        .then(catObjectFromJSON => {
                            model.state.age = catObjectFromJSON.age
                        })
                        .catch(() => {
                            console.warn("Network Error. Django is running?")
                        })
                }
                // Old browsers:
                else {
                    const xhr = new XMLHttpRequest();

                    xhr.open("GET", `/cats/${this.name}`, false);
                    xhr.send(null);

                    if (xhr.status === 200) {
                        const catJSON = JSON.parse(xhr.responseText);

                        model.state.age = catJSON.age;
                    }
                }
            }
        },
    }
</script>