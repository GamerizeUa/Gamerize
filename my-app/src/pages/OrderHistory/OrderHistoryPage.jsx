import { PersonalOffice } from '@/components/PersonalOfficeTabs/PersonalOffice.jsx';
import OrderHistory from './OrderHistory.jsx';
import useScrollToTop from "@/hooks/useScrollToTop.js";

export default function OrderHistoryPage() {
    useScrollToTop();

    return (
        <div>
            <PersonalOffice />
            <OrderHistory />
        </div>
    );
}
