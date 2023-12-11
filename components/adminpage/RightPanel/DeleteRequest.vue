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
import { ref, onMounted } from 'vue';
import { deleteRequestById } from '../../../api/photobooth.js'

const {$toast} = useNuxtApp();

export default {
  props: {
    selectedRequestID: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const selectedRequestID = ref(props.selectedRequestID);
    console.log('To delete request ID:', selectedRequestID.value);
    const data = {
      requestId: selectedRequestID
    };


    const handleDeleteRequest = async () => {
      try {
        const response = await deleteRequestById(data);

        console.log('boom', data)

        if (response.data) {
          const responseData = response.data.value;
          console.log('Request deleted successfully:', responseData);
        } else {
          console.error("FAILED");
        }
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    };

    onMounted(() => {
      console.log('Component mounted');
    });

    return {
      handleDeleteRequest,
    };
  },
};
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