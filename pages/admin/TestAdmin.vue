<template>
    <div class="flex flex-col h-screen font-aws">
      <!--Top Bar-->
      <div class="bg-[#37475A] py-2 px-4 h-12">
        <img src="../../assets/icons/topbar-icon-real.svg" alt="AWS Logo" class="w-[84px] h-[54px]" />
      </div>
  
      <div class="flex flex-1">
        <!--Left Panel-->
        <div class="w-[350px] bg-[#37475A] -ml-1">
        <div class="px-2 pt-4">
          <div class="grid grid-rows">
            <div class="flex flex-col justify-center px-4 items-center ">
                
              <!--Pending Requests Counter-->
              <pending-requests-counter :pendingRequestsCount="pendingRequestsCounter"></pending-requests-counter>

              <!--Filter-->
              <div class="flex gap-32 my-4">
                  <h3 class="font-semibold text-white text-xl">Request</h3>
                  <filter-dropdown
                  v-model="selectedOption"
                  @input = "updateSelectedOption"
                  ></filter-dropdown>
                </div>
            </div>
          </div>

          <!--Scrollable Container-->
          <ReqScrollContainer
          :filteredRequests="filteredRequests" :selectedRequestID="selectedRequestID" @request-clicked="handleRequestClicked"></ReqScrollContainer>
        </div>
    </div>

    <!--Right Panel-->
    <div v-if="selectedRequestID === null && !DisplayPanel" class="flex-1 flex justify-center">
        <DefaultPanel />
    </div>

    <div v-if="selectedRequestID" class="flex flex-col flex-1 items-center">
        <TopContainer />
        <div class="self-start ml-12">
          <Status :status="getStatusForSelectedRequest"></Status>
        </div>
        <EmailList :selectedRequestID="selectedRequestID" :emails="getEmailsForRequest(selectedRequestID)"></EmailList>
        <BrowseUpload />
    </div>
</div>
</div>
  </template>
  
  <script>
  import PendingRequestsCounter from '@/components/adminpage/LeftPanel/QueueCounter';

  import FilterDropdown from '@/components/adminpage/LeftPanel/FilterDropdown'

  import ScrollableContainer from '@/components/adminpage/LeftPanel/ReqScrollContainer'

  import EmailList from '@/components/adminpage/RightPanel/EmailList'

  import DeleteRequest from '@/components/adminpage/RightPanel/DeleteRequest'

  import Status from '@/components/adminpage/RightPanel/Status'

  import BrowseUpload from '@/components/adminpage/RightPanel/BrowseAndUpload'
  
  export default {
  components: {
    PendingRequestsCounter,
    FilterDropdown,
    ScrollableContainer,
    EmailList,
    DeleteRequest,
    Status,
    BrowseUpload
  },

  data() {
    return {
      allRequests: [],
      selectedRequestID: null,
      selectedRequestIndex: -1,
      selectedOption: 'All',
    };
  },

  computed: {
    filteredRequests() {
      if (typeof this.selectedOption !== 'string'){
        return [];
      }

      if (this.selectedOption === 'All') {
        console.log('All requests:', this.allRequests);
        return this.allRequests;
      } else {
        const filteredRequests = this.allRequests.filter(
          (request) => request.status.toLowerCase() === this.selectedOption.toLowerCase()
        );
        console.log(`Requests with "${this.selectedOption}" status:`, filteredRequests);
        return filteredRequests;
      }
    },

    pendingRequestsCounter() {
      return this.allRequests.filter((request) => request.status.toLowerCase() === 'pending').length;
    },

    getStatusForSelectedRequest(){
      if(this.selectedRequestID !== null){
        const selectedRequest = this.allRequests.find((request)=> request.id === this.selectedRequestID);
        return selectedRequest ? selectedRequest.status : '';
      }
      return '';
    },
  },

  async created() {
    try {
      const response = await fetch('../api/sampledata.json');
      const data = await response.json();
      this.allRequests = data.data;
      console.log('Main request data fetched:', this.allRequests);
      
      const pendingRequests = this.allRequests.filter((request) => request.status.toLowerCase() === 'pending');
      console.log('Requests with "pending" status:', pendingRequests);
    } catch (error) {
      console.error('Failed to fetch main request data:', error);
    }
  },

  methods: {
    updateSelectedOption(option) {
        this.selectedOption = option;
        console.log("Selected option: ", this.selectedOption);
    },

    handleRequestClicked(requestID, index) {
      if(this.selectedRequestID === requestID) {
        this.selectedRequestID = null;
        this.selectedRequestIndex = -1;
        this.DisplayPanel = false;
      }
      else{
        this.selectedRequestID = requestID;
        this.DisplayPanel = true;
        this.selectedRequestIndex = index;
        console.log("Emails for Request ID", requestID, ":", this.getEmailsForRequest(requestID));
      }
    },

    getEmailsForRequest(requestID) {
      const selectedRequest = this.allRequests.find((request) =>  request.id === requestID);
      if (selectedRequest) {
        return selectedRequest.emails || [];
      }
      return [];
    },
  },
};
  </script>