// ymaps.ready(init);
// function init() {
//   const myMap = new ymaps.Map('map', {
//     center: [55.76, 37.64],
//     zoom: 10,
//   });
//   const myPlacemark = new ymaps.Placemark([55.76, 37.64]);
//   myMap.geoObjects.add(myPlacemark);

// }
let address = [];
ymaps.ready(init);
// console.log(address);
function init() {
  const { geolocation } = ymaps;
  const myMap = new ymaps.Map(
    'map',
    {
      center: [55.76, 37.64],
      zoom: 10,
    },
    {
      searchControlProvider: 'yandex#search',
    }
  );
  const myPlacemark = new ymaps.Placemark([55.656537500000006, 38.0]);
  myMap.geoObjects.add(myPlacemark);

  geolocation
    .get({
      autoReverseGeocode: false,
      provider: 'browser',
      mapStateAutoApply: true,
    })
    .then((result) => {
      result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
      address = result.geoObjects.position;
      myMap.geoObjects.add(result.geoObjects);
      // console.log(result.geoObjects.position);
      console.log(address);
    });
}

const Templates = {};

async function render(templateName, data) {
  if (!Templates[templateName]) {
    const str = await (await fetch(`/hbs/${templateName}.hbs`)).text();
    Templates[templateName] = Handlebars.compile(str);
  }

  return Templates[templateName](data);
}

const add = document.getElementById('add');
const products = document.getElementById('products');

add.addEventListener('click', async (event) => {
  event.preventDefault();

  const div = document.createElement('div');
  div.innerHTML = await render('add', {});
  products.append(div);
});

const ok = document.getElementById('ok');

ok.addEventListener('click', async (event) => {
  // const resolve = await fetch('/curer/zakaz', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8',
  //   },
  //   body: JSON.stringify({ addres: address }),
  // });
  // console.log(`>>>>>>>${address}`);

  swal('Отлично!', 'Ваш заказ успешно добавлен!', 'success');
});

// ////////
