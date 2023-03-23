import { render } from "@react-email/render";
import ConfirmEmail from "./ConfirmEmail";
import PurchaseConfirmation from "./PurchaseConfirmation";
import ResetPassword from "./ResetPassword";
import Welcome from "./Welcome";

export enum EmailType {
    welcome,
    resetPassword,
    purchaseConfirmation,
    confirmEmail,
}

export const renderEmail = (type: EmailType, props?: { [key: string]: string }) => {
    let email;

    switch (type) {
        case EmailType.welcome:
            email = <Welcome />;
            break;
        case EmailType.resetPassword:
            email = <ResetPassword />;
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
