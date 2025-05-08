<!DOCTYPE html>
<html lang="en">

<head>
    <title>404 Page Not Found</title>
    <meta charset="utf-8" />
    <meta name="language" content="en">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="404" name="title">
    <meta content="404 Page Not Found" name="description">
    <meta content="{{ config('app.app_name') }}" name="author">
    <link rel="icon" href="{{ asset('assets_front/images/favicon.png') }}" type="image/gif" sizes="16x16">
    
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="404" />
    <meta property="og:description" content="404 Page Not Found" />
    <meta property="og:image" content="{{ asset('assets_front/images/logonew.webp') }}" />
    <meta property="og:site_name" content="{{ config('app.app_name') }}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="404" />
    <meta name="twitter:description" content="404 Page Not Found" />
    <meta name="twitter:image" content="{{ asset('assets_front/images/logonew.webp') }}" />
    <!-- CSS Files
    ================================================== -->
    <link href="{{ asset('assets_front/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" id="bootstrap">
    <link href="{{ asset('assets_front/css/mdb.min.css') }}" rel="stylesheet" type="text/css" id="mdb">
    <link href="{{ asset('assets_front/css/style.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets_front/css/combine.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets_front/css/new-css.css?v='.time()) }}" rel="stylesheet" type="text/css">
</head>
<body>
    <div class="row">
        <div class="col-sm-4 offset-sm-4 text-center">
            <img class="logo-1 mb-4 mt-3" src="{{ asset('assets_front/images/logonew.webp') }}" alt="Rental Wheel Logo">
            <img class="img-fluid" src="{{ asset('assets_front/images/home/404.svg') }}" alt="404">
            <h2 class="my-4">Page Not Found</h1>
            <a href="{{ route('home') }}" class="btn-main w-auto">Back to home page</a>
        </div>
    </div>
</body>
</html>