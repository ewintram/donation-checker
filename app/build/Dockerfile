FROM donation-checker-dev as builder

RUN npm run compile
RUN npm prune --production

FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

COPY --from=builder /app .

CMD [ "npm", "run", "server-prd" ]