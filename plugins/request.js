async function Request (url, baseUrl = 'https://api.themoviedb.org/3') {
  const apiKey = 'f62f750b70a8ef11dad44670cfb6aa57'
  return await fetch(`${baseUrl}/${url}?api_key=${apiKey}`)
    .then(data => data.json())
}

export default (context, inject) => {
  inject('request', Request)
  context.$request = Request
}
