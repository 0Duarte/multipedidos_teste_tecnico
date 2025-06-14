<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'due_date', 'is_done'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    protected $casts = [
    'is_done' => 'boolean',
];
}
