import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersistentLogin from "../../components/PersistentLogin";

const authenticationReturn: any[] = [{ authentication: null }];
const refresh: any[] = [() => {}];

jest.mock("../../hooks/useAuthentication", () => () => {
    return authenticationReturn[0];
});

jest.mock("../../hooks/useRefreshToken", () => () => {
    return refresh[0];
});

test("should show loader to start, then show child route", async () => {
    const { asFragment } = render(
        <BrowserRouter>
            <Routes>
                <Route element={<PersistentLogin />}>
                    <Route path="/" element={<div>hi</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="animation-container"
  >
    <span
      class="animating-letter animation-m"
    >
      M
    </span>
    <span
      class="animating-letter animation-d"
    >
      D
    </span>
    <div
      class="animation-word"
    >
      FITNESS
    </div>
  </div>
</DocumentFragment>
`);
    await waitFor(() => expect(screen.queryByText("FITNESS")).toBeNull());
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    hi
  </div>
</DocumentFragment>
`);
});

describe("useEffect", () => {
    test("refresh called when authentication is null", async () => {
        const mockRefresh = jest.fn();
        refresh[0] = mockRefresh;
        render(<PersistentLogin />);
        await waitFor(() => expect(screen.queryByText("FITNESS")).toBeNull());
        expect(mockRefresh).toBeCalledTimes(1);
        expect(mockRefresh).lastCalledWith();
    });

    test("refresh not called when authentication is not null", async () => {
        const mockRefresh = jest.fn();
        refresh[0] = mockRefresh;
        authenticationReturn[0] = {
            authentication: { accessToken: "some access token" },
        };
        render(<PersistentLogin />);
        await waitFor(() => expect(screen.queryByText("FITNESS")).toBeNull());
        expect(mockRefresh).not.toBeCalled();
    });
});
