const render = () => {
    let count = localStorageUtil.getProducts();

    header.render(count.length);
    productInfo.render()
}

render();

// fetch('server/CATALOG.json')
//     .then(res => res.json())
//     .then(body => {
//         CATALOG = body;
//     })