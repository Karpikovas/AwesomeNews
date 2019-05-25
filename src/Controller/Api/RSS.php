<?php
/**
 * Created by PhpStorm.
 * User: crack
 * Date: 12.04.2019
 * Time: 11:49
 */

namespace App\Controller\Api;

use App\Entity\News;
use App\Entity\NewsIT;
use App\Entity\NewsSociety;
use App\Entity\NewsWorld;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;


class RSS extends AbstractController
{
    /**
     * @return Response
     */


    public function index(Request $request){

//        $host = 'localhost';  // Хост,
//        $user = 'cracksasha';    // Имя созданного вами пользователя
//        $pass = 'SASHA1999'; // Установленный вами пароль пользователю
//        $db_name = 'users';   // Имя базы данных
        $host = '130.193.44.202';  // Хост,
        $user = 'awesome';    // Имя созданного вами пользователя
        $pass = 'awesome1999'; // Установленный вами пароль пользователю
        $db_name = 'users';   // Имя базы данных

        $link = mysqli_connect($host, $user, $pass, $db_name); // Соединяемся с базой

        // Ругаемся, если соединение установить не удалось
        if (!$link) {
            print_r('Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error());
            exit;
        }



        $category = $request->query->get('category');
        $dateNewest = $request->query->get('dateNew');
        $dateOldest = $request->query->get('dateOld');


        $dNew = strtotime($dateNewest);
        $dOld = strtotime($dateOldest);
        $dNew = date('d M Y', $dNew);
        $dOld = date('d M Y', $dOld);

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json', 'charset=utf-8');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        if ($category == 'IT') {

            $urlYandexIT = "http://news.yandex.ru/computers.rss";
//        $urlIXBT = "https://www.ixbt.com/export/news.rss";
//        $url4pda = "http://4pda.ru/feed/";



            $fileContents = file_get_contents($urlYandexIT);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);
////        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);
//
            foreach ($simpleXml->channel->item as $item) {
                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,
                    "category" => $category
                );
                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);
                mysqli_set_charset($link, 'utf8');
                $sql = mysqli_query($link, "select title from news_it where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_it (title, link, guid, description, date, news_json, category)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode', '$category' )");
                }else{
                    continue;
                }

//                $jsonEncode = mysqli_real_escape_string($link, $jsonEncode);
//                $sql = mysqli_query($link, 'INSERT into News (New_ID, New, Title, Link, Guild, DescriptonNews, PubDate) values ('.$i.' ,'.$jsonEncode.', '.$item->title.', '.$item->link.', '.$item->guid.', '.$item->description.', '.$item->pubDate.')');
//                if ($sql == true){
//                    echo "Информация занесена в базу данных";
//                }else{
//                    print_r(mysqli_error($link));
//                }

//                $em = $this->getDoctrine()->getManager();
//
//                $news = new NewsIT();
//
//                $news->setTitle($item->title);
//                $news->setLink($item->link);
//                $news->setGuid($item->guid);
//                $news->setDescription($item->description);
//                $news->setDate($item->pubDate);
//                $news->setNewsJSON($jsonEncode);
//                $em->persist($news);
//
//                $em->flush();
//                $json = array();
            }
            mysqli_set_charset($link, 'utf8');
            $sql = mysqli_query($link, "Select news_json from news_it  where date between '$dOld' and '$dNew' order by date desc ");
//            file_put_contents('mysql.txt', $sql);

            while ($result = mysqli_fetch_array($sql, MYSQLI_ASSOC)) {
                $resultAll['item'][] = $result['news_json'];
            }
            $response->setContent('[' . implode(',', $resultAll['item']) . ']');

        }
        elseif ($category == 'world'){
            $urlYandexWorld = "https://news.yandex.ru/world.rss";
//        $urlIXBT = "https://www.ixbt.com/export/news.rss";
//        $url4pda = "http://4pda.ru/feed/";



            $fileContents = file_get_contents($urlYandexWorld);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);
