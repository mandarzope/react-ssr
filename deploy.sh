# APP=ssr/api npm run build:ssr:qa
# APP=ssr/api node scripts/qa.server-static.s3.js
# cd "lambda-server"
# sh deploy.sh
APP=ssr/api npm run build:ssr:prod
APP=ssr/api node scripts/prod.server-static.s3.js
cd "lambda-server"
sh deploy.sh prod
