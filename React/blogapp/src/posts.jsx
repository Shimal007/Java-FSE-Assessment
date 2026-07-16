import React from "react";
import post from "./post";

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }
    loadPosts() {
        fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json()).then(data => {
            const postsList = data.map(item => new post(item.id, item.title, item.body));
            this.setState({ posts: postsList });
        }).catch(error => console.log(error));
    }


    componentDidMount() {
        this.loadPosts();
    }

    componentDidCatch(error, errorInfo) {
        alert("An error occurred in the Posts component: " + error.toString());
    }

    render() {
        return (
            <div>
                <h3>Posts</h3>
                {this.state.posts.map(p => (
                    <div key={p.id} className="post-item">
                        <h4>{p.title}</h4>
                        <p>{p.body}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Posts;
