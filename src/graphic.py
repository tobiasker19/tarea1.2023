import matplotlib.pyplot as plt

# Aquí está el arreglo que se obtiene al compilar
response_times = [
    538, 454, 447, 447, 450, 450, 449, 449, 449, 450, 449,
    449, 449, 448, 448, 446, 448, 448, 452, 452, 452, 451,
    446, 449, 446, 446, 446, 463, 447, 448, 445, 445, 448,
    448, 447, 452, 447, 446, 444, 446, 448, 446, 446, 450,
    449, 462, 447, 445, 447, 447, 446, 445, 447, 446, 447,
    449, 450, 446, 445, 447, 447, 446, 448, 447, 444, 450,
    451, 446, 446, 446, 450, 449, 445, 449, 444, 448, 447,
    449, 444, 448, 446, 447, 446, 448, 448, 446, 444, 446,
    446, 446, 446, 445, 447, 446, 445, 445, 446, 444, 456,
    447
]

# Creamos una lista de números de solicitud para el eje x
requests = list(range(1, len(response_times) + 1))

# Creamos el diagrama de líneas
plt.plot(requests, response_times)

# Agregamos etiquetas al eje x y al eje y
plt.xlabel('Número de solicitud')
plt.ylabel('Tiempo de respuesta (ms)')

# Mostramos el diagrama
plt.show()
