import { render } from "@testing-library/react";
import RequireAuthentication from "../../components/RequireAuthentication";

const authReturn: any[] = [{ authentication: null }];
const snackBarReturn: any[] = [{ setOptions: () => {} }];

jest.mock("../../hooks/useAuthentication", () => () => authReturn[0]);
jest.mock("../../hooks/useSnackBar", () => () => snackBarReturn[0]);

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => {},
    Navigate: ({ to }: { to: string }) => {
        return <div>{to}</div>;
    },
    Outlet: () => <div>Inside auth</div>,
}));

describe("navigation", () => {
    const setup = (authState: object) => {
        authReturn[0] = authState;
        const { asFragment } = render(
            <RequireAuthentication permissions={[2]} />
        );
        return asFragment;
    };

    test("get sent inside auth", () => {
        const asFragment = setup({
            authentication: { permissions: [2] },
        });
        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    Inside auth
  </div>
</DocumentFragment>
`);
    });

    test("get sent to unauthorised", () => {
        const asFragment = setup({
            authentication: { permissions: [3] },
        });
        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    /unauthorised
  </div>
</DocumentFragment>
`);
    });

    test("get sent to login-signup with snackbar", () => {
        const mockSetSnackBar = jest.fn();
        snackBarReturn[0] = { setOptions: mockSetSnackBar };
        const asFragment = setup({ authentication: null });
        expect(mockSetSnackBar).toBeCalledTimes(1);
        expect(mockSetSnackBar).lastCalledWith({
            message: "You must be logged in to view this page.",
            type: "info",
        });
        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    /login-signup
  </div>
</DocumentFragment>
`);
    });
});
