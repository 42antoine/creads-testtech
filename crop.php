<?php

if (!function_exists('gd_info'))
{
	throw new Exception('This script depend on gd library');
}


// Required field names from HTML
$required = [
	'image',
	'crop_x',
	'crop_y'
];

// Loop over field names, make sure each one exists and is not empty
$error = false;
foreach ($required as $field)
{
	if (!isset($_GET[$field]) || is_null($_GET[$field])) // have to accept integer = 0
	{
		$error = true;
	}
}

if ($error && (php_sapi_name() === 'cli'))
{

	/**
	 * TEST AS COMMAND LINE
	 *
	 * $> php crop.php > testcrop.gif
	 */

	// Create image instances
	$src = imagecreatefromjpeg('fond.jpg');
	$dest = imagecreatetruecolor(291, 221);

	// Copy
	imagecopy($dest, $src, 0, 0, 20, 13, 291, 221);

	// Output and free from memory
	header('Content-Type: image/gif');
	imagegif($dest);

	imagedestroy($dest);
	imagedestroy($src);

}
else if ($error)
{
	header('Location : index.html');
}
else
{

	// Form submission


	// Create image instances
	$src = imagecreatefromjpeg($_GET['image']);
	$dest = imagecreatetruecolor(291, 221);

	// Copy
	imagecopy($dest, $src, 0, 0, $_GET['crop_x'], $_GET['crop_y'], 291, 221);

	// Output and free from memory
	header('Content-Type: image/gif');
	header("Content-Disposition: attachment; filename=test.gif");
	imagegif($dest);

	imagedestroy($dest);
	imagedestroy($src);

}
