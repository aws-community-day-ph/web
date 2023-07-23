<template>
            <div class="ml-16 -mt-1">
              <button
                @click="DeleteRequest"
                class="bg-[#146eb4] w-[170px] h-[36px] rounded-lg text-white font-semibold flex hover:bg-[#264873] focus:bg-[#146eb4] duration-500 mr-1 justify-center items-center"
              >
                <img src="@/assets/icons/trash.svg" class="pr-1 mr-1" />
                Delete Request
              </button>
            </div>
</template>

<script>
    export default {

      methods: {
        DeleteRequest(){
          this.request.status = 'cancelled';
          // No code yet
        }
      }
        
    }
</script>