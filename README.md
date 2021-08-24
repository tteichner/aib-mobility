# AIB Mobility

Form with price preview

## Setup

````shell
# install the node dependency
npm i

# install the php dependency
composer install --no-interaction --no-ansi
````
This will install dependencies that are needed during development, no external package is needed that is compiled into the package. [Luxon](https://www.jsdelivr.com/package/npm/luxon) is lazy loaded.

## Build

````shell
npm run build
````

## Configure backend

Copy the template in the server folder to config.php and make sure it is reachable from the outside. In the copy change the credentials of your smtp relay accordingly.

This will create the form and publish it in the dist folder

## Installation

````html
<html lang="de">
<head>
    <title></title>
    <script type="text/javascript" src="dist/calculate.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            priceForm.init('/server/send_mail.php');
        });
    </script>
</head>
</html>
````
If you place the script somewhere else make sure to change the path in the init call.
