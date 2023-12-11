<template>
    <div class="wrapper">
        <div class="container">
            <img
            src="../../../assets/icons/default-aws.svg"
            alt="AWS Photobooth Logo"
            class="logo"
          />
          <p class="p1">Please select a request to proceed</p>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="postcss" scoped>

    .wrapper{
        @apply bg-white flex-1 flex justify-center items-center
    }

    .container{
        @apply flex flex-col items-center opacity-80
    }

    .logo{
        @apply w-[478px] h-[239px]
    }

    .p1{
       @apply bg-[#FEBD69] p-3 px-8 rounded-3xl mt-5 text-[#232F3E]
    }
</style>    