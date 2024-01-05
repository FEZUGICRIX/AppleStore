class Products {
    constructor() {
        this.NameActiveClass = 'products_element__btn_active';
        this.NameClass = 'products_element__btn';
        this.text = 'Добавить в корзину';
        this.textActive = 'Удалить из корзины';
    }

    addLocationStorage(element, id, remove) {
        const {pushProducts, products} = localStorageUtil.putProducts(id);
        header.render(products.length)
        
        cart.removeEventListener()
        if (!cart.openCart) {
            cart.render()
            cart.setStyles({right: '-350px', transition: 'all 1s ease'});
        } else {
            cart.render()
            cart.setStyles({right: '0', transition: 'all 1s ease'})}
            
        if (pushProducts) {
            element.classList.add(this.NameActiveClass);
            element.innerHTML = this.textActive;
        } else {
            if (remove) {
                let element = document.querySelector('.products_element__btn');
                element.classList.remove(this.NameActiveClass);
            }
            element.innerHTML = this.text;
        }
        this.render()
        productInfo.render()
    }


    productInfoPage (id) {
        localStorage.setItem('cart-info-element', id)
        window.location.href = `Product_info.html`
        productInfo.render()
    }

    styleButton(id) {
        const products = localStorageUtil.getProducts();
        let result = {}
        if (products.indexOf(id) === -1) {
            result.className = this.NameClass;
            result.text = this.text;
        } else {
            result.className = this.NameActiveClass;
            result.text = this.textActive;
        }
        return result;
    }

    render() {
        let htmlCatalog = '';


        CATALOG.forEach(({id, name, img, old_price, price, rating, bought, discount}) => {

    

            htmlCatalog += `
            <li class="products_element">
                <span class="products_element__discount">-${discount}%</span>

                <a onclick="productsPage.productInfoPage('${id}')" class="products_element__link">
                    <img class="products_element__img" src="${img}">
                </a>

                <div class="products_element__price-raiting">
                    <span class="products_element__new-price" >${price.toLocaleString()}$</span>
                    <div class="products_element__price">${old_price.toLocaleString()}$</div>

                    <div class="products_element__rating-star">
                        ${rating}  
                        <span class="star"></span>
                    </div>
                </div>

                    <a onclick="productsPage.productInfoPage('${id}')" class="products_element__name products_element__link">
                       <span class="products_element__name" >${name}</span>
                    </a>

                    <span class="products_element__bought">Купили:${bought}</span>
                <button 
                    onclick="productsPage.addLocationStorage(this,'${id}')"
                    class="${productsPage.styleButton(id).className} products_element__btn">
                    ${productsPage.styleButton(id).text}
                </button>
            </li>
            `
        });

        const html = `
        <ul class="products-container">
            ${htmlCatalog}
        </ul>
        `
        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products();
productsPage.render();