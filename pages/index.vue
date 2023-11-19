<template>
  <section class="h-screen">
    <div class="h-full flex flex-col lg:flex-row">
      <!-- Left column container with background -->
      <div class="w-full lg:w-1/2">
        <img
          src="../img/AWS-bg.jpeg"
          class="object-cover w-full h-full"
          alt="background image"
        />
      </div>

      <!-- Right column container -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center px-8 py-8">
        <!-- Sign in section -->
        <h2 class="text-4xl mb-4 text-center font-bold text-[#232F3E]">
          <span class="text-shadow">Register</span>
        </h2>
        <p class="text-center mb-4">
          Welcome to AWS Community Day 2023 Photo Booth!
        </p>
        <form @submit.prevent="validateForm">
          <div
            v-for="(email, index) in emails"
            :key="index"
            class="email-container flex justify-center"
          >
            <input
              v-model="email.value"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-3xl mb-4"
              :placeholder="'Your email address '"
              required
            />
            <button @click="deleteEmail(index)"><img src="../assets/icons/x.svg" class=" -mt-4 ml-1"/></button>
          </div>
          <div id="error-container" class="text-sm text-red-500 mb-2">
            {{ error }}
          </div>
          <div class="mt-3 text-center">
            <button
              @click="addEmailField"
              class="px-4 py-2 bg-blue-900 hover:bg-blue-600 text-white rounded-3xl"
              type="button"
            >
              Add Email
            </button>
          </div>
          <div class="mt-3 text-center">
            <button
              class="submit-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';


export default {

  setup() {
    const router = useRouter();
    const emails = ref([{ value: "" }]);
    const error = ref("");

    function addEmailField() {
      emails.value.push({ value: "" });
    }

    function deleteEmail(index){
      if (emails.value.length === 1){
        return;
      }

      emails.value.splice(index,1);
    }

    function validateForm() {
      const atLeastOneEmailFilled = emails.value.some(
        (email) => email.value.trim() !== ""
      );
      if (!atLeastOneEmailFilled) {
        error.value = "*Please enter at least one email address.";
        return;
      }

      const emailsArray = emails.value.map((email) => email.value);
      
      // Save the emails as an array in localStorage
      localStorage.setItem("savedEmails", JSON.stringify(emailsArray));

      router.push("/review");
    }

    // Return the data and methods you want to expose to the template
    return {
      emails,
      error,
      addEmailField,
      validateForm,
      deleteEmail,
    };
  },
};
</script>

<style lang="postcss" scoped>
.text-shadow {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

.object-cover {
  object-fit: cover;
}

@media (max-width: 767px) {
  .flex-col {
    flex-direction: column !important;
  }
}

.submit-btn{
  @apply px-4 py-2 bg-orange-500 hover:bg-orange-300 text-white rounded-3xl shadow duration-200
}
</style>
