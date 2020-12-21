<?php
$url_array = parse_url($_SERVER['HTTP_REFERER']);

if($_SERVER['HTTP_HOST'] != $url_array['host']){
	$res=array('code'=>500);
	exit(json_encode($res));
}

require_once("config.php");
$tmp = $db->query("SELECT * FROM `{$table}` WHERE `status`= 'success' and `mount` >= 1 order by `notify_time` desc limit 5");
$res = $tmp->fetchAll(PDO::FETCH_ASSOC);
$total=0;
$data=[];
foreach($res as $tmp){
	$record=array('mount' => $tmp['mount'],'time'=>$tmp['notify_time'],'buyer'=> explode("*", $tmp['buyer_logon_id'])[0].'***********','mark'=>htmlspecialchars($tmp['mark'],ENT_QUOTES));
	$data[]=$record;
	$total+=$tmp['mount'];
}
$diff_buyer = $db->query("SELECT COUNT( distinct `buyer_logon_id`) FROM `f2f_order` WHERE `status` = 'success'")->fetch()[0];
$total_money = $db->query("SELECT SUM(`mount`) FROM `f2f_order` WHERE `status` = 'success'")->fetch()[0];
$total_money = sprintf('%.2f',$total_money);
$res=array('code'=>200,'data'=>$data,'total'=>$total,'total_money'=>$total_money,'diff_buyer'=>$diff_buyer);
exit(json_encode($res));
?>