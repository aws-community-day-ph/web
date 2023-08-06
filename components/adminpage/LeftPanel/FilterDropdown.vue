<template>
    <div class="self-center">
      <button
        @click="toggleDropdown"
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        class="bg-white text-[#37475A] h-[26px] text-center inline-flex items-center rounded-md hover:bg-[#FEBD69] duration-500 focus:outline-none text-[12px] font-semibold"
        type="button"
      >
        <img src="@/assets/icons/funnel-fill.svg" class="w-4 h-4 ml-2 mr-1" />
        <p class="mt-0.5">Filter</p>
        <svg
          :class="{ 'transform rotate-180': isDropdownOpen }"
          class="w-8 h-5 ml-1"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill-rule="evenodd" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
  
      <div v-if="isDropdownOpen" id="dropdown" class="absolute w-36 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700">
        <ul class="py-2 px-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li v-for="(option, index) in options" :key="index">
            <div @click="filterRequests(option.value)" class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <input
                :id="option.id"
                type="radio"
                :value="option.value"
                name="default-radio"
                :checked="selectedOption === option.value"
                :class="{
                  'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300 focus:ring-[#37475A] dark:focus:ring-[blue-600] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500': selectedOption === option.value,
                  'w-4 h-4 text-[#37475A] bg-gray-100 border-gray-300': selectedOption !== option.value,
                }"
              />
              <label :for="option.id" class="w-full ml-2 text-sm font-medium">{{ option.value }}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {

    props: {
        value: {
            type: String,
            required: true,
        },
    },
    data() {
      return {
        isDropdownOpen: false,
        options: [
          { id: "default-radio-4", value: "Pending", label: "Pending" },
          { id: "default-radio-5", value: "Sent", label: "Sent" },
          { id: "default-radio-6", value: "Cancelled", label: "Cancelled" },
          { id: "default-radio-7", value: "All", label: "All" },
        ],
      };
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      filterRequests(option) {
        this.selectedOptionValue = option;
        this.$emit('input', option);
        this.isDropdownOpen = false;
      },
    },
  };
  </script>