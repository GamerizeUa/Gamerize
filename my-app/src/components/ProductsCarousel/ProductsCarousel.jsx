import {useEffect, useState, useRef} from "react";
import styles from "./ProductsCarousel.module.css"
import ProductCard from "../ProductCard/ProductCard";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

export default function ProductsCarousel({productsList, sectionTitle, productConfigurationObject}) {
    let [windowWidth, setWindowWidth] = useState(null) // in future it can become a global redux state
    let [carouselPosition, setCarouselPosition] = useState(0)
    let [carouselLoadedPosition, setCarouselLoadedPosition] = useState(0) // carouselPosition that can't be decreased to save already loaded products
    const carousel = useRef(null) // carousel body html element

    const limitedWindowWidth = windowWidth < 1440 ? windowWidth : 1440 // width limited by website max-width 1440px
    const productCardsAmount = limitedWindowWidth <= 393? 2 : (limitedWindowWidth <= 834? 3 : 4) // visible cards amount in the carousel depending on mobile/tablet/desctop versions
    const paddingInPercents = 5.5 // !!It can also depend on limitedWindowWidth in future   
    const padding = paddingInPercents * limitedWindowWidth / 100 // padding in px
    const productWidth = (limitedWindowWidth - 2 * padding) * 0.235 * 4 / productCardsAmount // productWidth in px
    const columnGap = (limitedWindowWidth - 2 * padding - productCardsAmount * productWidth) / (productCardsAmount - 1) // gap between products in px

    const oneCardTotalWidth = productWidth + columnGap // add it everywhere
    const boundaryRightCarouselPosition = productsList.length - productCardsAmount // add it everywhere
    useEffect(() => {
        setWindowWidth(document.documentElement.clientWidth)
        window.addEventListener('resize', function (){
            setWindowWidth(document.documentElement.clientWidth) // in future it can be proceeded in Layout, for example, for global redux state
        })
    },[])

    function positionLimitBreakingBehavior (boundaryPosition){
        carousel.current.style.left = `${-(productWidth + columnGap) * (boundaryPosition + (boundaryPosition? 0.3 : -0.3))}px`
        setTimeout(()=>{
            carousel.current.style.left = `${-(productWidth + columnGap) * boundaryPosition}px`
        }, 200)
    }

    function arrowRightOnclick () {
        if (carouselPosition < productsList.length - productCardsAmount) { // if boundary right position is not already reached
            if (carouselPosition === carouselLoadedPosition) setCarouselLoadedPosition(++carouselLoadedPosition)
            setCarouselPosition(++carouselPosition)
        }
        else positionLimitBreakingBehavior(boundaryRightCarouselPosition)
    }
    function arrowLeftOnclick () { 
        // if boundary left position is not already reached       
        if (carouselPosition > 0) setCarouselPosition(--carouselPosition)
        else positionLimitBreakingBehavior(0)    
    }

    let touchStartX
    let touchStartY
    let lastTouchX
    let xDraggedDistance
    let draggedCardFloatAmount
    let isBoundaryBehaviorActive = false

    function handleTouchStart (e) {
        touchStartX = lastTouchX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
        //xDraggedDistance = 0
        //draggedCardFloatAmount // не исклюючено что это нужно для некоторых сценариев(где нет смены состояния)
    }

    function handleTouchMove (e) {
        xDraggedDistance = e.touches[0].clientX - touchStartX
        if (Math.abs(xDraggedDistance) > Math.abs(e.touches[0].clientY - touchStartY)) {
            const currentTouchX = e.touches[0].clientX

            draggedCardFloatAmount = xDraggedDistance / (productWidth + columnGap) // может стоит вынести глобально draggedCardFloatAmount
            if (carouselPosition - draggedCardFloatAmount < 0 || carouselPosition - draggedCardFloatAmount > productsList.length - productCardsAmount){
                isBoundaryBehaviorActive = true
                console.log(carouselPosition)
                console.log(draggedCardFloatAmount)
                carousel.current.style.left = `${-(productWidth + columnGap) * ((xDraggedDistance > 0 ? -0.3 : productsList.length - productCardsAmount + 0.3))}px`
            }

            else {
                isBoundaryBehaviorActive = false
                console.log("else",draggedCardFloatAmount)
                carousel.current.style.left = `${parseFloat(carousel.current.style.left) + (currentTouchX - lastTouchX)}px`
            }
            lastTouchX = currentTouchX
        }
        else console.log("down") 
    }

    function handleTouchEnd () {
        //let draggedCardAmount =  Math.floor(Math.abs(xDraggedDistance) / productWidth)   //productWidth + columnGap
        //if ((Math.abs(xDraggedDistance) % productWidth) > productWidth / 2) draggedCardAmount++ //productWidth + columnGap
        const draggedCardAmount = Math.round(draggedCardFloatAmount) // может абсолют нужен?
        //const draggedCardAmount = Math.abs(Math.round(draggedCardFloatAmount))

        //if (draggedCardAmount >= 1 && xDraggedDistance < 0 && carouselPosition < productsList.length - productCardsAmount) {
        //    let newCarouselPosition = carouselPosition + draggedCardAmount
        //    if (newCarouselPosition >= productsList.length - productCardsAmount) newCarouselPosition = productsList.length - productCardsAmount
//
        //    if (carouselPosition === carouselLoadedPosition) setCarouselLoadedPosition(newCarouselPosition)
        //    setCarouselPosition(newCarouselPosition)
        //}
        //else if (draggedCardAmount >= 1 && xDraggedDistance > 0 && carouselPosition > 0){
        //    let newCarouselPosition = carouselPosition - draggedCardAmount
        //    if (newCarouselPosition < 0) newCarouselPosition = 0
//
        //    setCarouselPosition(newCarouselPosition)
        //}
        //else carousel.current.style.left = `${-(productWidth + columnGap) * carouselPosition}px`

        console.log("touchend", draggedCardAmount)
        if (Math.abs(draggedCardAmount) >= 1){
            let newCarouselPosition = carouselPosition - draggedCardAmount
            if (newCarouselPosition < 0) newCarouselPosition = 0
            else if (newCarouselPosition >= productsList.length - productCardsAmount) newCarouselPosition = productsList.length - productCardsAmount
//           
            if (draggedCardAmount < 0 && carouselPosition === carouselLoadedPosition) setCarouselLoadedPosition(newCarouselPosition)//!
            
            if (newCarouselPosition === carouselPosition) carousel.current.style.left = `${-(productWidth + columnGap) * carouselPosition}px`
            else setCarouselPosition(newCarouselPosition)
        }
        else carousel.current.style.left = `${-(productWidth + columnGap) * carouselPosition}px`


        //if (Math.abs(draggedCardAmount) >= 1  && xDraggedDistance < 0 && carouselPosition < productsList.length - productCardsAmount){
        //    let newCarouselPosition = carouselPosition - draggedCardAmount
        //    if (newCarouselPosition < 0) newCarouselPosition = 0
        //    else if (newCarouselPosition >= productsList.length - productCardsAmount) newCarouselPosition = productsList.length - productCardsAmount
        //    console.log(carouselPosition, newCarouselPosition)
//
        //    if (draggedCardAmount < 0 && carouselPosition === carouselLoadedPosition) setCarouselLoadedPosition(newCarouselPosition)//!
        //    setCarouselPosition(newCarouselPosition)
        //}
        //else if (Math.abs(draggedCardAmount) >= 1  && xDraggedDistance > 0 && carouselPosition > 0){
        //    let newCarouselPosition = carouselPosition - draggedCardAmount
        //    if (newCarouselPosition < 0) newCarouselPosition = 0
        //    else if (newCarouselPosition >= productsList.length - productCardsAmount) newCarouselPosition = productsList.length - productCardsAmount
        //    console.log(carouselPosition, newCarouselPosition)
//
        //    if (draggedCardAmount < 0 && carouselPosition === carouselLoadedPosition) setCarouselLoadedPosition(newCarouselPosition)//!
        //    setCarouselPosition(newCarouselPosition)
        //}
        //else carousel.current.style.left = `${-(productWidth + columnGap) * carouselPosition}px`
    }
    
    console.log("rerender new carouselPosition:",carouselPosition)
    return (
        <section className={styles.wrap}>
            <div style={{paddingLeft: `${padding}px`, paddingRight: `${padding}px`}} className={'container ' + styles.container}>
                <div className={styles.titleContainer}><h4>{sectionTitle}</h4></div>
                <div className={styles.chevron + " " + styles.chevronRight} onClick={arrowRightOnclick}><ArrowRightIcon/></div>
                <div className={styles.chevron + " " + styles.chevronLeft} onClick={arrowLeftOnclick}><ArrowLeftIcon/></div>
                <div className={styles.bodyContainer} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    <div ref={carousel} style={{columnGap:`${columnGap}px`, left : `${-(productWidth + columnGap) * carouselPosition}px`}} className={styles.body}>
                        {productsList.map((product, i)=> {
                            if (i < productCardsAmount + 1 + carouselLoadedPosition) {
                                return <div style={{width: `${productWidth}px`}} className={styles.productWrap} key={product.id}><ProductCard product={product} configurationObject={productConfigurationObject}/></div>
                            }
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}