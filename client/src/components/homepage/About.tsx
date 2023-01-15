import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HomeTitle from "./HomeTitle";

const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.
Mattis aliquam faucibus purus in massa. Neque convallis a cras
semper auctor neque. Vitae proin sagittis nisl rhoncus mattis
rhoncus urna neque viverra. Consectetur lorem donec massa sapien
faucibus et molestie. Lectus sit amet est placerat in egestas
erat imperdiet. Facilisi etiam dignissim diam quis enim lobortis
scelerisque fermentum. Augue interdum velit euismod in
pellentesque. Praesent semper feugiat nibh sed pulvinar. A cras
semper auctor neque vitae tempus quam. Auctor eu augue ut lectus
arcu bibendum at varius vel. Curabitur vitae nunc sed velit.
Sapien pellentesque habitant morbi tristique senectus et netus
et malesuada. Sit amet commodo nulla facilisi nullam vehicula
ipsum. Senectus et netus et malesuada fames ac turpis. Cras
tincidunt lobortis feugiat vivamus at augue eget arcu. Nibh sed
pulvinar proin gravida hendrerit. Tellus in hac habitasse
platea. Eu feugiat pretium nibh ipsum consequat nisl vel
pretium. Tellus mauris a diam maecenas sed enim. Non nisi est
sit amet facilisis magna etiam tempor orci. Augue interdum velit
euismod in pellentesque massa placerat duis ultricies.
Adipiscing commodo elit at imperdiet dui accumsan. Sed sed risus
pretium quam vulputate dignissim suspendisse in est.
Pellentesque diam volutpat commodo sed egestas egestas
fringilla. Dolor sed viverra ipsum nunc aliquet bibendum enim
facilisis. Tincidunt tortor aliquam nulla facilisi cras
fermentum odio. Molestie at elementum eu facilisis sed odio. Ac
feugiat sed lectus vestibulum mattis ullamcorper velit. Libero
justo laoreet sit amet cursus sit amet. Rhoncus dolor purus non
enim praesent elementum facilisis leo. At auctor urna nunc id
cursus metus aliquam eleifend mi. Libero id faucibus nisl
tincidunt. Gravida quis blandit turpis cursus. Volutpat ac
tincidunt vitae semper quis lectus nulla at. Diam ut venenatis
tellus in metus vulputate eu. Pharetra pharetra massa massa
ultricies mi. Fermentum leo vel orci porta non pulvinar neque
laoreet. Et sollicitudin ac orci phasellus egestas tellus. Dui
accumsan sit amet nulla facilisi morbi tempus iaculis urna.
Imperdiet dui accumsan sit amet nulla. Quis lectus nulla at
volutpat diam ut venenatis tellus in. Pretium aenean pharetra
magna ac. Libero id faucibus nisl tincidunt eget nullam non nisi
est. Nunc faucibus a pellentesque sit amet porttitor. Hac
habitasse platea dictumst quisque sagittis purus sit amet
volutpat.
`;

/**
 * The about component of the home page.
 */
const About = () => {
    return (
        <>
            <HomeTitle title={"ABOUT"} />
            <Grid item xs={6}>
                <Typography color="white">{text}</Typography>
            </Grid>
        </>
    );
};

export default About;
