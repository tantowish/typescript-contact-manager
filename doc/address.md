# Address API Spec

### Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token-uuid

Request Body :

```
{
	"street": "JL.PASEKAN NO.65",
	"city": "Kabupaten Selaman",
	"province": "Daerah Istimewa Yogyakarta",
	"postal_code": "52823"
}
```

Response Body (Success) :

```
{
	"data": {
		"id": 1,
		"street": "JL.PASEKAN NO.65",
		"city": "Kabupaten Selaman",
		"province": "Daerah Istimewa Yogyakarta",
		"postal_code": "52823"
	}
}
```

Response Body (Failed)

```
{
	"errors": "street must not blank, ..."
}
```

### Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token-uuid

Response Body (Success) :

```
{
	"data": {
		"id": 1,
		"street": "JL.PASEKAN NO.65",
		"city": "Kabupaten Selaman",
		"province": "Daerah Istimewa Yogyakarta",
		"postal_code": "52823"
	}
}
```

Response Body (Failed)

```
{
	"errors": "Unauthorized, ..."
}
```

### Update Address

Endpoint : PUT /api/contacts/:id/addresses/:idAddress

Request Header :

- X-API-TOKEN : token-uuid

Request Body :

```
{
	"street": "JL.PASEKAN NO.65",
	"city": "Kabupaten Selaman",
	"province": "Daerah Istimewa Yogyakarta",
	"postal_code": "52823"
}
```

Response Body (Success) :

```
{
	"data": {
		"id": 1,
		"street": "JL.PASEKAN NO.65",
		"city": "Kabupaten Selaman",
		"province": "Daerah Istimewa Yogyakarta",
		"postal_code": "52823"
	}
}
```

Response Body (Failed)

```
{
	"errors": "street must not blank, ..."
}
```

### Remove Address

Endpoint : POST /api/contacts/:id/addresses/:idAddress

Request Header :

- X-API-TOKEN : token-uuid

Response Body (Success) :

```
{
	"message": "success"
}
```

Response Body (Failed)

```
{
	"errors": "Address is not found, ..."
}
```

### List Address

Endpoint : GET /api/contacts/:id/addresses

Request Header :

- X-API-TOKEN : token-uuid

Response Body (Success) :

```
{
	"data": [
		{
			"id": 1,
			"street": "JL.PASEKAN NO.65",
			"city": "Kabupaten Selaman",
			"province": "Daerah Istimewa Yogyakarta",
			"postal_code": "52823"
		},
		{
			"id": 2,
			"street": "JL Sekyu LK VII",
			"city": "Musi Banyuasin",
			"province": "Sumatera Selatan",
			"postal_code": "30711"
		},
	]
}
```

Response Body (Failed)

```
{
	"errors": "Contact is not found, ..."
}
```
