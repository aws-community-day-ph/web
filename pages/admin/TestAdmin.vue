<template>
 <div class="flex flex-col h-screen font-aws">
  <Logo />

  <div class="flex-1 flex">
    <div class="w-[350px] bg-[#37475A]">

      <div class="grid grid-rows">
        <div class="flex flex-col justify-center px-4 py-8 -mt--2 -mb-10">
          <Queue />
          <RequestContainer />
        </div>
      </div>
    </div>

    <div
        v-if="selectedRequestID === null && !DisplayPanel"
        class="bg-white flex-1 flex justify-center items-center"
      >
        <!-- Content in the right panel -->
        <div class="flex flex-col items-center opacity-80">
          <img
            src="@/assets/icons/default-aws.svg"
            alt="AWS Photobooth Logo"
            class="w-[478px] h-[239px]"
          />
          <p class="bg-[#FEBD69] p-3 px-8 rounded-3xl mt-5 text-[#232F3E]">
            Please select a request to proceed
          </p>
        </div>
      </div>

      <div class="flex flex-col flex-1">
      <!-- <div v-if="selectedRequestID" class="flex flex-col flex-1"> -->
        <!--Email and Delete Button Container-->
        <TopContainer />  

        <!--Email Container-->
        <EmailContainer />

        <!-- Upload container-->
        <MainContainer />
      </div>

    

  </div>
 </div>


</template>

<script>
  export default {

    data(){
      return {
        isDropdownOpen: false,
        selectedOption: "All",
        allRequests: [],
        filteredRequests: [],
      }
    },

    methods: {
      toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      console.log("Dropdown toggled:", this.isDropdownOpen);
    },
    filterRequests(option) {
      this.selectedOption = option;

      if (option === "All") {
        this.filteredRequests = this.allRequests;
      } else {
        this.filteredRequests = this.allRequests.filter(
          (request) => request.status.toLowerCase() === option.toLowerCase()
        );
      }

      console.log("Filtered Requests:", this.filteredRequests);
      console.log("Pending Requests Count:", this.pendingRequestsCount);
    },
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