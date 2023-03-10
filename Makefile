start:
	docker compose -f app/docker-compose.yml down
	docker compose -f app/docker-compose.yml up -d --remove-orphans

down:
	docker compose -f app/docker-compose.yml down

shell:
	docker exec -it donation-checker-api sh

.PHONY: test
test:
	docker exec -it donation-checker-api sh -c "npm test -- $(filter)"

logs:
	docker logs donation-checker-api -f --tail=20