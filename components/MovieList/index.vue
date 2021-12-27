<template>
  <div>
    <div v-if="!!moviesData && moviesData.results" class='w-full'>
      <div class="grid grid-cols-3 gap-y-10 gap-x-16">
        <div
          :v-if="moviesData"
          v-for="movie in moviesData.results"
          :key="movie.id"
        >
          <MovieItem :movie="movie" />
        </div>
      </div>

      <div v-if="moviesData" class="w-full flex flex-col justify-center items-center my-16">
        <div class="flex divide-x divide-gray-500 font-bold">
          <span
            class="px-5 py-2"
            :class="moviesData.hasPrev ? 'text-blue-500 cursor-pointer' : 'text-gray-400'"
            @click="changePage(-1)"
          >
            Previous Page
          </span>
          <span
            class="px-5 py-2"
            :class="moviesData.hasNext ? 'text-blue-500 cursor-pointer' : 'text-gray-400'"
            @click="changePage(1)"
          >
            Next Page
          </span>
        </div>

        <div class="text-gray-400">
          Showing results {{ moviesData.from }}-{{ moviesData.to }}
        </div>
      </div>
    </div>

    <div v-if="!moviesData || !moviesData.results" class="w-full flex justify-center items-center">
      <LoadingIcon />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  data () {
    return {
      moviesData: null,
      genres: []
    }
  },
  methods: {
    async changePage (increament) {
      const newPage = this.moviesData.page + increament
      this.moviesData = null
      await this.getMovies(newPage)
    },
    async getMovies (page = 1) {
      const discoverMovies = await this.$request('discover/movie', {
        params: {
          page
        }
      })

      discoverMovies.results = discoverMovies.results.map((movie) => {
        return {
          ...movie,
          genres: movie.genre_ids.map((movieGenre) => {
            return this.genres.genres.filter((genre) => {
              return genre.id === movieGenre
            })[0].name
          })
        }
      })

      this.moviesData = {
        from: (discoverMovies.page - 1) * 20 + 1,
        to: (discoverMovies.page) * 20,
        hasPrev: discoverMovies.page > 1,
        hasNext: discoverMovies.page < discoverMovies.total_pages,
        ...discoverMovies
      }
    }
  },
  async mounted () {
    this.genres = await this.$request('genre/movie/list')
    await this.getMovies()
  }
}
</script>
