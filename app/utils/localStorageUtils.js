class LocalStorageUtil {
    constructor() {
        this.keyName = 'products';
        this.cartIfo = 'cartInfo';
    }

    // Методы для работы с Catalog.js
    getProducts() {
        const productLocalStorage = localStorage.getItem(this.keyName);
        if (productLocalStorage !== null) {
            return JSON.parse(productLocalStorage);
        } else {
            return [];
        }
    }
 
    putProducts(id) {
        let pushProducts = false;
        let products = this.getProducts();
        let index = products.indexOf(id);

        if (index === -1) {
            pushProducts = true;
            products.push(id);
        } else {
            products.splice(index, 1);
        }

        localStorage.setItem(this.keyName, JSON.stringify(products));

        return {
            pushProducts: pushProducts,
            products: products
        };
    }

    // Методы для работы с сохранением данных корзины
    getCartsInfo() {
        const cartLocalStorage = localStorage.getItem(this.cartIfo);
        if (cartLocalStorage !== null) {
            return JSON.parse(cartLocalStorage)
        } else {
            return [];
        }
    }

    putCarts(value, price, id) {
        let carts = this.getCartsInfo();
        const index = carts.findIndex(item => item.id === id);

        if (index === -1) {
            carts.push({
                value: value,
                price: price,
                id: id
            });
        } else {
            carts[index].value = value;
            carts[index].price = price;
        }

        localStorage.setItem(this.cartIfo, JSON.stringify(carts))
        return value
    }
}

const localStorageUtil = new LocalStorageUtil();