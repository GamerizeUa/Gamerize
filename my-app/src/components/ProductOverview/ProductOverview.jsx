import {ProductGallery} from "@/components/ProductOverview/ProductGallery.jsx";
import styles from "./ProductOverview.module.css"

export const ProductOverview = () => {
      return(
          <section className={styles.productCore}>
              <div className={styles.productCore_outerContainer + " container"}>
                  <div className={styles.productCore_container}>
                        <ProductGallery />
                  </div>
              </div>
          </section>
      )
}