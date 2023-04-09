import matplotlib.pyplot as plt

# Aquí está el arreglo que se obtiene al compilar
# response_times = [
#     538, 454, 447, 447, 450, 450, 449, 449, 449, 450, 449,
#     449, 449, 448, 448, 446, 448, 448, 452, 452, 452, 451,
#     446, 449, 446, 446, 446, 463, 447, 448, 445, 445, 448,
#     448, 447, 452, 447, 446, 444, 446, 448, 446, 446, 450,
#     449, 462, 447, 445, 447, 447, 446, 445, 447, 446, 447,
#     449, 450, 446, 445, 447, 447, 446, 448, 447, 444, 450,
#     451, 446, 446, 446, 450, 449, 445, 449, 444, 448, 447,
#     449, 444, 448, 446, 447, 446, 448, 448, 446, 444, 446,
#     446, 446, 446, 445, 447, 446, 445, 445, 446, 444, 456,
#     447
# ]

response_times = [
  1245, 68, 59, 88, 57, 52, 51, 66, 54,  52, 54, 83,
    48, 49, 53, 48, 50, 54, 60, 51, 48, 100, 51, 53,
    56, 35, 21, 27, 37, 26, 26, 24, 24,  19, 18, 19,
    16, 17, 17, 19, 18, 18, 19, 18, 19,  29, 22, 22,
    22, 30, 25, 27, 28, 25, 24, 25, 24,  30, 25, 26,
    25, 25, 28, 24, 24, 27, 28, 29, 26,  24, 23, 41,
    31, 26, 26, 26, 26, 24, 25, 27, 24,  23, 24, 26,
    25, 25, 23, 26, 26, 26, 25, 25, 25,  23, 23, 29,
    43, 37, 24, 23
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
