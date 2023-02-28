<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client([
    
]);

$response =  $client->request('GET', 'http://www.omdbapi.com/',[
    'query'=>[
        'apikey'=> 'efb94e0f',
        's' => 'transformer'
    ]
]);

$results = json_decode($response->getBody()->getContents(),1);
$datas = $results['Search'];

// foreach($datas as $data) :
//     foreach ($data as $k => $v){
//         echo ($k == "Poster"? '<img src="'.$v.'" alt=""><br>': $k.' : '.$v.'<br>');
//         // echo $k.' : '.$v.'<br>';
//     }
// endforeach

?>
