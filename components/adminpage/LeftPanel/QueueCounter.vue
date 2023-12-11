<template>
    <div>
        <queue-container class="q-container">
            <queue-items class="q-items">
                <img src="@/assets/icons/user-fill.svg" class="usr-icn"/>
                <h2 class="q-text">Total Queue:</h2>
                <queue-number class="q-num">{{
                    pendingRequestsCount
                }}</queue-number>
                </queue-items>
        </queue-container>
    </div>
</template>

<script>

export default {
    props: {
        pendingRequestsCount:{
            type: Number,
            required: true,
        },
    },
};
</script>

<style lang="postcss" scoped>
    .q-container{
        @apply bg-white w-[317px] h-[50px] rounded-lg flex flex-row justify-start items-center shadow-2xl
    }

    .q-items{
        @apply flex justify-start items-center
    }

    .usr-icn{
        @apply w-[17px] h-[19px] ml-4
    }

    .q-text{
        @apply font-semibold text-[#37475A] m-2
    }

    .q-num{
        @apply font-semibold text-[#37475A]
    }
</style>