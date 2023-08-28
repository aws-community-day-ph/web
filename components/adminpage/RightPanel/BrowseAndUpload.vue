<template>
  <div class="upload-container">
    <div class="upload-section">
      <h3 class="upload-title">Upload your images:</h3>
      <div class="upload-form">
        <img src="@/assets/icons/image.svg" class="upload-icon" />
        <h3 class="upload-instructions">Choose Images to Upload</h3>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          class="imageUpload"
          multiple
          @change="handleFileChange"
        />
      </div>
    </div>
    <button @click="uploadMultiplePhotos" class="upload-button">
      UPLOAD
    </button>
    <upload-popup
      :show="showPopup"
      :processing="processing"
      :success="success"
      :error="error"
      @close="closeUploadPopup"
    ></upload-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Amplify, Storage } from 'aws-amplify';
import UploadPopup from "../RightPanel/UploadPopup.vue";
import { awsConfig } from '../../../src/aws-exports.js'; 

Amplify.configure(awsConfig);

const showPopup = ref(false);
const processing = ref(false);
const success = ref(false);
const error = ref(false);
const selectedFiles = ref([]);

const closeUploadPopup = () => {
  showPopup.value = false;
};

const handleFileChange = (event) => {
  selectedFiles.value = Array.from(event.target.files).slice(0, 3);
};

const uploadImage = async (file) => {
  const uploadOptions = {
    level: 'public',
    resumable: true,
    progressCallback: (progress) => {
      console.log(`Uploaded ${progress.loaded}/${progress.total}`);
    },
  };

  return Storage.put(file.name, file, uploadOptions)
  .then((uploadResult) => {
    console.log(`Successfully uploaded ${uploadResult.key}`);
    return uploadResult;
  })
  .catch((error) => {
    console.log('Unexpected error while uploading', error);
    throw error;
  });
}

const uploadMultiplePhotos = async () => {
  if (selectedFiles.value.length === 0) {
    window.alert("Please choose files to upload");
    return;
  }

  showPopup.value = true;
  processing.value = true;
  const filesToUpload = selectedFiles.value;

  try {
    for (const file of filesToUpload) {
      console.log(`Uploading file: ${file.name}`);
      await uploadImage(file);
    }

    processing.value = false;
    success.value = true;

    setTimeout(() => {
      showPopup.value = false;
    }, 5000);
  } catch (error) {
    processing.value = false;
    error.value = true;
  }
};
</script>

<style lang="postcss" scoped>

  .upload-container{
    @apply w-[1030px] h-[430px] flex flex-col items-center justify-center bg-white rounded-lg py-2 mt-6 drop-shadow-xl
  }

  .upload-section{
    @apply w-[530px] h-[320px] flex flex-col bg-[#37475A] rounded-lg py-2 mt-8 -mb-2
  }
  .upload-title{
    @apply font-semibold text-white text-xl justify-normal ml-7 mt-4
  }

  .upload-instructions{ 
    @apply mb-2 mt-2
  }

  .upload-form{
    @apply w-[490px] h-[280px] flex flex-col items-center justify-center bg-white py-1 mt-6 ml-5
  }

  .imageUpload{
    @apply mt-4 ml-24
  }

  .upload-button{
    @apply bg-[#FEBD69] w-[145px] h-[50px] text-lg font-semibold rounded-lg text-[#232F3E] flex items-center justify-center hover:bg-[#FF9900] focus:bg-[#FEBD69] duration-300 mt-8 mb-8
    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110
  }
</style>