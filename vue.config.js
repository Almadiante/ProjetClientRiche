module.exports = {
    publicPath: './',
    devServer: {
        proxy: 'https://sandbox-api.brewerydb.com/v2/'
        }
    }
// dev server : npm run serve
// rpod : npm run build