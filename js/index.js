// const buttonCategoriesUrl =
//   "https://openapi.programming-hero.com/api/phero-tube/categories";
// fetch(buttonCategoriesUrl)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// get time string for video
const getTimeString = (time) => {
  const year = parseInt(time / 31536000);
  let remainingTime = time % 31536000;

  const day = parseInt(remainingTime / 86400);
  remainingTime = remainingTime % 86400;

  const hour = parseInt(remainingTime / 3600);
  remainingTime = remainingTime % 3600;

  const minute = parseInt(remainingTime / 60);
  const second = remainingTime % 60;

  return `${year}Y : ${day}D : ${hour}H : ${minute}M : ${second}S`;
};

const activeRemoveClass = () => {
  const button = document.getElementsByClassName("btn-category");
  for (let bet of button) {
    bet.classList.remove("active");
  }
};

const loadCategoriesVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      activeRemoveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((err) => console.log(err));
};

// load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.error(err));
};

// displayCategories
const displayCategories = (categories) => {
  const callDiv = document.getElementById("button-categories");
  for (const data of categories) {
    //     create a button
    const div = document.createElement("div");
    div.innerHTML = `
    <button id='btn-${data.category_id}' onclick='loadCategoriesVideos(${data.category_id})' class='btn btn-category border-none'>${data.category}</button>
    `;
    callDiv.appendChild(div);
  }
};
loadCategories();

// start video card section

// load videos
const loadVideos = (search_text = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${search_text}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

// load display details video
const loadDisplayDetailsVideo = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  const videosContainer = document.getElementById("modalContent");
  document.getElementById("customModal").showModal();
  videosContainer.innerHTML = `
  <img src=${video.thumbnail}/>
  <p class='mt-3 text-justify text-sm'>${video.description}</p>
  `;
};

// display videos
const displayVideos = (videos) => {
  const displayVideos = document.getElementById("videos");
  displayVideos.innerHTML = "";
  if (videos.length == 0) {
    displayVideos.classList.remove("grid");
    displayVideos.innerHTML = `
    <div class='min-h-screen flex flex-col gap-5 items-center justify-center'>
    <img src='img/icon.png'/>
    </div>
    `;
    return;
  } else {
    displayVideos.classList.add("grid");
  }

  for (const video of videos) {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class=' mt-5'>
    <div class='relative'>
          <img class='w-96 h-44' src=${video.thumbnail} alt="" />
          ${
            video.others.posted_date?.length == 0
              ? ""
              : `<span class='absolute right-2 bottom-1 text-[12px] bg-black rounded-lg p-1 text-white'>${getTimeString(
                  video.others.posted_date
                )}</span>`
          }
          
        </div>
        <div class='flex mt-2 gap-5'>
          <div>
            <img class='w-7 h-7 rounded-full' src=${
              video.authors[0].profile_picture
            } alt="" />
          </div>
          <div>
            <h2 class='font-bold text-xl'>${video.title}</h2>
            <div class='flex items-center gap-2'>
            <p class='text-sm py-1'>${video.authors[0].profile_name}</p>
            ${
              video.authors[0].verified == true
                ? `
                <img
                  class="w-5"
                  src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"
                ></img>
                `
                : ""
            }
            </div>
            <p class='text-sm pb-3'>${video.others.views}</p>
          </div>
        </div>
          <button onclick="loadDisplayDetailsVideo('${
            video.video_id
          }')" class='btn btn-error btn-sm text-white w-full'>details</button>
    </div>
    `;
    displayVideos.appendChild(div);
  }
};
document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});
loadVideos();

// end video card section
