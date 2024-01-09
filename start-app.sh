echo "Démarrage du serveur backend..."
open -a Terminal /backend -n -e "npx nodemon serve"

# Commande pour le frontend
echo "Démarrage du serveur frontend..."
open -a Terminal /frontend -n -e "ng serve"