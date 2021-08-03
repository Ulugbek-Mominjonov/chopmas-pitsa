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
    .forEach( item => {
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
function createPizzaCheckbox(item) {
  let cloneElement = pizzaCheckTemplate.cloneNode(true);
  let elInput = cloneElement.querySelector('.checkbox-group__input');
  let elControler = cloneElement.querySelector('.checkbox-group__controller');

  elInput.value = item.name;
  elControler.textContent = item.name;

  return cloneElement;
}

// show Pizza checkbox function
function showChecbox(item, el) {
  let Fragment = document.createDocumentFragment();
  item
    .slice()
    .sort((a, b) => {
      return a.name > b.name ? 1
      : b.name > a.name ? -1
      : 0
    })
    .forEach( item => {
      Fragment.appendChild(createPizzaCheckbox(item));
    })

  el.appendChild(Fragment);
}

showBreadOption()
showPizzaSizes()
showChecbox(pizzaOptions.inredients, elPizzaIngredients)
showChecbox(pizzaOptions.additional, elPizzaAdditional)

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

function countPrice(array) {
  selectedOptions.price = array.reduce((sum, item) => {
    return sum + item;
  },0);
  document.querySelector('.all-price').textContent = selectedOptions.price;
}
