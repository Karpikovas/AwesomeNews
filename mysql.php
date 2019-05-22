<?php
/**
 * Created by PhpStorm.
 * User: crack
 * Date: 17.05.2019
 * Time: 18:54
 */

        $host = '84.201.150.49';  // Хост,
        $user = 'awesome';    // Имя созданного вами пользователя
        $pass = 'awesome1999'; // Установленный вами пароль пользователю
        $db_name = 'users';   // Имя базы данных
        $link = mysqli_connect($host, $user, $pass, $db_name); // Соединяемся с базо
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

    $urlYandexAuto = "http://news.yandex.ru/auto.rss";

    $fileContents = file_get_contents($urlYandexAuto);
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


        $sql = mysqli_query($link, "select title from news_auto where title = '$item->title'");
        $result = mysqli_fetch_assoc($sql);
        print_r($result);
        if (!$result){
            $sql = mysqli_query($link, "INSERT into news_auto (title, link, guid, description, date, news_json)
                                                      values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode' )");
        }else{
            continue;
        }
    }

    $urlYandexPolitics = "http://news.yandex.ru/politics.rss";

    $fileContents = file_get_contents($urlYandexPolitics);
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


        $sql = mysqli_query($link, "select title from news_politics where title = '$item->title'");
        $result = mysqli_fetch_assoc($sql);
        print_r($result);
        if (!$result){
            $sql = mysqli_query($link, "INSERT into news_politics (title, link, guid, description, date, news_json)
                                                          values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode' )");
        }else{
            continue;
        }
    }

    $urlYandexSport = "http://news.yandex.ru/sport.rss";

    $fileContents = file_get_contents($urlYandexSport);
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


        $sql = mysqli_query($link, "select title from news_sport where title = '$item->title'");
        $result = mysqli_fetch_assoc($sql);
        print_r($result);
        if (!$result){
            $sql = mysqli_query($link, "INSERT into news_sport (title, link, guid, description, date, news_json)
                                                          values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode' )");
        }else{
            continue;
        }
    }

$urlYandexMusic = "http://news.yandex.ru/music.rss";

$fileContents = file_get_contents($urlYandexMusic);
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


    $sql = mysqli_query($link, "select title from news_music where title = '$item->title'");
    $result = mysqli_fetch_assoc($sql);
    print_r($result);
    if (!$result){
        $sql = mysqli_query($link, "INSERT into news_music (title, link, guid, description, date, news_json)
                                                          values ('$item->title', '$item->link', '$item->guid', '$item->description','$item->pubDate', '$jsonEncode' )");
    }else{
        continue;
    }
}
            



