class ProductInfo {
    render() {
        const id = localStorage.getItem('cart-info-element')
        const foundItem = CATALOG.find(item => item.id === id);
        let idKey = foundItem.id.slice(2)

        const href = window.location.href;
        const myUrl = new URL(href);

        if (href.indexOf('?') === -1 && href.includes('Product_info.html')) {
            myUrl.searchParams.set('id', idKey);
            history.pushState(null, null, myUrl)
        }

        const element = Number(myUrl.searchParams.get('id'));
        const findProduct = CATALOG.find(item => item.id === `el${element}`);

        const styleButton = productsPage.styleButton(id);
        const {name, img, old_price, price, rating, bought, discount, ratings} =  findProduct;
        let htmlProductInfo = `
            <div class="product_info__wrapper">
                <div class="product_info__link-home-page"><a href="index.html">Главная</a></div>

                <div class="product_info__container">
                <div>
                    <span class="products_element__discount">-${discount}%</span>
                    <img src="${img}">
                </div>
                
                <div class="product_info__about-product">
                        <h1>${name}</h1>

                        <div class="products_info__product-info">
                            <div class="product_info__raiting"> 
                                <span class="products_element__rating-star">
                                    ${rating} 
                                <span class="star"></span>
                                </span>
                                <span class="product_info__raitings">${ratings} оценок</span>
                                <span class="products_info__bought">Купили: ${bought}</span>
                            </div> 
                        

                            <div class="products_element__additional-information">
                                <ul>
                                    <li>Страна производства: <span>США</span></li>
                                    <li>Компания: <span>Apple</span></li>
                                    <li>Модельный год: <span>2022</span></li>
                                </ul>                       
                            </div>
                                
                                
                            <div class="product_info__price_button">
                                <div class="product__info_prce">
                                    Цена:
                                    <span class="products_element__new-price" >${price.toLocaleString()}$</span>
                                    <span class="products_element__price">${old_price.toLocaleString()}$</span>                              
                                </div>

                                <button
                                    id="product_info__btn"
                                    onclick="productsPage.addLocationStorage(this,'${id}'); productsPage.styleButton(id);"
                                    class="${styleButton.className} products_element__btn">
                                    
                                    ${styleButton.text}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        ROOT_PRODUOCTS_INFO.innerHTML = htmlProductInfo
        ROOT_PRODUCTS.remove()
    }
}

const productInfo = new ProductInfo();
productInfo.render()