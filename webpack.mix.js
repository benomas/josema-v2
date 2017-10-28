let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/*
mix.js('resources/assets/js/app.js', 'public/js')
.sass('resources/assets/sass/app.scss', 'public/css');
*/

mix.js('resources/assets/js/external/vue-app.js', 'public/js/external')
.sass('resources/assets/sass/external/vue-app.scss', 'public/css/external');

mix.js('resources/assets/js/internal/vue-app.js', 'public/js/internal')
.sass('resources/assets/sass/internal/vue-app.scss', 'public/css/internal');
