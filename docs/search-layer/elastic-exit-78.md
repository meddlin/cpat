# Elastic Search: Exit code 78

If Elasticsearch containers appear to be starting and suddenly stopping after 5-10 seconds...check the logs for exit code: 78.

Ref: [https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html)

Ref: [https://github.com/laradock/laradock/issues/1699](https://github.com/laradock/laradock/issues/1699)

In bash, outside of Docker, run:

```bash
sudo sysctl -w vm.max_map_count=262144
```