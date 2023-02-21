import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginSignup from "../../../components/login-signup/LoginSignup";

const keyDownReturn: any[] = [() => {}];
const accountReturn: any[] = [
    {
        signup: () => {},
        login: () => {},
    },
];
const snackbarReturn: any[] = [{ setOptions: () => {} }];

jest.mock("../../../hooks/useKeyDownHandler", () => () => keyDownReturn[0]);
jest.mock("../../../hooks/useSnackBar", () => () => snackbarReturn[0]);
jest.mock("../../../hooks/useAccount", () => () => accountReturn[0]);
jest.mock("../../../components/login-signup/AccountVerification", () => () => (
    <div>Verify</div>
));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => {
        return { state: undefined };
    },
    useNavigate: () => {
        return () => {};
    },
}));

describe("basic renders", () => {
    test("intial render", () => {
        const { asFragment } = render(<LoginSignup />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("check toggle button", () => {
        render(<LoginSignup />);
        expect(screen.queryByText("Enter name:")).toBeFalsy();
        expect(
            (screen.getByText("Sign Up") as HTMLButtonElement).disabled
        ).toEqual(false);
        expect(
            (screen.getByText("Login") as HTMLButtonElement).disabled
        ).toBeTruthy();
        fireEvent.click(screen.getByText("Sign Up"));
        expect(screen.getByText("Enter name:")).toBeTruthy();
        expect(
            (screen.getByText("Sign Up") as HTMLButtonElement).disabled
        ).toBeTruthy();
        expect(
            (screen.getByText("Login") as HTMLButtonElement).disabled
        ).toEqual(false);
    });

    test("error message shows and clears", async () => {
        const mockLogin = jest.fn((obj) => "testError");
        accountReturn[0].login = mockLogin;

        render(<LoginSignup />);
        const submitButton = screen.getAllByRole("button")[3];

        fireEvent.click(submitButton);
        await screen.findByText("testError");

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "a" } });

        await waitFor(() =>
            expect(screen.queryByText("testError")).toBeFalsy()
        );
    });
});
