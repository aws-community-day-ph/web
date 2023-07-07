h<template>
  <div class="flex flex-col h-screen font-aws">
    <!-- Topbar -->
    <div class="bg-[#37475A] py-2 px-4 h-12">
      <!-- Topbar content -->
      <img
        src="@/assets/icons/topbar-icon-real.svg"
        class="w-[84px] h-[54px]"
      />
    </div>

    <div class="flex-1 flex">
      <!-- Left Panel -->
      <div class="w-[350px] bg-[#37475A]">
        <div class="grid grid-rows">
          <div class="flex flex-col justify-center px-4 py-8 -mt--2 -mb-10">
            <!-- Queue Counter Tab -->
            <queue-tab
              class="bg-white w-[317px] h-[50px] rounded-lg flex flex-row justify-start items-center shadow-2xl"
            >
              <queue-container
                class="flex justify-row justify-start items-center"
              >
                <img
                  src="@/assets/icons/user-fill.svg"
                  class="w-[17px] h-[19px] ml-4"
                />
                <h2 class="font-semibold text-[#37475A] m-2">Total Queue:</h2>
                <queue-number class="font-semibold text-[#37475A]">{{
                  pendingRequestsCount
                }}</queue-number>
              </queue-container>
            </queue-tab>

            <!-- Requests Container -->
            <requests-wrapper class="flex flex-row">
              <div class="grid-flow-col py-4 pl-3 gap-32 inline-grid">
                <h3 class="font-semibold text-white text-xl">Request</h3>
                <!-- Filter -->
                <div class="self-center">
                  <button
                    @click="toggleDropdown"
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="bg-white text-[#37475A] h-[26px] text-center inline-flex items-center rounded-md hover:bg-[#FEBD69] duration-500 focus:outline-none text-[12px] font-semibold"
                    type="button"
                  >
                    <img
                      src="@/assets/icons/funnel-fill.svg"
                      class="w-4 h-4 ml-2 mr-1"
                    />
                    <p class="mt-0.5">Filter</p>
                    <svg
                      class="w-8 h-5 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill-rule="evenodd" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Dropdown -->
                  <div
                    v-if="isDropdownOpen"
                    id="dropdown"
                    class="absolute w-36 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700"
                  >
                    <ul
                      class="py-2 px-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <div
                          @click="filterRequests('Pending')"
                          class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <input
                            id="default-radio-4"
                            type="radio"
                            :value="'Pending'"
                            name="default-radio"
                            :checked="selectedOption === 'Pending'"
                            :class="{
                              'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300 focus:ring-[#37475A] dark:focus:ring-[blue-600] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500':
                                selectedOption === 'Pending',
                              'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300':
                                selectedOption !== 'Pending',
                            }"
                          />
                          <label
                            for="default-radio-4"
                            class="w-full ml-2 text-sm font-medium"
                            >Pending
                          </label>
                        </div>
                      </li>
                      <li>
                        <div
                          @click="filterRequests('Completed')"
                          class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <input
                            id="default-radio-4"
                            type="radio"
                            :value="'Completed'"
                            name="default-radio"
                            :checked="selectedOption === 'Completed'"
                            :class="{
                              'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300 focus:ring-[#37475A] dark:focus:ring-[blue-600] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500':
                                selectedOption === 'Completed',
                              'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300':
                                selectedOption !== 'Completed',
                            }"
                          />
                          <label
                            for="default-radio-5"
                            class="w-full ml-2 text-sm font-medium"
                            >Completed
                          </label>
                        </div>
                      </li>
                      <li>
                        <div
                          @click="filterRequests('Cancelled')"
                          class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <input
                            id="default-radio-4"
                            type="radio"
                            :value="'Cancelled'"
                            name="default-radio"
                            :checked="selectedOption === 'Cancelled'"
                            :class="{
                              'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300 focus:ring-[#37475A] dark:focus:ring-[blue-600] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500':
                                selectedOption === 'Cancelled',
                              'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300':
                                selectedOption !== 'Cancelled',
                            }"
                          />
                          <label
                            for="default-radio-6"
                            class="w-full ml-2 text-sm font-medium"
                            >Cancelled
                          </label>
                        </div>
                      </li>
                      <li>
                        <div
                          @click="filterRequests('All')"
                          class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <input
                            id="default-radio-4"
                            type="radio"
                            :value="'All'"
                            name="default-radio"
                            :checked="selectedOption === 'All'"
                            :class="{
                              'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300 focus:ring-[#37475A] dark:focus:ring-[blue-600] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500':
                                selectedOption === 'All',
                              'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300':
                                selectedOption !== 'All',
                            }"
                          />
                          <label
                            for="default-radio-7"
                            class="w-full ml-2 text-sm font-medium"
                            >All
                          </label>
                        </div>
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
            <div
              v-for="request in filteredRequests"
              :key="request.id"
              class="flex justify-start px-3 py-2"
              @click="toggleEmails(request.id)"
            >
              <!-- Holder for each request -->
              <button
                @click="DisplayPanel = !DisplayPanel"
                class="bg-white w-[320px] h-[65px] rounded-2xl flex justify-start items-center hover:bg-[#FEBD69] focus:bg-[#FEBD69] duration-500"
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
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div v-if="!DisplayPanel" class="bg-white flex-1 flex justify-center items-center">
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

      <!-- Display Panel -->
      <div v-if="DisplayPanel" class="bg-white flex px-10 py-10 -mt--5 -mb-10">
          <!-- Email-->
          <div class="flex flex-row">
              <img
                src="@/assets/icons/envelope.svg"
                class="w-[35px] h-[28.6px] px-1 drop-shadow-lg"
              />
              <h3 class="font-bold text-slate text-xl drop-shadow-2xl">Emails</h3>
          </div>

          <!-- Delete Request-->
          <div className="grid grid-cols-10 grid-rows-5 gap-4"> 
            <div className="col-start-9">
            <button
              @click="DeleteRequest"
              class="bg-[#146eb4] w-[175px] h-[36px] rounded-2xl text-white items-end hover:bg-[#264873] focus:bg-[#146eb4] duration-500"
            > Delete Request
              <div>
                  <div>
                    <img
                      src="@/assets/icons/trash.svg"
                      class="w-0 h-0"
                    />
                  </div>
                </div>
            </button>
            </div>
          </div>
          <!-- Emails -->
          <!-- Image -->
      </div>
    </div>
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
      DisplayPanel: false,
      DeleteRequest: false,
    };
  },
  computed: {
    pendingRequestsCount() {
      return this.allRequests.filter(
        (request) => request.status.toLowerCase() === "pending"
      ).length;
    },
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
      const response = await fetch("../assets/sampledata.json");
      const data = await response.json();
      this.allRequests = data.data;
      this.filteredRequests = data.data;
      console.log("Data fetched:", this.allRequests);
    } catch (error) {
      console.error("Failed to fetch data:", error);
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
