<template>
    <div class="header-container">
          <div class="email-section">
            <div class="email-container">
              <img
                src="@/assets/icons/envelope.svg"
                class="email-icon"
              />
              <h3 class="section-title"> Emails </h3>
            </div>
          </div>
        </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="postcss" scoped>
  .header-container{
    @apply grid grid-cols-12 w-full h-20 items-center
  }

  .email-section{
    @apply col-start-1 col-span-3
  }

  .email-container{
    @apply  ml-10 flex items-center
  }

  .email-icon{
    @apply w-[32px] h-[20px] ml-7
  }

  .section-title{
    @apply flex font-semibold text-xl drop-shadow-2xl text-[#232F3E] ml-2
  }

  .delete-section{
    @apply col-start-10 col-span-3
  }
</style>