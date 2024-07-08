<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DonationReceived extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->view('emails.donationReceived')
                    ->subject('Doação recebida')
                    ->with([
                        'name' => strval($this->data['name']),
                        'amount' => strval($this->data['amount']),
                        'message' => strval($this->data['message'])
                    ]);
    }
}
