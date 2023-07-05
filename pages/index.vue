<template>
  <div class="flex flex-col h-screen">
    <!-- Topbar -->
    <div class="bg-[#37475A] py-2 px-4 h-12">
      <!-- Topbar content -->
      <img src="@/assets/icons/topbar-icon-real.svg" class="w-[64px] h-[37px]" />
    </div>

    <div class="flex-1 flex">
      <!-- Left Panel -->
      <div class="w-[367px] bg-[#37475A]">
        <div class="grid grid-rows">
          <div class="flex flex-col justify-center px-4 py-8 -mt-6 -mb-10">
            <!-- Queue Counter Tab -->
            <queue-tab class="bg-white w-[334px] h-[50px] rounded-lg flex flex-row justify-start items-center shadow-2xl">
              <queue-container class="flex justify-row justify-start items-center">
                <img src="@/assets/icons/user-fill.svg" class="w-[17px] h-[19px] ml-4" />
                <h2 class="font-semibold text-[#37475A] m-2">Total Queue:</h2>
                <queue-number class=" font-semibold text-[#37475A]">{{ pendingRequestsCount }}</queue-number>
              </queue-container>
            </queue-tab>

            <!-- Requests Container -->
            <requests-wrapper class="flex flex-row">
              <div class="grid-flow-col py-4 pl-2 gap-32 inline-grid">
                <h3 class="font-bold text-white text-2xl">Request</h3>
                <!-- Filter -->
                <div class="self-center">
                  <button
                    @click="toggleDropdown"
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="bg-white text-[#37475A] h-[26px] text-center inline-flex items-center rounded-md hover:bg-[#FF9900] duration-500"
                    type="button"
                  >
                    <img src="@/assets/icons/funnel-fill.svg" class="w-4 h-4 ml-2 mr-1" />
                    Filter
                    <svg
                      class="w-8 h-4 ml-1"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <!-- Dropdown -->
                  <div v-if="isDropdownOpen" id="dropdown" class="absolute w-24 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700">
                    <ul class="py-2 text-sm text-center text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li @click="filterRequests('Pending')">
                        <a href="#" class="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pending</a>
                      </li>
                      <li @click="filterRequests('Completed')">
                        <a href="#" class="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Completed</a>
                      </li>
                      <li @click="filterRequests('Cancelled')">
                        <a href="#" class="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cancelled</a>
                      </li>
                      <li @click="filterRequests('All')">
                        <a href="#" class="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </requests-wrapper>
          </div>
        </div>

        <!-- Scrollable Requests -->
        <div class="px-2">
          <div class="container overflow-y-auto">
            <div v-for="request in filteredRequests" :key="request.id" class="flex justify-start px-3 py-2" @click="toggleEmails(request.id)">

              <!-- Holder for each request -->
              <button @click="DisplayPanel = !DisplayPanel" class=" bg-white w-[320px] h-[65px] rounded-2xl flex justify-start items-center hover:bg-[#FF9900] duration-500">
               
                <div className="grid grid-cols-5 grid-rows-1 gap-2">
                    <div><img src="@/assets/icons/clipboard-text-bold.svg" class="w-10 h-auto ml-4 mr-1" /></div>
                    <div className="col-span-2">
                      <div class="px-2">
                      <h3 class="text-[#37475A] font-bold flex flex-row">Request {{ request.id }}</h3>
                      <p class="text-[10px] inline-flex -ml-8">View form
                      <img src="@/assets/icons/arrow-right-light.svg" class="w-4 h-4 ml-1" />
                      </p>
                      </div>
                    </div>
                    <div className="col-start-5 col-end-5 justify-self-end self-center">
                      <div class="mr-4">
                        <img src="@/assets/icons/caret-right.svg" class="w-6 h-auto" />
                      </div>
                    </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="flex-1 bg-white">
        <!-- Content in the right panel -->
        <h3 v-show="DisplayPanel">Hello</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: 'All',
      allRequests: [],
      filteredRequests: [],
      selectedRequestID: null,
      DisplayPanel: false,
    };
  },
  computed: {
    pendingRequestsCount() {
      return this.allRequests.filter((request) => request.status.toLowerCase() === 'pending').length;
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      console.log('Dropdown toggled:', this.isDropdownOpen);
    },
    filterRequests(option) {
      this.selectedOption = option;

      if (option === 'All') {
        this.filteredRequests = this.allRequests;
      } else {
        this.filteredRequests = this.allRequests.filter((request) => request.status.toLowerCase() === option.toLowerCase());
      }

      console.log('Filtered Requests:', this.filteredRequests);
      console.log('Pending Requests Count:', this.pendingRequestsCount);
    },
    toggleEmails(requestID) {
      if (this.selectedRequestID === requestID) {
        this.selectedRequestID = null;
      } else {
        this.selectedRequestID = requestID;
      }
    },
  },
  async created() {
    try {
      const response = await fetch('../assets/sampledata.json');
      const data = await response.json();
      this.allRequests = data.data;
      this.filteredRequests = data.data;
      console.log('Data fetched:', this.allRequests);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  },
};
</script>

<style>
.content {
  /* Define height and width for the scrollable content area */
  height: 400px;
  width: 300px;
  overflow: scroll;
}

.container {
  /* Define height for the scrollable container */
  height: 560px;
}
</style>
