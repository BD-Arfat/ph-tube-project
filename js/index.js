// const buttonCategoriesUrl =
//   "https://openapi.programming-hero.com/api/phero-tube/categories";
// fetch(buttonCategoriesUrl)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

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
    <button class='btn bg-red-500 text-white '>${data.category}</button>
    `;
    callDiv.appendChild(div);
  }
};
loadCategories();

// start video card section

// end video card section
