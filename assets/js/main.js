//=================== Aos =============================
AOS.init({});
//================= FitText ==============================
jQuery("#responsive_headline").fitText();
//================= swiper ===============================
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
//================= Get Global Elemnt Html ===========================
let body = document.body;
let navbar_nav = document.querySelector(".navbar-nav");
let nav_link = document.querySelectorAll(".nav-link");
let buyBtn = document.getElementById("buy");
let favouritBtn = document.getElementById("favourit");
let loginBtn = document.getElementById("login");
let profile = document.querySelector(".profile");
let loginOutBtn = document.getElementById("loginOut");
let login_page = document.querySelector(".login-page");
let user_option = document.querySelector(".user_option");
let user_login = document.querySelector(".user_login");
let signUp = document.getElementById("signUp");
let signin = document.getElementById("signin");
let signInOver = document.getElementById("signInOver");
let UserName = document.getElementById("UserName");
let password = document.getElementById("password");
let nav_Product = document.querySelectorAll(".row-newProduct .nav-link");
let shopNav = document.querySelector(".shop-nav");
//================= spinner & loader ==============================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
});
//==================== Scroll To Up ================================
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
//=================== Home Page ==============================
if (document.body.id === "home-page") {
  $(".owl-theme").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayTimeout: 4500,
    autoplayHoverPause: false,
    smartSpeed: 1000,
    center: true,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  });
  //==================== CounterDown For Discount ============================
  let CounterDownDate = new Date("Nov 10, 2025 23:59:59").getTime();
  let timer = setInterval(function () {
    let now = new Date().getTime();
    let distance = CounterDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("Days").textContent = days;
    document.getElementById("Hours").textContent = hours;
    document.getElementById("Minutes").textContent = minutes;
    document.getElementById("Seconds").textContent = seconds;
    if (distance <= 0) {
      CounterDownDate = new Date();
      CounterDownDate.setMonth(CounterDownDate.getMonth() + 1);
    }
  }, 1000);
}
//======================= add active =====================================
function activateNavLinks() {
  const currentPage = window.location.pathname.split("/").pop();
  nav_link.forEach((link) => {
    link.classList.remove("link-active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("link-active");
      // ✅ لو اللينك جوا Dropdown (يعني له parent)
      const parentLi = link.closest(".shop-nav");
      if (parentLi) {
        const parentLink = parentLi.querySelector("a.nav-link");
        if (parentLink) {
          parentLink.classList.add("link-active");
        }
      }
    }
    // الحالة الخاصة بالـ index.html (الرئيسية)
    if (currentPage === "" && link.getAttribute("href") === "./index.html") {
      link.classList.add("link-active");
    }
  });
  nav_Product.forEach((link) => {
    link.addEventListener("click", function () {
      nav_Product.forEach((i) => i.classList.remove("link-active"));
      this.classList.add("link-active");
    });
  });
}
activateNavLinks();
//======================= active DropDown Shop ==========================
shopNav.addEventListener("click", function () {
  shopNav.classList.toggle("show");
});
//======================= Show Login-User ================================
loginBtn.addEventListener("click", () => {
  user_login.classList.add("d-flex");
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("user_login")) {
      e.target.classList.remove("d-flex");
    }
  });
});
//====================== active login page ===============================
signUp.addEventListener("click", () => {
  login_page.classList.add("active");
});
signin.addEventListener("click", (e) => {
  e.preventDefault();
  login_page.classList.remove("active");
});
//===================== localStorage For Users ======================================
let user = [];
if (localStorage.getItem("userData")) {
  user = JSON.parse(localStorage.getItem("userData"));
  user.forEach((i) => {
    loginBtn.innerHTML = `
        <h6 class="user my-1">Hi ${i.userName}</h6>
        `;
  });
}
//===================== show Data =========================================
document.addEventListener("click", (e) => {
  checkLocalStorage();
  if (e.target.classList.contains("user")) {
    user_login.classList.remove("d-flex");
    profile.classList.toggle("d-block");
  }
});
//===================== create data =======================================
let createUserName = document.getElementById("user_create");
let createUserEmail = document.getElementById("email_create");
let createUserPassword = document.getElementById("password_create");
let singUpOverBtn = document.getElementById("singUpOver");
function createData() {
  let data = {
    userName: UserName.value,
    UserPassword: password.value,
  };
  user.push(data);
  localStorage.setItem("userData", JSON.stringify(user));
}
function signUp_Get_Data() {
  let data = {
    userName: createUserName.value,
    userEmail: createUserEmail.value,
    UserPassword: createUserPassword.value,
  };
  user.push(data);
  localStorage.setItem("userData", JSON.stringify(user));
}
singUpOverBtn.addEventListener("click", signUp_Get_Data);
signInOver.addEventListener("click", createData);
//===================== loginOut ============================================
loginOutBtn.addEventListener("click", () => {
  localStorage.removeItem("userData");
  profile.classList.add("none");
  window.location.reload();
  checkLocalStorage();
});
//===================== check LocalStorage ===================================
function checkLocalStorage() {
  if (!localStorage.getItem("userData")) {
    loginBtn.innerHTML = `<i class="fa-solid fa-user"></i>`;
  }
}
//================== product shorticon ========================================
// declare canvess
let offcanves_buy = document.querySelector(".offcanves-buy");
let offcanves_favourit = document.querySelector(".offcanves-favourit");
let canvesbody_buy = document.querySelector(".canvesbody-buy");
let canvesbody_favourit = document.querySelector(".canvesbody-favourit");
// favourit click
let favouritIcon = document.querySelectorAll(".shorticon .fa-heart");
let favoutitCounter = document.getElementById("favourit-span");

