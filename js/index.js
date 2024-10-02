// const buttonCategoriesUrl =
//   "https://openapi.programming-hero.com/api/phero-tube/categories";
// fetch(buttonCategoriesUrl)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// load categories

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data))
    .catch((err) => console.error(err));
};

// displayCategories

const displayCategories = (data) => {
  for (const loadData of data.categories) {
    console.log(loadData);
  }
};
loadCategories();
