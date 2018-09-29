const apiKey = '97f1b7aab4864396a8b8042a171d0c5e'
const main = document.querySelector('main')
const sourceSelector = document.querySelector('#sourceSelector')
const defaultSource = 'CNN'


window.addEventListener('load', async e => {
    updateNews()
    await updateSources()
    sourceSelector.value = defaultSource

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value)
    })

    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register("sw.js")
            console.log('Service worker terdaftar')
        } catch (error) {
            console.log('Service worker tidak terdaftar')            
        }
    }
})

// ubah data
async function updateSources(){
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
    const json = await res.json()

    sourceSelector.innerHTML = json.sources.map( src => `<option value="${src.id}">${src.name}</option>`)
    .join('\n')
}

// ambil data
async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${source}&apiKey=${apiKey}`)
    const json = await res.json()

    main.innerHTML = json.articles.map(createArticle).join('\n')
}

//tampilkan data
function createArticle(article){
    return `
        <div class ="article">
        <a href ="${article.url}">
        <h2>${article.title}"</h2>
        <img src ="${article.urlToImage}">
        <p>${article.description}"</p>
        </a>
        </div>
    `
}

