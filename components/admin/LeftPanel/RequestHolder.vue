<template>
   <div
        v-for="request in filteredRequests"
        :key="request.id"
        class="flex justify-start px-3 py-2"
        @click="toggleEmails(request.id)"
      >
  <button
          @click="toggleEmails(requestID, index)"
          :class="{
            'bg-white': activeRequestID !== request.id,
            'bg-[#FEBD69]': activeRequestID === request.id,
            'w-[320px] h-[65px] rounded-2xl flex justify-start items-center hover:bg-[#FEBD69] focus:bg-[#FEBD69] duration-500': true,
          }"
        >
          <div className="grid grid-cols-5 grid-rows-1 gap-2">
            <div>
              <img
                src="@/assets/icons/clipboard.svg"
                class="w-5.7 h-auto ml-6 mt-2"
              />
            </div>
            <div className="col-span-2">
              <div class="px-2 ml-[-7px]">
                <h3
                  class="text-[#37475A] text-[15px] font-bold flex flex-row mt-0.5"
                >
                  Request {{ request.id }}
                </h3>
                <p class="text-[10px] text-[#37475A] -ml-9">
                  View form
                  <img
                    src="@/assets/icons/view-arrow.svg"
                    class="w-3 h-3 inline"
                  />
                </p>
              </div>
            </div>
            <div
              className="col-start-5 col-end-5 justify-self-end self-center"
            >
              <div class="ml-6">
                <img
                  src="@/assets/icons/caret-right.svg"
                  class="w-6 h-auto mr-0.5"
                />
              </div>
            </div>
          </div>
        </button>
        </div>
</template>

<script>
export default {

data() {
return {
isDropdownOpen: false,
selectedOption: "All",
allRequests: [],
filteredRequests: [],
selectedRequestID: null,
selectedRequestIndex: -1,
activeRequestID: null,
DeleteRequest: false,
BrowseFile: [], //no code
showPopup: false,
processing: false,
success: false,
error: false,
};
},

methods: {
  toggleEmails(requestID, index) {
      if (this.activeRequestID === requestID) {
        this.selectedRequestID = null;
        this.selectedRequestIndex = -1;
        this.DisplayPanel = false;
      } else {
        this.selectedRequestID = requestID;
        this.DisplayPanel = true;
        this.selectedRequestIndex = index;
        console.log("Emails for Request", requestID, ":", emails);
      }
    },
    getEmails(requestID) {
      const selectedRequest = this.allRequests.find(
        (request) => request.id === requestID
      );
      if (selectedRequest) {
        return selectedRequest.emails || [];
      }
      return [];
    }
},
async created(){
try {
const response = await fetch("../assets/sampledata.json");
const data = await response.json();
this.allRequests = data.data;
this.filteredRequests = data.data;
console.log("Data fetched:", this.allRequests);
} catch (error) {
console.error("Failed to fetch data:", error);
}
}
}
</script>