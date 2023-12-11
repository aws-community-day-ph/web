<template>
  <div class="main-wrapper">
    <div class="container">
      <div v-for="(request ,index) in filteredRequests" :key="request.requestId" class="req-cont">
      <button
      @click="handleRequestClick(request.requestId, index)"
      :class="{
        'bg-white': activeRequestID !== request.requestId,
        'bg-[#FEBD69]': activeRequestID === request.requestId,
        'w-[320px] h-[65px] rounded-2xl flex justify-start items-center hover:bg-[#FEBD69] focus:bg-[#FEBD69] duration-500': true,
      }"
    >
      <div class="btn-content">
        <div>
          <img src="@/assets/icons/clipboard.svg" class="icn-1" />
        </div>
        <div class="btn-part2">
          <div class="btn-text-cont">
            <h3 class="btn-txt">
              Request {{ index + 1 }}
            </h3>
            <p class="btn-txt-below">
              View form
              <img src="@/assets/icons/view-arrow.svg" class="arr-icn " />
            </p>
          </div>
        </div>
        <div class="btn-part-3">
          <div class="btn-part-3-cont">
            <img src="@/assets/icons/caret-right.svg" class="caret" />
          </div>
        </div>
      </div>
    </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      props: {
          filteredRequests: {
              type: Array,
              required: true,
          },

          selectedRequestID: {
            type: String,
            required: true,
          }
      },

      methods: {
        handleRequestClick(request_id, index){
          this.$emit('request-clicked', request_id, index);
        }
      }
  }

</script>  

<style lang="postcss" scoped>
  .main-wrapper{
    @apply px-2
  }

  .container{
    @apply overflow-y-auto h-[560px]
  }

  .req-cont{
    @apply flex justify-start py-2 px-3
  }

  .btn-content{
    @apply grid grid-cols-5 grid-rows-1 gap-2
  }

  .icn-1{
    @apply w-5 h-auto ml-6 mt-2
  }

  .btn-part2{
    @apply col-span-2
  }

  .btn-text-cont{
    @apply px-2 ml-[-7px]
  }

  .btn-txt{
    @apply text-[#37475A] text-[15px] font-bold flex flex-row mt-0.5
  }

  .btn-txt-below{
    @apply text-[10px] text-[#37475A] -ml-9
  }

  .arr-icn{
    @apply w-3 h-3 inline 
  }

  .btn-part-3{
    @apply col-start-5 col-end-5 justify-self-end self-center
  }

  .btn-part-3-cont{
    @apply ml-6
  }

  .caret{
    @apply w-6 h-auto mr-0.5
  }
</style>