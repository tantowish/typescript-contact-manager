# User API Spec

### Register User

Endpoint : POST /api/users/register

Request Body :

```
{
	"username": "tantows001",
	"password": "12354",
	"name": "Tantowi Shah Hanif"
}
```

Response Body (Success) :

```
{
	"data": {
		"username": "tantows001",
		"name": "Tantowi Shah Hanif",
		"token": "asdasd32-asdasd21-sadasf233"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Username or password is wrong, ..."
}
```

### Login User

Endpoint : POST /api/users/login

Request Body :

```
{
	"username": "tantows001",
	"password": "12354",
	"name": "Tantowi Shah Hanif"
}
```

Response Body (Success) :

```
{
	"data": {
		"username": "tantows001",
		"name": "Tantowi Shah Hanif"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Username must not blank, ..."
}
```

### Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN : token-uuid

Response Body (Success) :

```
{
	"data": {
		"username": "tantows001",
		"name": "Tantowi Shah Hanif",
		"token": uuid
	}
}
```

Response Body (Failed) :

```
{
	"errors": "User is not found, ..."
}
```


### Update User

Endpoint : PATCH /api/users/login

Request Header :

- X-API-TOKEN : token-uuid

Request Body :

```
{
	"password": "12354",
	"name": "Tantowi Shah Hanif"
}
```

Response Body (Success) :

```
{
	"data": {
		"username": "tantows001",
		"name": "Tantowi Shah Hanif"
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Unauthorized, ..."
}
```

### Logout user

Endpoint : DELETE /api/users/login

Request Header :

- X-API-TOKEN : token-uuid

Response Body (Success) :

```
{
	"message": "success"
}
```

Response Body (Failed) :

```
{
	"errors": "Unauthorized, ..."
}
```
