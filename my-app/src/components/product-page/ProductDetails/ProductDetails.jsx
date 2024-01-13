import css from "./ProductDetails.module.css";
import Dropdown from "./Dropdown";

const fakeData = {
  characteristics: {
    playersQuantity: "2-6",
    age: "10+",
    gameTime: "30-240 хв",
    language: "Українська",
    category: "Стратегії",
    equipment: [
      "Ігрове поле",
      "240 жетонів",
      "108 жетонів валют",
      "72 видових карти",
      "50 карт джерел",
      "50 карт бункерів",
      "50 карт променевих веж",
      "Правила гри",
    ],
  },
  description:
    "Унаслідок ядерної війни планета перетворилася на розпечену пустелю, і тільки кілька підземних джерел видобувають найважливіший ресурс сучасного світу — воду. Люди, що вижили, об’єднуються в клани й борються за ресурси, які стрімко виснажуються. Лише притулки військових організацій, зроблені напередодні катастрофи, є надією на виживання, хоч і примарною…",
  returnPolicy:
    "Повернення товару можливе протягом 14 днів після покупки при збереженні упаковки та чека.",
};

const ProductDetails = () => {
  return (
    <section className="container">
      <div className={css.items}>
        <Dropdown title={"Xарактеристики"}>
          <div className={css.mainData}>
            <div className={css.charItem}>
              <p className={css.charName}>Кількість гравців</p>
              <p className={css.charData}>
                {fakeData.characteristics.playersQuantity}
              </p>
            </div>
            <div className={css.charItem}>
              <p className={css.charName}>Вік</p>
              <p className={css.charData}>{fakeData.characteristics.age}</p>
            </div>
            <div className={css.charItem}>
              <p className={css.charName}>Час гри</p>
              <p className={css.charData}>
                {fakeData.characteristics.gameTime}
              </p>
            </div>
            <div className={css.charItem}>
              <p className={css.charName}>Мова</p>
              <p className={css.charData}>
                {fakeData.characteristics.language}
              </p>
            </div>
            <div className={css.charItem}>
              <p className={css.charName}>Категорії</p>
              <p className={css.charData}>
                {fakeData.characteristics.category}
              </p>
            </div>
            <div className={css.charItem}>
              <div className={css.equipment}>
                <p className={css.charName}>Компектація</p>
                <ul className={css.charData}>
                  {fakeData.characteristics.equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Dropdown>
        <Dropdown title={"Опис"}>
          <p className={css.descrText}>{fakeData.description}</p>
        </Dropdown>
        <Dropdown title={"Умови повернення"}>
          <p className={css.descrText}>{fakeData.returnPolicy}</p>
        </Dropdown>
      </div>
    </section>
  );
};

export default ProductDetails;
