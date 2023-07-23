  <template>
    <div class="px-2">
      <div class="container overflow-y-auto h-[560px]">
        <div v-for="request in filteredRequests" :key="request.id" class="flex justify-start py-2 px-3">
        <button
        @click="handleRequestClick(request.id, index)"
        :class="{
          'bg-white': activeRequestID !== request.id,
          'bg-[#FEBD69]': activeRequestID === request.id,
          'w-[320px] h-[65px] rounded-2xl flex justify-start items-center hover:bg-[#FEBD69] focus:bg-[#FEBD69] duration-500': true,
        }"
      >
        <div class="grid grid-cols-5 grid-rows-1 gap-2">
          <div class>
            <img src="@/assets/icons/clipboard.svg" class="w-5.7 h-auto ml-6 mt-2" />
          </div>
          <div class="col-span-2">
            <div class="px-2 ml-[-7px]">
              <h3 class="text-[#37475A] text-[15px] font-bold flex flex-row mt-0.5">
                Request {{ request.id }}
              </h3>
              <p class="text-[10px] text-[#37475A] -ml-9">
                View form
                <img src="@/assets/icons/view-arrow.svg" class="w-3 h-3 inline" />
              </p>
            </div>
          </div>
          <div class="col-start-5 col-end-5 justify-self-end self-center">
            <div class="ml-6">
              <img src="@/assets/icons/caret-right.svg" class="w-6 h-auto mr-0.5" />
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
          handleRequestClick(requestID, index){
            this.$emit('request-clicked', requestID, index);
          }
        }
    }
 
  </script>  