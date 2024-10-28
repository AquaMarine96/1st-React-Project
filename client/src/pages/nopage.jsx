import { Link } from "react-router-dom";

function NoPage() {
    return (
        <>
            <h1>404</h1>
            <p>Page not found</p>
            <Link to = "/">Back to homepage</Link>
        </>
      );
}

export default NoPage;