<template>
  <div class="px-2">
    <div class="container overflow-y-auto">
        <!-- Holder for each request -->
        <RequestHolder />
      </div>
   
  </div>
</template>

<script>
export default {

data() {
return {
allRequests: [],
filteredRequests: [],
selectedRequestID: null,
selectedRequestIndex: -1,
activeRequestID: null,
DeleteRequest: false,
};
},

async created(){
try {
const response = await fetch("../assets/sampledata.json");
const data = await response.json();
this.allRequests = data.data;
this.filteredRequests = data.data;
console.log("Data fetched:", this.allRequests);
} catch (error) {
console.error("Failed to fetch data:", error);
}
}
}
</script>

<style>
.container {
/* Define height for the scrollable container */
height: 560px;
}
</style>