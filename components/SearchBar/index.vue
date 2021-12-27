<template>
    <div class="bg-gray-200 py-6 px-20 flex justify-between items-center rounded-lg">
      <div class="flex flex-row items-center font-semibold">
        Search by release date:
        <date-picker
          v-model="dateRange"
          class="ml-5"
          @update="updateDateRange"
        ></date-picker>
      </div>
      <button class="bg-blue-400 rounded-full py-1 px-3 text-white">Search</button>
    </div>
</template>

<script>
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'SearchBar',
  data () {
    return {
      dateRange: {
        startDate: null,
        endDate: null
      }
    }
  },
  methods: {
    updateDateRange () {
      console.log(this.dateRange)
    }
  }
}
</script>
