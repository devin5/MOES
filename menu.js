const navItems = [
  { type: "Flower" },
  { type: "Pre-Rolls" },
  { type: "Carts" },
  { type: "Concentrates" },
  { type: "Edibles" },
];
const flower = [
  {
    type: "Platinum Bubba",
    strain: "Indica",
    sativa: "20%",
    indica: "80%",

    src: "/patnum.jpg",
    price: "$35.00",
    thc: "25.70%",
    cbd: "1.32%",
  },
  {
    type: "Girl Scout Cookies",
    
    strain: "Hybrid",
    sativa: "40%",
    indica: "60%",
    src: "/vvv.jpg",
    price: "$35.00",
    thc: "19.03%",
    cbd: "17.33%",
  },
  {
    type: "Cherry OG",
    strain: "Hybrid",
    sativa: "50%",
    indica: "50%",
    strainDesc: "80% Indica/20% Sativa",
    src: "/cherry.png",
    price: "$35.00",
    thc: "19.00%",
    cbd: "23.95%",
  },
  {
    type: "Thai",
    strain: "Sativa",
    strainDesc: "80% Indica/20% Sativa",
    src: "/thai.jpg",
    price: "$35.00",
    sativa: "100%",
    indica: "00.00%",
    thc: "22.86%",
    cbd: "0.32%",
  },

];
const cart = [
    {
      type: "Lucky Charms CurePen",
      strain: "Sativa",
      src: "/image4.jpg",
      price: "$40.00",
      thc: "89.72%",
      cbd: "N/A",
      sativa: "N/A",
      indica: "N/A",
    },
    {
      type: "Gorrilla Glue #4 CurePen",
      strain: "Hybrid",
      src: "/gor.jpg",
      price: "$40.00",
      thc: "87.18%",
      cbd: "N/A",
      sativa: "N/A",
      indica: "N/A",
    },
    {
      type: "Foreign Glue CurePen",
      strain: "Hybrid",
      src: "/for.jpg",
      price: "$40.00",
      thc: "91.02%",
      cbd: "N/A",
      sativa: "N/A",
      indica: "N/A",
    },
    {
      type: "Strawberry Bannana CurePen",
      strain: "Indica",
      src: "/straw.jpg",
      price: "$40.00",
      thc: "86.15%",
      cbd: "N/A",
      sativa: "N/A",
      indica: "N/A",
    },
    ,
    {
      type: "Watermelon Sorbet CurePen",
      strain: "Sativa",
      src: "/water.jpg",
      price: "$40.00",
      thc: "92.76%",
      cbd: "N/A",
      sativa: "N/A",
      indica: "N/A",
    },
    {
      type: "Train Wreck CurePen",
      strain: "Sativa",
      src: "/train.jpg",
      price: "$40.00",
      thc: "91.32%",
      cbd: "N/A",
      sativa: "N/A",
      indica: "N/A",
    },
    
  ];
const roll = [
    {
      type: "House Blend",
      strain: "Hybrid",
      src: "/pre.jpg",
      price: "$5.00",
      thc: "N/A",
      cbd: "N/A",
      sativa: "N/A",
      indica:"NA"
    },
   
  ];
const conc = []
const edible = []

let Page = "Flower"


function createNavItem(navItemsArr) {
  const header = document.querySelector(".header");
  navItemsArr.forEach((item) => {
    const mainItemDiv = document.createElement("div");

    mainItemDiv.textContent = item.type;
    mainItemDiv.className = "menu-item";

    mainItemDiv.addEventListener("click", clickHandle)
    function clickHandle(){
        Page = item.type


        if(Page === "Flower"){
            CreateBoxes(flower);
        }
        else if(Page === "Carts"){
            CreateBoxes(cart);
        }
        else if(Page === "Concentrates"){
            CreateBoxes(conc);
        }
        else if(Page === "Pre-Rolls"){
          CreateBoxes(roll);
      }
      else if(Page === "Edibles"){
        CreateBoxes(edible);
    }
        
    }

    header.appendChild(mainItemDiv);
  });
}



function CreateBoxes(productsArr) {
    const content = document.querySelector(".content");
    removeAllChildNodes(content);
    productsArr.forEach((product) => createProductBoxDiv(product, content));

    if(!productsArr.length){
      const emptyDiv = document.createElement("div")
      emptyDiv.className = "empty-div"
      emptyDiv.textContent = "Sorry No Products At This Time"
      content.appendChild(emptyDiv)
      
    }
}

