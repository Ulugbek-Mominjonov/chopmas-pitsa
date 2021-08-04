let pizzaOptions = {
  briedType: [
    {
      name: "Yupqa",
      price: 10000
    },
    {
      name: "Qalin",
      price: 10000
    },
    {
      name: "Buxanka",
      price: 7000
    }
  ],
  sizes: [
    {
      name: 'Kichik',
      price: 25000,
      size: 25,
    },
    {
      name: 'O\'rta',
      price: 30000,
      size: 30,
    },
    {
      name: 'Katta',
      price: 45000,
      size: 35,
    },
    {
      name: 'Oilaviy',
      price: 50000,
      size: 40,
    }
  ],
  inredients: [
    {
      name: 'Pomidor',
      price: 4000
    },
    {
      name: 'Tuzlangan bodring',
      price: 5000
    },
    {
      name: 'Kurka go\'shti',
      price: 10000
    },
    {
      name: 'Qo\'ziqorin',
      price: 6000
    },
    {
      name: 'Zaytun',
      price: 9000
    },
    {
      name: 'Qazi',
      price: 12000
    }
  ],
  additional: [
    {
      name: 'Achchiq sous',
      price: 2000
    },
    {
      name: 'Sosiskali bort',
      price: 7000
    },
    {
      name: 'Rayhon',
      price: 2000
    }
  ]
}

let selectedOptions = {};

// Dom Elements
let elBreadTypes = document.querySelector('.bread-input');
let elPizzaSizes = document.querySelector('.js-pizza-sizes');
let elPizzaIngredients = document.querySelector('.js-pizza-ingredients');
let elPizzaAdditional = document.querySelector('.js-pizza-additional');

// Templates
let breadTypeOptionTemplate = document.querySelector('.pizza-type-bread').content;
let pizzaSizeTemplate = document.querySelector('.pizza-type-size').content;
let pizzaCheckTemplate = document.querySelector('.pizza-type-checkbox').content;
let elResultTemplate = document.querySelector('.result-template').content;


// Create bread type Option function
function createBreadOption(item) {
  let cloneElementOption = breadTypeOptionTemplate.cloneNode(true);
  let elOption = cloneElementOption.querySelector('.bread-option');
  elOption.value = item.name;
  elOption.textContent = item.name + "  " + item.price + ' so\'m';

  return cloneElementOption;
}
// show bread type Options function
function showBreadOption() {
  let optionFragment = document.createDocumentFragment();
  pizzaOptions.briedType
    .slice()
    .sort((a, b) => {
      return a.name > b.name ? 1
      : b.name > a.name ? -1
      : 0
    })
    .forEach( (item, index) => {
      optionFragment.appendChild(createBreadOption(item));
    })

  elBreadTypes.appendChild(optionFragment);
}

// Create pizza size function
function createPizzaSize(item) {
  let cloneElementSize = pizzaSizeTemplate.cloneNode(true);
  let elSizeInput = cloneElementSize.querySelector('.size-checkbox__input');
  let elControler = cloneElementSize.querySelector('.size-checkbox__control');
  let elSizeName = elControler.querySelector('small');
  elSizeInput.value = item.size;
  elSizeName.textContent = item.name;
  elControler.append(`${item.size} sm ${item.price} so'm`);

  return cloneElementSize;
}

// show pizza sizes function
function showPizzaSizes() {
  let sizeFragment = document.createDocumentFragment();
  let elWidthHeight = 105;
  let step = 5;

  pizzaOptions.sizes
    .slice()
    .sort((a, b) => {
      return a.size - b.size;
    })
    .forEach( item => {
      let result = createPizzaSize(item);
      let changingSizeCheckbox = result.querySelector('.size-checkbox__control');

      changingSizeCheckbox.style.width = elWidthHeight + step + 'px';
      changingSizeCheckbox.style.height = elWidthHeight + step + 'px';
      step += 8;

      sizeFragment.appendChild(result);
    })

  elPizzaSizes.appendChild(sizeFragment);
}

// Create pizza Checkbox function
function createPizzaCheckbox(item, className) {
  let cloneElement = pizzaCheckTemplate.cloneNode(true);
  let elInput = cloneElement.querySelector('.checkbox-group__input');
  let elControler = cloneElement.querySelector('.checkbox-group__controller');

  elInput.classList.add(className);
  elInput.value = item.name;
  elControler.textContent = item.name;

  return cloneElement;
}

