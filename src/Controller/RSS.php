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
    public function index(){
        $urlYandex = "http://news.yandex.ru/computers.rss";
        $urlIXBT = "https://www.ixbt.com/export/news.rss";
        $url4pda = "http://4pda.ru/feed/";
        $contentIXBT = file_get_contents($urlIXBT);
        $contentYandex = file_get_contents($urlYandex);
        $content4pda = file_get_contents($url4pda);

        $filename = "XMLRSSIXBT.xml";
        $filenameY = "XMLRSSYandex.xml";
        $filename4pda = "XMLRSS4pda.xml";
        file_put_contents($filename, $contentIXBT);
        file_put_contents($filenameY, $contentYandex);
        file_put_contents($filename4pda, $content4pda);

        $itemsIXBT = new \SimpleXmlElement($contentIXBT);
        $itemsYandex = new \SimpleXMLElement($contentYandex);
        $items4pda = new \SimpleXMLElement($content4pda);


        echo "<p>";
        foreach($items4pda -> channel -> item as $item) {
            echo "<li><a href = '$item->link}' title = '$item->title'>" .
                $item->title . "</a> - " . $item->description . " - " . $item->pubDate . " - " . $item->category . "</li>";

            $json['item'][] = array([
                "title" => $item->title,
                "link" => $item->link,
                "description" => $item->description,
                "date" => $item->pubDate,
                "category" => $item->category
            ]);
        }
        echo "</p>";

        echo "<p>";
        foreach($itemsIXBT -> channel -> item as $item) {
            echo "<li><a href = '$item->link}' title = '$item->title'>" .
                $item->title . "</a> - " . $item->description . " - " . $item->pubDate . " - " . $item->category . "</li>";

            $json['item'][] = array([
                "title" => $item->title,
                "link" => $item->link,
                "description" => $item->description,
                "date" => $item->pubDate,
                "category" => $item->category
            ]);
        }
        echo "</p>";


        echo "<p>";
        foreach ($itemsYandex ->channel -> item as $item){
            echo "<li><a href='$item->link}' title='$item->title'>" .
                $item->title . "</a> - " . $item ->description . " - " . $item ->pubDate. " - ". $item->category."</li>";

            $json['item'][] = array([
                "title" => $item->title,
                "link" => $item->link,
                "description" => $item->description,
                "date" => $item->pubDate,
                "category" => $item->category
            ]);


        }
        echo "</p>";



        $response = new Response();
        $response->setContent(json_encode($json['item'], JSON_UNESCAPED_UNICODE));

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $filename = 'somefileRSS.json';

        file_put_contents($filename, $response);




        return new Response();
    }

//    public function getRSS($url){
//
//        $content = file_get_contents($url);
//
//        $filename = "XML" .$url.".xml";
//        file_put_contents($filename, $content);
//
//        $items = new \SimpleXmlElement($content);
//
//        echo "<p>";
//        foreach ($items ->channel -> item as $item){
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
//        $response = new Response();
//        $response->setContent(json_encode($json['item'], JSON_UNESCAPED_UNICODE));
//
//        $response->headers->set('Content-Type', 'application/json');
//        $response->headers->set('Access-Control-Allow-Origin', '*');
//
//        $filename = 'somefileRSS.json';
//
//        file_put_contents($filename, $response);
//    }
}