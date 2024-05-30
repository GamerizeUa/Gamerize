import GamePicker from "../components/landing-page/GamePicker/GamePicker";
import ProductsCarousel from "../components/common-components/ProductsCarousel/ProductsCarousel";
import { QuestioningForm } from "../components/landing-page/QuestioningForm/QuestioningForm.jsx";
import { SelectionOfGames } from "../components/landing-page/SelectionOfGames/SelectionOfGames.jsx";
import { Banner } from "../components/landing-page/Banner/Banner.jsx";
import axios from "axios";
import {useLogoutClient} from "../components/hooks/useLogoutClient.js";

const HomePage = () => {
  const logoutClient = useLogoutClient();
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          logoutClient()
        }
        return Promise.reject(error);
      }
  );

  // productsList just for tests
  const productsList = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      <GamePicker />
      <ProductsCarousel
        productsList={productsList}
        carouselTitle={"Популярні товари"}
        productConfigurationObject={{
          isOldPrice: false,
          isDiscount: false,
          isCartView: false,
        }}
      />
      <ProductsCarousel
        productsList={productsList}
        carouselTitle={"Розпродаж"}
        productConfigurationObject={{
          isOldPrice: true,
          isDiscount: true,
          isCartView: false,
        }}
      />
      <Banner />
      <SelectionOfGames />
      <QuestioningForm />
    </>
  );
};

export default HomePage;
