@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Donation') }}</div>
                    <div class="card-body">
                        <div class="container">
                            <div class="row">
                                <div class="col text-center">
                                    <!-- Avatar -->
                                    <div class="avatar-icon">
                                        <!-- Ícone ou Imagem do Avatar -->
                                    </div>
                                    <h1>{{ $user->name }}</h1>
                                    <div class="loading-overlay loading-gif" style="display: none;">
                                        <img src="{{ asset('image/loading.gif') }}" alt="Loading">
                                    </div>

                                    <form id="donationForm" method="POST" action="">
                                        @csrf
                                        <input type="hidden" id="donationRoute" value="{{ route('donations.post.api', ['slug' => $user->slug]) }}">
                                        <div class="form-group">
                                            <input type="text" name="name" class="form-control mb-2"
                                                placeholder="Nome">
                                        </div>
                                        <div class="form-group">
                                            <input type="email" name="identifier" class="form-control mb-2"
                                                placeholder="Digite seu Email">
                                        </div>
                                        <div class="form-group">
                                            <input type="text" name="cpf" id="cpf" class="form-control mb-2 cpf-mask"
                                                placeholder="Digite seu CPF">
                                        </div>
                                        <div class="form-group">
                                            <input type="number" name="amount" class="form-control mb-2"
                                                placeholder="Valor">
                                        </div>
                                        <div class="form-group">
                                            <textarea class="form-control mb-2" name="message" placeholder="Mensagem"></textarea>
                                        </div>
                                        <input type="hidden" name="currency" value="BRL">
                                        <button type="button" id="submitBtn" class="btn btn-primary">Enviar</button>
                                    </form>
                                    <div class="modal fade" id="qrCodeModal" tabindex="-1" role="dialog"
                                        aria-labelledby="qrCodeModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="qrCodeModalLabel">QR Code do Pagamento</h5>
                                                </div>
                                                <div class="modal-body" style="display: flex; justify-content: center; align-items: center;">
                                                    <div id="qrcodepix-modal"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/donations.js') }}"></script>
@endsection
