<template>
    <div class="reqID">
        <h3>Request ID: {{ requestID }}</h3>
    </div>
</template>

<script>
    export default {
        props: {
            requestID: {
                type: String,
                required: true,
            }
        },
        mounted(){
            console.log('RequestID prop: ', this.requestID);
        }
    }
</script>

<style lang="postcss" scoped>
    .reqID{
        @apply font-aws font-semibold flex gap-2
    }
</style>