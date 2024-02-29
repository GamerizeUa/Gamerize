import { useEffect, useState, useRef } from "react";
import styles from "./ProductsCarousel.module.css";
import ProductCard from "../ProductCard/ProductCard";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

// This carousel is considered to work with 10 product cards in total. 4 of them are viewed at once in the desctop website, 3 on the tablet and 2 in mobile version.
export default function ProductsCarousel({
  productsList,
  carouselTitle,
  productConfigurationObject,
}) {
  let [windowWidth, setWindowWidth] = useState(null); // !! in future it can become a global redux state to check screen width in any component when needed in js
  let [carouselPosition, setCarouselPosition] = useState(0);
  //!let [carouselLoadedPosition, setCarouselLoadedPosition] = useState(0); // carouselPosition that is never decreased to save already loaded products in DOM
  const carousel = useRef(null); // carousel html element

  const limitedWindowWidth = windowWidth < 1440 ? windowWidth : 1440; // width limited by website max-width 1440px
  const productCardsAmount =
    limitedWindowWidth < 744 ? 2 : limitedWindowWidth < 1280 ? 3 : 4; // visible cards amount in the carousel depending on mobile/tablet/desctop versions
  const padding =
    limitedWindowWidth < 744 ? 16 : limitedWindowWidth < 1280 ? 32 : 80;
  const productWidth =
    ((limitedWindowWidth - 2 * padding) * 0.235 * 4) / productCardsAmount; // productWidth in px
  const columnGap =
    (limitedWindowWidth - 2 * padding - productCardsAmount * productWidth) /
    (productCardsAmount - 1); // gap between products in px

  const oneCardTotalWidth = productWidth + columnGap; // width to swipe through one product card
  const boundaryRightCarouselPosition =
    productsList.length - productCardsAmount; // add it everywhere

  useEffect(() => {
    setWindowWidth(document.documentElement.clientWidth);
    window.addEventListener("resize", function () {
      setWindowWidth(document.documentElement.clientWidth); // !! in future it can be proceeded, for example, in Layout for global redux state
    });
  }, []);

  // There are carousel motion functions,when arrow buttons are clicked, below
  function positionLimitBreakingBehavior(boundaryPosition) {
    // behavior when border is reached, but button is anyway clicked
    carousel.current.style.transform = `translateX(${
      -oneCardTotalWidth * (boundaryPosition + (boundaryPosition ? 0.3 : -0.3))
    }px)`; // take a position a bit further than border
    setTimeout(() => {
      carousel.current.style.transform = `translateX(${
        -oneCardTotalWidth * boundaryPosition
      }px)`; // take default position in some time
    }, 200);
  }
  function arrowRightOnclick() {
    // proceed to go right
    if (carouselPosition < boundaryRightCarouselPosition) {
      // if right border is not already reached, go right
      //!if (carouselPosition === carouselLoadedPosition)
      //!  setCarouselLoadedPosition(++carouselLoadedPosition); //carouselLoadedPosition can only be increased when it`s value is synchronized with carouselPosition
      setCarouselPosition(++carouselPosition);
    } // else show animation that border is already reached
    else positionLimitBreakingBehavior(boundaryRightCarouselPosition);
  }
  function arrowLeftOnclick() {
    // proceed to go left
    if (carouselPosition > 0) setCarouselPosition(--carouselPosition);
    // if boundary left position is not already reached, go left
    else positionLimitBreakingBehavior(0); // else show animation that border is already reached
  }

  // There is all swipe logic below
  let touchStartX; // every swipe initial coordinate
  let touchStartY; // every swipe initial coordinate
  let lastTouchX; // last swipe process X coordinate
  let xDraggedDistance; // Difference between current swipe process X coordinate and touchStartX. Sign of this variable shows swipe direction too
  let draggedCardFloatAmount; // calculated float amount of swiped product cards. Sign of this variable shows swipe direction too

  function handleTouchStart(e) {
   touchStartX = lastTouchX = e.touches[0].clientX; // record touchStartX, touchStartY and first current lastTouchX
   touchStartY = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
   const currentTouchX = e.touches[0].clientX; //current swipe process X coordinate
   xDraggedDistance = currentTouchX - touchStartX; // sign of this variable shows swipe direction too
   if (
     Math.abs(xDraggedDistance) > Math.abs(e.touches[0].clientY - touchStartY)
   ) {
     // if window is swiped more horisontally (carousel swipe) than vertically (page swipe)

     draggedCardFloatAmount = xDraggedDistance / oneCardTotalWidth;

     if (
       carouselPosition - draggedCardFloatAmount < 0 ||
       carouselPosition - draggedCardFloatAmount >
         boundaryRightCarouselPosition
     ) {
       // if borders were overcome, take a position a bit further than border
       carousel.current.style.transform = `translateX(${
         -oneCardTotalWidth *
         (xDraggedDistance > 0 ? -0.3 : boundaryRightCarouselPosition + 0.3)
       }px)`;
     } else
       carousel.current.style.transform = `translateX(${
         parseFloat(carousel.current.style.transform) + (currentTouchX - lastTouchX)
       }px)`; // else move carousel as much as it was swiped

     lastTouchX = currentTouchX; // record current touch as last
   }
  }

  function handleTouchEnd() {
   const draggedCardAmount = Math.round(draggedCardFloatAmount); // get integer of swiped product cards. Sign of this variable still shows swipe direction too

   if (Math.abs(draggedCardAmount) >= 1) {
     // if carousel is swiped on 1 or more cards, rerender is probably needed
     let newCarouselPosition = carouselPosition - draggedCardAmount; // calculate new carousel position, without taking into account potential border overcome
     if (newCarouselPosition < 0)
       newCarouselPosition = 0; // taking into account potential border overcome
     else if (newCarouselPosition >= boundaryRightCarouselPosition)
       newCarouselPosition = boundaryRightCarouselPosition; //taking into account potential border overcome

     //!if (draggedCardAmount < 0 && carouselPosition === carouselLoadedPosition)
     //!  setCarouselLoadedPosition(newCarouselPosition); //carouselLoadedPosition can only be increased when it`s value is synchronized with carouselPosition

     if (newCarouselPosition === carouselPosition)
       carousel.current.style.transform = `translateX(${
         -oneCardTotalWidth * carouselPosition
       }px)`;
     // for the first and the last product card to take default position after taking a position a bit further than border when borders were overcome
     else setCarouselPosition(newCarouselPosition);
   } else
     carousel.current.style.transform = `translateX(${
       -oneCardTotalWidth * carouselPosition
     }px)`; //if carousel isn`t swiped on 1 or more cards, carousel should fix its visual position
  }

  return (
    <section className={styles.wrap}>
      <div
        style={{ paddingLeft: `${padding}px`, paddingRight: `${padding}px` }}
        className={styles.container}
      >
        <div className={styles.titleContainer}>
          <h4>{carouselTitle}</h4>
        </div>
        {limitedWindowWidth < 1280 || (
          <>
            <div
              className={styles.chevron + " " + styles.chevronRight}
              onClick={arrowRightOnclick}
            >
              <ArrowRightIcon />
            </div>
            <div
              className={styles.chevron + " " + styles.chevronLeft}
              onClick={arrowLeftOnclick}
            >
              <ArrowLeftIcon />
            </div>
          </>
        )}
        <div
          className={styles.bodyContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={carousel}
            style={{
              columnGap: `${columnGap}px`,
              transform: `translateX(${-oneCardTotalWidth * carouselPosition}px)`
            }}
            className={styles.body}
          >
            {productsList.map((product, i) => {
              if (i < carouselPosition) return <div
                    style={{ width: `${productWidth}px` }}
                    className={styles.productWrap}
                    key={product.id}
                  ></div>
              else if (i < productCardsAmount + carouselPosition) {
                // return only products in amount shown on the screen + one unviewed behind the screen + all already loaded and saved in DOM behind the screen
                return (
                  <div
                    style={{ width: `${productWidth}px` }}
                    className={styles.productWrap}
                    key={product.id}
                  >
                    <ProductCard
                      product={product}
                      configurationObject={productConfigurationObject}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
