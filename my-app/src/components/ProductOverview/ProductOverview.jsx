import {ProductGallery} from "./ProductGallery/ProductGallery.jsx";
import {ProductMainInfo} from "./ProductMainInfo/ProductMainInfo.jsx";
import styles from "./ProductOverview.module.css"

export const ProductOverview = () => {
    const product = {
        id: 12111,
        discount: 20,
        name: "Дюна імперіум1",
        minPlayers: 4,
        maxPlayers: 6,
        minAge: 18,
        price: 478,
        oldPrice: 2812,
        gameTimeMinutes: 80,
        category: 'Стратегія',
        photo:
            "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
    }
    const breadcrumbsDetails = {name: ['Каталог', product.name], link: ['/catalog', '/catalog/' + product.id]};

      return(
          <section className={styles.productOverview}>
              <div className={styles.productOverview_outerContainer + " container"}>
                  <div className={styles.productOverview_container}>
                        <ProductGallery breadcrumbsDetails={breadcrumbsDetails}/>
                        <ProductMainInfo breadcrumbsDetails={breadcrumbsDetails}/>
                  </div>
              </div>
          </section>
      )
}