import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <>
            <div className={`font-bold text-blue-600`}>
                <span>Testing string using custom component</span>
            </div>
            <div className={`text-custom-color`}>Testing string with custom colors</div>
        </>
    );
};

export default Home;
