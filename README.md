This is a simple application in development to manage users, services and subscriptions.

## Usage
- backend (in ./subscription-manager-api)
```bash
mvn clean install -DskipTests=true
docker build -t subscription-manager-api .
docker-compose up
```
- frontend (in ./react-ui)
```bash
npm install
npm start
