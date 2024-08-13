<?php

namespace App\Enums;

enum Status:string
{
    case PENDING = 'pending';
    case IN_PROGRESS = 'in progress';
    case COMPELETED = 'completed';
}

