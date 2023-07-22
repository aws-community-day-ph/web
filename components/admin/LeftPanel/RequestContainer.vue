<template>

    <requests-wrapper class="flex">
      <div class="flex pl-3  flex-col mt-2 ">
        <div class="flex gap-32 mt-2">

          <h3 class="font-semibold text-white text-xl">Request</h3>
          <!-- Filter -->
          <Filter />
        </div>
        <div class="w-[350px] -ml-8 mt-4">
          <ScrollableContainer />
        </div>
      </div>
    </requests-wrapper> 
</template>

<script>
  export default {
    
  }
</script>