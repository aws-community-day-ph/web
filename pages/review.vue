<template>
    <section class="bg-stone-100 min-h-screen py-10 flex items-center justify-center">
      <div class="container mx-auto">
        <div v-if="!submitted">
          <!-- Review Section -->
          <div class="flex flex-col lg:flex-row w-10/12 lg:w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div class="w-full lg:w-1/2">
              <img src="/img/AWS-bg.jpeg" alt="Background Image" class="object-cover w-full h-full">
            </div>
            <div class="w-full lg:w-1/2 py-16 px-12">
              <h2 class="text-3xl mb-4 text-center font-bold">Review your emails</h2>
              <p class="text-center mb-4">Please take a moment to verify the email addresses you have entered to ensure their accuracy and validity.</p>
              <div class="text-center mb-4">
                <div v-for="(email, index) in editedEmails" :key="index" class="w-full mb-4">
                  <input v-model="editedEmails[index].value" class="w-full px-3 py-2 focus:outline-none rounded-full" type="text">
                </div>
              </div>
              
              <div class="mt-3 text-center">
                <button class="px-4 py-2 bg-orange-500 hover:bg-orange-300 text-white rounded-3xl shadow" @click="submitEmails">Confirm</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <!-- Queue Section -->
          <div class="flex flex-col lg:flex-row w-10/12 lg:w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div class="w-full lg:w-1/2">
              <img src="/img/AWS-bg.jpeg" alt="Background Image" class="object-cover w-full h-full">
            </div>
            <div class="w-full lg:w-1/2 py-16 px-12">
              <h2 class="text-3xl mb-4 text-center font-bold">Your queue number:</h2>
              <h1 class="text-6xl mb-4 text-center font-bold">{{ queueNumber }}</h1>
              <p class="text-center">Please wait patiently for your turn.<br>Thank you for your patience.</p>
              <div class="mt-3 text-center">
                <button class="px-4 py-2 bg-blue-900 hover:bg-blue-600 text-white rounded-3xl" @click="newRequest">New Request</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editedEmails: [],
        submitted: false,
        queueNumber: 0
      };
    },
    created() {
      const encodedEmails = this.$route.query.emails || '';
      const decodedEmails = decodeURIComponent(encodedEmails).split(',');
      this.editedEmails = decodedEmails.map(email => ({ value: email })); // Initialize editedEmails with the original email addresses
    },
    methods: {
      submitEmails() {
        // Perform email submission logic here (e.g., send emails to server)
  
        // Simulating a response with a queue number
        this.queueNumber = Math.floor(Math.random() * 100) + 1;
        this.submitted = true;
      },

//index ayaw gumana
      newRequest() {
        this.submitted = false;
        this.editedEmails = this.editedEmails.map(emailObj => ({ value: emailObj.value }));
        this.$router.push('/'); // Navigate to the index page
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
  