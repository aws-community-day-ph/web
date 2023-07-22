<template>
  <section class="h-screen">
    <div class="h-full flex flex-col lg:flex-row">
      <!-- Left column container with background -->
      <div class="w-full lg:w-1/2">
        <img src="/img/AWS-bg.jpeg" class="object-cover w-full h-full" alt="background image" />
      </div>

      <!-- Right column container -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center px-8 py-8">
      

        <div v-if="!submitted">
          <!-- Review Section -->
          
            <h2 class="text-4xl mb-4 text-center font-bold text-[#232F3E]">Review your emails</h2>
            <p class="text-center mb-4">Please take a moment to verify the email addresses you have entered to ensure their accuracy and validity.</p>
            <div class="text-center mb-4">
              <div v-for="(email, index) in editedEmails" :key="index" class="w-full mb-4">
                <input v-if="email.value.trim() !== ''" v-model="editedEmails[index].value" class="w-full px-3 py-2 focus:outline-none rounded-full" type="text">
              </div>
            </div>

            <div class="mt-3 text-center">
              <button class="px-4 py-2 bg-orange-500 hover:bg-orange-300 text-white rounded-3xl shadow" @click="submitEmails">Confirm</button>
            </div>
          </div>

          <div v-else>
            <!-- Queue Section -->
            <h2 class="text-3xl mb-4 text-center font-bold">Your queue number is:</h2>
            <h1 class="text-9xl mb-4 text-center font-bold">{{ queueNumber }}</h1>
            <p class="text-center">Please wait patiently for your turn.<br>Thank you for your patience.</p>
            <div class="mt-3 text-center">
              <button class="px-4 py-2 bg-orange-500 hover:bg-orange-300 text-white rounded-3xl" @click="newRequest">New Request</button>
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
    this.editedEmails = decodedEmails.map(email => ({ value: email.trim() })); 
  },
  methods: {
    submitEmails() {
      this.editedEmails = this.editedEmails.filter(email => email.value.trim() !== '');
      if (this.editedEmails.length === 0) {
        return;
      }

      // Perform email submission logic here (e.g., send emails to server)


      this.queueNumber++;
      this.submitted = true;
    },
    newRequest() {
      this.submitted = false;
      this.editedEmails = this.editedEmails.map(emailObj => ({ value: emailObj.value }));
      this.queueNumber++;
      this.$router.push('/');
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

.object-cover {
  object-fit: cover;
}

@media (max-width: 767px) {
  .flex-col {
    flex-direction: column !important;
  }
}
</style>
