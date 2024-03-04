

const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const news = data.posts;
    displayNews(news)
}
loadData()

const displayNews = (posts) => {
    const allPostContainer = document.getElementById('all-post-container')
    allPostContainer.textContent = ''
    posts.forEach(post => {
        let activeColor = post.isActive ? 'bg-green-600' : 'bg-red-600';
        const postCard = document.createElement('div')
        postCard.classList = 'lg:p-4 bg-base-100 shadow-xl rounded-3xl bg-[#12132D0D] font-inter'
        postCard.innerHTML = `
                    <div  class="flex gap-4 w-auto">
                        <div>
                        <div class="w-16 h-16 rounded-3xl indicator"> <span class="indicator-item badge badge-secondary ${activeColor}"></span>
                        <img src="${post.image}" alt=""/> </div>
                        </div>                       
                        <div class="space-y-4 w-full">
                          <div class="flex gap-x-4">
                          <p class"flex-1"># <span>${post.category}</span></p> 
                          <p class"flex-1">Author: <span class="">${post.author.name}</span></p>
                          </div>
                          <div class="gap-y-4">
                          <h4 class="text-xl font-bold">${post.title}</h4>
                                 <p class="font-inter">${post.description}</p>
                          </div>
                          <hr>
                          <div class="flex justify-between w-full">
                              <div class="flex gap-x-4">
                                 <div class="flex font-inter"> <img src="images/msg.svg" alt=""/>
                                  ${post.comment_count}</div> 
                                 <div class="flex font-inter"> <img src="images/seen.svg" alt=""/>
                                 ${post.view_count}</div>
                                 <div class="flex font-inter"> <img src="images/time.svg" alt=""/>
                                 ${post.posted_time}</div> 
                              </div>
                              <div class="">
                                <button onclick="handleShowTitle('${post.title}','${post.view_count}')"><img src="images/read.svg" alt=""></button>
                              </div>
                          </div>                                                                     
                        </div>
                    </div>
`
        allPostContainer.appendChild(postCard)
    });
}
 let num = 0;
const handleShowTitle = (postTitle,postView) => {
    num++;
    const markReadNum = document.getElementById('mark-as-read')
    markReadNum.innerText = num;
    const titleDivContainer = document.getElementById('view-post-container')
    const titleDiv = document.createElement('div');
    titleDiv.classList = 'p-4 rounded-2xl bg-[#12132D0D]'
    titleDiv.innerHTML = `
                            <div class="bg-white rounded-2xl p-4 flex gap-6">
                                <div>${postTitle}</div>
                                <div class="flex"><img src="images/seen.svg" alt=""> ${postView}</div>
                            </div>
`
titleDivContainer.appendChild(titleDiv)

}

const latestPost = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();   
    getLatestPost(data)
    }
latestPost()
const getLatestPost =(data) =>{
    const latestPostContainer = document.getElementById('latest-post-container')
    data.forEach(singlePost =>{
const latestPostCard = document.createElement('div');
let latestPostDate = singlePost.author.posted_date ? singlePost.author.posted_date : 'No publish date';
let latestPostDesignation = singlePost.author.designation ? singlePost.author.designation: 'Unknown';
latestPostCard.classList = 'p-4 border-[#12132D40] border-2 rounded-3xl bg-[#12132D0D] space-y-2'
latestPostCard.innerHTML = `
              <div class="rounded-3xl"><img src="${singlePost.cover_image}" alt=""></div>
                    <div class="flex"><img src="images/date.svg" alt=""> ${latestPostDate}</div>
                    <div>
                        <h4 class="text-lg font-extrabold">${singlePost.title}</h4>
                        <p>${singlePost.description}</p>
                    </div>
                    <div class="flex gap-4">
                        <div class="h-10 w-10 rounded-full"><img src="${singlePost.profile_image}" alt=""></div>
                        <div>
                            <p class="font-bold">${singlePost.author.name}</p>
                            <p class="text-sm">${latestPostDesignation}</p>
                        </div>
                </div>
`
latestPostContainer.appendChild(latestPostCard)
    })
}
const showSearchPost = () =>{
    const searchField =document.getElementById('search-field');
    const inputText = searchField.value;
loadQuerySearchPost(inputText)
}
const loadQuerySearchPost = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const postData = data.posts
    console.log(postData)
    displayNews(postData)
}


