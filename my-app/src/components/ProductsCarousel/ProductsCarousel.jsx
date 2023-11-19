import {useEffect, useState } from "react";
import styles from "./ProductsCarousel.module.css"
import ProductCard from "../ProductCard/ProductCard";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

export default function ProductsCarousel({productsList, sectionTitle, productConfigurationObject}) {
    let [windowWidth, setWindowWidth] = useState(null) // in future it can become a global redux state
    let [carouselPosition, setCarouselPosition] = useState(0)
    let [carouselLoadedPosition, setCarouselLoadedPosition] = useState(0)
    const padding = 80 // potentially it will depend on windowWidth
    const productWidth = windowWidth >= 1440? (1440 - 2 * padding) * 0.235 : (windowWidth - 2 * padding) * 0.235 // in future percents will depend on windowWidth to potentially decrease viewed product cards amount in carousel
    const columnGap = windowWidth >= 1440? (1440 - 2 * padding) * 0.02 : (windowWidth - 2 * padding) * 0.02 

    useEffect(() => {
        setWindowWidth(document.documentElement.clientWidth)
        window.addEventListener('resize', function (){
            setWindowWidth(document.documentElement.clientWidth)
        })
    },[])

    function slideRightOnclick (e) {
        if (carouselPosition < productsList.length - 4) {
            if (carouselPosition === carouselLoadedPosition) setCarouselLoadedPosition(++carouselLoadedPosition)
            setCarouselPosition(++carouselPosition)
        } 
    }
    function slideLeftOnclick (e) {        
        if (carouselPosition > 0) setCarouselPosition(--carouselPosition)     
    }
    
    //console.log(windowWidth)
    //console.log(carouselPosition)
    return (
        <section className={styles.wrap}>
            <div style={{paddingLeft: `${padding}px`, paddingRight: `${padding}px`}} className={'container ' + styles.container}>
                <div className={styles.titleContainer}><h4>{sectionTitle}</h4></div>
                <div className={styles.chevron + " " + styles.chevronRight} onClick={slideRightOnclick}><ArrowRightIcon/></div>
                <div className={styles.chevron + " " + styles.chevronLeft} onClick={slideLeftOnclick}><ArrowLeftIcon/></div>
                <div className={styles.bodyContainer}>
                    <div style={{columnGap:`${columnGap}px`, left : `${-(productWidth + columnGap) * carouselPosition}px`}} className={styles.body}>
                        {productsList.map((product, i)=> {
                            if (i < 5 + carouselLoadedPosition) return <div style={{width: `${productWidth}px`}} className={styles.productWrap} key={product.id}><ProductCard product={product} configurationObject={productConfigurationObject}/></div>
                            else{
                                return (i !== carouselPosition + 4 || <div style={{width: `${productWidth}px`}} className={styles.productWrap} key={product.id}><ProductCard product={product} configurationObject={productConfigurationObject}/></div> )
                                }
                            })}
                    </div>
                </div>
            </div>
        </section>
    );
}