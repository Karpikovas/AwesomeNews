<?php
/**
 * Created by PhpStorm.
 * User: crack
 * Date: 22.03.2019
 * Time: 20:26
 */

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;

class RSS2JSON
{
    public function index(){

    $rss_url = 'https://www.itnews.com.au/RSS/rss.ashx';
    $api_endpoint = 'https://api.rss2json.com/v1/api.json?rss_url=';
    $data = file_get_contents($api_endpoint . urlencode($rss_url));



    $filename = "RSS2JSON.json";
    file_put_contents($filename, $data);



    return new Response($data);
    }


}