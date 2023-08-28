<template>
  <div class="container">
    <div class="email-list">
      <div v-if="selectedRequestID" class="centered">
        <div v-for="(email, index) in emails" :key="index" class="email-item">
          <div class="item-content">
            <div class="index-badge">
              {{ index + 1 }}
            </div>
            <div class="email-text">{{ email }}</div>
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

<style lang="postcss" scoped>
  .container{
    @apply w-[1050px] h-[120px] flex flex-nowrap justify-center bg-[#37475A] rounded-lg py-2 -mt-3
  }

  .email-list{
    @apply text-black overflow-x-scroll whitespace-nowrap inline-flex w-[1000px]
  }

  .centered{
    @apply  flex justify-center items-center
  }

  .email-item{
    @apply items-center mx-2
  }

  .item-content{
    @apply w-[322px] h-[57px] rounded-lg bg-white flex justify-start items-center text-[#232F3E]
  }

  .index-badge{
    @apply text-white text-lg flex justify-center items-center w-[37px] h-[36px] bg-[#146EB4] rounded-full ml-5
  }

  .email-text{
    @apply pl-3
  }
</style>