import react from "react"
import post from "./post"
class Posts extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }
    componentDidMount() {
        // Fetch posts from JSONPlaceholder
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .then(response => response.json())
            .then(data => this.setState({ posts: data }))
            .catch(error => console.error('Error fetching posts:', error));
    }
    render() {
        return (
            <div>
                <h3>Posts</h3>
                {this.state.posts.map(post => (
                    <post key={post.id} post={post} />
                ))}
            </div>
        );
    }
}
export default Posts;
