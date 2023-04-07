import redis 

r1 = redis.Redis(host='localhost', port=6379)
r2 = redis.Redis(host='localhost', port=6380)
r3 = redis.Redis(host='localhost', port=6381)

#Consultar datos en la particion 1
dato1 = r1.get('dato1')
dato2 = r1.get('dato2')
dato3 = r1.get('dato3')

#Consultar datos en la particion 2
dato4 = r2.get('dato4')
dato5 = r2.get('dato5')
dato6 = r2.get('dato6')

#Consultar datos en la particion 3
dato7 = r3.get('dato7')
dato8 = r3.get('dato8')
dato9 = r3.get('dato9')

#Imprimir datos
print(dato1)
print(dato2)
print(dato3)
print(dato4)
print(dato5)
print(dato6)
print(dato7)
print(dato8)
print(dato9)
