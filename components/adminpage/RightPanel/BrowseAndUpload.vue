<template>
        <div class="flex justify-center">
          <div
            class="w-[1030px] h-[430px] flex flex-col items-center justify-center bg-[white] rounded-lg py-2 mt-6 drop-shadow-xl"
          >
            <div
              class="w-[530px] h-[320px] flex flex-col bg-[#37475A] rounded-lg py-2 mt-8 -mb-2"
            >
              <h3
                class="font-semibold text-white text-xl justify-normal ml-7 mt-4"
              >
                Upload your image:
              </h3>
              <div
                class="w-[490px] h-[280px] flex flex-col items-center justify-center bg-[white] py-1 mt-6 ml-5"
              >
                <img
                  src="@/assets/icons/image.svg"
                  class="w-[67px] h-[53px] px-1 drop-shadow-lgr mb-2"
                />
                <h3
                  class="font-semibold text-[#37475A] text-l items-center justify-center -mb-1"
                >
                  Choose Image to Upload
                </h3>
                  <form action="/upload" method="post" enctype="multipart/form-data" class="mt-4 ml-28">
                    <input type="file" id="imageUpload" name="imageUpload">
                  </form>
              </div>
            </div>
            <button
              @click="uploadPhoto"
              class="bg-[#FEBD69] w-[145px] h-[50px] text-lg font-semibold rounded-lg text-[#232F3E] flex items-center justify-center hover:bg-[#FF9900] focus:bg-[#FEBD69] duration-300 mt-8 mb-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
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
import UploadPopup from "../RightPanel/UploadPopup.vue"
    export default {
        components: {
            UploadPopup,
        },

        data(){
            return{
                showPopup: false,
                processing: false,
                success: false,
                error: false,
            }
        },
        
        computed: {
            isProcessing() {
                return this.showPopup && this.processing;
            },
            isSuccess() {
                return this.showPopup && this.success;
            },
            isError() {
                return this.showPopup && this.error;
            },
        },

        methods: {
            uploadPhoto() {
                this.showPopup = true;
                this.processing = true;

                // Simulate the upload process
                setTimeout(() => {
                    const isSuccess = Math.random() < 0.5; // Randomly determine if the upload is successful or not

                    this.processing = false;
                    this.success = isSuccess;
                    this.error = !isSuccess;

                    // Hide the popup after a certain time
                    setTimeout(() => {
                    this.showPopup = false;
                    }, 5000); // Adjust the duration as per your requirement (in milliseconds)
                }, 4000); // Simulated upload time (adjust as per your requirement)
                },
    closeUploadPopup() {
      this.showPopup = false;
    },
        }
    }
</script>