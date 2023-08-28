<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 flex items-center justify-center backdrop-blur"
  >
    <div
      class="w-[457px] h-[332px] bg-[#37475A] flex items-center justify-center rounded-md"
    >
      <div
        class="w-[437px] h-[312px] bg-[white] items-center justify-center rounded-md"
      >
        <div
          v-if="isProcessing"
          class="flex flex-col items-center justify-center"
        >
          <button
            class="text-gray-500 hover:text-red-500 self-end mr-2 mt-1"
            @click="closePopup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src="@/assets/icons/mascot-processing.png"
            class="w-[173px] h-[169px] drop-shadow-md"
          />
          <h3
            class="font-bold text-[#37475A] text-xl items-center justify-center drop-shadow-lg"
          >
            PROCESSING
          </h3>
          <!-- PROGRESS BAR -->
          <div
            class="w-[220px] h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-700"
          >
            <div
              class="h-4 bg-[#FEBD69] rounded-full dark:bg-blue-500"
              style="width: 45%"
            ></div>
          </div>
          <h3
            class="font-normal text-[#37475A] text-xs items-center justify-center drop-shadow-lg"
          >
            Please wait while we set things up
          </h3>
          <h3
            class="font-normal text-[#37475A] text-xs items-center justify-center drop-shadow-lg"
          >
            for you!
          </h3>
        </div>

        <div
          v-else-if="isSuccess"
          class="flex flex-col items-center justify-center"
        >
          <img
            src="@/assets/icons/mascot-successfully.png"
            class="w-[173px] h-[169px] drop-shadow-md mt-3"
          />
          <h3
            class="font-bold text-[#37475A] text-xl items-center justify-center drop-shadow-lg"
          >
            SUCCESSFULLY
          </h3>
          <h3
            class="font-normal text-[#37475A] text-xs items-center justify-center drop-shadow-lg"
          >
            Sent Images to Email!
          </h3>
          <button
            @click="closePopup"
            class="bg-[#FEBD69] w-[125px] h-[36px] text-sm font-semibold mt-2 rounded-lg text-[#37475A] flex items-center justify-center hover:bg-[#FF9900] focus:bg-[#FEBD69] duration-300 transition ease-in-out delay-150"
          >
            Close request
          </button>
        </div>
        <div v-else class="flex flex-col items-center justify-center mt-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="63"
            height="60"
            viewBox="0 0 63 60"
            fill="none"
            class="mt-8"
          >
            <path
              d="M61.7964 49.1925L37.1667 3.59076C36.5758 2.49866 35.7275 1.59211 34.7067 0.96191C33.6859 0.331713 32.5285 0 31.3504 0C30.1723 0 29.015 0.331713 27.9942 0.96191C26.9734 1.59211 26.1251 2.49866 25.5342 3.59076V3.5931L0.90442 49.1925C0.31308 50.2869 0.00114526 51.5288 3.14759e-06 52.7933C-0.00113896 54.0578 0.308551 55.3004 0.897914 56.3959C1.48728 57.4914 2.33552 58.4013 3.3573 59.034C4.37907 59.6667 5.53834 59.9999 6.71845 60H55.9824C57.1625 59.9999 58.3218 59.6667 59.3436 59.034C60.3653 58.4013 61.2136 57.4914 61.803 56.3959C62.3923 55.3004 62.702 54.0578 62.7009 52.7933C62.6997 51.5288 62.3878 50.2869 61.7964 49.1925ZM29.1084 21.6008C29.1084 20.9643 29.3444 20.3538 29.7644 19.9037C30.1845 19.4536 30.7542 19.2007 31.3482 19.2007C31.9423 19.2007 32.512 19.4536 32.9321 19.9037C33.3521 20.3538 33.5881 20.9643 33.5881 21.6008V36.0014C33.5881 36.6379 33.3521 37.2484 32.9321 37.6985C32.512 38.1486 31.9423 38.4015 31.3482 38.4015C30.7542 38.4015 30.1845 38.1486 29.7644 37.6985C29.3444 37.2484 29.1084 36.6379 29.1084 36.0014V21.6008ZM31.3499 50.4028C30.6854 50.4028 30.0358 50.1917 29.4833 49.7961C28.9308 49.4005 28.5001 48.8382 28.2458 48.1804C27.9915 47.5226 27.925 46.7987 28.0546 46.1003C28.1843 45.402 28.5043 44.7605 28.9741 44.257C29.444 43.7535 30.0427 43.4106 30.6944 43.2717C31.3462 43.1328 32.0217 43.2041 32.6356 43.4766C33.2495 43.7491 33.7743 44.2105 34.1435 44.8026C34.5126 45.3946 34.7097 46.0907 34.7097 46.8027C34.7096 47.7575 34.3557 48.6732 33.7256 49.3483C33.0955 50.0235 32.2409 50.4028 31.3499 50.4028Z"
              fill="#FEBD69"
            />
          </svg>
          <h3
            class="font-bold text-[#37475A] text-xl items-center justify-center drop-shadow-lg mt-6"
          >
            PROCESS FAILURE
          </h3>
          <h3
            class="font-normal text-[#37475A] text-xs items-center justify-center drop-shadow-lg"
          >
            Failed to Process Images
          </h3>
          <button
            @click="closePopup"
            class="bg-[#FEBD69] w-[125px] h-[36px] text-sm font-semibold mt-2 rounded-lg text-[#37475A] flex items-center justify-center hover:bg-[#FF9900] focus:bg-[#FEBD69] duration-300 transition ease-in-out delay-150"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    processing: {
      type: Boolean,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showPopup() {
      return this.show;
    },
    isProcessing() {
      return this.show && this.processing;
    },
    isSuccess() {
      return this.show && this.success;
    },
    isError() {
      return this.show && this.error;
    },
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="postcss" scoped>

  
</style>
