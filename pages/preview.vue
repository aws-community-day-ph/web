<template>
  <div class="photo-editor">
    <div
      ref="photoTemplateRef"
      class="photo-template bg-cover"
      :style="{
        width: `${PHOTO_TEMPLATE_WIDTH}px`,
        height: `${PHOTO_TEMPLATE_HEIGHT}px`,
        backgroundImage: `url(${backgroundImage})`,
      }"
    >
      <div
        class="uploaded-image-container"
        :class="[{ 'border-2 border-dashed border-gray-300': !uploadedImage }]"
      >
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
  
<script>
import { ref } from "vue";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
export default {
  setup() {
    const PHOTO_TEMPLATE_WIDTH = ref(1530);
    const PHOTO_TEMPLATE_HEIGHT = ref(1024);
    const UPLOADED_IMAGE_WIDTH = ref(840);
    const UPLOADED_IMAGE_HEIGHT = ref(575);
    const photoTemplateRef = ref(null);

    const backgroundImage = ref("../assets/template/photo_booth_template.png");

    const uploadedImage = ref(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const { width, height } = scaleImageToFitTemplate(
            img.width,
            img.height
          );

          const canvas = document.createElement("canvas");
          canvas.width = UPLOADED_IMAGE_WIDTH.value;
          canvas.height = UPLOADED_IMAGE_HEIGHT.value;
          const ctx = canvas.getContext("2d");

          // Calculate the position to center the image within the canvas
          const x = (UPLOADED_IMAGE_WIDTH.value - width) / 2;
          const y = (UPLOADED_IMAGE_HEIGHT.value - height) / 2;

          ctx.drawImage(img, x, y, width, height);

          uploadedImage.value = canvas.toDataURL("image/jpeg");
        };
      };

      reader.readAsDataURL(file);
    };

    const scaleImageToFitTemplate = (imgWidth, imgHeight) => {
      const templateAspectRatio =
        PHOTO_TEMPLATE_WIDTH.value / PHOTO_TEMPLATE_HEIGHT.value;
      const imageAspectRatio = imgWidth / imgHeight;

      let newWidth, newHeight;

      if (templateAspectRatio > imageAspectRatio) {
        newWidth = UPLOADED_IMAGE_WIDTH.value;
        newHeight = UPLOADED_IMAGE_WIDTH.value / imageAspectRatio;
      } else {
        newHeight = UPLOADED_IMAGE_HEIGHT.value;
        newWidth = UPLOADED_IMAGE_HEIGHT.value * imageAspectRatio;
      }

      return { width: newWidth, height: newHeight };
    };

    const saveImage = () => {
      console.log("hellp");
      const photoTemplate = photoTemplateRef.value;
      console.log(photoTemplate);
      if (!photoTemplate) return;

      // Convert the photo template to an image
      htmlToImage
        .toPng(photoTemplate)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "my-node.png";
          link.click();
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    };

    const resetImage = () => {
      uploadedImage.value = null;
    };

    return {
      saveImage,
      resetImage,
      handleImageUpload,
      PHOTO_TEMPLATE_WIDTH,
      PHOTO_TEMPLATE_HEIGHT,
      UPLOADED_IMAGE_WIDTH,
      UPLOADED_IMAGE_HEIGHT,
      photoTemplateRef,
      backgroundImage,
      uploadedImage,
    };
  },
};
</script>
  
<style lang="postcss" scoped>
.photo-editor {
  @apply flex flex-col items-center m-4;
}

.photo-template {
  @apply relative flex items-center justify-center overflow-hidden;
}

.upload-placeholder {
  @apply absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center cursor-pointer;
}

.upload-placeholder p {
  @apply m-0 text-center;
}

.uploaded-image-container {
  @apply -mt-[150px];
  @apply w-[1230px] h-[835px];
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
  