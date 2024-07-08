@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                @if (session('status'))
                    <div class="alert alert-info alert-dismissible fade show" role="alert">
                        {{ session('status') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif
                <div class="loading-overlay loading-gif" style="display: none;">
                    <img src="{{ asset('image/loading.gif') }}" alt="Loading">
                </div>
                <div class="card">
                    <div class="card-header">{{ __('Integração com Streamlabs') }}</div>
                    <div class="card-body">
                        <input type="hidden" id="userSlug" value="{{ optional(auth()->user())->slug }}">
                        <div id="streamlabsIntegrationContainer"
                            style="{{ optional($streamlabsIntegration)->status == 1 ? 'display: none;' : '' }}">
                            <button class="btn btn-primary" onclick="handleIntegrationClick()">Quero fazer integração com
                                Streamlabs</button>

                        </div>
                        @if ($streamlabsIntegration && $streamlabsIntegration->status == 1)
                            <button class="btn btn-danger"
                                onclick="confirmRemoval({{ $streamlabsIntegration->id }}, 'streamlabs')">Remover Integração
                                com Streamlabs</button>
                        @endif
                    </div>
                </div>

                <div class="card mt-3">
                    <div class="card-header">{{ __('Integração com Streamelements') }}</div>
                    <div class="card-body">
                        <div id="streamelementsIntegrationContainer"
                            style="{{ optional($streamelementsIntegration)->status == 1 ? 'display: none;' : '' }}">
                            <button class="btn btn-primary" onclick="toggleStreamelementsInputs()">Quero fazer integração
                                com Streamelements</button>
                        </div>
                        @if ($streamelementsIntegration && $streamelementsIntegration->status == 1)
                            <button class="btn btn-danger"
                                onclick="confirmRemoval({{ $streamelementsIntegration->id }}, 'streamelements')">Remover
                                Integração com Streamelements</button>
                        @endif
                        <div id="streamelementsInputs" style="display: none;">
                            <input type="text" id="streamelementsAccountId" class="form-control mt-3"
                                placeholder="ID da Conta">
                            <input type="text" id="streamelementsJWT" class="form-control mt-3" placeholder="JWT">
                            <button class="btn btn-success mt-3" onclick="handleStreamelementsIntegration()">Confirmar
                                Integração</button>
                        </div>
                    </div>
                </div>

                <div class="loading-overlay loading-gif" style="display: none;">
                    <img src="{{ asset('image/loading.gif') }}" alt="Loading">
                </div>

                <div id="integrationResult"></div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/integration.js') }}"></script>
@endsection
