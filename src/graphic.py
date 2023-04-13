import matplotlib.pyplot as plt

# Lee los datos del archivo txt y crea la lista response_times
with open('resultados_con_cache.txt', 'r') as f:
    data = f.read()
    values = data.split(',')
    response_times = [float(value) for value in values]

# Creamos una lista de números de solicitud para el eje x
requests = list(range(1, len(response_times) + 1))

# Creamos el diagrama de líneas
plt.plot(requests, response_times)

# Agregamos etiquetas al eje x y al eje y
plt.xlabel('Número de solicitud')
plt.ylabel('Tiempo de respuesta (ms)')

# Mostramos el diagrama
plt.show()
