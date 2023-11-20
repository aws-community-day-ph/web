<template>
    <div class="wrapper">
        <h3>Status: </h3>
        <h3 class="statcolor" :style="getStatusColor">{{ status }}</h3>
    </div>
</template>

<script>
    export default {
        props: {
            status: {
                type: String,
                required: true,
            },
        },
        mounted(){
            console.log('Status prop: ', this.status);
        },

        computed: {
            getStatusColor(){
                switch(this.status){
                    case 'templated':
                        return {color: 'green'};
                    case 'canceled':
                        return {color: 'red'};
                    case 'pending':
                        return {color: 'orange'};
                }
            }
        }
    }
</script>

<style lang="postcss" scoped>
    .wrapper{
        @apply mb-3.5 -mt-3 font-aws font-bold flex gap-2
    }

    .statcolor{
        @apply uppercase 
    }
</style>