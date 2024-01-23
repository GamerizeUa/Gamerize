import {ProductGallery} from "@/components/ProductOverview/ProductGallery/ProductGallery.jsx";
import styles from "./ProductOverview.module.css"
import {ProductMainInfo} from "@/components/ProductOverview/ProductMainInfo/ProductMainInfo.jsx";

export const ProductOverview = () => {
      return(
          <section className={styles.productOverview}>
              <div className={styles.productOverview_outerContainer + " container"}>
                  <div className={styles.productOverview_container}>
                        <ProductGallery />
                        <ProductMainInfo />
                  </div>
              </div>
          </section>
      )
}