# redis-app/script.py
import redis
r = redis.Redis()
r.set('message', 'Hello Redis!')