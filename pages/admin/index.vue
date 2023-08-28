<template>
  <div class="main">
    <!--Top Bar-->
    <div class="top-bar">
      <img
        src="../../assets/icons/topbar-icon-real.svg"
        alt="AWS Logo"
        class="aws-logo"
      />
    </div>

    <div class="left-wrapper">
      <!--Left Panel-->
      <div class="left-panel">
        <div class="left-panel-top">
          <div class="left-panel-container">
            <div class="left-panel-content">
              <!--Pending Requests Counter-->
              <pending-requests-counter
                :pendingRequestsCount="pendingRequestsCounter"
              ></pending-requests-counter>

              <!--Filter-->
              <div class="filter-container">
                <h3 class="filter-text">Request</h3>
                <filter-dropdown
                  v-model="selectedOption"
                  @input="updateSelectedOption"
                ></filter-dropdown>
              </div>
            </div>
          </div>

          <!--Scrollable Container-->
          <ReqScrollContainer
            :filteredRequests="filteredRequests"
            :selectedRequestID="selectedRequestID"
            @request-clicked="handleRequestClicked"
          ></ReqScrollContainer>
        </div>
      </div>

      <!--Right Panel-->
      <div
        v-if="selectedRequestID === null && !DisplayPanel"
        class="right-wrapper"
      >
        <DefaultPanel />
      </div>

      <div v-if="selectedRequestID" class="req-container">
        <TopContainer />
        <div class="get-status">
          <Status :status="getStatusForSelectedRequest"></Status>
          <RequestID :requestID="selectedRequestID" class="req-id ">h3</RequestID>
        </div>
        <EmailList
          :selectedRequestID="selectedRequestID"
          :emails="getEmailsForRequest(selectedRequestID)"
        ></EmailList>
        <BrowseUpload />
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref, onMounted } from "vue";
import PendingRequestsCounter from "@/components/adminpage/LeftPanel/QueueCounter";
import FilterDropdown from "@/components/adminpage/LeftPanel/FilterDropdown";
import ScrollableContainer from "@/components/adminpage/LeftPanel/ReqScrollContainer";
import EmailList from "@/components/adminpage/RightPanel/EmailList";
import DeleteRequest from "@/components/adminpage/RightPanel/DeleteRequest";
import Status from "@/components/adminpage/RightPanel/Status";
import BrowseUpload from "@/components/adminpage/RightPanel/BrowseAndUpload";
import RequestID from "@/components/adminpage/RightPanel/RequestID"

export default {
  components: {
    PendingRequestsCounter,
    FilterDropdown,
    ScrollableContainer,
    EmailList,
    DeleteRequest,
    Status,
    BrowseUpload,
    RequestID
  },

  setup() {
    const { $toast, $api } = useNuxtApp();
    const allRequests = ref([]);
    const selectedRequestID = ref(null);
    const selectedRequestIndex = ref(-1);
    const selectedOption = ref("All");

    const filteredRequests = computed(() => {
      if (typeof selectedOption.value !== "string") {
        return [];
      }

      if (selectedOption.value === "All") {
        console.log("All requests:", allRequests.value);
        return allRequests.value;
      } else {
        const filteredRequests = allRequests.value.filter(
          (request) =>
            request.status.toLowerCase() === selectedOption.value.toLowerCase()
        );
        console.log(
          `Requests with "${selectedOption.value}" status:`,
          filteredRequests
        );
        return filteredRequests;
      }
    });

    const pendingRequestsCounter = computed(
      () =>
        allRequests.value.filter(
          (request) => request.status.toLowerCase() === "pending"
        ).length
    );

    const getStatusForSelectedRequest = computed(() => {
      if (selectedRequestID.value !== null) {
        const selectedRequest = allRequests.value.find(
          (request) => request.requestId === selectedRequestID.value
        );
        return selectedRequest ? selectedRequest.status : "";
      }
      return "";
    });

    const updateSelectedOption = (option) => {
      selectedOption.value = option;
      console.log("Selected option: ", selectedOption.value);
    };

    const handleRequestClicked = (requestID, index) => {
      if (selectedRequestID.value === requestID) {
        selectedRequestID.value = null;
        selectedRequestIndex.value = -1;
        DisplayPanel.value = false;
      } else {
        selectedRequestID.value = requestID;
        DisplayPanel.value = true;
        selectedRequestIndex.value = index;
        console.log(
          "Emails for Request ID",
          requestID,
          ":",
          getEmailsForRequest(requestID)
        );
      }
    };

    const getEmailsForRequest = (requestID) => {
      const selectedRequest = allRequests.value.find(
        (request) => request.requestId === requestID
      );
      if (selectedRequest) {
        return selectedRequest.emails || [];
      }
      return [];
    };

    onMounted(async () => {
      // try {
      //   const response = await fetch("../api/sampledata.json");
      //   const data = await response.json();
      //   allRequests.value = data.data;
      //   console.log("Main request data fetched:", allRequests.value);

      //   const pendingRequests = allRequests.value.filter(
      //     (request) => request.status.toLowerCase() === "pending"
      //   );
      //   console.log('Requests with "pending" status:', pendingRequests);
      // } catch (error) {
      //   console.error("Failed to fetch main request data:", error);
      // }

      await $api.photobooth.fetchAll().then((res) => {
        allRequests.value = res.data.value.requests;
        console.log("Main request data fetched:", allRequests.value);

        const pendingRequests = allRequests.value.filter(
          (request) => request.status.toLowerCase() === "pending"
        );
        console.log("from api",  allRequests.value);
        console.log('Requests with "pending" status:', pendingRequests);
      });
    });

    return {
      allRequests,
      selectedRequestID,
      selectedRequestIndex,
      selectedOption,
      filteredRequests,
      pendingRequestsCounter,
      getStatusForSelectedRequest,
      updateSelectedOption,
      handleRequestClicked,
      getEmailsForRequest,
    };
  },
};
</script>

<style lang="postcss" scoped>
  .main{
    @apply flex flex-col h-screen font-aws
  }

  .top-bar{
    @apply bg-[#37475A] py-2 px-4 h-12
  }

  .aws-logo{
    @apply w-[84px] h-[54px]
  }
  
  .left-wrapper{
    @apply flex flex-1
  }

  .left-panel{
    @apply w-[350px] bg-[#37475A] -ml-1
  }

  .left-panel-top{
    @apply px-2 pt-4
  }

  .left-panel-container{
    @apply grid grid-rows-1
  }

  .left-panel-content{
    @apply flex flex-col justify-center px-4 items-center
  }

  .filter-container{
    @apply flex gap-32 my-4
  }

  .filter-text{
    @apply font-semibold text-white text-xl
  }

  .right-wrapper{
    @apply flex-1 flex justify-center
  }

  .req-container{
    @apply flex flex-col flex-1 items-center
  }

  .get-status{
    @apply self-start ml-[70px] mb-10
  }

  .req-id{
    @apply -mt-14
  }
</style>