<template>
        <div class="flex justify-center">
          <div
            class="w-[1030px] h-[470px] flex flex-col items-center justify-center bg-[white] rounded-lg py-2 mt-6 drop-shadow-xl"
          >
            <div
              class="w-[630px] h-[374px] flex flex-col bg-[#37475A] rounded-lg py-2 mt-1"
            >
              <h3
                class="font-semibold text-white text-xl justify-normal ml-7 mt-4"
              >
                Upload your image:
              </h3>
              <div
                class="w-[590px] h-[280px] flex flex-col items-center justify-center bg-white py-1 mt-6 ml-5"
              >
                <img
                  src="@/assets/icons/image.svg"
                  class="w-[67px] h-[53px] px-1 drop-shadow-lgr mb-2"
                />
                <button
                  @click="BrowseFile"
                  class="bg-[#146eb4] w-[134px] h-[36px] rounded-lg text-white font-semibold flex items-center justify-center hover:bg-[#264873] focus:bg-[#146eb4] duration-500"
                >
                  Browse File
                </button>
              </div>
            </div>
            <button
              @click="uploadPhoto"
              class="bg-[#FEBD69] w-[145px] h-[46px] text-lg font-semibold rounded-lg text-[#232F3E] flex items-center justify-center hover:bg-[#FF9900] focus:bg-[#FEBD69] duration-300 mt-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
            >
              UPLOAD
            </button>
            <upload-popup
              :show="showPopup"
              :processing="isProcessing"
              :success="isSuccess"
              :error="isError"
              @close="closeUploadPopup"
            ></upload-popup>
          </div>
        </div>
</template>

<script>
  export default {
    
  }
</script>