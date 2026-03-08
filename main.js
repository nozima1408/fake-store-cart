const section = document.getElementById("section");
const products = document.querySelector(".products");
const total = document.querySelector(".total");
// const addBtn = document.querySelector('.addBtn')

const cartList = [];

async function getData() {
  try {
    let response = await fetch("https://fakestoreapi.com/products?limit=10");
    let data = await response.json();

    data.forEach((product) => {
      section.innerHTML += `
        <div class="flex flex-col gap-4 items-center bg-white border-[1px] border-solid border-gray-100 shadow-xl w-[290px] py-4 px-3 text-center rounded-md">
            <div class="flex justify-center">
            <img class="w-[210px] h-[260px] object-contain" src=${product.image} alt="">
            </div>
            <p class="font-semibold text-xl pt-14">${product.title}</p>
            <p class="text-sm text-gray-900 clamp-text">${product.description}</p>
            <div class="flex gap-4 justify-center items-center">
                <p class="text-xl text-green-600 font-semibold">${product.price} $</p>
                <button class="addBtn cursor-pointer bg-green-600 text-white p-2 rounded-md text-sm" data-name="${product.title}"
        data-price="${product.price}">Sotib olish</button>
            </div>
        </div>
            `;
    });

    section.addEventListener("click", (e) => {
      if (e.target.classList.contains("addBtn")) {
        const name = e.target.dataset.name;
        const price = Number(e.target.dataset.price);
        alert("Qoshildi");
        addToCart(name, price);
      }
    });

    console.log(data);
  } catch (error) {
    console.log("Xatolik yuz berdi:", error);
  }
}

getData();

function addToCart(name, price) {
  const item = cartList.find((product) => product.name === name);
  item ? item.quantity++ : cartList.push({ name, price, quantity: 1 });
  update();
}

function update() {
  products.innerHTML = "";
  let totalSum = 0;

  cartList.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ${product.price}$ - ${product.quantity}ta`;
    products.appendChild(li);
    totalSum += product.price * product.quantity;
  });
  total.textContent = "Total: " + totalSum + "$";
}
