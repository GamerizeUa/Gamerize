import { useEffect, useState } from "react";
import PaginationButtons from "../common-components/PaginationButtons/PaginationButtons";
import ProductCardList from "../common-components/ProductCardList/ProductCardList";
import styles from "./Favourites.module.css";

function Favourites() {
    // productsList just for tests
    const productsList = [
        {
            id: 12111,
            discount: 20,
            name: "Дюна імперіум1",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 12122,
            discount: 20,
            name: "Дюна імперіум2",
            minPlayers: 4,
            maxPlayers: null,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 12133,
            discount: 20,
            name: "Дюна імперіум3",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 12144,
            discount: 20,
            name: "Дюна імперіум4",
            minPlayers: 4,
            maxPlayers: null,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 12155,
            discount: 20,
            name: "Дюна імперіум5",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 12166,
            discount: 20,
            name: "Дюна імперіум6",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 12177,
            discount: 20,
            name: "Дюна імперіум7",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 12188,
            discount: 20,
            name: "Дюна імперіум8",
            minPlayers: 4,
            maxPlayers: null,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 12199,
            discount: 20,
            name: "Дюна імперіум9",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 11221,
            discount: 20,
            name: "Дюна імперіум10",
            minPlayers: 4,
            maxPlayers: null,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        {
            id: 21231,
            discount: 20,
            name: "Дюна імперіум11",
            minPlayers: 4,
            maxPlayers: 6,
            minAge: 16,
            price: 2250,
            oldPrice: 2812,
            gameTimeMinutes: 80,
            photo: "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
        },
        //{id : 41251, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
        //{id : 51261, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    ];
    // productsList just for tests
    const pageLimit = 8;
    const pagesAmount = Math.ceil(productsList.length / pageLimit); //todo : it should be taken from server
    const [products, setProducts] = useState(productsList);
    const [productsOffset, setProductsOffset] = useState(0); // amount of skipped products to get needed
    console.log(productsOffset);
    console.log(pageLimit);
    console.log(products.slice(productsOffset, pageLimit));
    const productsPortion = products.slice(
        productsOffset,
        productsOffset + pageLimit
    );
    console.log(productsPortion);

    useEffect(() => {
        // get new portion of products and setProducts with products + new portion
    }, [productsOffset]);

    function changePage(newPage) {
        setProductsOffset((newPage - 1) * pageLimit);
    }
    return (
        <div className={styles.container + " container"}>
            <div className={styles.header_container}>
                <h2 className={styles.header}>Список бажань</h2>
            </div>
            <div className={styles.clear_btn_container}>
                <button className={styles.clear_btn}>Очистити</button>
            </div>
            <ProductCardList productCardList={productsPortion} />
            <div className={styles.pagination_btns_container}>
                <PaginationButtons
                    pagesAmount={pagesAmount}
                    pageChangeFunc={changePage}
                />
            </div>
        </div>
    );
}

export default Favourites;
