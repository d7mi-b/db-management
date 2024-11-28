import { useEffect, useState } from "react";
import { useMutation } from "react-query";

const usePost = (url: string) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [body, setBody] = useState<any>(null);

    useEffect(() => {
        console.log("body: ", body);
    }, [body])

    const post = useMutation(
        ['posts'],
        async () => {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then((response) => response.json())
            .then((data) => setResult(data))
            .catch((error) => setError(error))
        }
    )

    return { post, result, error, setBody };
}

export default usePost;