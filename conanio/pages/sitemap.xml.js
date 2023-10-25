//pages/sitemap.xml.js

import {get_json_list, get_json_list_with_id, get_urls} from "../service/service";

const URL = "https://conan.io"

function generateSiteMap(packages) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
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
     
     
     <url>
        <loc>https://docs.conan.io</loc>
     </url>
     <url>
        <loc>https://blog.conan.io</loc>
     </url>
     
     ${packages
        .map( (x) => {
            return `
               <url>
                   <loc>${`${URL}/center/recipes/${x.name}`}</loc>
               </url>
             `;
        })
        .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    let urls = get_urls({search: "all", topics: []})
    const packages = await get_json_list(urls.search.package, urls.api.private);

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(packages);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
