async function Request (url, options = {}) {
  const baseUrl = 'https://api.themoviedb.org/3'
  const apiKey = 'f62f750b70a8ef11dad44670cfb6aa57'

  const uri = new URL(`${options.baseUrl || baseUrl}/${url}`)
  const params = {
    api_key: apiKey,
    ...options.params
  }
  uri.search = new URLSearchParams(params).toString()

  return await fetch(uri)
    .then(data => data.json())
}

export default (context, inject) => {
  inject('request', Request)
  context.$request = Request
}
