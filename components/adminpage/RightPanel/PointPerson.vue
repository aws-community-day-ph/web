<template>
    <div class="wrapper">
        <h3>Point Person: </h3>
        <h3 class="text-black">{{ pointPerson !== null ? pointPerson : 'Not available' }}</h3>
    </div>
</template>

<script>
    export default{
        props : {
            pointPerson : {
                type: String,
                required: true
            }
        },
        mounted(){
            console.log('Point Person Prop: ', this.pointPerson);
        }
    }
</script>

<style lang="postcss">
    .wrapper{
        @apply font-aws font-semibold flex gap-2
    }
</style>