//get data from localstorage
let favourit_Product = [];
if (localStorage.getItem("FavouritProducts")) {
  favourit_Product = JSON.parse(localStorage.getItem("FavouritProducts"));
  favourit_Product.forEach((i) => {
    canvesbody_favourit.innerHTML += `
                  <div class="product product d-flex justify-content-between p-4 bg-light flex-wrap">
                    <div class="picture"> <img id="canvesimage" src="${i.img}" class="img-fluid" alt="">
                    </div>
                    <div class="detils">
                    <h6 id="canvesname">${i.productName}</h6>
                    <div class="d-flex justify-content-center align-items-center">
                    <p id="canvesprice" class="mb-0">${i.price}</p>
                    <i class="text-danger">$</i>
                    </div>
                    <button class=" btn my-2 mb-2 btn-outline-success BuyNowBtn">BuyNow</button>
                    <button class="btn btn-outline-danger my-1 removeProduct" data-index="${i.id}">Remove</button>
                </div>
                </div>
                `;
    if (favouritIcon[i.id]) {
      favouritIcon[i.id].classList.add("bg-danger");
    }
    if (favourit_Product.length > 0) {
      favoutitCounter.classList.remove("none");
      favoutitCounter.textContent = favourit_Product.length;
    }
  });
}
function favouritData() {
  favouritIcon.forEach((i, index) => {
    i.addEventListener("click", () => {
      if (!i.classList.contains("bg-danger")) {
        i.classList.add("bg-danger");
        let purchase = i.closest(".product");
        let imagepurchase = purchase.querySelector(".product-image").src;
        let namepurchase = purchase.querySelector(".detils h6").textContent;
        let purchasePrice = purchase.querySelector(".detils p");
        let purchaseDiscount = purchase.querySelector(".detils span");
        let purchaseElemnt;
        if (purchasePrice.classList.contains("text-secondary")) {
          purchaseElemnt = purchaseDiscount.textContent;
        } else {
          purchaseElemnt = purchasePrice.textContent;
        }
        let favourit_Product_Data = {
          id: index,
          productName: namepurchase,
          img: imagepurchase,
          price: purchaseElemnt,
        };
        favourit_Product.push(favourit_Product_Data);
        favoutitCounter.classList.remove("none");
        favoutitCounter.textContent = favourit_Product.length;
        canvesbody_favourit.innerHTML += `
                  <div class="product d-flex justify-content-between p-4 bg-light flex-wrap flex-wrap">
                    <div class="picture"> <img id="canvesimage" src="${imagepurchase}" class="img-fluid" alt="">
                    </div>
                    <div class="detils">
                    <h6 id="canvesname">${namepurchase}</h6>
                    <div class="d-flex justify-content-center align-items-center">
                    <p id="canvesprice" class="mb-0">${purchaseElemnt}</p>
                    <i class="text-danger">$</i>
                    </div>
                    <button class=" btn btn-outline-success BuyNowBtn mb-2 my-2">BuyNow</button>
                    <button class="btn btn-outline-danger removeProduct my-1" data-index="${index}">Remove</button>
                </div>
                </div>
                `;
        localStorage.setItem(
          "FavouritProducts",
          JSON.stringify(favourit_Product)
        );
        // remove product
      } else if (i.classList.contains("bg-danger")) {
        i.classList.remove("bg-danger");
        favourit_Product = favourit_Product.filter((item) => item.id !== index); // update arrey and stay only id !== index that i click it
        let row = canvesbody_favourit.querySelector(`.product`); // get div that container product in canvesBody
        row.remove();
        favoutitCounter.textContent = favourit_Product.length;
        if (favourit_Product.length === 0)
          favoutitCounter.classList.add("none");
        localStorage.setItem(
          "FavouritProducts",
          JSON.stringify(favourit_Product)
        );
      }
    });
  });
}
favouritData();
//========== remove product favourit from localStorage and div and canvess ============
canvesbody_favourit.addEventListener("click", (e) => {
  if (e.target.classList.contains("removeProduct")) {
    let row = e.target.closest(".product");
    let productIndex = parseInt(e.target.getAttribute("data-index"));
    favourit_Product = favourit_Product.filter(
      (item) => item.id !== productIndex
    );
    if (favouritIcon[productIndex]) {
      favouritIcon[productIndex].classList.remove("bg-danger");
    }
    row.remove();
    localStorage.setItem("FavouritProducts", JSON.stringify(favourit_Product));
    favoutitCounter.textContent = favourit_Product.length;
  }
});
//=========================== Buy Products  ===========================================
let buyIcon = document.querySelectorAll(".fa-credit-card");
let buyCounter = document.getElementById("buy-span");