// show Pizza checkbox function
function showChecbox(item, el, className) {
  let Fragment = document.createDocumentFragment();
  item
    .slice()
    .sort((a, b) => {
      return a.name > b.name ? 1
      : b.name > a.name ? -1
      : 0
    })
    .forEach( item => {
      Fragment.appendChild(createPizzaCheckbox(item, className));
    })

  el.appendChild(Fragment);
}

showBreadOption()
showPizzaSizes()
showChecbox(pizzaOptions.inredients, elPizzaIngredients, 'js-ingredient-input')
showChecbox(pizzaOptions.additional, elPizzaAdditional, 'js-additional-input')

let allPrice = [];
// Saving to selected bread type
let breadInput = document.querySelector('.bread-input');
let showSelectedBread = document.querySelector('.result-bread__show');
breadInput.addEventListener('change', () => {
  showSelectedBread.textContent = breadInput.value;
  let index = pizzaOptions.briedType.findIndex(item => {
    return item.name == breadInput.value;
  })
  selectedOptions.bread = pizzaOptions.briedType[index].name;
  allPrice[0] = pizzaOptions.briedType[index].price;
  countPrice(allPrice);
})

// Saving to selected size
let sizeInputs = document.querySelectorAll('.size-checkbox__input');
let showSelectedSize = document.querySelector('.result-size__show');
sizeInputs.forEach(sizeInput => {
  sizeInput.addEventListener('change', () => {
    let index = pizzaOptions.sizes.findIndex(item => {
      return item.size == Number(sizeInput.value);
    })
    selectedOptions.size = pizzaOptions.sizes[index].name;
    allPrice[1] = pizzaOptions.sizes[index].price;
    showSelectedSize.textContent = pizzaOptions.sizes[index].name +' '+ pizzaOptions.sizes[index].size + " sm";
    countPrice(allPrice);
  })
})

// Saving to selected ingredients and additionals
let ingredientList = document.querySelector('.ingredient-list');
let additionalList = document.querySelector('.additional-list');
let elIngredientInputs = document.querySelectorAll('.js-ingredient-input');
let elAdditionalInputs = document.querySelectorAll('.js-additional-input');
selectedOptions.inredients = [];
selectedOptions.additional = [];

elIngredientInputs.forEach(item => {
  item.addEventListener('change', (evt) => {
    let target = evt.target;
    if(target.checked){
      // add ingredient from selectedOptions.inredients
      let ingredient = pizzaOptions.inredients.find(item => item.name == target.value);
      selectedOptions.inredients.push(ingredient);
    } else{
      // remove ingredient from selectedOptions.inredients
      let index = selectedOptions.inredients.findIndex(item => item.name == target.value);
      selectedOptions.inredients.splice(index, 1);
    }

    // show ingredients
    showCheckbox(selectedOptions.inredients, ingredientList);
    allPrice[2] = selectedOptions.inredients.reduce((sum, item) => sum + item.price, 0);
    countPrice(allPrice);
  })
})

elAdditionalInputs.forEach(item => {
  item.addEventListener('change', (evt) => {
    let target = evt.target;
    if(target.checked){
      // add additional from selectedOptions.additional
      let additional = pizzaOptions.additional.find(item => item.name == target.value);
      selectedOptions.additional.push(additional);
    } else{
      // remove additional from selectedOptions.additional
      let index = selectedOptions.additional.findIndex(item => item.name == target.value);
      selectedOptions.additional.splice(index, 1);
    }

    // show ingredients
    showCheckbox(selectedOptions.additional, additionalList);

    // calculate
    allPrice[3] = selectedOptions.additional.reduce((sum, item) => sum + item.price, 0);
    countPrice(allPrice);
  })
})


// showing selected ingredients and additionals
function showCheckbox(array, el) {
  let fragment = document.createDocumentFragment();
  array
    .slice()
    .sort((a, b) => {
      return a.name > b.name ? 1
      : b.name > a.name ? -1
      : 0
    })
    .forEach(item => {
    let cloneElement = elResultTemplate.cloneNode(true);
    let listItem = cloneElement.querySelector('.result-list__item');
    listItem.textContent = item.name;
    fragment.appendChild(cloneElement);
  })
  el.innerHTML = '';
  el.appendChild(fragment);
}

// calculate all price of pizza
function countPrice(array) {
  selectedOptions.price = array.reduce((sum, item) => {
    return sum + item;
  },0);
  document.querySelector('.all-price').textContent = selectedOptions.price + ' so\'m';
}
