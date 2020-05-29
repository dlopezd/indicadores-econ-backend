# indicadores-econ-backend
Es una aplicación desarrollada en Node.js que consume los servicios de indecon para obtener indicadores económicos. Las dos principales funciones desarrolladas son:
  - Obtener el último estado de ciertos indicadores.
  - Ver el histórico de valores de un indicador en particular, permite filtro por fechas.
  
## Documentación
Podrás acceder a la documentación de Api accediendo al path ```/swagger```. En ella podrás encontrar las descripciones de los endpoints y probarlos!.

## Características
  - La primera vez que se le solicita cierta información la consulta a la api de indecon y cachea la respuesta por 2 hrs.
  - La segunda vez, responde la información cacheada.

## Limitaciones:
  - Al desconocer la hora de actualización de los datos de indecon, se definió una cache de 2 hrs, lo que podría en algún momento responder información atrasada. Si se manejara más información al respecto, se podrían ajustar los tiempos de caché.


## Instalación

Para instalar las dependencias (incluídas las de desarrollo):

```sh
$ cd indicadores-econ-backend
$ npm install -d
```
Para configurar un puerto debes configurar una variable de entorno:
  - Si sólo ejecutarás el back prefiere la variable ```PORT``` 
```sh
$ export PORT=<PUERTO_DESEADO>
```
  - Si ejecutarás back y front a la vez, debe usar la variable ```PORT_BACK``` para evitar conflicto entre las aplicaciones.
```sh
$ export PORT_BACK=<PUERTO_DESEADO>
```
  - También puedes omitir estes paso y por defecto se ejecutará en el puerto ```2000```.

Finalmente para iniciar el servidor
```sh
$ npm start
```

## Pruebas
Para ejecutar las prueba debes ejecutar el siguiente comando:
```sh
npm run test
```

