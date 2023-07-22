<template>
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
                            v-model="selectedFilter"
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
        
</template>

<script>
  export default {
    data(){
      return {
        isDropdownOpen: false,
        selectedOption: "All",
        allRequests: [],
        filteredRequests: [],
        selectedFilter: ''
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