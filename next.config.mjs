/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: "https://tommymiredin.com/apps/blackjackpot/", // Permet de générer des chemins relatifs pour les fichiers statiques
    basePath: "", // Laissez vide si vous n'avez pas de sous-répertoire
};

export default nextConfig;
