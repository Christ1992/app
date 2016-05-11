<?php

//$grant_type = $_POST['Grant_type'];
//$code = $_POST['Code'];
//$redirect_uri = $_POST['Redirect_uri'];
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$grant_type = $request->Grant_type;
$code = $request->Code;
$redirect_uri = $request->Redirect_uri;
//$grant_type = "authorization_code";
//$code = "AQCE3JXn8CFzwAJP-gpcfpvGh9SUOANBh9DJaZE57jyPX0uQAKvSPfBPZNd4M4I2WwEs7fKBiCsIBuuyC2eErgxjuJ23RJqOa6XZRnmzusofBd6vMXMI8FEpWqf58kUi3pDxme3TJTybV5RDv3m0zk7bTKqt2euk2hNhho8u-HgJvBialuLcbgz8y6murTpbRBxfpkMrf0PHI4M0alWS1cKWCRm-zzmGAG_FKJKlulhHtPVukwkOrfjnHjK291Euhdw5vLiL5d-sOk7a19FWXnbkVCle1aZP0dUYFwh3r-qUyIl45GpQJNRXLCPJ1A9P9Kr6Wsyh9QOPBilLyVTy1JNtcds8CQ9xHa1g0dv01Cax9GzA2A";
//$redirect_uri = "http%3A%2F%2Fwww.mikaeljuntti.se%2Fapp%2Findex.html%23%2Fcallback";
$client_key = "7c6e405a8e084d6488c5bb0e892c52ba";
$client_secret = "65a0fdf3789f494194eb602b43f0f7e5";
$encoded = base64_encode($client_key.":".$client_secret);
$data = array('grant_type' => $grant_type, 'code' => $code, 'redirect_uri' => $redirect_uri);

$post = array('grant_type' => $grant_type, 'code' => $code, 'redirect_uri' => $redirect_uri);


$sURL = "https://accounts.spotify.com/api/token"; // The POST URL
$sPD = "grant_type=authorization_code&code=".$code."&redirect_uri=".$redirect_uri; // The POST Data
//echo $sPD;
$aHTTP = array(
  'http' => // The wrapper to be used
    array(
    'method'  => 'POST', // Request Method
    // Request Headers Below
    'header'  => 'Authorization: Basic '.$encoded,
    'content' => $sPD
  )
);
$context = stream_context_create($aHTTP);
$contents = file_get_contents($sURL, false, $context);

echo $contents;

?>