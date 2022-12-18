import { fireEvent, render, screen } from "@testing-library/react";
import Field, { FieldType } from "../../../components/login-signup/Field";

describe("rendering with proper types", () => {
    const setup = (type: FieldType) => {
        const { asFragment } = render(
            <Field
                name="test"
                value="some value"
                setValue={() => {}}
                disabled={false}
                type={type}
            />
        );
        return asFragment;
    };

    test("render a text field", () => {
        const asFragment = setup(FieldType.text);
        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <p
    class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"
  >
    test
  </p>
  <div
    class="MuiFormControl-root css-1nrlq1o-MuiFormControl-root"
  >
    <div
      aria-label="Maximum 50 characters"
      class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root"
      data-mui-internal-clone-element="true"
    >
      <input
        aria-invalid="false"
        class="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
        type="text"
        value="some value"
      />
      <fieldset
        aria-hidden="true"
        class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
      >
        <legend
          class="css-ihdtdm"
        >
          <span
            class="notranslate"
          >
            ​
          </span>
        </legend>
      </fieldset>
    </div>
  </div>
</DocumentFragment>
`);
    });

    test("render password field", () => {
        const asFragment = setup(FieldType.password);
        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <p
    class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"
  >
    test
  </p>
  <div
    class="MuiFormControl-root css-1nrlq1o-MuiFormControl-root"
  >
    <div
      aria-label="Minimum 8 characters with a lowercase and uppercase letter, a number and a symbol"
      class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary Mui-error MuiInputBase-formControl MuiInputBase-adornedEnd css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root"
      data-mui-internal-clone-element="true"
    >
      <input
        aria-invalid="true"
        class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd css-nxo287-MuiInputBase-input-MuiOutlinedInput-input"
        type="password"
        value="some value"
      />
      <div
        class="MuiInputAdornment-root MuiInputAdornment-positionEnd MuiInputAdornment-outlined MuiInputAdornment-sizeMedium css-1laqsz7-MuiInputAdornment-root"
      >
        <button
          class="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeMedium css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root"
          tabindex="0"
          type="button"
        >
          <svg
            aria-hidden="true"
            class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
            data-testid="VisibilityIcon"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            />
          </svg>
          <span
            class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
          />
        </button>
      </div>
      <fieldset
        aria-hidden="true"
        class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
      >
        <legend
          class="css-ihdtdm"
        >
          <span
            class="notranslate"
          >
            ​
          </span>
        </legend>
      </fieldset>
    </div>
  </div>
</DocumentFragment>
`);
    });

    test("render email field", () => {
        const asFragment = setup(FieldType.email);
        expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <p
    class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"
  >
    test
  </p>
  <div
    class="MuiFormControl-root css-1nrlq1o-MuiFormControl-root"
  >
    <div
      aria-label="Enter a valid email"
      class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary Mui-error MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root"
      data-mui-internal-clone-element="true"
    >
      <input
        aria-invalid="true"
        class="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
        type="email"
        value="some value"
      />
      <fieldset
        aria-hidden="true"
        class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
      >
        <legend
          class="css-ihdtdm"
        >
          <span
            class="notranslate"
          >
            ​
          </span>
        </legend>
      </fieldset>
    </div>
  </div>
</DocumentFragment>
`);
    });
});

describe("field functionality", () => {
    test("toggle visibility", () => {
        render(
            <Field
                name="test"
                value="some value"
                setValue={() => {}}
                disabled={false}
                type={FieldType.password}
            />
        );
        expect(screen.getByRole("button").innerHTML).toMatch(/"VisibilityIcon"/);
        fireEvent.click(screen.getByRole("button"));
        expect((screen.getByRole("textbox") as HTMLInputElement).type).toEqual("text");
        expect(screen.getByRole("button").innerHTML).toMatch(/"VisibilityOffIcon"/);
    });

    test("field change value", () => {
        const mockSetValue = jest.fn();
        render(
            <Field
                name="test"
                value="some value"
                setValue={mockSetValue}
                disabled={false}
                type={FieldType.text}
            />
        );

        fireEvent.change(screen.getByRole("textbox"), {target: {value: 'testChange'}});
        expect(mockSetValue).toBeCalledTimes(1);
        expect(mockSetValue).lastCalledWith('testChange');
    });
});
