start:
	docker compose -f app/docker-compose.yml down
	docker compose -f app/docker-compose.yml up -d --remove-orphans

down:
	docker compose -f app/docker-compose.yml down

shell:
	docker exec -it donation-checker-api sh
