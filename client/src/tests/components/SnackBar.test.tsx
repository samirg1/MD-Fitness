import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SnackBar from "../../components/SnackBar";

const returnValue: any[] = [
    {
        options: null,
        setOptions: () => console.log("hi"),
    },
];

jest.mock("../../hooks/useSnackBar", () => () => {
    return returnValue[0];
});

test("snackbar doesn't render when options are null", () => {
    const { asFragment } = render(<SnackBar />);
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
});

test("snackbar renders with correct options", () => {
    returnValue[0].options = {
        message: "hello",
        type: "info",
        duration: 2000,
    };
    const { asFragment } = render(<SnackBar />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="MuiSnackbar-root MuiSnackbar-anchorOriginTopCenter css-zzms1-MuiSnackbar-root"
    role="presentation"
  >
    <div
      class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-standardInfo MuiAlert-standard css-12nq6nx-MuiPaper-root-MuiAlert-root"
      direction="down"
      role="alert"
      style="opacity: 1; transform: scale(1, 1); transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"
    >
      <div
        class="MuiAlert-icon css-1ytlwq5-MuiAlert-icon"
      >
        <svg
          aria-hidden="true"
          class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1vooibu-MuiSvgIcon-root"
          data-testid="InfoOutlinedIcon"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path
            d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
          />
        </svg>
      </div>
      <div
        class="MuiAlert-message css-1pxa9xg-MuiAlert-message"
      >
        hello
      </div>
    </div>
  </div>
</DocumentFragment>
`);
});

describe("snackbar handles onclose events", () => {
    test("escape key", () => {
        const mockSetOptions = jest.fn();
        returnValue[0].setOptions = mockSetOptions;
        const { container } = render(<SnackBar />);
        fireEvent.keyDown(container, { key: "Escape", code: "Escape" });
        expect(mockSetOptions).toBeCalledTimes(1);
        expect(mockSetOptions.mock.calls[0][0]).toBeNull(); // setOptions(null) was called
    });

    test("timeout", () => {
        jest.useFakeTimers();
        const mockSetOptions = jest.fn();
        returnValue[0].setOptions = mockSetOptions;
        render(<SnackBar />);
        setTimeout(() => {
            expect(mockSetOptions).toBeCalledTimes(1);
            expect(mockSetOptions.mock.calls[0][0]).toBeNull(); // setOptions(null) was called
        }, 4000);
        act(() => jest.runAllTimers());
    });
});
