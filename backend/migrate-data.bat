@echo off
echo Exporting data from local MongoDB...

REM Export Products
mongodump --uri="mongodb://localhost:27017/puma-ecommerce" --collection=products --out=backup

REM Export Users  
mongodump --uri="mongodb://localhost:27017/puma-ecommerce" --collection=users --out=backup

REM Export Orders
mongodump --uri="mongodb://localhost:27017/puma-ecommerce" --collection=orders --out=backup

REM Export Carts
mongodump --uri="mongodb://localhost:27017/puma-ecommerce" --collection=carts --out=backup

echo.
echo Data exported to 'backup' folder!
echo.
echo Now importing to MongoDB Atlas...
echo.

REM Import to Atlas
mongorestore --uri="mongodb+srv://sonukumarray:qezKdDlhiWcErrv1@cluster0.66o2trx.mongodb.net/puma-ecommerce?retryWrites=true&w=majority" --drop backup/puma-ecommerce

echo.
echo ✅ Data migration complete!
pause
