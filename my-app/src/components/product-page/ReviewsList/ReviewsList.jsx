import PaginationButtons from "../../common-components/PaginationButtons/PaginationButtons";
import Review from "../Review/Review";
import styles from "./ReviewsList.module.css"

export default function ReviewsList () {
    return (
        <div>
            <Review feedback={{}}/>
            <Review feedback={{}}/>
            <Review feedback={{}}/>
            <PaginationButtons/>
        </div>
    );
}