let updateBuy = [];
if (localStorage.getItem("buyProducts")) {
  updateBuy = JSON.parse(localStorage.getItem("buyProducts"));
  updateBuy.forEach((i) => {
    canvesbody_buy.innerHTML += `
                  <div class="product product d-flex justify-content-between p-4 bg-light flex-wrap">
                    <div class="picture"> <img id="canvesimage" src="${i.img}" class="img-fluid" alt="">
                    </div>
                    <div class="detils">
                    <h6 id="canvesname">${i.productName}</h6>
                    <div class="d-flex justify-content-center align-items-center">
                    <p id="canvesprice" class="mb-0">${i.price}</p>
                    <i class="text-danger">$</i>
                    </div>
                    <button class="btn btn-outline-success BuyNowBtn">Buy Now</button>
                    <button class="btn btn-outline-danger my-1 removeProduct" data-index="${i.id}">Remove</button>
                </div>
                </div>
                `;
    if (buyIcon[i.id]) {
      buyIcon[i.id].classList.add("bg-warning");
    }
    if (updateBuy.length > 0) {
      buyCounter.classList.remove("none");
      buyCounter.textContent = updateBuy.length;
    }
  });
}
function show_Purchase_Data() {
  buyIcon.forEach((i, index) => {
    i.addEventListener("click", () => {
      if (!i.classList.contains("bg-warning")) {
        i.classList.add("bg-warning");
        let purchase = i.closest(".product");
        let imagepurchase = purchase.querySelector(".product-image").src;
        let namepurchase = purchase.querySelector(".detils h6").textContent;
        let purchasePrice = purchase.querySelector(".detils p");
        let purchaseDiscount = purchase.querySelector(".detils span");
        let purchaseElemnt;
        if (purchasePrice.classList.contains("text-secondary")) {
          purchaseElemnt = purchaseDiscount.textContent;
        } else {
          purchaseElemnt = purchasePrice.textContent;
        }
        let BuyData = {
          id: index,
          productName: namepurchase,
          img: imagepurchase,
          price: purchaseElemnt,
        };
        updateBuy.push(BuyData);
        buyCounter.classList.remove("none");
        buyCounter.textContent = updateBuy.length;
        canvesbody_buy.innerHTML += `
                  <div class="product d-flex justify-content-between p-4 bg-light flex-wrap">
                    <div class="picture"> <img id="canvesimage" src="${imagepurchase}" class="img-fluid" alt="">
                    </div>
                    <div class="detils">
                    <h6 id="canvesname">${namepurchase}</h6>
                    <div class="d-flex justify-content-center align-items-center">
                    <p id="canvesprice" class="mb-0">${purchaseElemnt}</p>
                    <i class="text-danger">$</i>
                    </div>
                    <button class="btn btn-outline-success BuyNowBtn">Buy Now</button>
                    <button class="btn btn-outline-danger my-1 removeProduct" data-index="${index}">Remove</button>
                </div>
                </div>
                `;
        localStorage.setItem("buyProducts", JSON.stringify(updateBuy));
        // remove product
      } else if (i.classList.contains("bg-warning")) {
        i.classList.remove("bg-warning");
        updateBuy = updateBuy.filter((item) => item.id !== index); // update arrey and stay only id !== index that i click it
        let row = canvesbody_buy.querySelector(`.product`); // get div that container product in canvesBody
        row.remove();
        buyCounter.textContent = updateBuy.length;
        if (updateBuy.length === 0) buyCounter.classList.add("none");
        localStorage.setItem("buyProducts", JSON.stringify(updateBuy));
      }
    });
  });
}
show_Purchase_Data();
//======================= remove product buy from localStorage and div and canvess ============
canvesbody_buy.addEventListener("click", (e) => {
  if (e.target.classList.contains("removeProduct")) {
    let row = e.target.closest(".product");
    let productIndex = parseInt(e.target.getAttribute("data-index"));
    updateBuy = updateBuy.filter((item) => item.id !== productIndex);
    if (buyIcon[productIndex]) {
      buyIcon[productIndex].classList.remove("bg-warning");
    }
    row.remove();
    localStorage.setItem("buyProducts", JSON.stringify(updateBuy));
    buyCounter.textContent = updateBuy.length;
  }
});

