<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use TCG\Voyager\Facades\Voyager;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //Voyager::addAction(\App\Actions\SendEmailAction::class);
        Voyager::addAction(\App\Actions\NotificationFromEventAction::class);
        Voyager::addAction(\App\Actions\EventStreamConfig::class);
        Voyager::addAction(\App\Actions\DocumentsEventAction::class);
        Voyager::addAction(\App\Actions\EventStatusAction::class);
        Voyager::addAction(\App\Actions\ReportAction::class);
        //Voyager::addAction(\App\Actions\DetailsEventAction::class);

    }
}
