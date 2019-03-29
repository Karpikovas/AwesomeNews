<?php
/**
 * Created by PhpStorm.
 * User: crack
 * Date: 22.03.2019
 * Time: 12:42
 */

namespace App\Controller;



use Symfony\Component\HttpFoundation\Response;

class RSS
{
    /**
     * @return Response
     */
    public function index(){
        $urlYandex = "http://news.yandex.ru/computers.rss";
        $urlIXBT = "https://www.ixbt.com/export/news.rss";
        $url4pda = "http://4pda.ru/feed/";
        $contentIXBT = file_get_contents($urlIXBT);
        $contentYandex = file_get_contents($urlYandex);
        $content4pda = file_get_contents($url4pda);

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $fileContents = file_get_contents($urlIXBT);
        $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
        $fileContents = trim(str_replace('"', "'", $fileContents));
        $simpleXml = simplexml_load_string($fileContents);
        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);


        $response->setContent($jsonfileIXBT);



        $this->getRSS2JSON($urlIXBT, "IXBT");
        $this->getRSS2JSON($url4pda, "4pda");
        $this->getRSS2JSON($urlYandex, "Yandex");


//
//        $itemsIXBT = new \SimpleXmlElement($contentIXBT);
//        $itemsYandex = new \SimpleXMLElement($contentYandex);
//        $items4pda = new \SimpleXMLElement($content4pda);


//        echo "<p>";
//        foreach($items4pda -> channel -> item as $item) {
//            echo "<li><a href = '$item->link}' title = '$item->title'>" .
//                $item->title . "</a> - " . $item->description . " - " . $item->pubDate . " - " . $item->category . "</li>";
//
//            $json['item'][] = array([
//                "title" => $item->title,
//                "link" => $item->link,
//                "description" => $item->description,
//                "date" => $item->pubDate,
//                "category" => $item->category
//            ]);
//        }
//        echo "</p>";
//
//        echo "<p>";
//        foreach($itemsIXBT -> channel -> item as $item) {
//            echo "<li><a href = '$item->link}' title = '$item->title'>" .
//                $item->title . "</a> - " . $item->description . " - " . $item->pubDate . " - " . $item->category . "</li>";
//
//            $json['item'][] = array([
//                "title" => $item->title,
//                "link" => $item->link,
//                "description" => $item->description,
//                "date" => $item->pubDate,
//                "category" => $item->category
//            ]);
//        }
//        echo "</p>";
//
//
//        echo "<p>";
//        foreach ($itemsYandex ->channel -> item as $item){
//            echo "<li><a href='$item->link}' title='$item->title'>" .
//                $item->title . "</a> - " . $item ->description . " - " . $item ->pubDate. " - ". $item->category."</li>";
//
//            $json['item'][] = array([
//                "title" => $item->title,
//                "link" => $item->link,
//                "description" => $item->description,
//                "date" => $item->pubDate,
//                "category" => $item->category
//            ]);
//
//
//        }
//        echo "</p>";
//
        return $response;
    }

    public function getRSS2JSON($url, $name){
        $fileContents = file_get_contents($url);
        $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
        $fileContents = trim(str_replace('"', "'", $fileContents));
        $simpleXml = simplexml_load_string($fileContents);
        $jsonfile = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);
        $filename = "$name.json";
        file_put_contents($filename, $jsonfile);


    }
}