<template>
    <div class="bg-gray-200 py-6 px-20 flex justify-between items-center rounded-lg">
      <div class="flex flex-row items-center font-semibold">
        Search by release date:
        <date-picker
          v-model="dateRange"
          class="ml-5"
        ></date-picker>
        <button
          v-if="dateRange.startDate || dateRange.endDate"
          class="bg-white border border-1 border-gray-300 py-1 px-2 ml-3"
          @click="emptyRange()"
        >
          Clear
        </button>
      </div>
      <button
        @click="emitChange"
        class="bg-blue-400 rounded-full py-1 px-3 text-white"
      >
        Search
      </button>
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
    emitChange () {
      this.$root.$emit('pick', this.dateRange)
    },
    emptyRange () {
      this.dateRange = {
        startDate: null,
        endDate: null
      }
    }
  }
}
</script>
