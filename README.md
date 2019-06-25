- 初期構築時(このリポジトリをcloneしてきた場合は不要)

```
docker-compose run --rm node sh -c "create-react-app scrum-burndown-chart"
```

- 開発サーバ立ち上げ

```
docker-compose run --service-ports node ash -c "cd scrum-burndown-chart; yarn start"
```

- パッケージ追加

```
docker-compose run --service-ports node ash -c "cd scrum-burndown-chart; yarn add react-chartjs-2 chart.js"
```
