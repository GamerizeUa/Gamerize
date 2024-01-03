import GamePicker from "../components/product-page/GamePicker/GamePicker";
import ProductsCarousel from "../components/ProductsCarousel/ProductsCarousel";
import {QuestioningForm} from "@/components/landing-page/QuestioningForm/QuestioningForm.jsx";
import {SelectionOfGames} from "@/components/landing-page/SelectionOfGames/SelectionOfGames.jsx";
import {Banner} from "@/components/landing-page/Banner/Banner.jsx";

const HomePage = () => {
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
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
      photo:
        "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
    },
    //{id : 21231, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    //{id : 31241, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    //{id : 41251, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
    //{id : 51261, discount : 20, name : "Дюна імперіум", minPlayers : 4, maxPlayers : 6, minAge : 16 , price : 2250, oldPrice: 2812, gameTimeMinutes : 80, photo : "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"},
  ];
  // productsList just for tests
  
  return (
  <>
    <GamePicker/>
    <ProductsCarousel productsList={productsList} carouselTitle={'Популярні товари'} productConfigurationObject={{isOldPrice : false, isDiscount : false, isCartView : false}}/>
    <ProductsCarousel productsList={productsList} carouselTitle={'Розпродаж'} productConfigurationObject={{isOldPrice : true, isDiscount : true,isCartView : false}}/>
    <Banner />
    <SelectionOfGames />
    <QuestioningForm />
  </>
  )
}

export default HomePage;
