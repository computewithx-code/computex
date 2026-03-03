<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Host;
use App\Models\Credit;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        $user = User::first() ?? User::create([
            'name'=>'Test User',
            'email'=>'test@example.com',
            'password'=>bcrypt('password123')
        ]);

        Host::first() ?? Host::create(['name'=>'Host 1','status'=>'online']);

        Credit::first() ?? Credit::create(['user_id'=>$user->id,'total'=>100,'used'=>0]);
    }
}
