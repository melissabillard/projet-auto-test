import React from "react";
import { Helmet } from 'react-helmet';

export default function SEO({ canonical, title, description }) {

    const canonicalContent = `https://yogan.fr/${canonical}`

    return (
        <>
            <Helmet>
                <link rel="canonical" href={canonicalContent} />
                <title>{title}</title>
                <meta name="description" content={description} />
                {/* OG */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                {/* Twitter */}
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
            </Helmet>
        </>
    )
}