//pages/sitemap.xml.js

import { GetServerSideProps } from "next";
import {getJsonList, getUrls, RecipeInfo } from "@/service";

const URL = "https://conan.io"

function generateSiteMap(packages: RecipeInfo[]){
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the URLs we know already-->
     <url>
        <loc>${URL}/center</loc>
     </url>
     <url>
        <loc>${URL}/downloads</loc>
     </url>
     <url>
        <loc>${URL}/faq</loc>
     </url>
     <url>
        <loc>${URL}/privacy-policy</loc>
     </url>
     <url>
        <loc>${URL}/terms-conditions</loc>
     </url>
     <url>
        <loc>${URL}/tribe</loc>
     </url>
     <url>
        <loc>${URL}/user-stories</loc>
     </url>
     <url>
        <loc>${URL}/why-conan</loc>
     </url>
     
     ${packages
        .map( (x) => {
            // Be super robust against malformed entries, just in case,
            // as this file should always work
            return x.hasOwnProperty("name") ? 
                (`
                   <url>
                       <loc>${`${URL}/center/recipes/${x.name}`}</loc>
                   </url>
                `) : '';
        })
        .join('')}
   </urlset>
 `;
}

const SiteMap = () => {
    // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    // We make an API call to gather the URLs for our site
    let urls = getUrls({pattern: "all", topics: []})
    // TODO ineficient, we are requesting all the packages information, we should only get the names
    const packages = await getJsonList<RecipeInfo>(urls.search.package, urls.api.private);

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(packages.data);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
