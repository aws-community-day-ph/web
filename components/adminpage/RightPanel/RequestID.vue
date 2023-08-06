<template>
    <div class="font-aws font-semibold flex gap-2">
        <h3>Request ID: </h3>
        <h3>{{ requestID }}</h3>
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