import { useEffect, useState } from "react";
import axios from "axios"
import config from "../../config.json";

export default function useFetch(url, method, body) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    console.log("url : ", url , "method : ", method, "body : ", body);
    
    useEffect(() => {
        (
            async function () {
                try {
                    const response = await axios({
                        method: method,
                        url: `${config.urlServer}api${url}`,
                        data: body
                    })
                    console.log(response)
                    setData(response.data)

                } catch (err) {
                    setError(err)
                }
            }
        )()
    }, [])

    return { data, error }
}