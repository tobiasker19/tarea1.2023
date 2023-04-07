import redis

r1 = redis.Redis(host='localhost', port=6379)
r2 = redis.Redis(host='localhost', port=6380)
r3 = redis.Redis(host='localhost', port=6381)

#Guardar datos en la particion 1
r1.set('dato1', 'valor1')
r1.set('dato2', 'valor2')
r1.set('dato3', 'valor3')

#Guardar datos en la particion 2
r2.set('dato4', 'valor4')
r2.set('dato5', 'valor5')
r2.set('dato6', 'valor6')

#Guardar datos en la particion 3
r3.set('dato7', 'valor7')
r3.set('dato8', 'valor8')
r3.set('dato9', 'valor9')