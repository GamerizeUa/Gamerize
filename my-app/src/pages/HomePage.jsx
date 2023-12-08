import GamePicker from "../components/GamePicker/GamePicker";
import ProductsCarousel from "../components/ProductsCarousel/ProductsCarousel";
import {QuestioningForm} from "@/components/landing-page/QuestioningForm/QuestioningForm.jsx";
import {SelectionOfGames} from "@/components/landing-page/SelectionOfGames/SelectionOfGames.jsx";
import {Banner} from "@/components/landing-page/Banner/Banner.jsx";
import ProductRating from "../components/product-page/ProductRating/ProductRating";

const HomePage = () => {
  // productsList just for tests
  const productsList = [
    {id : 12111, discount : 20, name : "Дюна імперіум1", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 12122, discount : 20, name : "Дюна імперіум2", minPlayers : 4, maxPlayers : null, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 12133, discount : 20, name : "Дюна імперіум3", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 12144, discount : 20, name : "Дюна імперіум4", minPlayers : 4, maxPlayers : null, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 12155, discount : 20, name : "Дюна імперіум5", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 12166, discount : 20, name : "Дюна імперіум6", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 12177, discount : 20, name : "Дюна імперіум7", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 12188, discount : 20, name : "Дюна імперіум8", minPlayers : 4, maxPlayers : null, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 12199, discount : 20, name : "Дюна імперіум9", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    {id : 11221, discount : 20, name : "Дюна імперіум10", minPlayers : 4, maxPlayers : null, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    //{id : 21231, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    //{id : 31241, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    //{id : 41251, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    //{id : 51261, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
  ]
  // productsList just for tests
  // feedbackList and some product rate just for tests
  const feedbackList = [
    {rate: 5},
    {rate: 5},
    {rate: 5},
    {rate: 5},
    {rate: 1},
    {rate: 2},
    {rate: 4},
    {rate: 5},
    {rate: 2},
    {rate: 5},
    {rate: 4},
    {rate: 3},
    {rate: 4},
    {rate: 5},
    {rate: 5},
    {rate: 5},
    {rate: 4},
    {rate: 5},
    {rate: 3},
    {rate: 5},
  ]
  const rate = 3.9
  // feedbackList just for tests
  return (
  <>
    {/* <GamePicker/> */}
    {/* <ProductsCarousel productsList={productsList} carouselTitle={'Популярні товари'} productConfigurationObject={{isOldPrice : false, isDiscount : false, isCartView : false}}/> */}
    {/* <ProductsCarousel productsList={productsList} carouselTitle={'Розпродаж'} productConfigurationObject={{isOldPrice : true, isDiscount : true,isCartView : false}}/> */}
    {/* <Banner /> */}
    <ProductRating feedbacks={feedbackList} rate={rate}/>
    {/* <SelectionOfGames /> */}
    {/* <QuestioningForm /> */}
  </>
  )
}

export default HomePage
