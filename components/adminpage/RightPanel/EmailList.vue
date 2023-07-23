<template>
  <div class="w-[1050px] h-[120px] flex flex-nowrap justify-center bg-[#37475A] rounded-lg py-2 -mt-3">
    <div class="text-black email-container overflow-x-scroll whitespace-nowrap inline-flex w-[1000px]">
      <div v-if="selectedRequestID" class="flex justify-center items-center">
        <div v-for="(email, index) in emails" :key="index" class="items-center mx-2">
          <div class="w-[322px] h-[57px] rounded-lg bg-white flex justify-start items-center text-[#232F3E]">
            <div class="text-white text-lg flex justify-center items-center w-[37px] h-[36px] bg-[#146EB4] rounded-full ml-5">
              {{ index + 1 }}
            </div>
            <div class="pl-3">{{ email }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    emails: {
      type: Array,
      required: true,
    },
    selectedRequestID: {
      type: String,
      required: true,
    },
  },

  mounted() {
    console.log('Emails prop: ', this.emails);
    console.log("Selected  Request ID prop: ", this.selectedRequestID);
  }
};
</script>