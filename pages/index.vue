<template>
  <section class="bg-stone-100 min-h-screen py-10 flex items-center justify-center">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row w-10/12 lg:w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div class="w-full lg:w-1/2">
          <img src="/img/AWS-bg.jpeg" alt="Background Image" class="object-cover w-full h-full">
        </div>
        <div class="w-full lg:w-1/2 py-20 px-12">
          <h2 class="text-3xl mb-4 text-center font-bold">Register</h2>
          <p class="text-center mb-4">Welcome to AWS Community Day 2023 Photo Booth!</p>
          <form @submit.prevent="validateForm">
            <div v-for="(email, index) in emails" :key="index" class="email-container">
              <input v-model="email.value" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-3xl mb-4" :placeholder="'Your email address '">
            </div>
            <div id="error-container" class="text-sm text-red-500 mb-2">{{ error }}</div>
            <div class="mt-3 text-center">
              <button @click="addEmailField" class="px-4 py-2 bg-blue-900 hover:bg-blue-600 text-white rounded-3xl" type="button">Add Email</button>
            </div>
            <div class="mt-3 text-center">
              <button class="px-4 py-2 bg-orange-500 hover:bg-orange-300 text-white rounded-3xl shadow" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      emails: [{ value: '' }],
      error: ''
    };
  },
  methods: {
    addEmailField() {
      this.emails.push({ value: '' });
    },
    validateForm() {
      const atLeastOneEmailFilled = this.emails.some(email => email.value.trim() !== '');
      if (!atLeastOneEmailFilled) {
        this.error = '*Please enter at least one email address.';
        return;
      }

      // Get the entered emails
      const emails = this.emails.map(email => email.value);

      // Encode the emails
      const encodedEmails = encodeURIComponent(emails.join(','));

      // Navigate to the review page with the encoded emails as a query parameter
      this.$router.push({ path: '/review', query: { emails: encodedEmails } });
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
