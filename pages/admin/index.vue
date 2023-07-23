
<template>
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
      <div class="w-[350px] bg-[rgb(55,71,90)]">
        <div class="grid grid-rows">
          <div class="flex flex-col justify-center px-4 py-8 -mt--2 -mb-10">
            <!-- Queue Counter Tab -->
            <queue-tab
              class="bg-white w-[317px] h-[50px] rounded-lg flex flex-row justify-start items-center shadow-2xl"
            >
              <div
                class="flex justify-start items-center"
              >
                <img
                  src="@/assets/icons/user-fill.svg"
                  class="w-[17px] h-[19px] ml-4"
                />
                <h2 class="font-semibold text-[#37475A] m-2">Total Queue:</h2>
                <queue-number class="font-semibold text-[#37475A]">{{
                  pendingRequestsCount
                }}</queue-number>
              </div>
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
            <!-- End Tag -->
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
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <!-- <div
        v-if="selectedRequestID === null && !DisplayPanel"
        class="bg-white flex-1 flex justify-center items-center"
      > -->
        <!-- Content in the right panel -->
        <!-- <div class="flex flex-col items-center opacity-80">
          <img
            src="@/assets/icons/default-aws.svg"
            alt="AWS Photobooth Logo"
            class="w-[478px] h-[239px]"
          />
          <p class="bg-[#FEBD69] p-3 px-8 rounded-3xl mt-5 text-[#232F3E]">
            Please select a request to proceed
          </p>
        </div>
      </div> -->

      <!-- Display Panel -->
      <div v-if="selectedRequestID === null && !DisplayPanel" class="flex flex-col flex-1">
        <!--Email and Delete Button Container-->
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
          <div class="col-start-10 col-span-3">
            <div class="ml-16 -mt-1">
              <button
                @click="DeleteRequest"
                class="bg-[#146eb4] w-[170px] h-[36px] rounded-lg text-white font-semibold flex hover:bg-[#264873] focus:bg-[#146eb4] duration-500 mr-1 justify-center items-center"
              >
                <img src="@/assets/icons/trash.svg" class="pr-1 mr-1" />
                Delete Request
              </button>
            </div>
          </div>
        </div>

        <!--Email Container-->
        <div class="flex justify-center">
          <div
            class="w-[1050px] h-[120px] flex flex-nowrap justify-center bg-[#37475A] rounded-lg py-2 -mt-3"
          >
            <div
              class="text-black email-container overflow-x-scroll whitespace-nowrap inline-flex"
            >
              <div
                v-if="selectedRequestID"
                class="flex justify-center items-center"
              >
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
              </div>
            </div>
          </div>
        </div>

        <!-- Upload container-->
        <div class="flex justify-center">
          <div
            class="w-[1030px] h-[470px] flex flex-col items-center justify-center bg-[white] rounded-lg py-2 mt-6 drop-shadow-xl"
          >
            <div
              class="w-[630px] h-[374px] flex flex-col bg-[#37475A] rounded-lg py-2 mt-1"
            >
              <h3
                class="font-semibold text-white text-xl justify-normal ml-7 mt-4"
              >
                Upload your image:
              </h3>
              <div
                class="w-[590px] h-[280px] flex flex-col items-center justify-center bg-[white] py-1 mt-6 ml-5"
              >
                <img
                  src="@/assets/icons/image.svg"
                  class="w-[67px] h-[53px] px-1 drop-shadow-lgr mb-2"
                />
                <h3
                  class="font-semibold text-[#37475A] text-l items-center justify-center -mb-1"
                >
                  Drag & Drop
                </h3>
                <h3
                  class="font-semibold text-[#37475A] text-sm items-center justify-center mb-3"
                >
                  or
                </h3>
                <button
                  @click="BrowseFile"
                  class="bg-[#146eb4] w-[134px] h-[36px] rounded-lg text-white font-semibold flex items-center justify-center hover:bg-[#264873] focus:bg-[#146eb4] duration-500"
                >
                  Browse File
                </button>
              </div>
            </div>
            <button
              @click="uploadPhoto"
              class="bg-[#FEBD69] w-[145px] h-[46px] text-lg font-semibold rounded-lg text-[#232F3E] flex items-center justify-center hover:bg-[#FF9900] focus:bg-[#FEBD69] duration-300 mt-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
            >
              UPLOAD
            </button>
            <upload-popup
              :show="showPopup"
              :processing="isProcessing"
              :success="isSuccess"
              :error="isError"
              @close="closeUploadPopup"
            ></upload-popup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadPopup from "./UploadPopup.vue";

export default {
  components: {
    UploadPopup,
  },

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
  computed: {
    pendingRequestsCount() {
      return this.allRequests.filter(
        (request) => request.status.toLowerCase() === "pending"
      ).length;
    },
    isProcessing() {
      return this.showPopup && this.processing;
    },
    isSuccess() {
      return this.showPopup && this.success;
    },
    isError() {
      return this.showPopup && this.error;
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
    },
    uploadPhoto() {
      this.showPopup = true;
      this.processing = true;

      // Simulate the upload process
      setTimeout(() => {
        const isSuccess = Math.random() < 0.5; // Randomly determine if the upload is successful or not

        this.processing = false;
        this.success = isSuccess;
        this.error = !isSuccess;

        // Hide the popup after a certain time
        setTimeout(() => {
          this.showPopup = false;
        }, 5000); // Adjust the duration as per your requirement (in milliseconds)
      }, 4000); // Simulated upload time (adjust as per your requirement)
    },
    closeUploadPopup() {
      this.showPopup = false;
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
.container {
  /* Define height for the scrollable container */
  height: 560px;
}

.email-container {
  /* Define width for the scrollable email container */
  width: 1000px;
}
</style>