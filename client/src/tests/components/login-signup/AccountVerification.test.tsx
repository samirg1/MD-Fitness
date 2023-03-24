import { fireEvent, render, screen } from "@testing-library/react";
import AccountVerification from "../../../components/login-signup/AccountVerification";

const accountReturn: any[] = [{ sendConfirmationEmail: () => {} }];
const snackbarReturn: any[] = [{ setOptions: () => {} }];
const timerState = [120, (val: any) => (timerState[0] = val)];

jest.mock("../../../hooks/useAccount", () => () => accountReturn[0]);
jest.mock("../../../hooks/useSnackBar", () => () => snackbarReturn[0]);
jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: () => timerState,
}));

describe("testing button initial state and countdown", () => {
    test("initial state", () => {
        const { asFragment } = render(<AccountVerification email="test" />);
        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-mhc70k-MuiGrid-root"
  >
    <div
      class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-1ojf2vw-MuiGrid-root"
    >
      A confirmation link has been sent to 'test' to verify your account. Resend in 120 seconds.
    </div>
    <div
      class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-1fpckdt-MuiGrid-root"
    >
      <button
        class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium Mui-disabled Mui-focusVisible MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium css-zcbmsk-MuiButtonBase-root-MuiButton-root"
        disabled=""
        tabindex="-1"
        type="button"
      >
        Resend
      </button>
    </div>
  </div>
</DocumentFragment>
`);
    });

    test("after with 0 time left", () => {
        timerState[0] = 0;
        const { asFragment } = render(<AccountVerification email="test" />);
        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-mhc70k-MuiGrid-root"
  >
    <div
      class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-1ojf2vw-MuiGrid-root"
    >
      A confirmation link has been sent to 'test' to verify your account.
    </div>
    <div
      class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-1fpckdt-MuiGrid-root"
    >
      <button
        class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium css-zcbmsk-MuiButtonBase-root-MuiButton-root"
        tabindex="0"
        type="button"
      >
        Resend
      </button>
    </div>
  </div>
</DocumentFragment>
`);
    });
});

describe("resend buton", () => {
    test("does button fire confirm email function", async () => {
        const mockConfirmEmail = jest.fn(() => "");
        const mockSetOptions = jest.fn();
        accountReturn[0].sendConfirmationEmail = mockConfirmEmail;
        snackbarReturn[0] = { setOptions: mockSetOptions };
        timerState[0] = 0;
        render(<AccountVerification email="test" />);
        await fireEvent.click(screen.getByText("Resend"));
        expect(mockConfirmEmail).toBeCalledTimes(1);
        expect(mockConfirmEmail).lastCalledWith("test");
        expect(mockSetOptions).toBeCalledTimes(1);
        expect(mockSetOptions).lastCalledWith({
            message: "Confirmation email resent!",
            type: "success",
        });
    });

    test("confirm email throws", async () => {
        const mockConfirmEmail = jest.fn(() => "error");
        const mockSetOptions = jest.fn();
        accountReturn[0].sendConfirmationEmail = mockConfirmEmail;
        snackbarReturn[0] = { setOptions: mockSetOptions };
        timerState[0] = 0;
        render(<AccountVerification email="test" />);
        await fireEvent.click(screen.getByText("Resend"));
        expect(mockConfirmEmail).toBeCalledTimes(1);
        expect(mockConfirmEmail).lastCalledWith("test");
        expect(mockSetOptions).toBeCalledTimes(1);
        expect(mockSetOptions).lastCalledWith({
            message: "Unable to resend email : error",
            type: "error",
        });
    });
});