////        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);
//
            foreach ($simpleXml->channel->item as $item) {

                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,
                    "category" => $category
                );
                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);
                mysqli_set_charset($link, 'utf8');
                $sql = mysqli_query($link, "select title from news_world where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_world (title, link, guid, description, date, news_json, category)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode', '$category' )");
                }else{
                    continue;
                }

//                $em = $this->getDoctrine()->getManager();
//
//                $news = new NewsWorld();
//
//                $news->setTitle($item->title);
//                $news->setLink($item->link);
//                $news->setGuid($item->guid);
//                $news->setDescription($item->description);
//                $news->setDate($item->pubDate);
//                $news->setNewsJSON($jsonEncode);
//                $em->persist($news);
//
//                $em->flush();
//                $json = array();
            }
            mysqli_set_charset($link, 'utf8');
            $sql = mysqli_query($link, "Select news_json from news_world  where date between '$dOld' and '$dNew' order by date desc ");
            while ($result = mysqli_fetch_array($sql, MYSQLI_ASSOC)) {
                $resultAll['item'][] = $result['news_json'];
            }


            $response->setContent('[' . implode(',', $resultAll['item']) . ']');

        }
        elseif ($category == 'society'){
            $urlYandexSociety = "https://news.yandex.ru/society.rss";

            $fileContents = file_get_contents($urlYandexSociety);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);
////        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);
//
            foreach ($simpleXml->channel->item as $item) {

                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,
                    "category" => $category
                );
                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);
                mysqli_set_charset($link, 'utf8');
                $sql = mysqli_query($link, "select title from news_society where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_society (title, link, guid, description, date, news_json, category)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode', '$category' )");
                }else{
                    continue;
                }

//                $em = $this->getDoctrine()->getManager();
//
//                $news = new NewsSociety();
//
//                $news->setTitle($item->title);
//                $news->setLink($item->link);
//                $news->setGuid($item->guid);
//                $news->setDescription($item->description);
//                $news->setDate($item->pubDate);
//                $news->setNewsJSON($jsonEncode);
//                $em->persist($news);
//
//                $em->flush();
//                $json = array();
            }
            mysqli_set_charset($link, 'utf8');
            $sql = mysqli_query($link, "Select news_json from news_society  where date between '$dOld' and '$dNew' order by date desc ");
            while ($result = mysqli_fetch_array($sql, MYSQLI_ASSOC)) {
                $resultAll['item'][] = $result['news_json'];
            }


            $response->setContent('[' . implode(',', $resultAll['item']) . ']');
        }elseif ($category == 'sport'){
            $urlYandexSport = "https://news.yandex.ru/sport.rss";

            $fileContents = file_get_contents($urlYandexSport);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);
////        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);
//
            foreach ($simpleXml->channel->item as $item) {

                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,
                    "category" => $category
                );
                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);
                mysqli_set_charset($link, 'utf8');
                $sql = mysqli_query($link, "select title from news_sport where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_sport (title, link, guid, description, date, news_json, category)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode', '$category' )");
                }else{
                    continue;
                }

//                $em = $this->getDoctrine()->getManager();
//
//                $news = new NewsSociety();
//
//                $news->setTitle($item->title);
//                $news->setLink($item->link);
//                $news->setGuid($item->guid);
//                $news->setDescription($item->description);
//                $news->setDate($item->pubDate);
//                $news->setNewsJSON($jsonEncode);
//                $em->persist($news);
//
//                $em->flush();
//                $json = array();
            }
            mysqli_set_charset($link, 'utf8');
            $sql = mysqli_query($link, "Select news_json from news_sport  where date between '$dOld' and '$dNew' order by date desc ");
            while ($result = mysqli_fetch_array($sql, MYSQLI_ASSOC)) {
                $resultAll['item'][] = $result['news_json'];
            }


            $response->setContent('[' . implode(',', $resultAll['item']) . ']');

        }elseif ($category == 'music'){
            $urlYandexMusic = "https://news.yandex.ru/music.rss";

            $fileContents = file_get_contents($urlYandexMusic);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);
