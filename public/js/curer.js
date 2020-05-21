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
