<template>
  <div>
    <div class='w-full h-10 bg-green-500'></div>

    <div class='w-2/3 mx-auto'>
      <div class='py-20'>
        <SearchBar @pickRange="selectRange" />
      </div>

      <MovieList :range="selectedRange" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      selectedRange: {
        startDate: null,
        endDate: null
      }
    }
  },
  methods: {
    selectRange (e) {
      this.selectedRange = e
    }
  }
}
</script>
