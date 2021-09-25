import React from "react";
import {Layout} from "../components/Layout";
import {MediumPage} from "../components/MediumPage";
import useSWR from "swr";
import {PostDto} from "../types/postDto";
import axios from "axios";

const fetcher = (url: string) =>
    axios.get(`http://localhost/${url}`).then((res) => res.data);

const Home: React.FC = () => {
    const posts = useSWR<PostDto[]>("api/post", fetcher);

    return (
        <Layout title={`Home`} currentPageName={`Home`}>
            <MediumPage>
                <h1 className={`underline text-lg`}>Posts</h1>
                {posts.data?.map((post) => (
                    <div key={post.id}>
                        <span className={`font-bold`}>
                            {post.title}
                            {`: `}
                        </span>
                        {post.content}
                    </div>
                ))}
            </MediumPage>
        </Layout>
    );
};

export default Home;