////        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);
//
            foreach ($simpleXml->channel->item as $item) {

                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,
                    "category" => $category
                );
                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);
                mysqli_set_charset($link, 'utf8');
                $sql = mysqli_query($link, "select title from news_music where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_music (title, link, guid, description, date, news_json, category)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode', '$category' )");
                }else{
                    continue;
                }

//                $em = $this->getDoctrine()->getManager();
//
//                $news = new NewsSociety();
//
//                $news->setTitle($item->title);
//                $news->setLink($item->link);
//                $news->setGuid($item->guid);
//                $news->setDescription($item->description);
//                $news->setDate($item->pubDate);
//                $news->setNewsJSON($jsonEncode);
//                $em->persist($news);
//
//                $em->flush();
//                $json = array();
            }
            mysqli_set_charset($link, 'utf8');
            $sql = mysqli_query($link, "Select news_json from news_music  where date between '$dOld' and '$dNew' order by date desc ");
            while ($result = mysqli_fetch_array($sql, MYSQLI_ASSOC)) {
                $resultAll['item'][] = $result['news_json'];
            }


            $response->setContent('[' . implode(',', $resultAll['item']) . ']');

        }elseif ($category == 'auto'){
            $urlYandexAuto = "https://news.yandex.ru/auto.rss";

            $fileContents = file_get_contents($urlYandexAuto);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);
////        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);
//
            foreach ($simpleXml->channel->item as $item) {

                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,
                    "category" => $category
                );
                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);
                mysqli_set_charset($link, 'utf8');
                $sql = mysqli_query($link, "select title from news_auto where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_auto (title, link, guid, description, date, news_json, category)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode', '$category' )");
                }else{
                    continue;
                }

//                $em = $this->getDoctrine()->getManager();
//
//                $news = new NewsSociety();
//
//                $news->setTitle($item->title);
//                $news->setLink($item->link);
//                $news->setGuid($item->guid);
//                $news->setDescription($item->description);
//                $news->setDate($item->pubDate);
//                $news->setNewsJSON($jsonEncode);
//                $em->persist($news);
//
//                $em->flush();
//                $json = array();
            }
            mysqli_set_charset($link, 'utf8');
            $sql = mysqli_query($link, "Select news_json from news_auto  where date between '$dOld' and '$dNew' order by date desc ");
            while ($result = mysqli_fetch_array($sql, MYSQLI_ASSOC)) {
                $resultAll['item'][] = $result['news_json'];
            }


            $response->setContent('[' . implode(',', $resultAll['item']) . ']');

        }elseif ($category == 'politics'){
            $urlYandexPolitics = "https://news.yandex.ru/politics.rss";

            $fileContents = file_get_contents($urlYandexPolitics);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);
////        $jsonfileIXBT = json_encode($simpleXml, JSON_UNESCAPED_UNICODE);
//
            foreach ($simpleXml->channel->item as $item) {

                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,
                    "category" => $category
                );
                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);
                mysqli_set_charset($link, 'utf8');
                $sql = mysqli_query($link, "select title from news_politics where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_politics (title, link, guid, description, date, news_json, category)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode', '$category' )");
                }else{
                    continue;
                }

//                $em = $this->getDoctrine()->getManager();
//
//                $news = new NewsSociety();
//
//                $news->setTitle($item->title);
//                $news->setLink($item->link);
//                $news->setGuid($item->guid);
//                $news->setDescription($item->description);
//                $news->setDate($item->pubDate);
//                $news->setNewsJSON($jsonEncode);
//                $em->persist($news);
//
//                $em->flush();
//                $json = array();
            }
            mysqli_set_charset($link, 'utf8');
            $sql = mysqli_query($link, "Select news_json from news_politics  where date between '$dOld' and '$dNew' order by date desc ");
            while ($result = mysqli_fetch_array($sql, MYSQLI_ASSOC)) {
                $resultAll['item'][] = $result['news_json'];
            }


            $response->setContent('[' . implode(',', $resultAll['item']) . ']');
        }
        else{
            $json = array(

                    'code' => 404,
                    'message' => 'Page not found'

            );
            $response->setContent(json_encode($json, JSON_UNESCAPED_UNICODE));
        }
        return $response;

    }
}


