class Cart {
    constructor() {
        this.openCart = false;
    }

    removeEventListener() {
        document.getElementById('cart').removeEventListener('click', this.cartClickHandler);
    }

    closeCartMenu() {
        this.removeEventListener();
        this.render()
        this.setStyles({animation: 'animate 0.4s ease-out', animationDirection: 'reverse', animationFillMode: 'forwards'})
        this.openCart = false;
    }

    setStyles(styles) {
        const cartElement = document.querySelector('.cart-container');
        Object.assign(cartElement.style, styles);
    }

    render() {
        let htmlCartTableRow = '';
        let totalSum = 0;

        let carts = localStorageUtil.getCartsInfo();
        let products = localStorageUtil.getProducts();

        CATALOG.forEach(({id, name, img, price, discount}) => {
            const foundItem = carts.find(item => item.id === id);
            const priceLocalStorage = foundItem ? foundItem.price : price;
            const valueLocalStorage = foundItem ? foundItem.value : 1;

            if (products.indexOf(id) !== -1) {
                totalSum += price;
                htmlCartTableRow += `
                <tr class="cart-row">

                <td class="cart_elements__img-price">
                <span class="cart_element__discount">-${discount}%</span>
                    <img class="cart_elemetn__img" src="${img}"/>
                </td>

                    <td class="cart__elements_name-rating">
                        <span class="cart_elemetn__name">${name}</span>
                        <span class="cart_elemetn__price">${priceLocalStorage.toLocaleString()}$</span>
                        <div class="input-group">
                            <button class="input-group__minus input_btn">-</button>
                            <input id="${id}" class="input" data-price_local_storage="${priceLocalStorage}" data-price="${price}" value="${valueLocalStorage}"></input>
                            <button class="input-group__plus input_btn">+</button>
                        </div>
                    </td>           
                    <td class="cart_element__delete">
                        <span class="delete" onclick="productsPage.addLocationStorage(this,'${id}', true)"></span>
                    </td>
                </tr>`;
            }
        });

        const headerBuscketText = products.length === 0 ? 'Корзина пуста' : 'Ваши товары:';
        const html = `
        <div class="cart-container">
            <div class="close__close" onclick="cart.closeCartMenu()"></div>
            <h3 >${headerBuscketText}</h3>
            <table id="cart">
                <hr>
                ${htmlCartTableRow}
            </table>
            <hr><br>
            <div class="cart_elemetn__price">
                Итого:
                <span id="totalPrice"></span>$
            </div>
            <button class="products_element__btn" style="width=100%;">Заказать</button>
            </div>`;
        ROOT_CART.innerHTML = html;

        this.productsCounter();
    }

    productsCounter() {
        const totalPriceId = document.getElementById('totalPrice');
        const inputSelector = (input) => Number(input.value) * Number(input.dataset.price);
        const ACTION = {
            MINUS: '-',
            PLUS: '+'
        };

        const setTotalPrice = (value) => {
            totalPriceId.textContent = value.toLocaleString();
            let totalPrice = totalPriceId.dataset.value = value;
        };

        const init = () => {
            let totalPrice = 0;
            [...document.querySelectorAll('.cart-row')].forEach((basketItem) => {
                totalPrice += inputSelector(basketItem.querySelector('.input'));
            });

            setTotalPrice(totalPrice);
        };

        const calculateSeparateItem = (parentElement, action) => {
            const input = parentElement.querySelector('.input');
            
            switch (action) {
                case ACTION.MINUS:
                    input.value--;
                    setTotalPrice(Number(totalPriceId.dataset.value) - Number(input.dataset.price));
                    break;
                case ACTION.PLUS:
                    input.value++;
                    setTotalPrice(Number(totalPriceId.dataset.value) + Number(input.dataset.price));
                    break;
            }

            localStorageUtil.putCarts(input.value, Number(input.dataset.price) * Number(input.value), input.id)

            let sumLocalStorage = input.dataset.price_local_storage = `${inputSelector(input).toLocaleString()}$`;
            parentElement.querySelector('.cart_elemetn__price').textContent = sumLocalStorage;
        };

        this.cartClickHandler = (event) => {
            const input = event.target.closest('.cart-row').querySelector('.input');    

            if (Number(input.value) > 0) {
                if (event.target.classList.contains('input-group__minus')) {
                    calculateSeparateItem(
                        event.target.closest('.cart-row'),
                        ACTION.MINUS
                    );
                }
            }

            if (event.target.classList.contains('input-group__plus')) {
                calculateSeparateItem(
                    event.target.closest('.cart-row'),
                    ACTION.PLUS
                );
            }
        };
        
        document.getElementById('cart').addEventListener('click', this.cartClickHandler);
        init();
    }
}

const cart = new Cart();