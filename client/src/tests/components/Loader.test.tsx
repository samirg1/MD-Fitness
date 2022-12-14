import renderer from "react-test-renderer";
import Loader from "../../components/Loader";

test("loader shows when isLoading is true only", () => {
    const component = renderer.create(<Loader isLoading />);
    let tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`
<div
  className="animation-container"
>
  <span
    className="animating-letter animation-m"
  >
    M
  </span>
  <span
    className="animating-letter animation-d"
  >
    D
  </span>
  <div
    className="animation-word"
  >
    FITNESS
  </div>
</div>
`);

    component.update(<Loader isLoading={false} />);
    tree = component.toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
});
