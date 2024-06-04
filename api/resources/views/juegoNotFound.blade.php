@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-center">
            <h1>Juego no encontrado</h1>
          </div>

          <div class="card-body text-center text-si">
            <p>Lo sentimos, el videojuego que estás buscando no ha sido encontrado.</p>
            <p>Por favor, vuelve a subir el videojuego o verifica que el enlace sea correcto.</p>
            <a href="{{ env('FRONTEND_URL') }}" class="btn btn-primary">Volver</a>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection