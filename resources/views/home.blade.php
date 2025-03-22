@extends('layout')

@section('content')
    <div class="container mt-5">
        <h1 class="text-center mb-4">Generador de Paleta de Colores</h1>
        <form class="mb-4">
            @csrf
            <div class="row g-3">
                <div class="col-md-6">
                    <p class="form-label ">Color Base</p>
                    <div id="pickerColor">
                        {{-- <input type="color" class="form-control form-control-color" id="baseColor" name="baseColor"
                            value="#ff5733"> --}}
                    </div>
                    <div class="mt-3">
                        <select class="form-select" id="selectColor">
                            <option value="monocromatico">Monocromático</option>
                            <option selected value="complementario">Complementario</option>
                            <option value="analogico">Análogo</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <p class="form-label">Color Base en Hex</p>
                    <input type="text" class="form-control" id="baseColorHex" name="baseColorHex">
                    <p class="form-label">Color Base en RGB</p>
                    <input type="text" class="form-control" id="baseColorRGB" name="baseColorRGB" readonly>
                    <div class="mt-5">
                        <h3 class="text-center mb-4">Tu Paleta de Colores</h3>
                        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 justify-content-center" id="divPaleta">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
@endsection
