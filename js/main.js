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
  ]
}

let selectedOptions = {};

let elBreadTypes = document.querySelector('.bread-input');
let elPizzaSizes = document.querySelector('.js-pizza-sizes');

let breadTypeOptionTemplate = document.querySelector('.pizza-type-bread').content;
let pizzaSizeTemplate = document.querySelector('.pizza-type-size').content;

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



showBreadOption()
showPizzaSizes()
// Nonlar:
// - yupqa - 10 000 so'm
// - qalin - 10 000 so'm
// - buxanka - 7 000 so'm

// Kattaligi:
// - kichik - 25 cm - 25 000 so'm
// - o'rta - 30 cm - 30 000 so'm
// - katta - 35 cm - 45 000 so'm
// - oilaviy - 40 cm - 50 000 so'm

// Ustiga solinadiganlar:
// - pomidor - 4 000 so'm
// - tuzlangan bodring - 5 000 so'm
// - kurka go'shti - 10 000 so'm
// - qo'ziqorin - 6 000 so'm
// - zaytun - 9 000 so'm
// - qazi - 12 000 so'm

// Qo'shimchalar:
// - achchiq sous - 2 000 so'm
// - sosiskali bort - 7 000 so'm
// - rayhon - 2 000 so'm
