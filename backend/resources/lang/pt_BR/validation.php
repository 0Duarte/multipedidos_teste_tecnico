<?php
return [
    'attributes' => [
        'name' => 'nome',
        'email' => 'e-mail',
        'password' => 'senha',
        'due_date' => 'data da tarefa',
    ],
    'required' => 'O campo :attribute é obrigatório.',
    'email' => 'O campo :attribute deve ser um e-mail válido.',
    'min' => [
        'string' => 'O campo :attribute deve ter no mínimo :min caracteres.',
    ],
    'unique' => 'O campo :attribute já está em uso.',
    'after_or_equal' => 'A :attribute deve ser uma data igual ou posterior a hoje.',
];