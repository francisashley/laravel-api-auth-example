# Laravel with OAuth2 API

## Description
This example demonstrates OAuth2 API authentication with `laravel` + `laravel\passport`. It tries to keep things simple by not straying too far from passport [install guide](https://laravel.com/docs/5.8/passport#installation). In cases that it does, I've documented all feature additions / enhancements in the [api feature recipes](#api-feature-recipes) section below.

## Table of contents
[toc]

## Features

- [x] Request access and refresh tokens with username / password
- [ ] Refresh access token with refresh token
- [ ] Revoke access token
- [ ] Handle CRUD operations with access token


## Setup

Generate app key (requires that `.env` exists with an `APP_ENV` key):
```bash
php artisan key:generate
```

Configure database:
```env
DB_CONNECTION=mysql
DB_HOST=192.168.10.10
DB_PORT=3306
DB_DATABASE=laravel-next-user-pass-auth-starter
DB_USERNAME=homestead
DB_PASSWORD=secret
```

Migrate and seed:
```bash
php artisan migrate --seed
```

Add a `Password grant client` and store the generated `Client ID` and `Client Secret` in the client app.

```bash
php artisan passport:client --password
```

## Serve
```bash
$ php artisan serve
```

## API Routes
```
+--------+----------+-----------------------------------------+----------------------------------+---------------------------------------------------------------------------+--------------+
| Domain | Method   | URI                                     | Name                             | Action                                                                    | Middleware   |
+--------+----------+-----------------------------------------+----------------------------------+---------------------------------------------------------------------------+--------------+
|        | GET|HEAD | /                                       |                                  | Closure                                                                   | web          |
|        | GET|HEAD | api/user                                |                                  | Closure                                                                   | api,auth:api |
|        | GET|HEAD | oauth/personal-access-tokens            | passport.personal.tokens.index   | Laravel\Passport\Http\Controllers\PersonalAccessTokenController@forUser   | web,auth     |
|        | POST     | oauth/personal-access-tokens            | passport.personal.tokens.store   | Laravel\Passport\Http\Controllers\PersonalAccessTokenController@store     | web,auth     |
|        | DELETE   | oauth/personal-access-tokens/{token_id} | passport.personal.tokens.destroy | Laravel\Passport\Http\Controllers\PersonalAccessTokenController@destroy   | web,auth     |
|        | GET|HEAD | oauth/scopes                            | passport.scopes.index            | Laravel\Passport\Http\Controllers\ScopeController@all                     | web,auth     |
|        | POST     | oauth/token                             | passport.token                   | Laravel\Passport\Http\Controllers\AccessTokenController@issueToken        | throttle     |
|        | POST     | oauth/token/refresh                     | passport.token.refresh           | Laravel\Passport\Http\Controllers\TransientTokenController@refresh        | web,auth     |
|        | GET|HEAD | oauth/tokens                            | passport.tokens.index            | Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@forUser | web,auth     |
|        | DELETE   | oauth/tokens/{token_id}                 | passport.tokens.destroy          | Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@destroy | web,auth     |
+--------+----------+-----------------------------------------+----------------------------------+---------------------------------------------------------------------------+--------------+
```

## Insomnia recipes
**Login and retrieve token:**
`client_secret` is generated from `php artisan passport:client --password`.
```shell
curl --request POST \
  --url http://127.0.0.1:{PORT}/oauth/token \
  --header 'accept: application/json' \
  --header 'content-type: multipart/form-data; boundary=---011000010111000001101001' \
  --form username=adamsandler@email.com \
  --form password=password \
  --form grant_type=password \
  --form client_id={CLIENT_ID} \
  --form client_secret={CLIENT_SECRET}
```

## API feature recipes

### Customize token lifetime

Not much deviates from the laravel passport [install guide](https://laravel.com/docs/5.8/passport#installation) except for:

**AuthServiceProvider:**

```php
# FROM THE GUIDE
Passport::routes();

# DEVIATION
use Illuminate\Support\Carbon;

// Create only the passport routes that we need.
Passport::routes(function($router) {
  // Enables us to create access tokens
  $router->forAccessTokens();
  // Enables us to create personal tokens
  $router->forPersonalAccessTokens();
  // Enables us to refresh tokens
  $router->forTransientTokens();
});

// Tokens last for 10 minutes
Passport::tokensExpireIn(Carbon::now()->addMinutes(10));

// Refresh tokens last for 10 days.
Passport::refreshTokensExpireIn(Carbon::now()->addDays(10));
```