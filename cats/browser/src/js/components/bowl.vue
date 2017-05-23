<template lang='jade'>
    span
        icon
        | Покушали {{ count }}
</template>

<script>
    import model from "models"

    export default {
        data () {
            return {
                msg: 'Hello world!'
            }
        },
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