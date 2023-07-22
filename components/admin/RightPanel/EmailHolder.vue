<template>
                  <div
                  v-for="(email, index) in getEmails(selectedRequestID)"
                  :key="email"
                  class="items-center mx-2"
                >
                  <div
                    class="w-[322px] h-[57px] rounded-lg bg-white flex justify-start items-center text-[#232F3E]"
                  >
                    <div
                      class="text-white text-lg flex justify-center items-center w-[37px] h-[36px] bg-[#146EB4] rounded-full ml-5"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="pl-3">{{ email }}</div>
                  </div>
                </div>
</template>

<script>
  export default {
    
  }
</script>