//======================= show and close products buy =========================================
buyBtn.addEventListener("click", () => {
  offcanves_buy.style.right = "0px";
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-xmark")) {
    offcanves_buy.style.right = null;
  }
});

favouritBtn.addEventListener("click", () => {
  offcanves_favourit.style.right = "0px";
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-xmark")) {
    offcanves_favourit.style.right = null;
  }
});
//============================= show Product in modal  ==========================================
// eye click
let EyeIcon = document.querySelectorAll(".fa-eye");
let overlay_show = document.querySelector(".overlay-show");
let modalImage = document.querySelector(".modalImage");
let modalName = document.getElementById("nameModal");
let modalCategory = document.getElementById("categoryModal");
let modalPrice = document.getElementById("priceModal");
let closeBtn = document.getElementById("modalClose");
//show modal
EyeIcon.forEach((i) => {
  i.addEventListener("click", () => {
    let productCard = i.closest(".product");
    let productImage = productCard.querySelector(".product-image").src;
    let productName =
      `Name of Product : ` +
      productCard.querySelector(".detils h6").textContent;
    let priceElemnt = productCard.querySelector(".detils p");
    let productPrice;
    let productDiscount = productCard.querySelector(".detils span");
    if (priceElemnt.classList.contains("text-secondary")) {
      productPrice = productDiscount.textContent;
    } else {
      productPrice = priceElemnt.textContent;
    }
    modalImage.src = productImage;
    modalName.textContent = productName;
    modalCategory.textContent = "Category of Product : Men";
    modalPrice.textContent = "Price : $" + productPrice;
    overlay_show.classList.remove("none");
  });
});
// close modal
closeBtn.addEventListener("click", () => {
  overlay_show.classList.add("none");
});
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay-show")) {
    overlay_show.classList.add("none");
  }
});
//=============================== ShowDateils ======================================
let showDetailsBtn = document.querySelectorAll(".product .DetailsBtn");
let priceDetails = document.querySelector(".details-purchase .price p");
let discountDetails = document.querySelector(".details-purchase .price span");
let nameDetails = document.getElementById("nameDetails");
let imageDetails = document.querySelector(".big-image img");

function ShowDateils() {
  showDetailsBtn.forEach((i) => {
    i.addEventListener("click", () => {
      let product_Details = i.closest(".product");
      let product_Details_Name =
        product_Details.querySelector("h6").textContent;
      let product_Details_Image = product_Details.querySelector("img").src;
      let product_Details_Price =
        product_Details.querySelector(".price-Product p").textContent;
      let product_Details_Discount = product_Details.querySelector(
        ".price-Product span"
      )
        ? product_Details.querySelector(".price-Product span").textContent
        : "";

      localStorage.setItem(
        "productDetails",
        JSON.stringify({
          name: product_Details_Name,
          image: product_Details_Image,
          price: product_Details_Price,
          discount: product_Details_Discount,
        })
      );

      window.location.href = "products details.html";
    });
  });
}
ShowDateils();
//======================== Search and Filter =======================================
let products = document.querySelectorAll(".row-section-clothes .prod");
let searchInput = document.getElementById("searchInput");
// تأكد إن العناصر موجودة قبل ما تستخدمها
if (searchInput && products.length > 0) {
  function FilterProducts() {
    let query = searchInput.value.toLocaleLowerCase().trim(); // (input)هنا بجيب القيمة اللي في ال
    products.forEach((prod) => {
      const productName = prod
        .querySelector(".detils h6")
        .textContent.toLocaleLowerCase(); // هنا انا عملت لووب عشان اجيب اسم المنتج

      if (productName.startsWith(query) || query == "") {
        //  اسم المنتج==(Input)هنا في الشرط ده لو القيمة الموجوده في ال
        prod.classList.remove("none"); // show it
      } else {
        prod.classList.add("none"); // اي حاجه تاني اخفيها
      }
    });
  }
  searchInput.addEventListener("input", FilterProducts);
}

