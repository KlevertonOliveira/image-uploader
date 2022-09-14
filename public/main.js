const form = document.querySelector('.file-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const fileInput = document.getElementById('image');
const containerSection = document.querySelector('.container');
const errorMessage = document.getElementById('error-message');

const url = '/api/v1/products';

let imageValue;

fileInput.onchange = async() => {

  const imageFile = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const { data: { image: { src } } } = await axios.post(`${url}/uploads`, formData, {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    });

    imageValue = src;
    errorMessage.classList.add('hide-alert');
  } 
  catch (error) {
    imageValue = null;
    createErrorMessage('Error on image upload.')
    errorMessage.classList.remove('hide-alert');
  }
}

form.addEventListener('submit', async(e)=>{
  e.preventDefault();

  const nameValue = nameInput.value;
  const priceValue = priceInput.value;

  try {
    const product = {
      name: nameValue, 
      price: priceValue,
      image: imageValue
    }
    
    await axios.post(url, product);
    fetchProducts();
    errorMessage.classList.add('hide-alert');
  } 
  catch (error) {
    createErrorMessage('Error on submit form')
    errorMessage.classList.remove('hide-alert');
  }
})

async function fetchProducts () {
  try {
   const {data:{products}} = await axios.get(url);
   
   const productsDOM = products.map((product)=>{
    return (
      `<article class="product">
        <img src="${product.image}" alt="${product.name}" class="img"/>
        <footer>
        <p>${product.name}</p>
        <span>$${product.price}</span>
        </footer>
      </article>`
    )
   }).join('')
   containerSection.innerHTML = productsDOM;

   errorMessage.classList.add('hide-alert');
  }
  
  catch (error) {
    createErrorMessage('Error on fetching products.');
    errorMessage.classList.remove('hide-alert');
  }
}
 
fetchProducts();

function createErrorMessage(message){
  const span = `<span>${message}</span>`
  errorMessage.innerHTML = span;
}