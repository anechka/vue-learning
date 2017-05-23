<template lang='jade'>
    span
        icon
        | Покушали {{ count }}
</template>

<script>
    import model from "models"

    export default {
        computed: {
            count() {
                return model.state.hasFoodNow
            }
        },
        components: {
            "icon": {
                template: `<span class="glyphicon glyphicon-cutlery bowl"></span>`
            }
        }
    }
</script>