<template>
        <div class="grid grid-cols-12 w-full h-20 items-center">
          <div class="col-start-1 col-span-3">
            <div class="ml-10 flex items-center">
              <img
                src="@/assets/icons/envelope.svg"
                class="w-[32px] h-[20px] ml-7"
              />
              <h3
                class="flex font-semibold text-slate text-xl drop-shadow-2xl text-[#232F3E] ml-2"
              >
                Emails
              </h3>
            </div>
          </div>
          <DeleteRequest />
        </div>
</template>

<script>
  export default {
    
  }
</script>