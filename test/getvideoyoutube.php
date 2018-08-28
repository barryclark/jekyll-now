<!-- 
/* ======================================================
 * @name GET YOUTUBE DOWNLOAD
 * @version 0.0.2
 * @author Nguyễn Hưng
 * @copyright 2018 by TheStudySmart
 * @FB fb.com/TheStudySmart
 * @FB Me fb.com/NguyenHung1903
 * @Website itlearning.me
 * @Contact Admin@itlearning.me
 * @note Product not public, please don't share public
 * ======================================================*/ 
-->
<?php
function getVideoid($url)
{
/*===============================================================================================
 * Hỗ trợ get link:
 *===============================================================================================
 * http://youtu.be/XXXXXXXXXXX
 * http://www.youtube.com/?v=XXXXXXXXXXX
 * http://www.youtube.com/?v=XXXXXXXXXXX&feature=player_embedded
 * http://www.youtube.com/watch?v=XXXXXXXXXXX
 * http://www.youtube.com/watch?v=XXXXXXXXXXX&feature=player_embedded
 * http://www.youtube.com/v/XXXXXXXXXXX
 * http://www.youtube.com/e/XXXXXXXXXXX
 * http://www.youtube.com/embed/XXXXXXXXXXX
 * http://www.youtube.com/watch?t=40s&v=XXXXXXXXXXX
 * https://www.youtube.com/watch?v=XXXXXXXXXXX&list=xxxxxxxx#t=xx
 *================================================================================================*/
$video_id = false;
$url = parse_url($url);
if (strcasecmp($url['host'], 'youtu.be') === 0){
    $video_id = substr($url['path'], 1);
}elseif (strcasecmp($url['host'], 'www.youtube.com') === 0){
if (isset($url['query'])){
    parse_str($url['query'], $url['query']);
    if (isset($url['query']['v'])){
       $video_id = $url['query']['v'];
    }
}
if ($video_id == false){
    $url['path'] = explode('/', substr($url['path'], 1));
    if (in_array($url['path'][0], array('e', 'embed', 'v'))){
         $video_id = $url['path'][1];
    }
}
}else{
    return false;
}
    return $video_id;
}?>

<?php
if (isset($_POST["sub"])){
    if ($_POST["link"] != null){$Fulllink = $_POST["link"];}    
    $id = getVideoId($Fulllink);
}?>
<title>GET VIDEO YOUTUBE</title>
<body>
     <center>
         <p><b>-------------------------------------[GET VIDEO YOUTUBE]-------------------------------------</b></p>
    <form method="post">
        <input type="url" value="<?php if (isset($Fulllink)) echo $Fulllink;?>" name="link">
        <input type="submit" value="GET" name="sub">
    </form>
   
<?php if (isset($Fulllink)) echo "<iframe width='560' height='315' src='https://www.youtube-nocookie.com/embed/".$id."?rel=0&amp;controls=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe><br><br>";
 ?>
<?php
/*GET Link from Youtube*/
if (isset($_POST["sub"])) 
if ($_POST["link"] != null){
    parse_str(file_get_contents('http://www.youtube.com/get_video_info?video_id='.$id), $video_data);
$streams = $video_data['url_encoded_fmt_stream_map'];
$streams = explode(',',$streams);
$quly = 1;
foreach ($streams as $streamdata) {
    parse_str($streamdata,$streamdata);
    foreach ($streamdata as $key => $value) {
        if ($key == "url") {
            $value = urldecode($value);
            $link = $value; 
        } 
        if ($key == "quality"){
            $quality = $value;
            if ($quality == "hd720"){
                $quality = "720p";
                $quly = $quly+ 1;
            } elseif ($quality == "medium"){
                $quality = "480p";
                $quly = $quly+ 1;
                if ($quly == 4){
                     $quality = "360p";
                }
            } 
         }   
    }
    if ($quality == "720p" or $quality == "480p" or  $quality == "360p"){
         echo "<a href ='".$link."' target = '_blank'>".$quality."</a> &ensp;";
    }

}
echo "<br>";
}
/*GET Link from Youtube*/
?>
<footer>
    <p><b>------------------------------　■ 　 Facebook:　 facebook.com/thangtran.official------------------------------</b></p>
    <p><b>------------------------------　■ 　 Instagram:　 instagram.com/quocthang_      ------------------------------</b></p>
    <p><b>------------------------------　■ 　 Twitter: 　 　 twitter.com/quocthang_       ------------------------------</b></p>
    <p><b>------------------------------　■ 　 Github: 　 　 github.com/gnahtcouq          ------------------------------</b></p>
    <p><b>------------------------------　■ 　 Website:　 　quocthang.ooo                  ------------------------------</b></p>
    <p><b>------------------------------　■ 　 Email:　　　 comehere.thang@gmail.com        ------------------------------</b></p>
</footer>
<style type="text/css" media="screen">
a{
    -webkit-transition: 0.3s;
}
a:link, a:visited {
    border: 2px solid white;
    color: white;
    padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;

}

body{
    background-color: Black;
    margin-top:10%;
}
a:hover {
    transition: 0.3s;
    background-color: white;
    color:black;
}
a:active{
    background-color: #eeeeee;
    color:black;
}
input[type = url]{
    width: 540px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid white;
    background-color: Black;
    color: white;
}
input[type = submit]{
    width: 80px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid white;
    background-color: Black;
    color: white;
}
input[type = submit]:hover{
    transition: 0.3s;
    background-color: white;
    color:black;
}
iframe{
    border: 2px solid white;
}
p{
    color:white;
}
</style>
</center>
</body>