//================================  Men Page  ======================================
//============================= owlCarousal ========================================
if (document.body.id === "men-page") {
  $(".men-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 2000,
  });
}

//=========================== Filter ======================================
let choosenSort = document.querySelectorAll(".box-sort p");
choosenSort.forEach((i) => {
  i.addEventListener("click", function () {
    choosenSort.forEach((i) => i.classList.remove("active-filter"));
    this.classList.add("active-filter");
  });
});
let choosenPrice = document.querySelectorAll(".box-price p");
choosenPrice.forEach((i) => {
  i.addEventListener("click", function () {
    choosenPrice.forEach((i) => i.classList.remove("active-filter"));
    this.classList.add("active-filter");
  });
});
//========================================================================
//============================= owlCarousal Products ========================================
if (document.body.id === "products-page") {
  $(".products-carousel").owlCarousel({
    items: 1,
    margin: 15,
    loop: true,
    autoplay: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 2000,
  });
  //=============================================================================================
  //بدل ما تشتغل على click، اشتغل على الـ collapse events اللي Bootstrap بيديها، زي:
  //show.bs.collapse → بيتنفذ لما يبدأ يفتح
  //hide.bs.collapse → بيتنفذ لما يبدأ يقفل
  //shown.bs.collapse → لما يخلص فتح
  //hidden.bs.collapse → لما يخلص يقفل
  //يعني كده:

  let filterCollapse = document.getElementById("collapseOne");
  let searchCollapse = document.getElementById("collapseTwo");
  let filterIcon = document.getElementById("filterIcon");
  let searchIcon = document.getElementById("searchIcon");

  // لما يفتح
  filterCollapse.addEventListener("show.bs.collapse", () => {
    filterIcon.classList.replace("fa-filter", "fa-xmark");
  });

  // لما يقفل
  filterCollapse.addEventListener("hide.bs.collapse", () => {
    filterIcon.classList.replace("fa-xmark", "fa-filter");
  });

  searchCollapse.addEventListener("show.bs.collapse", () => {
    searchIcon.classList.replace("fa-magnifying-glass", "fa-xmark");
  });
  searchCollapse.addEventListener("hide.bs.collapse", () => {
    searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
  });
  //========================================================================
  const items = document.querySelectorAll(".prod");
  const paginationContainer = document.getElementById("pagination");
  const paginationButtons = document.querySelector(".paginationButtons");

  const itemsPerPage = 8; // كل صفحة فيها كام عنصر
  let currentPage = 1;

  // 1️⃣ دالة لعرض العناصر حسب الصفحة
  function displayItems(page) {
    // نحدد البداية والنهاية
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // 2️⃣ دالة لإنشاء أزرار الباجيناشن
  function setupPagination() {
    paginationContainer.innerHTML = "";
    const pageCount = Math.ceil(items.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.classList.add("pagination-btn");

      if (i === currentPage) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", () => {
        currentPage = i;
        displayItems(currentPage);

        // شيل الـ active من كل الأزرار وضيفها للزرار الحالي
        document
          .querySelectorAll(".pagination-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });

      paginationButtons.appendChild(btn);
    }
  }
  // أول تشغيل
  displayItems(currentPage);
  setupPagination();
  //========================================================================
}
if (document.body.id === "blog-page") {
  $(".blog-carousel").owlCarousel({
    items: 1,
    margin: 15,
    loop: true,
    autoplay: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 2000,
  });
  const items = document.querySelectorAll(".blog-peng");
  const paginationContainer = document.getElementById("pagination");
  const paginationButtons = document.querySelector(".paginationButtons");
  const itemsPerPage = 3; // كل صفحة فيها كام عنصر
  let currentPage = 1;

  // 1️⃣ دالة لعرض العناصر حسب الصفحة
  function displayItems(page) {
    // نحدد البداية والنهاية
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // 2️⃣ دالة لإنشاء أزرار الباجيناشن
  function setupPagination() {
    paginationContainer.innerHTML = "";
    const pageCount = Math.ceil(items.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.classList.add("pagination-btn");

      if (i === currentPage) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", () => {
        currentPage = i;
        displayItems(currentPage);

        // شيل الـ active من كل الأزرار وضيفها للزرار الحالي
        document
          .querySelectorAll(".pagination-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });

      paginationButtons.appendChild(btn);
    }
  }
  // أول تشغيل
  displayItems(currentPage);
  setupPagination();
}
//===================================================================
if (
  document.body.id === "Product-Details-page" ||
  document.body.classList === ""
) {
  window.addEventListener("DOMContentLoaded", () => {
    let product = JSON.parse(localStorage.getItem("productDetails"));
    let dollar = document.getElementById("dollar");
    if (product) {
      nameDetails.textContent = product.name;
      imageDetails.src = product.image;
      priceDetails.textContent = product.price;

      if (product.discount) {
        discountDetails.textContent = product.discount;
        priceDetails.classList.add("text-secondary");
        priceDetails.classList.remove("text-danger");
        dollar.classList.remove("none");
        priceDetails.style.textDecoration = "line-through";
        priceDetails.style.fontSize = "18px";
      } else {
        priceDetails.classList.remove("text-secondary");
        priceDetails.classList.add("text-danger");
        priceDetails.style.textDecoration = "none";
        priceDetails.style.fontSize = "24px";
        discountDetails.textContent = "";
      }
    }
  });
  //============ Start Counter =======================================
  let count = 1;
  let countDisplay = document.querySelector(".count");
  let increaseBtn = document.querySelector(".increase");
  let decreaseBtn = document.querySelector(".decrease");
  increaseBtn.addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
  });
  decreaseBtn.addEventListener("click", () => {
    if (count === 1) {
      return;
    }
    count--;
    countDisplay.textContent = count;
  });
  //============= End Counter ========================

  //============= change Image ======================================
  let SmallImage = document.querySelectorAll(".picture-details img");
  let BigImage = document.querySelector(".big-image img");
  let ArrowLeftBtn = document.getElementById("arrow-left");
  let ArrowRightBtn = document.getElementById("arrow-right");
  let currentIndex = 0;
  SmallImage.forEach((i, index) => {
    i.addEventListener("click", () => {
      BigImage.src = i.src;
      currentIndex = index;
    });
  });
  ArrowRightBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= SmallImage.length) {
      currentIndex = 0;
    }
    BigImage.src = SmallImage[currentIndex].src;
  });
  ArrowLeftBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = SmallImage.length - 1;
    }
    BigImage.src = SmallImage[currentIndex].src;
  });
  //==================== End Change Image ============================

  //==================== show more ===================================
  let showMore = document.getElementById("showMore");
  let prodBox = document.querySelectorAll(".prod");

  let visibleCount = 4; // أول عدد ظاهر
  prodBox.forEach((i, index) => {
    if (index >= visibleCount) {
      i.classList.add("none");
    }
  });

  showMore.addEventListener("click", () => {
    if (showMore.textContent.trim() == "Show More") {
      let newVisible = visibleCount + 4;
      prodBox.forEach((i, index) => {
        if (index < newVisible) {
          i.classList.remove("none");
        }
        visibleCount = newVisible;
        if (visibleCount >= prodBox.length) {
          showMore.textContent = "Show Less";
        }
      });
    } else {
      let newVisible = visibleCount - 4;
      prodBox.forEach((i, index) => {
        if (index >= newVisible) {
          i.classList.add("none");
        }
        visibleCount = newVisible;
      });
      if (visibleCount <= 4) {
        showMore.textContent = "Show More";
      }
    }
  });
  //============ start Add to Cart ===================================
  let CartBtn = document.getElementById("CartBtn");
  let Image_Details = document.getElementById("Image-Details");
  let Count_Details = document.getElementById("Count-Details");
  let product = JSON.parse(localStorage.getItem("productDetails")) || [];
  finalPrice = product.discount || product.price;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  CartBtn.addEventListener("click", () => {
    let newData = {
      Name: nameDetails.textContent,
      Image: Image_Details.src,
      Price: finalPrice,
      quantity: parseInt(Count_Details.textContent),
    };
    cart.push(newData);
    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(() => {
      window.location.href = "shop cart.html";
    }, 100);
  });
}
//======================= end products details page ==================================
//======================= Global Add to Cart =========================
document.addEventListener("click", (e) => {
  // لو المستخدم ضغط على زر فيه الكلاس BuyNowBtn
  if (e.target.classList.contains("BuyNowBtn")) {
    const btn = e.target;
    const prod = btn.closest(".product");
    if (!prod) return;

    const prodName = prod.querySelector("h6")?.textContent || "Unknown";
    const prodImage = prod.querySelector("img")?.src || "";
    const prodPrice = prod.querySelector(".detils p")?.textContent || "0";
    const prodDiscount =
      prod.querySelector(".detils span")?.textContent.trim() || "";
    const finalPrice = parseInt(prodDiscount) || parseInt(prodPrice);

    const productData = {
      Name: prodName,
      Image: prodImage,
      Price: finalPrice,
      quantity: 1,
    };

    // ✅ نقرأ من localStorage بشكل صحيح
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productData);
    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ تحويل مباشر لصفحة السلة
    window.location.href = "shop cart.html";
  }
});

