class Header {
    render(counter) {
    let htmlHeader = `
        <div class="header">
            <div class="header-wrapper">
                <a href="index.html" id="header__home-page">
                    <span id="header__logo"></span>
                    <span>Apple store</span>
                </a>

                <div class="header__buscket">
                    <div class="header__counter">${counter}</div>
                    <div class="header__cart"></div>
                </div>

            </div>
        </div>
        `
        ROOT_HEADER.innerHTML = htmlHeader;

        document.getElementsByClassName('header__buscket')[0].addEventListener('click', () => {
            cart.openCart = true;
            cart.removeEventListener();
            
            cart.render()
            cart.setStyles({animation: 'animate 0.65s ease', animationFillMode: 'forwards'})
        });
    };
};

const header = new Header();