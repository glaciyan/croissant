import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <>
            <div className={`testing`}>Testing string using custom component</div>
            <div className={`text-custom-color`}>Testing string with custom colors</div>
        </>
    );
};

export default Home;
