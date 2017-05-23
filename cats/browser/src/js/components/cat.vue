<template>
    <span @mouseover="showCatDescription" @click="showCatAge">{{ name }}</span>
</template>

<script>
    import model from "models"

    export default {
        props: ["name", "description"],
        methods: {
            showCatDescription() {
                model.setCatDescription(this.description);
            },
            showCatAge() {
                model.getCatAgeByRequest(this.name);
            }
        },
    }
</script>