<template>
  <div>
    <div class="bg-gray-200 py-6 px-10 flex items-center rounded-lg gap-16 my-20">
      <NuxtLink to="/" class="flex items-center bg-blue-400 rounded-full py-1 px-4 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        Back
      </NuxtLink>

      <div class="flex flex-col" v-if="movieDetails">
        <div class="font-bold">
          {{ movieDetails.title }}
        </div>
        <div>
          {{ movieDetails.tagline }}
        </div>
      </div>
    </div>

    <div v-if="movieDetails">
      <div class="flex gap-16 my-5 w-full">
        <div class="w-1/3" v-if="movieDetails.poster_path">
          <nuxt-img
            provider="twicpics"
            :src="movieDetails.poster_path"
            :alt="movieDetails.title"
            class="w-full object-scale-down rounded-xl"
          />
        </div>

        <div class="w-2/3 flex flex-col gap-5 my-5">
          <div class="flex justify-between">
            <span class="font-bold">Budget</span>
            <span>$ {{ movieDetails.budget }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Revenue</span>
            <span>$ {{ movieDetails.revenue }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Release Date</span>
            <span>{{ movieDetails.release_date }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Runtime</span>
            <span>{{ movieDetails.runtime }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Score</span>
            <span>
              {{ movieDetails.vote_average }}
              <span class="text-sm">
                ({{ movieDetails.vote_count }} votes)
              </span>
            </span>
          </div>
          <div class="flex justify-between" v-if="movieDetails.genres">
            <span class="font-bold">Genres</span>
            <span>{{ movieDetails.genres.join(", ") }}</span>
          </div>
          <div class="flex justify-between" v-if="movieDetails.genres">
            <span class="font-bold">IMDB Link</span>
            <a :href="'https://www.imdb.com/title/' + movieDetails.imdb_id" class="underline text-blue-500">Link</a>
          </div>
          <div class="flex justify-between" v-if="movieDetails.genres">
            <span class="font-bold">Hompage Link</span>
            <a :href="movieDetails.homepage" class="underline text-blue-500">Link</a>
          </div>
        </div>
      </div>
      <div class="my-12">
        {{ movieDetails.overview }}
      </div>
      <div class="flex flex-col my-20" v-if="movieDetails.credits">
        <div class="font-bold text-lg">Credit:</div>
        <div>
          {{ movieDetails.credits.slice(0,10).join(", ") }}
          <span v-if="movieDetails.credits.length > 10">
            and {{ movieDetails.credits.length }} more.
          </span>
        </div>
      </div>
    </div>

    <div v-if="!movieDetails" class="w-full flex justify-center items-center">
      <LoadingIcon />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoviePage',
  layout: 'MainLayout',
  data () {
    return { movieDetails: null }
  },
  async mounted () {
    const movieId = this.$route.params.id
    const details = await this.$request(`movie/${movieId}`)
    const credits = await this.$request(`movie/${movieId}/credits`)

    this.movieDetails = {
      ...details,
      genres: details.genres.map(genre => genre.name),
      runtime: this.secondToHMS(details.runtime),
      budget: this.numberWithComma(details.budget),
      revenue: this.numberWithComma(details.revenue),
      credits: credits.cast
        .sort((a, b) => a.popularity > b.popularity ? -1 : 1)
        .map(cast => cast.name)
    }
  },
  methods: {
    secondToHMS (seconds) {
      const prefix = ['h', 'm', 's']
      return new Date(seconds * 1000)
        .toISOString()
        .substr(11, 8)
        .split(':')
        .filter(num => num > 0)
        .map((num, i) => Number(num) + prefix[i])
        .join(' ')
    },
    numberWithComma (number) {
      return number
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
