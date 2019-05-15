<?php
/**
 * Created by PhpStorm.
 * User: crack
 * Date: 12.04.2019
 * Time: 11:49
 */

namespace App\Controller\Api;

use App\Entity\News;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class RSS extends AbstractController
{
    /**
     * @return Response
     */


    public function index(){

        $host = '84.201.147.3';  // Хост,
        $user = 'phpuser';    // Имя созданного вами пользователя
        $pass = 'phpAdmin1999'; // Установленный вами пароль пользователю
        $db_name = 'users';   // Имя базы данных
        $link = mysqli_connect($host, $user, $pass, $db_name); // Соединяемся с базой

        // Ругаемся, если соединение установить не удалось
        if (!$link) {
            print_r('Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error());
            exit;
        }


        $urlYandex = "http://news.yandex.ru/computers.rss";
        $urlIXBT = "https://www.ixbt.com/export/news.rss";
        $url4pda = "http://4pda.ru/feed/";


        $response = new Response();
        $response->headers->set('Content-Type', 'application/json', 'charset=utf-8');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $fileContents = file_get_contents($urlYandex);
        $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
        $fileContents = trim(str_replace('"', "'", $fileContents));
        $simpleXml = simplexml_load_string($fileContents);
//        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);

        foreach ($simpleXml ->channel -> item as $item){

            $json = array(
                "title" => $item->title,
                "link" => $item->link,
                "guid" => $item->guid,
                "description" => $item->description,
                "date" => $item->pubDate,

            );
            $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);

            $em = $this->getDoctrine()->getManager();

            $news = new News();

            $news->setTitle($item->title);
            $news->setLink($item->link);
            $news->setGuid($item->guid);
            $news->setDescription($item->description);
            $news->setDate($item->pubDate);
            $news->setNewsJSON($jsonEncode);
            $em->persist($news);

            $em->flush();
            $json = array();
       }
        mysqli_set_charset( $link, 'utf8');
        $sql = mysqli_query($link, 'SELECT news_json FROM news');
        while($result = mysqli_fetch_array($sql, MYSQLI_ASSOC)) {
            $resultAll['item'][] = $result['news_json'];
        }



        $response->setContent('['.implode(',', $resultAll['item']).']');


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
