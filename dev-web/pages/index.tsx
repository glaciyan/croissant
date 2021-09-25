import React from "react";
import { Layout } from "../components/Layout";
import { MediumPage } from "../components/MediumPage";

const Home: React.FC = () => {
    return (
        <Layout title={`Home`} currentPageName={`Home`}>
            <MediumPage>
                <div className={``}>Hello world!</div>
            </MediumPage>
        </Layout>
    );
};

export default Home;
