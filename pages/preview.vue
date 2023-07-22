<template>
  <div class="photo-editor">
    <div
      class="photo-template bg-cover"
      :style="{
        width: `${PHOTO_TEMPLATE_WIDTH}px`,
        height: `${PHOTO_TEMPLATE_HEIGHT}px`,
        backgroundImage: `url(${backgroundImage})`,
      }"
    >
      <div class="uploaded-image-container">
        <div v-if="!uploadedImage" class="upload-placeholder">
          <input type="file" @change="handleImageUpload" />
        </div>
        <img
          v-if="uploadedImage"
          :src="uploadedImage"
          class="uploaded-image"
          alt="Uploaded Image"
        />
      </div>
   
    </div>
    <div class="buttons">
        <button @click="saveImage">Save</button>
        <button @click="resetImage">Reset</button>
      </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";

const PHOTO_TEMPLATE_WIDTH = 1080;
const PHOTO_TEMPLATE_HEIGHT = 700;
const UPLOADED_IMAGE_WIDTH = 840;
const UPLOADED_IMAGE_HEIGHT = 575;

const backgroundImage = ref("../assets/template/photo_booth_template.png");

const uploadedImage = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;

    img.onload = () => {
      const { width, height } = scaleImageToFitTemplate(img.width, img.height);

      const canvas = document.createElement("canvas");
      canvas.width = UPLOADED_IMAGE_WIDTH;
      canvas.height = UPLOADED_IMAGE_HEIGHT;
      const ctx = canvas.getContext("2d");

      // Calculate the position to center the image within the canvas
      const x = (UPLOADED_IMAGE_WIDTH - width) / 2;
      const y = (UPLOADED_IMAGE_HEIGHT - height) / 2;

      ctx.drawImage(img, x, y, width, height);

      uploadedImage.value = canvas.toDataURL("image/jpeg");
    };
  };

  reader.readAsDataURL(file);
};

const scaleImageToFitTemplate = (imgWidth, imgHeight) => {
  const templateAspectRatio = PHOTO_TEMPLATE_WIDTH / PHOTO_TEMPLATE_HEIGHT;
  const imageAspectRatio = imgWidth / imgHeight;

  let newWidth, newHeight;

  if (templateAspectRatio > imageAspectRatio) {
    newWidth = UPLOADED_IMAGE_WIDTH;
    newHeight = UPLOADED_IMAGE_WIDTH / imageAspectRatio;
  } else {
    newHeight = UPLOADED_IMAGE_HEIGHT;
    newWidth = UPLOADED_IMAGE_HEIGHT * imageAspectRatio;
  }

  return { width: newWidth, height: newHeight };
};

const saveImage = () => {
  // Logic to save the image (e.g., send it to the server).
  // Replace this with your implementation.
};

const resetImage = () => {
  uploadedImage.value = null;
};
</script>
  
<style lang="postcss" scoped>
.photo-editor {
  @apply flex flex-col items-center m-4;
}

.photo-template {
  @apply relative flex items-center justify-center overflow-hidden mt-3;
}

.upload-placeholder {
  @apply absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center cursor-pointer;
}

.upload-placeholder p {
  @apply m-0 text-center;
}

.uploaded-image-container {
  @apply border-2 border-dashed border-gray-300 -mt-[84px];
  @apply w-[867px] h-[586px];
}

.uploaded-image {
  @apply block w-full h-full object-cover;
}

.buttons {
  @apply mt-2;
}

button {
  @apply m-1;
}
</style>
  