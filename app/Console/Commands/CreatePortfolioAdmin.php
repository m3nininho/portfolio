<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreatePortfolioAdmin extends Command
{
    protected $signature = 'portfolio:admin {email : E-mail de uma conta existente}';

    protected $description = 'Autoriza uma conta existente a gerenciar os projetos';

    public function handle(): int
    {
        $user = User::query()->where('email', $this->argument('email'))->first();
        if (! $user) {
            $this->error('Conta não encontrada.');

            return self::FAILURE;
        }
        $user->is_portfolio_admin = true;
        $user->save();
        $this->info('Acesso autorizado. A senha não foi alterada.');

        return self::SUCCESS;
    }
}
