import matplotlib.pyplot as plt

# Aquí está el arreglo que se obtiene al compilar

# TIEMPOS SIN CACHE
# response_times = [
#     
# ]
# TIEMPOS CON CACHE DISTRIBUIDA
#response_times = [
#    
#]

# Creamos una lista de números de solicitud para el eje x
requests = list(range(1, len(response_times) + 1))

# Creamos el diagrama de líneas
plt.plot(requests, response_times)

# Agregamos etiquetas al eje x y al eje y
plt.xlabel('Número de solicitud')
plt.ylabel('Tiempo de respuesta (ms)')

# Mostramos el diagrama
plt.show()
