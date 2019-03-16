<?php
/**
 * Created by PhpStorm.
 * User: crack
 * Date: 08.03.2019
 * Time: 22:32
 */

namespace App\Controller;

use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpFoundation\Response;

class Parser{
//
//public function getContent($link)
//{
//// Get html remote text.
//    $html = file_get_contents($link);
//
//// Create new instance for parser.
//    $crawler = new Crawler(null, $link);
//    $crawler->addHtmlContent($html, 'UTF-8');
//
//// Get title text.
//    $title = $crawler->text();
//
////// If exist settings for teaser.
////    if (!empty(trim($parser->settings->teaser))) {
////        $teaser = $crawler->filter($parser->settings->teaser)->text();
////    }
//
////// Get images from page.
////    $images = $crawler->filter($parser->settings->image)->each(function (Crawler $node, $i) {
////        return $node->image()->getUri();
////    });
//
//// Get body text.
//    $bodies = $crawler->each(function (Crawler $node, $i) {
//        return $node->html();
//    });
//
//    $content = [
//        'link' => $link,
//        'title' => $title,
////        'images' => $images,
////        'teaser' => strip_tags($teaser),
//        'body' => $bodies
//    ];
//
//    return $content;


public function index()
{


    $baseEndPoint = 'https://www.4pda.ru';
    $blueRayPlayersCategory = '/2019/03/12/356380/';
//    $blueRayPlayersCategory = '/2019/03/12/356378/';
    $target = $baseEndPoint . '/' . $blueRayPlayersCategory;

// Crawler
    $crawler = new Crawler();
    $crawler->add(file_get_contents($target));

// Collect info
    $productsInfo = $crawler
        ->filter('body')
        ->each(function (Crawler $nodeCrawler) use ($baseEndPoint) {
            $content = $nodeCrawler->filter('.content')->text();
            $title = $nodeCrawler->filter('.product-detail')->filter('.description')->filter('h1')->text();
            $author = $nodeCrawler->filter('.product-detail')->filter('.name')->text();


            return ['title' => $title, 'author' =>$author, 'content' =>$content];
    })
    ;

// Here we have all needed information:

    $response = new Response();
    $response ->setContent(json_encode($productsInfo, JSON_UNESCAPED_UNICODE));

    $response->headers->set('Content-Type', 'application/json');

    $filename = 'somefile.json';
    $filenameNotJson = 'somefile.txt';
//записываем текст в файл
    file_put_contents($filename, $response);

    $data = serialize($productsInfo);
    file_put_contents($filenameNotJson, $data);

    return $response;

}
}
