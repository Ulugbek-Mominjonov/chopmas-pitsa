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
let pizzaIngredientTemplate = document.querySelector('.pizza-type-inredient').content;
let pizzaAdditionalTemplate = document.querySelector('.pizza-type-additional').content;

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

// Create pizza inredient function
function createPizzaIngredient(item) {
  let cloneElementIngredient = pizzaIngredientTemplate.cloneNode(true);
  let elInredientInput = cloneElementIngredient.querySelector('.ingredient-input');
  let elControler = cloneElementIngredient.querySelector('.ingredient-controller');

  elInredientInput.value = item.name;
  elControler.textContent = item.name;

  return cloneElementIngredient;
}

// show Pizza Ingredient function
function showIngredient() {
  let ingredientFragment = document.createDocumentFragment();
  pizzaOptions.inredients
    .slice()
    .sort((a, b) => {
      return a.name > b.name ? 1
      : b.name > a.name ? -1
      : 0
    })
    .forEach( item => {
      ingredientFragment.appendChild(createPizzaIngredient(item));
    })

  elPizzaIngredients.appendChild(ingredientFragment);
}

// Create pizza additional function
function createPizzaAdditional(item) {
  let cloneElementAdditional = pizzaAdditionalTemplate.cloneNode(true);
  let elAdditionalInput = cloneElementAdditional.querySelector('.additional-input');
  let elControler = cloneElementAdditional.querySelector('.additional-controller');

  elAdditionalInput.value = item.name;
  elControler.textContent = item.name;

  return cloneElementAdditional;
}

// show Pizza Ingredient function
function showAdditional() {
  let additionalFragment = document.createDocumentFragment();
  pizzaOptions.additional
    .slice()
    .sort((a, b) => {
      return a.name > b.name ? 1
      : b.name > a.name ? -1
      : 0
    })
    .forEach( item => {
      additionalFragment.appendChild(createPizzaAdditional(item));
    })

  elPizzaAdditional.appendChild(additionalFragment);
}


showBreadOption()
showPizzaSizes()
showIngredient()
showAdditional()