//======================= start cart page ============================================
if (document.body.id === "shop-Cart-Page" || body.classList === "") {
  //================================ show products ========================================
  let cart = JSON.parse(localStorage.getItem("cart"));

  let Table_Products = document.getElementById("Table-Products");
  let TbaleHead = document.getElementById("TbaleHead");
  let Message = document.querySelector(".Message");

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    let existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    showProducts();
  }

  function showProducts() {
    Table_Products.innerHTML = ""; // 🟢 فضي الجدول الأول عشان التكرار
    if (cart.length > 0) {
      Message.classList.add("none");
      TbaleHead.innerHTML = `
      <td class="text-center">Product</td>
      <td class="text-center">Price</td>
      <td class="text-center">Quantity</td>
      <td class="text-center">Total</td>
      <td class="text-center">Action</td>
    `;

      cart.forEach((prod, index) => {
        let totalPrice = prod.Price * prod.quantity;
        Table_Products.innerHTML += `
        <tr>
          <td>
            <div class="product d-flex align-items-center">
              <div class="picture">
                <img src="${prod.Image}" class="img-fluid" style="width:90px" alt="">
              </div>
              <div class="details">
                <h6 class="NameProduct">${prod.Name}</h6>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </div>
            </div>
          </td>
          <td class="text-center align-content-center">
          <span class="text-danger"> $ </span>
            <span class="text-danger"> ${prod.Price}</span>
          </td>
          <td class="text-center align-content-center">   
            <div class="buy-details">
              <div class="counter">
                <button class="decrease" onclick="decreaseProduct(${index})">-</button>
                <span >${prod.quantity}</span>
                <button onclick="increaseProduct(${index})">+</button>
              </div>
            </div>
          </td>
          <td class="align-content-center">
          <span class="text-danger"> $ </span>
            <span class="text-danger Total-Cart-Products"> ${totalPrice}</span>

          </td>
          <td class="align-content-center text-center">
            <button class="btn p-0">
              <i data-index="${index}" class="fa-solid fa-x RemoveProd"></i>
            </button>
          </td>
        </tr>
      `;
      });
    } else {
      Message.classList.remove("none");
      TbaleHead.innerHTML = ""; // 🟢 لو فاضي اخفي الهيدر
    }
  }

  //===========================================================

  // 🟢 تزود الكمية وتعيد رسم الجدول
  function increaseProduct(index) {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    showProducts();
  }

  // 🟢 تقلل الكمية وتعيد رسم الجدول
  function decreaseProduct(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      showProducts();
    }
  }
  showProducts();

  //============================= Remove Product Cart Page =====================================
  Table_Products.addEventListener("click", (e) => {
    if (e.target.classList.contains("RemoveProd")) {
      let row = e.target.closest("tr");
      let idx = e.target.dataset.index;
      cart.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      row.remove();
      CalcTotalCart();
      showProducts();
      window.location.reload();
    }
  });
  //============================== calc Cart Total ==============================================
  let CouponInput = document.getElementById("CouponInput");
  let Update_Cart = document.getElementById("Update-Cart");
  let CouponBtn = document.getElementById("CouponBtn");
  let Subtotal_Cart = document.getElementById("Subtotal-Cart");
  let Discount_Cart = document.getElementById("Discount-Cart");
  let Total_Cart = document.getElementById("Total-Cart");
  let ProceedCheckOut = document.getElementById("ProceedCheckOut");

  let Discount_CartValue = 0;
  let ShowTotalCart = [];

  if (localStorage.getItem("TotalCart")) {
    ShowTotalCart = JSON.parse(localStorage.getItem("TotalCart"));
    ShowTotalCart.forEach((i) => {
      Subtotal_Cart.textContent = i.SubtotalCart;
      Discount_Cart.textContent = i.DiscountCart * 100;
      Total_Cart.textContent = i.TotalCart;
    });
  }

  // Calculate Discount
  function CalcDiscountCart() {
    if (CouponInput.value.trim() !== "") {
      Discount_Cart.textContent = "10";
      Discount_CartValue = 10 / 100;
      CouponInput.value = "";
    } else {
      Discount_Cart.textContent = "0";
      Discount_CartValue = 0;
    }
  }

  // Calculate Total
  function CalcTotalCart() {
    let Total_Cart_Products = document.querySelectorAll(".Total-Cart-Products");
    let newDis = Discount_CartValue;
    let subtotal = 0;

    Total_Cart_Products.forEach((i) => {
      subtotal += parseFloat(i.textContent) || 0;
    });

    Subtotal_Cart.textContent = subtotal;
    let DicountValue = subtotal * newDis;

    Total_Cart.textContent = isNaN(newDis) ? subtotal : subtotal - DicountValue;

    // 🟢 نجيب اسم المنتج وسعره لكل صف في الكارت
    let ProductNames = document.querySelectorAll(".NameProduct");
    let ProductPrices = document.querySelectorAll(".Total-Cart-Products");

    // ❗ هنا بنفضي البيانات القديمة قبل الإضافة
    let allCartData = [];

    ProductNames.forEach((nameEl, index) => {
      let name = nameEl.textContent.trim();
      let price = parseFloat(ProductPrices[index].textContent) || 0;

      let TotalCartData = {
        NameProduct: name,
        ProductPrice: price,
        SubtotalCart: Subtotal_Cart.textContent,
        DiscountCart: newDis,
        TotalCart: Total_Cart.textContent,
      };

      allCartData.push(TotalCartData);
    });

    // 🟢 نخزن المنتجات الجديدة فقط
    localStorage.setItem("TotalCart", JSON.stringify(allCartData));
  }
  ProceedCheckOut.addEventListener("click", () => {
    CalcTotalCart();
    window.location.href = "./checkout.html";
    Discount_Cart.textContent = 0;
  });
  // استدعاء بعد رسم المنتجات
  showProducts();
  // الأحداث
  CouponBtn.addEventListener("click", CalcDiscountCart);
  Update_Cart.addEventListener("click", CalcTotalCart);
  CalcTotalCart();
  CalcDiscountCart();
  //==============================================================================
}
//============================ End cart details page ===========================

