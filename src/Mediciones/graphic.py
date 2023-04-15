import numpy as np
import matplotlib.pyplot as plt

#Cargo la data

REST_sin_cache = np.loadtxt('src\Mediciones\REST_sin_cache.txt',delimiter=',')
gRPC_sin_cache = np.loadtxt('src\Mediciones\gRPC_sin_cache.txt',delimiter=',')
API= np.loadtxt('src\Mediciones\API_DIRECTA.txt',delimiter=',')
gRPC_con_cache_2mb_lru= np.loadtxt('src\Mediciones\gRPC_con_cache_2mb_lru.txt',delimiter=',')
gRPC_con_cache_2mb_lfu= np.loadtxt('src\Mediciones\gRPC_con_cache_2mb_lfu.txt',delimiter=',')
gRPC_con_cache_2mb_random= np.loadtxt('src\Mediciones\gRPC_con_cache_2mb_random.txt',delimiter=',')
REST_con_cache_2mb_lru= np.loadtxt('src\Mediciones\REST_con_cache_2mb_lru.txt',delimiter=',')
REST_con_cache_1mb_lfu= np.loadtxt('src\Mediciones\REST_con_cache_1mb_lfu.txt',delimiter=',')
REST_con_cache_1mb_random= np.loadtxt('src\Mediciones\REST_con_cache_1mb_random.txt',delimiter=',')
REST_con_cache_1mb_lru= np.loadtxt('src\Mediciones\REST_con_cache_2mb_lru.txt',delimiter=',')
REST_con_cache_1mb_lru= np.loadtxt('src\Mediciones\REST_con_cache_1mb_lru.txt',delimiter=',')
gRPC_con_cache_1mb_lru= np.loadtxt('src\Mediciones\gRPC_con_cache_1mb_lru.txt',delimiter=',')
fig, ax = plt.subplots()

#ax.plot(REST_sin_cache, color = 'blue', label = 'REST sin caché, promedio: 666ms')
#ax.plot(gRPC_sin_cache, color = 'red', label = 'gRPC sin caché, promedio: 560ms')

#ax.plot(API, color = 'blue', label = 'API directamente')

#ax.plot(REST_con_cache_2mb_lru, color = 'blue', label = 'REST_con_cache_2mb_lru')


#ax.plot(gRPC_con_cache_2mb_random, color = 'black', label = 'gRPC_con_cache_2mb_random')
#ax.plot(gRPC_con_cache_2mb_lru, color = 'blue', label = 'gRPC_con_cache_2mb_lru')
#ax.plot(gRPC_con_cache_2mb_lfu, color = 'red', label = 'gRPC_con_cache_2mb_lfu')


ax.plot(REST_con_cache_1mb_lru, color = 'blue', label = 'REST_con_cache_1mb_lru')
ax.plot(REST_con_cache_1mb_lfu, color = 'red', label = 'REST_con_cache_1mb_lfu')
ax.plot(REST_con_cache_1mb_random, color = 'black', label = 'REST_con_cache_1mb_random')

#ax.plot(REST_con_cache_1mb_lru, color = 'blue', label = 'REST_con_cache_1mb_lru')
#ax.plot(gRPC_con_cache_1mb_lru, color = 'red', label = 'gRPC_con_cache_1mb_lru')

ax.set_xlabel('Numero de solicitud')
ax.set_ylabel('Tiempo (ms)')
ax.legend()
plt.show()