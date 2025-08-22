
import EstyAccountForm from "./components/EtsyForm";
import ShipXanhAccountForm from "./components/ShipXanhForm";


export default function AccountConfig() {


    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6 flex flex-col gap-6">
                {/* Esty API Section */}
                <EstyAccountForm />

                {/* Ship Xanh Dashboard Account Section */}
               <ShipXanhAccountForm />
            </div>
        </div>
    );
}