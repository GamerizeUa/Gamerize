import Favourites from "../components/Favourites/Favourites.jsx";
import {NavigationTabs} from "../components/common-components/NavigationTabs/NavigationTabs.jsx";

export default function FavoritePage() {
  return (
    <div>
      <NavigationTabs />
      <Favourites/>
    </div>
  );
}
