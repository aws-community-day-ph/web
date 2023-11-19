<template>
  <div class="wrapper">
    <button
      @click="handleDeleteRequest"
      class="button"
    >
      <img src="@/assets/icons/trash.svg" class="trash" />
      Delete Request
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { deleteRequest as apiDeleteRequest } from '../../../api/photobooth.js';
 const { $toast, $api } = useNuxtApp();

export default {
  props: {
    selectedRequestID: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const selectedRequestID = ref(props.selectedRequestID);

    const payload = {
      requestId: selectedRequestID.value,
    };

    console.log("Deleting Request ID:", payload);
    console.log("RequestId: ", selectedRequestID.value);

    const handleDeleteRequest = async () => {
      try {
        const response = await apiDeleteRequest(payload);

        if (response.data) {
          const responseData = response.data.value;
          $toast.success(`Successfully Deleted Request ID ${payload.requestID}`);
          console.log('Request deleted successfully:', responseData);
        } else {
          $toast.error('Error deleting request. Data not available in the response.');
        }

      } catch (error) {
        console.error('Error deleting request:', error);
        $toast.error('Error deleting request');
      }
    };

    return {
      handleDeleteRequest,
    };
  }
}
</script>


<style lang="postcss" scoped>
  .wrapper{
    @apply ml-16 -mt-1
  }

  .button{
    @apply bg-[#146eb4] w-[170px] h-[36px] rounded-lg text-white font-semibold flex hover:bg-[#264873] focus:bg-[#146eb4] duration-500 mr-1 justify-center items-center
  }

  .trash{
    @apply pr-1 mr-1
  }

</style>