<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
    <title>@yield('title')</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #9b59b6, #8e44ad);
            font-family: 'Arial', sans-serif;
            color: white;
        }

        p {
          font-size: 1.3em;
        }
    </style>

    <!-- Aquí puedes incluir tus CSS -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="container">
        @yield('content')
    </div>

    <!-- Aquí puedes incluir tus scripts JS -->
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>