//============================ start checkout page =============================
if (document.body.id === "CheckOut-Page") {
  //=========================== Valdition BootStrap ============================
  (() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  //========================== Place Order =======================================
  const SubmitInfoBtn = document.getElementById("Submit-info-Btn");
  let CheckOutDetails = document.getElementById("CheckOutDetails");
  let CheckOutSummery = document.getElementById("CheckOutSummery");

  //Inputs of Place Order
  let VisaDetails = document.getElementById("VisaDetails");
  let visa = document.getElementById("Visa");
  let cash = document.getElementById("Cash");
  let place_orderBtn = document.getElementById("place-order");
  let alert_success = document.querySelector(".alert-success");
  visa.addEventListener("change", () => {
    if (visa.checked) {
      VisaDetails.classList.remove("none");
    }
  });
  cash.addEventListener("change", () => {
    if (cash.checked) {
      VisaDetails.classList.add("none");
    }
  });
  place_orderBtn.addEventListener("click", () => {
    alert_success.classList.remove("none");
    setTimeout(() => {
      alert_success.classList.add("none");
    }, 3500);
  });
  // Get Data from Total Cart to Show In PlaceOrder
  if (localStorage.getItem("TotalCart")) {
    let Data = JSON.parse(localStorage.getItem("TotalCart"));
    // لكل منتج جوة NameProduct
    CheckOutSummery.innerHTML = "";
    CheckOutDetails.innerHTML = "";
    Data.forEach((i, idx) => {
      CheckOutDetails.innerHTML += `
      <div class="info">
          <h6>${idx + 1}. ${i.NameProduct}</h6>
          <div class="price d-flex">
              <p class="text-danger me-1 mb-1">${i.ProductPrice}</p>
              <span class="text-danger">$</span>
          </div>
      </div>
      <hr>
    `;

      // اجمالي السلة
      CheckOutSummery.innerHTML = `
    <div class="info">
        <h6>SubTotal</h6>
        <div class="price d-flex">
            <p class="text-danger me-1">${i.SubtotalCart}</p>
            <span class="text-danger">$</span>
        </div>
    </div>
    <div class="info">
        <h6>Discount</h6>
        <div class="price d-flex">
            <p class="text-danger me-1">${i.DiscountCart * 100}</p>
            <span class="text-danger">%</span>
        </div>
    </div>
    <div class="info">
        <h6>Total</h6>
        <div class="price d-flex">
            <p class="text-danger me-1">${i.TotalCart}</p>
            <span class="text-danger">$</span>
        </div>
    </div>
  `;
    });
  }
  //==============================================================================
}
//============================ end checkout page ===============================

//========================== Contact Page =====================================
const sendBtn = document.getElementById("sendBtn");
const successAlert = document.getElementById("successAlert");
if (sendBtn) {
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // إظهار الرسالة
    successAlert.classList.add("show-spinner");

    // إخفاؤها بعد 3 ثواني
    setTimeout(() => {
      successAlert.classList.remove("show-spinner");
    }, 3500);
  });
}
