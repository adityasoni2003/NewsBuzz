const API_KEY = "ed6fad3cd7e842e6aee5c9f55f6022a0";

const country = "in"
const header = document.querySelector(".header");





const getArticles = async(query)=>{
    try {
        let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
        const res = await fetch(url);
        
        const data = await res.json();
        
        return data
        
    } catch (error) {
        console.log(error.message)
        
    }
    
    
}

const loadFeed = async(queryText)=>{
    const feedContainer = document.querySelector(".news-feed");
    const query = queryText?.toLowerCase();
    const {articles} = await getArticles(query);
   

        let articleHtml = ``;
        
        articles.map((article)=>{
            
            articleHtml += `
            <div class="article" data-url=${article.url}>
                    <h1>${article.source.name}</h1>
                    <img src=${article.urlToImage} alt="Image not available">
                    <h3>${article.title}</h3>
                    
                </div>
            `
            
            
        })
        feedContainer.innerHTML = articleHtml;

        const articleDivs = document.querySelectorAll(".article");
        const articlesArray = [...articleDivs];
        
        articlesArray.map((art)=>{
            art.addEventListener("click",()=>{
                
                window.open(art.dataset.url);
            })
            
        })
    


}



let categories = ['India','Business','Sports','Entertainment','Health','Science','Technology'];



const renderHeader = (category,header)=>{
    
    
    category.map((cate)=>{
        
        const categoryTag = document.createElement('div');
        categoryTag.innerText = cate
        categoryTag.classList.add("category-div");
        header.appendChild(categoryTag);

        

    })
    const addBtn = document.createElement('button');
    addBtn.classList.add('add-button');
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    header.appendChild(addBtn);
    
    addBtn.addEventListener('click',()=>addCategories(category,header))
    
}

const addCategories = (category,header)=>{
    const cate = prompt("Add Category You want news for.....");
    category.unshift(cate);
    header.innerHTML = "";
    renderHeader(category,header);

}

window.addEventListener("load",()=>{
    renderHeader(categories,header);
    loadFeed("india");
    
})

header.addEventListener("click",(e)=>{
    
    loadFeed(e.target.innerText);

})

