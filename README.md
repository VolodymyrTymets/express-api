#  API


## Start

Make sure that you have last version of [Node js](https://nodejs.org/en//) and [npm](https://www.npmjs.com/). Thеn run
```
npm i && npm run dev

```

### Lint

```
npm run lint
```

## API docs
### Auth

__POST__ `/api/v1/auth/sign-in` - **Sign In**
```
@params
       email {string}
       password {string}
 ```

 __POST__ `/api/v1/auth/sign-up` - **Sign Un**
```
 @params
       email {string}
       password {string}
```
 __POST__ /api/v1/auth/sign-out - **Sign Out**
```
 @header
        Authorization: Bearer {token}
```

__PUT__ `/api/v1/auth/change-password` - **Change Password**
```
 @header
       Authorization: Bearer {token}
 @params
       newPassword {string}
       password {string}
```



### User

__PUT__ `/api/v1/users/my` - **Update** User details
```
 @header
        Authorization: Bearer {token}
 @params
       email {string}
```

### Cars
 __GET__ `/api/v1/cars/` - **List**
 ```
 @header
      Authorization: Bearer {token}
 ```

 __GET__ `/api/v1/cars/:_id` - **Get single**
 ```
 @header
        Authorization: Bearer {token}
 ```

 __POST__ `/api/v1/cars/` - **Create**
 ```
 @header
      Authorization: Bearer {token}
 @param
       model (require) - {string}
       manufacture (require) - {string}
       connectors (require) - [string] - 'Type2' || 'CCS'
       batteryCapacity (require) - {number}
       transform (require) - {string}
 ```

 __PUT__ `/api/v1/cars/:_id` - **Update**
 ```
 @header
        Authorization: Bearer {token}
 @param
       model - {string}
       manufacture - {string}
       connectors - [string] - 'Type2' || 'CCS'
       batteryCapacity - {number}
       transform - {string}
 ```

 __DELETE__ `/api/v1/cars/:_id` - **Remove**
 ```
 @header
        Authorization: Bearer {token}
 ```
