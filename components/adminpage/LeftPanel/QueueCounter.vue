<template>
    <div>
        <queue-container class="bg-white w-[317px] h-[50px] rounded-lg flex flex-row justify-start items-center shadow-2xl">
            <queue-items class="flex justify-start items-center">
                <img src="@/assets/icons/user-fill.svg" class="w-[17px] h-[19px] ml-4"
                />
                <h2 class="font-semibold text-[#37475A] m-2">Total Queue:</h2>
                <queue-number class="font-semibold text-[#37475A]">{{
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