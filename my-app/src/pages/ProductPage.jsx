import ReviewForm from "../components/product-page/ReviewForm/ReviewForm";
import ProductRating from "../components/product-page/product-rating/ProductRating.jsx";
import ReviewsList from "../components/product-page/ReviewsList/ReviewsList";
import { ProductOverview } from "../components/ProductOverview/ProductOverview.jsx";
import ProductDetails from "../components/product-page/ProductDetails/ProductDetails";

const ProductPage = () => {
  // feedbackList and some product rate just for tests
  const feedbackList = [
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "1Норм!",
      customerName: "Valeriy",
      id: 1,
      rate: 5,
    },
    {
      createdDate: "2024-12-31T17:17:14.270Z",
      text: "2Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 2,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "3Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "h",
      id: 3,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "4Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів. Його ергономічний дизайн інтуїтивно зрозумілий, а функціонал надзвичайно широкий. Одне з головних переваг — надійність у роботі, завдяки чому він стає невід'ємною частиною мого щоденного життя. Під час використання відчувається великий рівень комфорту та задоволення від результату.",
      customerName: "Valeriy Eduarddovuich",
      id: 4,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "5Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 5,
      rate: 1,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "6Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 6,
      rate: 2,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "7Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 7,
      rate: 4,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "8Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 8,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "9Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 9,
      rate: 2,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "10Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 11,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "11Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 12,
      rate: 4,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "12Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 13,
      rate: 3,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "13Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 14,
      rate: 4,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "14Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 15,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "15Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 16,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "16Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 17,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "17Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 18,
      rate: 4,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "18родукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 19,
      rate: 5,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "19Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 20,
      rate: 3,
    },
    {
      createdDate: "2024-01-01T17:17:14.270Z",
      text: "20Продукт, про який я хочу поділитися відгуком, вразив мене своєю унікальністю та високою якістю. Він вирізняється своєю інноваційністю та простотою використання, що робить його дуже привабливим для широкого кола користувачів.",
      customerName: "Valeriy Eduarddovuich",
      id: 21,
      rate: 5,
    },
  ];
  const rate = 3.9;
  // feedbackList just for tests
  return (
    <>
      <ProductOverview />
      <ProductDetails />
      <ProductRating feedbacks={feedbackList} rate={rate} />
      <ReviewsList feedbacks={feedbackList} />
      <ReviewForm />
    </>
  );
};

export default ProductPage;
