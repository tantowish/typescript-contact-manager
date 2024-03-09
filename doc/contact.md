# Contact API Spec

### Create Contact

Endpoint : POST /api/contacts/

Request Header :

- X-API-TOKEN : token-uuid

Request Body :

```
{
	"firstName": "Tantowi,
	"lastName": "Shah",
	"email": "example@gmail.com",
	"phone": 0852052842313
}
```

Response Body (Success)

```
{
	"data": {
		"id": "asdasdko131231-sadoadk213-21sad231",
		"firstName": "Tantowi,
		"lastName": "Shah",
		"email": "example@gmail.com",
		"phone": 0852052842313
	}
```

Response Body (Failed) : 

```
{
	"errors": "firstName must no blank, ..."
}
```

### Get Contact

Endpoint : Get /api/contacts/:id

Request Header :

- X-API-TOKEN : token-uuid

Response Body (Success)

```
{
	"data": {
		"id": "asdasdko131231-sadoadk213-21sad231",
		"firstName": "Tantowi,
		"lastName": "Shah",
		"email": "example@gmail.com",
		"phone": 0852052842313
	}
```

Response Body (Failed) :

```
{
	"errors": "Contact is not found, ..."
}
```

### Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :

- X-API-TOKEN : token-uuid

Request Body :

```
{
	"firstName": "Tantowi,
	"lastName": "Shah",
	"email": "example@gmail.com",
	"phone": 0852052842313
}
```

Response Body (Success)

```
{
	"data": {
		"id": "asdasdko131231-sadoadk213-21sad231",
		"firstName": "Tantowi,
		"lastName": "Shah",
		"email": "example@gmail.com",
		"phone": 0852052842313
	}
```

Response Body (Failed) :

```
{
	"errors": "firstName must no blank, ..."
}
```

### Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :

- X-API-TOKEN : token-uuid

Response Body (Success)

```
{
	"message": "success"
}
```

Response Body (Failed) :

```
{
	"errors": "Contact is not found, ..."
}
```

### Search Contact

Endpoint : GET /api/contacts

Query Parameter :

- name : string, contact firstName or lastName, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request Header :

- X-API-TOKEN : token-uuid

Response Body (Success)

```
{
	"data": [
		{
			"id": "asdasdko131231-sadoadk213-21sad231",
			"firstName": "Tantowi,
			"lastName": "Shah",
			"email": "example@gmail.com",
			"phone": 0852052842313
		},
		{
			"id": "as39fa2931-ghdoadk213-52sa34d1",
			"firstName": "Shyra,
			"lastName": "Athaya",
			"email": "example@gmail.com",
			"phone": 089525232359
		},
	],
	"paging": {
		"current_page": 1,
		"total_page": 10.
		"size": 10
	}
}
```

Response Body (Failed) :

```
{
	"errors": "Unauthorized, ..."
}
```
