import { render } from "@react-email/render";
import ConfirmEmail from "./ConfirmEmail";
import ConfirmResetPassword from "./ConfirmResetPassword";
import PurchaseConfirmation from "./PurchaseConfirmation";
import RequestResetPassword from "./RequestResetPassword";
import Welcome from "./Welcome";

export enum EmailType {
    welcome,
    requestResetPassword,
    confirmResetPassword,
    purchaseConfirmation,
    confirmEmail,
}

export const renderEmail = (type: EmailType) => {
    let email;

    switch (type) {
        case EmailType.welcome:
            email = <Welcome />;
            break;
        case EmailType.requestResetPassword:
            email = <RequestResetPassword />;
            break;
        case EmailType.confirmResetPassword:
            email = <ConfirmResetPassword />;
            break;
        case EmailType.purchaseConfirmation:
            email = <PurchaseConfirmation />;
            break;
        case EmailType.confirmEmail:
            email = <ConfirmEmail />;
            break;
    }

    return render(email).replaceAll('"', "'");
};
