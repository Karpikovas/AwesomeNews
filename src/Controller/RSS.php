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
        $urlLenta = "http://lenta.ru/rss/news";
        $contentLenta = file_get_contents($urlLenta);
        $contentYandex = file_get_contents($urlYandex);

        $itemsLenta = new \SimpleXmlElement($contentLenta);
        $itemsYandex = new \SimpleXMLElement($contentYandex);



        foreach($itemsLenta -> channel -> item as $item) {
            echo  "<li><a href = '$item->link}' title = '$item->title'>" .
            $item->title . "</a> - " . $item -> description . "</li>";
        }
        echo "<p>";
        foreach ($itemsYandex ->channel -> item as $item){
            echo "<li><a href='$item->link}' title='$item->title'>" .
                $item->title . "</a> - " . $item ->description . "</li>";
        }
        echo "</p>";

        return new Response();
    }
}