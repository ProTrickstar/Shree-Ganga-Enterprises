const products = {
  bopp:{title:"BOPP Adhesive Tape",category:"ADHESIVE TAPES",description:"A versatile option for everyday carton sealing, packing and dispatch operations. Tell us about your application and we'll help you explore suitable options.",specs:"Width, length, thickness, adhesive type and colour options need to be confirmed with the company.",visual:"image-tape"},
  printed:{title:"Printed BOPP Tape",category:"ADHESIVE TAPES",description:"Packaging tape with custom print possibilities for brand visibility, identification or handling instructions, subject to available printing options.",specs:"Print colours, artwork, tape dimensions and minimum order quantities to be confirmed.",visual:"image-printed"},
  stretch:{title:"Stretch Film",category:"FILMS & WRAPS",description:"Stretch wrapping material used to help bundle and stabilise goods for storage and transit. The right grade depends on load and application.",specs:"Film width, thickness, roll length, colour and hand or machine application to be confirmed.",visual:"image-stretch"},
  shrink:{title:"Shrink Film",category:"FILMS & WRAPS",description:"Shrink packaging film for applications where a close-fitting protective wrap is required. Confirm material suitability for your packaging equipment and product.",specs:"Film material, gauge, roll size and application compatibility to be confirmed.",visual:"image-shrink"},
  poly:{title:"LD / HD Poly Bags",category:"BAGS & POUCHES",description:"Flexible bags for a range of packaging, storage and handling applications. Share what you're packing to help narrow down the suitable format.",specs:"Bag dimensions, thickness, material, colour, printing and quantity to be confirmed.",visual:"image-bags"},
  zip:{title:"Zip-Lock Pouches",category:"BAGS & POUCHES",description:"Resealable pouch formats for storing and organising products. Intended use and material suitability should be confirmed before ordering.",specs:"Dimensions, thickness, closure type, material and order quantities to be confirmed.",visual:"image-pouch"},
  bubble:{title:"Bubble Packaging",category:"PROTECTIVE PACKAGING",description:"Cushioning material that may help protect items from surface scuffs and minor impacts during packing and handling.",specs:"Bubble size, roll width, roll length and format to be confirmed.",visual:"image-bubble"},
  strap:{title:"Packaging Strapping",category:"STRAPPING",description:"Strapping materials for bundling and securing packages or loads. Select a suitable specification based on the weight and handling conditions.",specs:"Material, strap width, thickness, breaking strength and compatible tools to be confirmed.",visual:"image-strap"}
};
const grid = document.querySelector("#product-grid");
const cards = [...grid.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const search = document.querySelector("#product-search");
const noResults = document.querySelector("#no-results");
let activeFilter = "all";

function applyFilters(){
  const term = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card=>{
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesTerm = (card.dataset.name + " " + card.innerText).toLowerCase().includes(term);
    card.hidden = !(matchesCategory && matchesTerm);
    if(!card.hidden) visible++;
  });
  noResults.hidden = visible !== 0;
}
filters.forEach(button=>button.addEventListener("click",()=>{
  activeFilter = button.dataset.filter;
  filters.forEach(item=>{item.classList.toggle("active",item===button);item.setAttribute("aria-pressed",String(item===button));});
  applyFilters();
}));
search.addEventListener("input",applyFilters);
document.addEventListener("keydown",event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){
    event.preventDefault();search.focus();
  }
});

const dialog = document.querySelector("#product-dialog");
const dialogVisual = document.querySelector("#dialog-visual");
const dialogTitle = document.querySelector("#dialog-title");
const dialogKicker = document.querySelector("#dialog-kicker");
const dialogDescription = document.querySelector("#dialog-description");
const dialogSpecs = document.querySelector("#dialog-specs");
const quoteProduct = document.querySelector("#quote-product");
function openProduct(id){
  const p = products[id];
  if(!p)return;
  dialogTitle.textContent = p.title;
  dialogKicker.textContent = p.category;
  dialogDescription.textContent = p.description;
  dialogSpecs.textContent = p.specs;
  dialogVisual.className = "dialog-visual " + p.visual;
  dialogVisual.innerHTML = `<span class="product-number">${p.category}</span><span class="image-caption">${p.title.toUpperCase()}</span>`;
  dialog.dataset.product = id;
  if(typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open","");
}
document.querySelectorAll("[data-product]").forEach(button=>button.addEventListener("click",()=>openProduct(button.dataset.product)));
document.querySelector("#dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
document.querySelector("#dialog-quote").addEventListener("click",()=>{
  const p=products[dialog.dataset.product];
  if(p){
    const option=[...quoteProduct.options].find(o=>o.textContent.trim()===p.title);
    if(option)quoteProduct.value=option.value || option.textContent;
    else quoteProduct.value=p.title;
  }
  dialog.close();
  document.querySelector("#contact").scrollIntoView({behavior:"smooth"});
  setTimeout(()=>quoteProduct.focus({preventScroll:true}),450);
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
menuToggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Open navigation");
}));
document.querySelectorAll("[data-interest]").forEach(a=>a.addEventListener("click",()=>{
  const message=document.querySelector('[name="message"]');
  message.value=`I'm enquiring about packaging for: ${a.dataset.interest}. `;
}));
document.querySelector("#year").textContent=new Date().getFullYear();

const form=document.querySelector("#quote-form");
const feedback=document.querySelector("#form-feedback");
form.addEventListener("submit",event=>{
  event.preventDefault();
  feedback.hidden=false;
  if(!form.reportValidity()){
    feedback.textContent="Please complete the required fields and check your email address.";
    return;
  }
  const data=Object.fromEntries(new FormData(form).entries());
  const lines=[
    "SHREE GANGA ENTERPRISES — ENQUIRY PROTOTYPE",
    "",
    `Name: ${data.name}`,
    `Company: ${data.company || "Not provided"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Product: ${data.product}`,
    `Quantity: ${data.quantity || "Not provided"}`,
    `Timeline: ${data.timeline || "Not provided"}`,
    `Message: ${data.message || "Not provided"}`,
    "",
    "This enquiry was generated locally from the website prototype."
  ];
  const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const download=document.createElement("a");
  download.href=url;download.download="shree-ganga-enquiry.txt";
  document.body.appendChild(download);download.click();download.remove();
  URL.revokeObjectURL(url);
  feedback.textContent="Prototype only: an enquiry summary has been downloaded to your device. Nothing has been sent to the company yet.";
});
