<?php
/**
 * Created by PhpStorm.
 * User: crack
 * Date: 17.05.2019
 * Time: 18:54
 */

        $host = '84.201.147.3';  // Хост,
        $user = 'phpuser';    // Имя созданного вами пользователя
        $pass = 'phpAdmin1999'; // Установленный вами пароль пользователю
        $db_name = 'users';   // Имя базы данных
        $link = mysqli_connect($host, $user, $pass, $db_name); // Соединяемся с базой

        // Ругаемся, если соединение установить не удалось
        if (!$link) {
        //    file_put_contents('mysql.txt', 'Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error());
            exit;
        }

        $urlYandexIT = "http://news.yandex.ru/computers.rss";

        $fileContents = file_get_contents($urlYandexIT);
        $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
        $fileContents = trim(str_replace('"', "'", $fileContents));
        $simpleXml = simplexml_load_string($fileContents);

            foreach ($simpleXml->channel->item as $item) {
                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,

                );

                mysqli_set_charset($link, 'utf8');

                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);


                $sql = mysqli_query($link, "select title from news_it where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                print_r($result);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_it (title, link, guid, description, date, news_json)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode' )");
                }else{
                    continue;
                }
            }
//
            $urlYandexWorld = "https://news.yandex.ru/world.rss";

            $fileContents = file_get_contents($urlYandexWorld);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);

            foreach ($simpleXml->channel->item as $item) {
                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,

                );

                mysqli_set_charset($link, 'utf8');

                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);


                $sql = mysqli_query($link, "select title from news_world where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                print_r($result);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_world (title, link, guid, description, date, news_json)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode' )");
                }else{
                    continue;
                }

            }

            $urlYandexSociety = "https://news.yandex.ru/society.rss";

            $fileContents = file_get_contents($urlYandexSociety);
            $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
            $fileContents = trim(str_replace('"', "'", $fileContents));
            $simpleXml = simplexml_load_string($fileContents);

            foreach ($simpleXml->channel->item as $item) {
                $json = array(
                    "title" => $item->title,
                    "link" => $item->link,
                    "guid" => $item->guid,
                    "description" => $item->description,
                    "date" => $item->pubDate,

                );

                mysqli_set_charset($link, 'utf8');

                $jsonEncode = json_encode($json, JSON_UNESCAPED_UNICODE);
                $sql = mysqli_query($link, "select title from news_society where title = '$item->title'");
                $result = mysqli_fetch_assoc($sql);
                print_r($result);
                if (!$result){
                    $sql = mysqli_query($link, "INSERT into news_society (title, link, guid, description, date, news_json)
                                                  values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode' )");
                }else{
                    continue;
                }
            }

