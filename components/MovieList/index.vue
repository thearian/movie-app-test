<template>
  <div>
    <div v-if="!!moviesData && moviesData.results" class='w-full'>
      <div class="grid grid-cols-3 gap-y-10 gap-x-16">
        <div
          v-for="movie in moviesData.results"
          :key="movie.id"
          :v-if="movie && movie.title"
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
    async getMovies (page = 1, params = {}) {
      this.moviesData = null

      const discoverMovies = await this.$request('discover/movie', {
        params: {
          page,
          ...params
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
        to: Math.min((discoverMovies.page) * 20, discoverMovies.total_results),
        hasPrev: discoverMovies.page > 1,
        hasNext: discoverMovies.page < discoverMovies.total_pages,
        ...discoverMovies
      }
    },
    async changeDateRange (newRange) {
      console.log('asdsad', newRange)
      if (newRange.startDate || newRange.endDate) {
        await this.getMovies(1, {
          'primary_release_date.gte': new Date(newRange.startDate).toISOString().substr(0, 10),
          'primary_release_date.lte': new Date(newRange.endDate).toISOString().substr(0, 10)
        })
      } else {
        const page = this.moviesData?.page || 1
        await this.getMovies(page)
      }
    }
  },
  async mounted () {
    this.genres = await this.$request('genre/movie/list')
    await this.getMovies()
    this.$root.$on('pick', this.changeDateRange)
  }
}
</script>
