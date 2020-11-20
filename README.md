## Notification Service
The objective of this project is creating notification service which
is responsible for sending notification to user/s via multiple channels SMS, Email, Push notification.

## System Design
##### Functional requirements:
  - Send notification to specific user.
  - Send notification to group of users.
  - Multiple channels (SMS, Email, Push notification)
  - Localization.

##### Non-Functional requirements:
  - Providers have limited requests number per time.

![alt_text](repo_images/system_design.png?raw=true "High-Level Design")

## Install
```
$ docker-compose up --build
```
## Test
```
$ docker exec -it notification npm test
```

## DB Seed
```
$ docker exec -it notification npx md-seed run --dropdb
```

## API
### Create Notification
```
POST /notification
```

```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | `string` | **Required**. [`PromotionType`|`DropOffType`]|
| `notifiableType` | `string` | **Required**. [`user`|`userGroup`]|
| `notifiableId` | `string` | **Required**. User ID or [`Group_A`, `Group_B`]|
| `data` | `object` |  any data releated to the message ex: `{promoCode: 'OFF_%25'}`|
| `locale` | `string` |  override user locale in DB ex: [`ar`, `en`]|

```

To single user
```
{
	"type": "DropOffType",
	"notifiableType": "user",
	"notifiableId": 2,
	"data": {
		"location": "some data"
	},
	"locale": "ar"
}

```

```
{
	"type": "PromotionType",
	"notifiableType": "userGroup",
	"notifiableId": "Group_A",
	"data": {
		"promoCode": "off_%25"
	},
	"locale": "en"
}
```


```
{
	"Notification Created Successfully"
}
```
Sending notification will being simulated in the console as messages.

### Users
```
GET /users
```
get list of created users to know user ID

```
{
	users: collection
}
```