const createInfoBlock = (type, ammount) => {
  const infoBlock = document.createElement("div");
  const infoTypeP = document.createElement("p");
  const infoAmountP = document.createElement("p");

  infoTypeP.textContent = type;
  infoAmountP.textContent = ammount;

  infoTypeP.className = "info-type";
  infoAmountP.className = "info-ammont";
  infoBlock.className = "info-contain";

  infoBlock.appendChild(infoTypeP);
  infoBlock.appendChild(infoAmountP);


  return infoBlock;
};






function createProductBoxDiv(product, content){
    const {mainItemDiv, mainPriceDiv, infoDiv, unitPriceP,DynamicPriceP, nameP, img, strainDiv} = createBlockElements()
    addclasses(img,nameP,mainPriceDiv,unitPriceP,DynamicPriceP, infoDiv, mainItemDiv,strainDiv)
    addContent(img, nameP, unitPriceP,DynamicPriceP,strainDiv, product)
    addStrainType(product,strainDiv )
    appendToDoc(mainPriceDiv,infoDiv,mainItemDiv,content,unitPriceP,DynamicPriceP, product, strainDiv, nameP, img)
}

function createBlockElements(){
    const mainItemDiv = document.createElement("div");
    const mainPriceDiv = document.createElement("div");
    const infoDiv = document.createElement("div");
    const unitPriceP = document.createElement("p");
    const DynamicPriceP = document.createElement("p");
    const nameP = document.createElement("div");
    const img = document.createElement("img");
    const strainDiv = document.createElement("div");
    

    return {mainItemDiv, mainPriceDiv, infoDiv, unitPriceP,DynamicPriceP, nameP, img, strainDiv}

}



function addclasses(img,nameP,mainPriceDiv,unitPriceP,DynamicPriceP, infoDiv, mainItemDiv,strainDiv ){
    img.className = "product-image";
    nameP.className = "nameP";
    mainPriceDiv.className = "main-price-div";
    unitPriceP.className = "unit-price";
    DynamicPriceP.className = "dynamic-price";
    infoDiv.className = "info-div";
    mainItemDiv.className = "product-item";
    strainDiv.className = "strain-div";
}
function addContent(img, nameP, unitPriceP,DynamicPriceP,strainDiv, product){
    img.src = product.src;
    nameP.textContent = `${product.type}`;
    console.log("page", Page)
    unitPriceP.textContent = (Page === "Pre-Rolls" || Page === "Carts") ?  " 1 Gram |": "3.50 g |"
    console.log
    DynamicPriceP.textContent = ` ${product.price}`;
    strainDiv.textContent = product.strain
}


function addStrainType(product,strainDiv ){
    if(product.strain === "Sativa"){
        strainDiv.style.background = "#E1E6F0"
        strainDiv.style.color = "#335692"
    }
    else if(product.strain === "Hybrid"){
        strainDiv.style.background = "#EDF0E6"
        strainDiv.style.color = "#829B4F"
    }
    else if(product.strain === "Indica"){
        strainDiv.style.backgroundColor = "#F6E4E1"
        strainDiv.style.color = "#D18171"
    }
}

function appendToDoc(mainPriceDiv,infoDiv,mainItemDiv,content,unitPriceP,DynamicPriceP, product, strainDiv, nameP, img){
    mainPriceDiv.appendChild(unitPriceP);
    mainPriceDiv.appendChild(DynamicPriceP);
    infoDiv.appendChild(createInfoBlock("THC", product.thc));
    infoDiv.appendChild(createInfoBlock("CBD", product.cbd));
    infoDiv.appendChild(createInfoBlock("Sativa", product.sativa));
    infoDiv.appendChild(createInfoBlock("Indica", product.indica));

    mainItemDiv.appendChild(strainDiv);
    mainItemDiv.appendChild(img);
    mainItemDiv.appendChild(nameP);
    mainItemDiv.appendChild(mainPriceDiv);
    mainItemDiv.appendChild(infoDiv);
    content.appendChild(mainItemDiv);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

createNavItem(navItems);
CreateBoxes(flower);
