function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))

}

const displayVideos=()=>{
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
  .then(response=>response.json())
  .then(data=>displayVideo(data.videos))
}

const displayCategoryVideos=(id)=>{
    const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayVideo(data.category))
}

function displayCategories(categories){
  const getCategory=document.getElementById("category-container")
  for(let cat of categories){
    const categoryDiv=document.createElement("div")
    categoryDiv.innerHTML=`
    <button onclick="displayCategoryVideos(${cat.category_id})" class="btn button-small hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
    getCategory.appendChild(categoryDiv)
}
}

const displayVideo=(videos)=>{
    const videoCategory=document.getElementById("video-container")
     videoCategory.innerHTML="";

    if(videos.length===0){
        videoCategory.innerHTML=`
         <div class="flex flex-col col-span-full py-16 items-center justify-center">
     <img src="assets/Icon.png" alt="">
     <p class="font-bold text-2xl text-center">Oops!! Sorry, There is no content here</p>
 </div>
        `
        return;
    }

    videos.forEach((video)=>{
        const videoCard=document.createElement("div")
        videoCard.innerHTML=`
        <div class="card bg-base-100">
     <figure class="relative">
      <img class="w-full h-[230px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      <span class="absolute text-white bottom-3 right-3 bg-black rounded-sm p-1">3hrs 56 min ago</span>
    </figure>
    <div class=" flex gap-3 pt-4">
     <div class="avatar">
         <div class="ring-primary  w-10 h-10 rounded-full ring">
           <img src="${video.authors[0].profile_picture}" />
         </div>
       </div>
       <div>
         <h1 class="font-[700] text-[#171717]">${video.title}</h1>
     <div class="flex items-center gap-1">
         <p>${video.authors[0].profile_name}</p>
         <img class="w-5 h-5" src="assets/verified.png" alt="">
     </div>
     <p>${video.others.views} views</p>
 </div>
   </div>
   </div>


        `
        videoCategory.append(videoCard)
    })
}



loadCategories()

