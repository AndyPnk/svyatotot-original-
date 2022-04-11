<?php
//читаю json file
$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

//лист
$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>Телефон: '.$_POST['ephone'].'</p>';
$message .= '<p>Почта: '.$_POST['email'].'</p>';
$message .= '<p>Почта: '.$_POST['ename'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id=>$count){
    $message .= $json[$id]['name'].' --- ';
    $message .= $json[$id]['img'].' --- ';
    $message .= $count.' --- ';
    $message .= $count*$json[$id]['cost'];
    $message .='<br>';
    $sum = $sum +$count*$json[$id]['cost'];

}
$message .='Всего: '.$sum;
print_r($message);

//$to = 'obadar2345@gmail.com'.',';
//$to .=$_POST['email'];
//$spectext = '<!DOCTYPE HTML><html><title>Заказ</title></head><body>';
//$headers = 'MIME-Version: 1.0' . "\r\n";
//$headers .= 'From: Свято починається тут <obadar2345@andriy.zzz.com.ua>' . "\r\n";
//$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
//
//$m =mail($to, 'Заказ в магазине', $spectext.$message.'</body></html>', $headers);
//
//if($m) {echo 1;} else{echo 0;}



